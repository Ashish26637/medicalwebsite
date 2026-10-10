export type AppointmentStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled';

export interface DoctorProfile {
  name: string;
  honorific: string;
  specialization: string;
  title: string;
  experienceYears: number;
  consultationsCount: string;
  rating: number;
  reviewsCount: number;
  qualifications: string[];
  boardCertifications: string[];
  languages: string[];
  bio: string;
  clinicalPhilosophy: string;
  areasOfExpertise: string[];
  educationTimeline: {
    year: string;
    role: string;
    institution: string;
    description: string;
  }[];
  hospitalAffiliations: string[];
  imagePath: string;
  consultationImage: string;
  clinicImage: string;
}

export interface MedicalService {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  durationMinutes: number;
  recommendedFor: string[];
  preparationNotice?: string;
  category: 'General' | 'Specialist' | 'Preventive' | 'Diagnostics';
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  dateOfBirth?: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // e.g. "09:30 AM"
  reasonForVisit: string;
  isFirstVisit: boolean;
  status: AppointmentStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatmentType: string;
  rating: number;
  comment: string;
  date: string;
  verifiedVisit: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Appointments' | 'Consultation' | 'Billing' | 'Clinic Visits';
}

export interface ClinicHours {
  day: string;
  hours: string;
  isEmergencyClosed?: boolean;
}

export interface ClinicInfo {
  name: string;
  tagline: string;
  address: {
    street: string;
    suite: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  phone: string;
  emergencyPhone: string;
  whatsapp: string;
  email: string;
  operatingHours: ClinicHours[];
  parkingInfo: string;
  publicTransit: string;
  mapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface NotificationToast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}
