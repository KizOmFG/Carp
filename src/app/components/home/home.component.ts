import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">Conecta con los Mejores Carpinteros</h1>
          <p class="hero-subtitle">
            Encuentra profesionales calificados para todos tus proyectos de carpintería.
            Desde muebles a medida hasta reparaciones especializadas.
          </p>
          <div class="hero-buttons">
            <a routerLink="/register" class="btn btn-primary">Comenzar Ahora</a>
            <a routerLink="/browse-jobs" class="btn btn-secondary">Explorar Servicios</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="https://images.pexels.com/photos/5974266/pexels-photo-5974266.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Carpintero trabajando">
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <h2>¿Cómo Funciona?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">📝</div>
              <h3>Publica tu Solicitud</h3>
              <p>Describe tu proyecto, establece tu presupuesto y recibe propuestas de carpinteros calificados.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔍</div>
              <h3>Compara Propuestas</h3>
              <p>Revisa perfiles, calificaciones y propuestas. Elige al profesional que mejor se adapte a tus necesidades.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">✅</div>
              <h3>Trabajo Completado</h3>
              <p>Colabora con tu carpintero elegido y recibe tu proyecto terminado con garantía de calidad.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="services">
        <div class="container">
          <h2>Servicios Disponibles</h2>
          <div class="services-grid">
            <div class="service-card">
              <img src="https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Muebles a medida">
              <h3>Muebles a Medida</h3>
              <p>Mesas, sillas, armarios y muebles personalizados para tu hogar u oficina.</p>
            </div>
            <div class="service-card">
              <img src="https://images.pexels.com/photos/5974028/pexels-photo-5974028.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Reparaciones">
              <h3>Reparaciones</h3>
              <p>Restauración y reparación de muebles existentes con técnicas profesionales.</p>
            </div>
            <div class="service-card">
              <img src="https://images.pexels.com/photos/6474351/pexels-photo-6474351.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Decoración">
              <h3>Decoración</h3>
              <p>Elementos decorativos en madera para personalizar tus espacios.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <h2>¿Listo para comenzar tu proyecto?</h2>
          <p>Únete a miles de clientes satisfechos que han encontrado el carpintero perfecto</p>
          <a routerLink="/register" class="btn btn-primary">Registrarse Gratis</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      overflow-x: hidden;
    }
    
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 100%);
      padding: 2rem;
    }
    
    .hero-content {
      flex: 1;
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }
    
    .hero-title {
      font-size: 3.5rem;
      color: #8B4513;
      margin-bottom: 1rem;
      font-weight: bold;
    }
    
    .hero-subtitle {
      font-size: 1.3rem;
      color: #666;
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    
    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .hero-image {
      flex: 1;
      max-width: 500px;
      margin: 2rem auto 0;
    }
    
    .hero-image img {
      width: 100%;
      height: auto;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .features {
      padding: 5rem 0;
      background: white;
    }
    
    .features h2 {
      text-align: center;
      font-size: 2.5rem;
      color: #8B4513;
      margin-bottom: 3rem;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 3rem;
    }
    
    .feature-card {
      text-align: center;
      padding: 2rem;
      border-radius: 15px;
      background: #f8f9fa;
      transition: transform 0.3s;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
    }
    
    .feature-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    .feature-card h3 {
      color: #8B4513;
      margin-bottom: 1rem;
    }
    
    .feature-card p {
      color: #666;
      line-height: 1.6;
    }
    
    .services {
      padding: 5rem 0;
      background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 100%);
    }
    
    .services h2 {
      text-align: center;
      font-size: 2.5rem;
      color: #8B4513;
      margin-bottom: 3rem;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }
    
    .service-card {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    
    .service-card:hover {
      transform: translateY(-5px);
    }
    
    .service-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    
    .service-card h3 {
      color: #8B4513;
      margin: 1rem;
    }
    
    .service-card p {
      color: #666;
      margin: 0 1rem 1rem;
      line-height: 1.6;
    }
    
    .cta {
      padding: 5rem 0;
      background: #8B4513;
      color: white;
      text-align: center;
    }
    
    .cta h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .cta p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    
    .btn {
      display: inline-block;
      padding: 1rem 2rem;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s;
    }
    
    .btn-primary {
      background: #D2691E;
      color: white;
    }
    
    .btn-primary:hover {
      background: #FF7F50;
      transform: translateY(-2px);
    }
    
    .btn-secondary {
      background: transparent;
      color: #8B4513;
      border: 2px solid #8B4513;
    }
    
    .btn-secondary:hover {
      background: #8B4513;
      color: white;
    }
    
    @media (max-width: 768px) {
      .hero {
        flex-direction: column;
        text-align: center;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .btn {
        width: 100%;
        max-width: 300px;
      }
      
      .features-grid,
      .services-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
}