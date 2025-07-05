import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceRequest, Proposal } from '../models/service-request.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  private requestsSubject = new BehaviorSubject<ServiceRequest[]>([]);
  public requests$ = this.requestsSubject.asObservable();

  constructor() {
    // Initialize with mock data
    this.loadMockData();
  }

  private loadMockData(): void {
    const mockRequests: ServiceRequest[] = [
      {
        id: '1',
        clientId: '1',
        title: 'Mesa de comedor personalizada',
        description: 'Necesito una mesa de comedor para 6 personas, madera de roble',
        category: 'muebles',
        budget: { min: 500, max: 1000, currency: 'USD' },
        location: 'Ciudad de México',
        urgency: 'media',
        status: 'pending',
        createdAt: new Date(),
        proposals: []
      },
      {
        id: '2',
        clientId: '2',
        title: 'Reparación de armario',
        description: 'Armario con puerta rota, necesita reparación urgente',
        category: 'reparacion',
        budget: { min: 100, max: 300, currency: 'USD' },
        location: 'Guadalajara',
        urgency: 'alta',
        status: 'pending',
        createdAt: new Date(),
        proposals: []
      }
    ];
    
    this.requestsSubject.next(mockRequests);
  }

  getAllRequests(): Observable<ServiceRequest[]> {
    return this.requests$;
  }

  getRequestById(id: string): Observable<ServiceRequest | undefined> {
    return new Observable(observer => {
      const request = this.requestsSubject.value.find(r => r.id === id);
      observer.next(request);
      observer.complete();
    });
  }

  createRequest(request: Omit<ServiceRequest, 'id' | 'createdAt' | 'proposals'>): Observable<ServiceRequest> {
    return new Observable(observer => {
      const newRequest: ServiceRequest = {
        ...request,
        id: Date.now().toString(),
        createdAt: new Date(),
        proposals: []
      };
      
      const currentRequests = this.requestsSubject.value;
      this.requestsSubject.next([...currentRequests, newRequest]);
      observer.next(newRequest);
      observer.complete();
    });
  }

  submitProposal(requestId: string, proposal: Omit<Proposal, 'id' | 'createdAt'>): Observable<Proposal> {
    return new Observable(observer => {
      const newProposal: Proposal = {
        ...proposal,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      
      const requests = this.requestsSubject.value;
      const requestIndex = requests.findIndex(r => r.id === requestId);
      
      if (requestIndex !== -1) {
        requests[requestIndex].proposals.push(newProposal);
        this.requestsSubject.next([...requests]);
      }
      
      observer.next(newProposal);
      observer.complete();
    });
  }
}