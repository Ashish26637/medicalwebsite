import { Appointment, AppointmentStatus, ContactMessage } from '../types';
import { supabase } from '../lib/supabase';

const APPOINTMENTS_STORAGE_KEY = 'vance_clinic_appointments_v1';
const CONTACT_MESSAGES_STORAGE_KEY = 'vance_clinic_messages_v1';

// Seed demo appointments for initial display & offline fallback
const initialSeedAppointments: Appointment[] = [
  {
    id: 'APT-1082',
    patientName: 'Arthur Pendelton',
    phone: '(555) 782-9014',
    email: 'a.pendelton@example.com',
    serviceId: 'preventive-health',
    serviceName: 'Preventive Health & Annual Wellness',
    preferredDate: '2026-10-12',
    preferredTime: '09:00 AM',
    reasonForVisit: 'Annual routine health assessment and follow-up on lipid panel results from last year.',
    isFirstVisit: false,
    status: 'confirmed',
    createdAt: '2026-10-09T14:22:00Z',
    adminNotes: 'Fasting lipid panel ordered prior to consultation.',
  },
  {
    id: 'APT-1083',
    patientName: 'Clara Zimmerman',
    phone: '(555) 349-1102',
    email: 'clara.z@example.com',
    serviceId: 'chronic-disease-management',
    serviceName: 'Chronic Disease Management',
    preferredDate: '2026-10-13',
    preferredTime: '10:30 AM',
    reasonForVisit: 'Type 2 diabetes quarterly review and continuous glucose monitoring calibration.',
    isFirstVisit: false,
    status: 'requested',
    createdAt: '2026-10-10T08:15:00Z',
  },
  {
    id: 'APT-1084',
    patientName: 'Jonathan Hayes',
    phone: '(555) 912-4431',
    email: 'jhayes@example.org',
    serviceId: 'general-consultation',
    serviceName: 'General Medical Consultation',
    preferredDate: '2026-10-14',
    preferredTime: '02:00 PM',
    reasonForVisit: 'Persistent right shoulder pain and occasional nocturnal tingling for 3 weeks.',
    isFirstVisit: true,
    status: 'requested',
    createdAt: '2026-10-10T09:40:00Z',
  },
  {
    id: 'APT-1085',
    patientName: 'Beatrice Morales',
    phone: '(555) 604-8833',
    email: 'beatrice.m@example.com',
    serviceId: 'womens-health',
    serviceName: 'Women’s Health & Hormonal Care',
    preferredDate: '2026-10-15',
    preferredTime: '11:15 AM',
    reasonForVisit: 'Bone density scan discussion and perimenopausal symptom optimization.',
    isFirstVisit: false,
    status: 'confirmed',
    createdAt: '2026-10-08T16:05:00Z',
  },
  {
    id: 'APT-1081',
    patientName: 'Henry Vance Jr.',
    phone: '(555) 441-2098',
    email: 'henry.v@example.net',
    serviceId: 'diagnostic-consultation',
    serviceName: 'Diagnostic Consultation & Second Opinions',
    preferredDate: '2026-10-09',
    preferredTime: '03:30 PM',
    reasonForVisit: 'Second opinion on cardiology recommendations for borderline coronary calcium score.',
    isFirstVisit: true,
    status: 'completed',
    createdAt: '2026-10-05T11:20:00Z',
    adminNotes: 'Reviewed outside cardiac CTA. Follow-up in 6 months.',
  },
];

function getLocalAppointments(): Appointment[] {
  if (typeof window === 'undefined') return initialSeedAppointments;
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(initialSeedAppointments));
      return initialSeedAppointments;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialSeedAppointments;
  } catch (err) {
    console.error('Failed to read appointments from localStorage', err);
    return initialSeedAppointments;
  }
}

function saveLocalAppointments(appointments: Appointment[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  } catch (err) {
    console.error('Failed to save appointments to localStorage', err);
  }
}

function mapSupabaseRowToAppointment(row: any): Appointment {
  return {
    id: row.id,
    patientName: row.patient_name,
    phone: row.phone,
    email: row.email,
    dateOfBirth: row.date_of_birth || undefined,
    serviceId: row.service_id,
    serviceName: row.service_name,
    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time,
    reasonForVisit: row.reason_for_visit,
    isFirstVisit: row.is_first_visit ?? true,
    status: (row.status as AppointmentStatus) || 'requested',
    createdAt: row.created_at,
    adminNotes: row.admin_notes || undefined,
  };
}

