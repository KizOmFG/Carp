export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  userType: 'client' | 'carpenter' | 'admin';
  profileImage?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Client extends User {
  address: string;
  preferredContact: 'phone' | 'email' | 'both';
}

export interface Carpenter extends User {
  businessName: string;
  specialties: string[];
  experience: number;
  location: string;
  rating: number;
  completedJobs: number;
  certification?: string;
  portfolio: string[];
  availability: boolean;
}

export interface Admin extends User {
  permissions: string[];
  lastLogin: Date;
}