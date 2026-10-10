import { ClinicInfo } from '../types';

export const clinicData: ClinicInfo = {
  name: 'Vance Medical & Internal Health Clinic',
  tagline: 'Compassionate, evidence-based adult medical care',
  address: {
    street: '450 Medical Plaza Parkway',
    suite: 'Suite 320 (3rd Floor)',
    city: 'Metro City',
    state: 'CA',
    zip: '94102',
    country: 'United States',
  },
  phone: '(555) 234-8900',
  emergencyPhone: '911 (or local emergency room)',
  whatsapp: '+1 (555) 234-8901',
  email: 'care@vancemedicalclinic.com',
  operatingHours: [
    { day: 'Monday – Thursday', hours: '8:30 AM – 5:30 PM' },
    { day: 'Friday', hours: '8:30 AM – 4:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 1:00 PM (Scheduled visits)' },
    { day: 'Sunday', hours: 'Closed (On-call physician triage for urgent matters)', isEmergencyClosed: true },
  ],
  parkingInfo: 'Complimentary validated visitor parking in the underground Medical Center garage. Entrance on Plaza Parkway with direct elevator access to Suite 320.',
  publicTransit: 'Transit line 14 & Metro Rapid Station stops directly opposite Medical Plaza Main Entrance.',
  mapsUrl: 'https://maps.google.com/?q=450+Medical+Plaza+Parkway+Metro+City',
  coordinates: {
    lat: 37.7749,
    lng: -122.4194,
  },
};
