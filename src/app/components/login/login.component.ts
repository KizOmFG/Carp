import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Accede a tu cuenta en CarpinteríaPro</p>
        </div>
        
        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              [(ngModel)]="email" 
              name="email" 
              required
              class="form-input"
            >
          </div>
          
          <div class="google-signin-section">
            <div class="divider">
              <span>o</span>
            </div>
            <button type="button" class="google-signin-btn" (click)="signInWithGoogle()">
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" class="google-icon">
              Continuar con Google
            </button>
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              [(ngModel)]="password" 
              name="password" 
              required
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label for="userType">Tipo de Usuario</label>
            <select 
              id="userType" 
              [(ngModel)]="userType" 
              name="userType" 
              required
              class="form-select"
            >
              <option value="client">Cliente</option>
              <option value="carpenter">Carpintero</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          
          <button type="submit" class="btn btn-primary" [disabled]="loading">
            {{ loading ? 'Iniciando Sesión...' : 'Iniciar Sesión' }}
          </button>
        </form>
        
        <div class="login-footer">
          <p>¿No tienes cuenta? <a routerLink="/register">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 100%);
      padding: 2rem 1rem;
    }
    
    .login-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      padding: 2rem;
      width: 100%;
      max-width: 400px;
      position: relative;
    }
    
    .google-signin-section {
      margin: 1.5rem 0;
    }
    
    .divider {
      text-align: center;
      margin: 1rem 0;
      position: relative;
    }
    
    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #ddd;
    }
    
    .divider span {
      background: white;
      padding: 0 1rem;
      color: #666;
    }
    
    .google-signin-btn {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      background: white;
      color: #333;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s;
      margin-bottom: 1rem;
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .google-signin-btn:hover {
      border-color: #4285f4;
      box-shadow: 0 2px 4px rgba(66, 133, 244, 0.2);
    }
    
    .google-icon {
      width: 20px;
      height: 20px;
    }
    
    .login-header h2 {
      color: #8B4513;
      margin-bottom: 0.5rem;
    }
    
    .login-header p {
      color: #666;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }
    
    .form-input,
    .form-select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    .form-input:focus,
    .form-select:focus {
      outline: none;
      border-color: #8B4513;
    }
    
    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .btn-primary {
      background: #8B4513;
      color: white;
    }
    
    .btn-primary:hover:not(:disabled) {
      background: #A0522D;
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .login-footer {
      text-align: center;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }
    
    .login-footer a {
      color: #8B4513;
      text-decoration: none;
      font-weight: 500;
    }
    
    .login-footer a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  userType: 'client' | 'carpenter' | 'admin' = 'client';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      return;
    }

    this.loading = true;
    this.authService.login(this.email, this.password, this.userType).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Login error:', error);
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }
}