import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ServiceRequestService } from '../../services/service-request.service';
import { User } from '../../models/user.model';
import { ServiceRequest } from '../../models/service-request.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Bienvenido, {{ currentUser?.name }}</h1>
        <p>{{ getDashboardMessage() }}</p>
      </div>
      
      <div class="dashboard-content">
        <!-- Client Dashboard -->
        <div *ngIf="currentUser?.userType === 'client'" class="client-dashboard">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📋</div>
              <div class="stat-info">
                <h3>{{ activeRequests }}</h3>
                <p>Solicitudes Activas</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-info">
                <h3>{{ completedRequests }}</h3>
                <p>Trabajos Completados</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">💰</div>
              <div class="stat-info">
                <h3>$2,500</h3>
                <p>Invertido Total</p>
              </div>
            </div>
          </div>
          
          <div class="action-buttons">
            <a routerLink="/create-request" class="btn btn-primary">
              <span>+</span> Nueva Solicitud
            </a>
            <a routerLink="/requests" class="btn btn-secondary">
              Ver Mis Solicitudes
            </a>
          </div>
        </div>
        
        <!-- Carpenter Dashboard -->
        <div *ngIf="currentUser?.userType === 'carpenter'" class="carpenter-dashboard">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">🔨</div>
              <div class="stat-info">
                <h3>{{ availableJobs }}</h3>
                <p>Trabajos Disponibles</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-info">
                <h3>{{ myProposals }}</h3>
                <p>Propuestas Enviadas</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⭐</div>
              <div class="stat-info">
                <h3>4.8</h3>
                <p>Calificación</p>
              </div>
            </div>
          </div>
          
          <div class="action-buttons">
            <a routerLink="/browse-jobs" class="btn btn-primary">
              Buscar Trabajos
            </a>
            <a routerLink="/my-proposals" class="btn btn-secondary">
              Mis Propuestas
            </a>
          </div>
        </div>
        
        <!-- Admin Dashboard -->
        <div *ngIf="currentUser?.userType === 'admin'" class="admin-dashboard">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-info">
                <h3>1,234</h3>
                <p>Usuarios Total</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🔧</div>
              <div class="stat-info">
                <h3>567</h3>
                <p>Carpinteros Activos</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⚠️</div>
              <div class="stat-info">
                <h3>23</h3>
                <p>Reclamos Abiertos</p>
              </div>
            </div>
          </div>
          
          <div class="action-buttons">
            <a routerLink="/admin/users" class="btn btn-primary">
              Gestionar Usuarios
            </a>
            <a routerLink="/admin/claims" class="btn btn-secondary">
              Ver Reclamos
            </a>
          </div>
        </div>
        
        <div class="recent-activity">
          <h2>Actividad Reciente</h2>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">📝</div>
              <div class="activity-content">
                <h4>Nueva solicitud creada</h4>
                <p>Mesa de comedor personalizada</p>
                <span class="activity-time">Hace 2 horas</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">💬</div>
              <div class="activity-content">
                <h4>Nueva propuesta recibida</h4>
                <p>Reparación de armario - $250</p>
                <span class="activity-time">Hace 5 horas</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">✅</div>
              <div class="activity-content">
                <h4>Trabajo completado</h4>
                <p>Estantería empotrada</p>
                <span class="activity-time">Hace 1 día</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    
    .dashboard-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .dashboard-header h1 {
      color: #8B4513;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    
    .dashboard-header p {
      color: #666;
      font-size: 1.2rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }
    
    .stat-card {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 1.5rem;
      transition: transform 0.3s;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
    }
    
    .stat-icon {
      font-size: 3rem;
      background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .stat-info h3 {
      font-size: 2rem;
      color: #8B4513;
      margin-bottom: 0.5rem;
    }
    
    .stat-info p {
      color: #666;
      font-size: 1rem;
    }
    
    .action-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }
    
    .btn {
      padding: 1rem 2rem;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .btn-primary {
      background: #8B4513;
      color: white;
    }
    
    .btn-primary:hover {
      background: #A0522D;
      transform: translateY(-2px);
    }
    
    .btn-secondary {
      background: #D2691E;
      color: white;
    }
    
    .btn-secondary:hover {
      background: #FF7F50;
      transform: translateY(-2px);
    }
    
    .recent-activity {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .recent-activity h2 {
      color: #8B4513;
      margin-bottom: 2rem;
    }
    
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 10px;
      background: #f8f9fa;
      transition: background-color 0.3s;
    }
    
    .activity-item:hover {
      background: #e9ecef;
    }
    
    .activity-icon {
      font-size: 1.5rem;
      background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .activity-content {
      flex: 1;
    }
    
    .activity-content h4 {
      color: #333;
      margin-bottom: 0.25rem;
    }
    
    .activity-content p {
      color: #666;
      margin-bottom: 0.25rem;
    }
    
    .activity-time {
      color: #999;
      font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
      .dashboard-header h1 {
        font-size: 2rem;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .action-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .btn {
        width: 100%;
        max-width: 300px;
        justify-content: center;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  activeRequests = 0;
  completedRequests = 0;
  availableJobs = 0;
  myProposals = 0;

  constructor(
    private authService: AuthService,
    private serviceRequestService: ServiceRequestService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.serviceRequestService.getAllRequests().subscribe(requests => {
      this.activeRequests = requests.filter(r => r.status === 'pending').length;
      this.completedRequests = requests.filter(r => r.status === 'completed').length;
      this.availableJobs = requests.length;
      this.myProposals = requests.reduce((total, r) => total + r.proposals.length, 0);
    });
  }

  getDashboardMessage(): string {
    if (!this.currentUser) return '';
    
    const messages = {
      client: 'Gestiona tus solicitudes de carpintería y encuentra el mejor profesional',
      carpenter: 'Encuentra nuevos trabajos y gestiona tus propuestas',
      admin: 'Panel de administración del sistema'
    };
    
    return messages[this.currentUser.userType] || '';
  }
}