export const appointmentService = {
  /**
   * Fetches appointments from Supabase table `appointments`.
   * Falls back to local storage if table doesn't exist yet or connection fails.
   */
  async getAppointments(): Promise<Appointment[]> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped = data.map(mapSupabaseRowToAppointment);
        saveLocalAppointments(mapped);
        return mapped;
      }

      if (error) {
        console.warn('Supabase query notice (using local cache):', error.message);
      }
    } catch (err) {
      console.warn('Supabase connection error (using local cache):', err);
    }

    // Fallback to local storage
    return getLocalAppointments();
  },

  /**
   * Creates an appointment:
   * 1. Inserts into Supabase `appointments` table
   * 2. Persists to localStorage for offline cache
   */
  async createAppointment(
    data: Omit<Appointment, 'id' | 'status' | 'createdAt'>
  ): Promise<Appointment> {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const id = `APT-${randomSuffix}`;
    const createdAt = new Date().toISOString();

    const newAppointment: Appointment = {
      ...data,
      id,
      status: 'requested',
      createdAt,
    };

    // 1. Save to local storage immediately
    const local = getLocalAppointments();
    local.unshift(newAppointment);
    saveLocalAppointments(local);

    // 2. Insert into Supabase
    try {
      const { error } = await supabase.from('appointments').insert([
        {
          id: newAppointment.id,
          patient_name: newAppointment.patientName,
          phone: newAppointment.phone,
          email: newAppointment.email,
          date_of_birth: newAppointment.dateOfBirth || null,
          service_id: newAppointment.serviceId,
          service_name: newAppointment.serviceName,
          preferred_date: newAppointment.preferredDate,
          preferred_time: newAppointment.preferredTime,
          reason_for_visit: newAppointment.reasonForVisit,
          is_first_visit: newAppointment.isFirstVisit,
          status: newAppointment.status,
          admin_notes: newAppointment.adminNotes || null,
          created_at: newAppointment.createdAt,
        },
      ]);

      if (error) {
        console.warn('Saved to local storage, but Supabase insert returned:', error.message);
      } else {
        console.log('Successfully saved appointment to Supabase:', newAppointment.id);
      }
    } catch (err) {
      console.warn('Network issue writing to Supabase (saved locally):', err);
    }

    return newAppointment;
  },

  /**
   * Updates an appointment status (e.g. requested -> confirmed / completed / cancelled)
   */
  async updateAppointmentStatus(
    id: string,
    status: AppointmentStatus,
    adminNotes?: string
  ): Promise<Appointment | null> {
    // Update local storage
    const local = getLocalAppointments();
    const index = local.findIndex((apt) => apt.id === id);
    if (index !== -1) {
      local[index] = {
        ...local[index],
        status,
        adminNotes: adminNotes !== undefined ? adminNotes : local[index].adminNotes,
      };
      saveLocalAppointments(local);
    }

    // Update in Supabase
    try {
      const updatePayload: any = { status };
      if (adminNotes !== undefined) {
        updatePayload.admin_notes = adminNotes;
      }

      const { error } = await supabase
        .from('appointments')
        .update(updatePayload)
        .eq('id', id);

      if (error) {
        console.warn('Supabase status update notice:', error.message);
      }
    } catch (err) {
      console.warn('Supabase update failed:', err);
    }

    return index !== -1 ? local[index] : null;
  },

  /**
   * Deletes an appointment
   */
  async deleteAppointment(id: string): Promise<boolean> {
    // Delete local
    const local = getLocalAppointments();
    const filtered = local.filter((apt) => apt.id !== id);
    saveLocalAppointments(filtered);

    // Delete in Supabase
    try {
      await supabase.from('appointments').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }

    return true;
  },

  /**
   * Resets local demo data
   */
  async resetToDemoData(): Promise<Appointment[]> {
    saveLocalAppointments(initialSeedAppointments);
    return initialSeedAppointments;
  },

  /**
   * Sends contact form message to Supabase `contact_messages` table and local storage
   */
  async sendContactMessage(
    data: Omit<ContactMessage, 'id' | 'createdAt'>
  ): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      ...data,
      id: `MSG-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    // Save locally
    try {
      const raw = localStorage.getItem(CONTACT_MESSAGES_STORAGE_KEY);
      const messages: ContactMessage[] = raw ? JSON.parse(raw) : [];
      messages.unshift(newMessage);
      localStorage.setItem(CONTACT_MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }

    // Save in Supabase
    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          id: newMessage.id,
          name: newMessage.name,
          email: newMessage.email,
          phone: newMessage.phone,
          subject: newMessage.subject,
          message: newMessage.message,
          created_at: newMessage.createdAt,
        },
      ]);
      if (error) {
        console.warn('Supabase message insert notice:', error.message);
      }
    } catch (err) {
      console.warn('Supabase message error:', err);
    }

    return newMessage;
  },
};
