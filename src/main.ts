import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HeaderComponent } from './app/components/header/header.component';
import { AuthService } from './app/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <div class="app">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>CarpinteríaPro</h3>
              <p>Conectando clientes con los mejores carpinteros profesionales.</p>
            </div>
            <div class="footer-section">
              <h4>Enlaces</h4>
              <ul>
                <li><a href="#" (click)="navigateToSection('services')">Servicios</a></li>
                <li><a href="#" (click)="navigateToSection('about')">Acerca de</a></li>
                <li><a href="#" (click)="navigateToSection('contact')">Contacto</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Soporte</h4>
              <ul>
                <li><a href="#" (click)="navigateToSection('help')">Centro de Ayuda</a></li>
                <li><a href="#" (click)="navigateToSection('claims')">Reclamos</a></li>
                <li><a href="#" (click)="navigateToSection('terms')">Términos</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 CarpinteríaPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
    }
    
    .footer {
      background: #333;
      color: white;
      padding: 3rem 0 1rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .footer-section h3,
    .footer-section h4 {
      color: #D2691E;
      margin-bottom: 1rem;
    }
    
    .footer-section ul {
      list-style: none;
      padding: 0;
    }
    
    .footer-section li {
      margin-bottom: 0.5rem;
    }
    
    .footer-section a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .footer-section a:hover {
      color: #D2691E;
    }
    
    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid #555;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
  `]
})
export class App {
  constructor(private router: Router) {}

  navigateToSection(section: string): void {
    // This would typically scroll to a section or navigate to a specific page
    console.log(`Navigating to ${section}`);
  }
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    AuthService
  ]
});