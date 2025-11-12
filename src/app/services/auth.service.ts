import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

declare global {
  interface Window {
    google: any;
  }
}

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
    
    this.initializeGoogleSignIn();
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

  private initializeGoogleSignIn(): void {
    // Google Sign-In will be initialized when available
    if (typeof window === 'undefined') return;

    const checkGoogle = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: 'YOUR_GOOGLE_CLIENT_ID_HERE',
          callback: this.handleGoogleSignIn.bind(this)
        });
      }
    };

    if (window.google) {
      checkGoogle();
    } else {
      setTimeout(checkGoogle, 1000);
    }
  }

  private handleGoogleSignIn(response: any): void {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const user: User = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        phone: '',
        userType: 'client',
        profileImage: payload.picture,
        createdAt: new Date(),
        isActive: true
      };

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    } catch (error) {
      console.error('Error processing Google Sign-In:', error);
    }
  }

  signInWithGoogle(): void {
    if (typeof window !== 'undefined' && window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      console.log('Google Sign-In is not available. Using email/password login instead.');
    }
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