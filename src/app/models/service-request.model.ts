export interface ServiceRequest {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: 'muebles' | 'reparacion' | 'decoracion' | 'otro';
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  urgency: 'baja' | 'media' | 'alta';
  images?: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  deadline?: Date;
  proposals: Proposal[];
}

export interface Proposal {
  id: string;
  carpenterId: string;
  serviceRequestId: string;
  price: number;
  description: string;
  deliveryTime: number;
  materials: string[];
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Claim {
  id: string;
  requestId: string;
  complainantId: string;
  respondentId: string;
  type: 'quality' | 'payment' | 'communication' | 'other';
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  createdAt: Date;
  resolution?: string;
}