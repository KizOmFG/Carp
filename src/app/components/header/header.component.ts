import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/" class="logo-link">
              <span class="logo-icon">🪵</span>
              <span class="logo-text">CarpinteríaPro</span>
            </a>
          </div>
          
          <nav class="nav" *ngIf="currentUser">
            <div class="nav-links">
              <a routerLink="/dashboard" class="nav-link" routerLinkActive="active">Dashboard</a>
              <a routerLink="/requests" class="nav-link" routerLinkActive="active" *ngIf="currentUser.userType === 'client'">Mis Solicitudes</a>
              <a routerLink="/services" class="nav-link" routerLinkActive="active" *ngIf="currentUser.userType === 'carpenter'">Servicios</a>
              <a routerLink="/admin" class="nav-link" routerLinkActive="active" *ngIf="currentUser.userType === 'admin'">Administración</a>
            </div>
            
            <div class="user-menu">
              <div class="user-info">
                <span class="user-name">{{ currentUser.name }}</span>
                <span class="user-type">{{ getUserTypeLabel(currentUser.userType) }}</span>
              </div>
              <button class="logout-btn" (click)="logout()">Cerrar Sesión</button>
            </div>
          </nav>
          
          <div class="auth-buttons" *ngIf="!currentUser">
            <a routerLink="/login" class="btn btn-outline">Iniciar Sesión</a>
            <a routerLink="/register" class="btn btn-primary">Registrarse</a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .logo-icon {
      margin-right: 0.5rem;
      font-size: 2rem;
    }
    
    .nav {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    
    .nav-links {
      display: flex;
      gap: 1.5rem;
    }
    
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: background-color 0.3s;
    }
    
    .nav-link:hover,
    .nav-link.active {
      background-color: rgba(255,255,255,0.2);
    }
    
    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    
    .user-name {
      font-weight: bold;
    }
    
    .user-type {
      font-size: 0.8rem;
      opacity: 0.8;
    }
    
    .logout-btn {
      background: rgba(255,255,255,0.2);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .logout-btn:hover {
      background: rgba(255,255,255,0.3);
    }
    
    .auth-buttons {
      display: flex;
      gap: 1rem;
    }
    
    .btn {
      padding: 0.5rem 1rem;
      border-radius: 5px;
      text-decoration: none;
      transition: all 0.3s;
    }
    
    .btn-outline {
      border: 2px solid white;
      color: white;
    }
    
    .btn-outline:hover {
      background: white;
      color: #8B4513;
    }
    
    .btn-primary {
      background: #D2691E;
      color: white;
    }
    
    .btn-primary:hover {
      background: #FF7F50;
    }
    
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }
      
      .nav-links {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .user-menu {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class HeaderComponent {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getUserTypeLabel(userType: string): string {
    const labels = {
      client: 'Cliente',
      carpenter: 'Carpintero',
      admin: 'Administrador'
    };
    return labels[userType as keyof typeof labels] || '';
  }

  logout(): void {
    this.authService.logout();
  }
}