import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h2>Crear Cuenta</h2>
          <p>Únete a CarpinteríaPro</p>
        </div>
        
        <form (ngSubmit)="onSubmit()" class="register-form">
          <div class="form-group">
            <label for="name">Nombre Completo</label>
            <input 
              type="text" 
              id="name" 
              [(ngModel)]="formData.name" 
              name="name" 
              required
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              [(ngModel)]="formData.email" 
              name="email" 
              required
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input 
              type="tel" 
              id="phone" 
              [(ngModel)]="formData.phone" 
              name="phone" 
              required
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label for="userType">Tipo de Usuario</label>
            <select 
              id="userType" 
              [(ngModel)]="formData.userType" 
              name="userType" 
              required
              class="form-select"
            >
              <option value="client">Cliente</option>
              <option value="carpenter">Carpintero</option>
            </select>
          </div>
          
          <div class="form-group" *ngIf="formData.userType === 'carpenter'">
            <label for="businessName">Nombre del Negocio</label>
            <input 
              type="text" 
              id="businessName" 
              [(ngModel)]="formData.businessName" 
              name="businessName"
              class="form-input"
            >
          </div>
          
          <div class="form-group" *ngIf="formData.userType === 'carpenter'">
            <label for="experience">Años de Experiencia</label>
            <input 
              type="number" 
              id="experience" 
              [(ngModel)]="formData.experience" 
              name="experience"
              min="0"
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              [(ngModel)]="formData.password" 
              name="password" 
              required
              class="form-input"
            >
          </div>
          
          <button type="submit" class="btn btn-primary" [disabled]="loading">
            {{ loading ? 'Creando Cuenta...' : 'Crear Cuenta' }}
          </button>
        </form>
        
        <div class="register-footer">
          <p>¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 100%);
      padding: 2rem 1rem;
    }
    
    .register-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      padding: 2rem;
      width: 100%;
      max-width: 500px;
    }
    
    .register-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .register-header h2 {
      color: #8B4513;
      margin-bottom: 0.5rem;
    }
    
    .register-header p {
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
    
    .register-footer {
      text-align: center;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }
    
    .register-footer a {
      color: #8B4513;
      text-decoration: none;
      font-weight: 500;
    }
    
    .register-footer a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    userType: 'client' as 'client' | 'carpenter',
    businessName: '',
    experience: 0,
    password: ''
  };
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.password) {
      return;
    }

    this.loading = true;
    this.authService.register(this.formData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Registration error:', error);
      }
    });
  }
}