import React, { useState } from 'react';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { AboutDoctor } from './components/AboutDoctor';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { AppointmentBooking } from './components/AppointmentBooking';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { ClinicLocation } from './components/ClinicLocation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DoctorAdminDashboard } from './components/DoctorAdminDashboard';
import { MedicalDisclaimerModal } from './components/MedicalDisclaimerModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { ToastNotification } from './components/ToastNotification';
import { Appointment } from './types';

export default function App() {
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Toast notifications state
  const [toast, setToast] = useState<{
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setToast({ type, message });
  };

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForBooking(serviceId);
    }
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAppointmentCreated = (appointment: Appointment) => {
    showToast(
      'success',
      `Appointment request ${appointment.id} submitted for ${appointment.patientName}!`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      
      {/* 1. Emergency Notice Top Banner */}
      <EmergencyBanner />

      {/* 2. Sticky Responsive Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onViewServices={handleViewServices}
        />

        {/* 4. Statistics & Trust Strip */}
        <Stats />

        {/* 5. About the Doctor Section */}
        <AboutDoctor onOpenBooking={() => handleOpenBooking()} />

        {/* 6. Medical Services Section */}
        <Services onOpenBooking={handleOpenBooking} />

        {/* 7. Why Patients Choose Us */}
        <WhyChooseUs />

        {/* 8. Qualifications & Experience Timeline */}
        <ExperienceTimeline />

        {/* 9. Interactive 5-Step Appointment Booking */}
        <AppointmentBooking
          initialServiceId={selectedServiceForBooking}
          onAppointmentBooked={handleAppointmentCreated}
        />

        {/* 10. Patient Testimonials */}
        <Testimonials />

        {/* 11. FAQ Accordion Section */}
        <FAQSection />

        {/* 12. Clinic Location & Hours Section */}
        <ClinicLocation />

        {/* 13. Direct Contact Section */}
        <ContactSection />
      </main>

      {/* 14. Comprehensive Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals & Overlays */}
      <DoctorAdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onNotification={(type, msg) => showToast(type, msg)}
      />

      <MedicalDisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Real-time Feedback Toast */}
      {toast && (
        <ToastNotification
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}
