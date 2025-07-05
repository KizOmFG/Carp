import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Simulate getting user from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string, userType: 'client' | 'carpenter' | 'admin'): Observable<User> {
    return new Observable(observer => {
      // Simulate API call
      setTimeout(() => {
        const user: User = {
          id: '1',
          email,
          name: 'Usuario Demo',
          phone: '+1234567890',
          userType,
          createdAt: new Date(),
          isActive: true
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        observer.next(user);
        observer.complete();
      }, 1000);
    });
  }

  register(userData: Partial<User>): Observable<User> {
    return new Observable(observer => {
      setTimeout(() => {
        const user: User = {
          id: Date.now().toString(),
          ...userData,
          createdAt: new Date(),
          isActive: true
        } as User;
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        observer.next(user);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  hasRole(role: string): boolean {
    return this.currentUserValue?.userType === role;
  }
}