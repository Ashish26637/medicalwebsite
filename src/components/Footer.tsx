import React from 'react';
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  ArrowUp,
  Heart,
} from 'lucide-react';
import { doctorData } from '../data/doctorData';
import { clinicData } from '../data/clinicData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenDisclaimer: () => void;
  onOpenPrivacy: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenDisclaimer,
  onOpenPrivacy,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                <Stethoscope className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {doctorData.honorific} {doctorData.name}, MD
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Compassionate, evidence-based adult medical care focused on your health, comfort, and long-term wellbeing. Unhurried clinical partnerships in Metro City.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-600 rounded-lg shadow-sm transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-teal-400 transition-colors">
                  About the Doctor
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Medical Services
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-teal-400 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-teal-400 transition-colors">
                  Qualifications & Timeline
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-teal-400 transition-colors">
                  Patient Reviews
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-teal-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-teal-400 transition-colors">
                  Clinic Location
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Medical Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Care Programs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  General Medical Consultation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Preventive Health & Annual Exam
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Chronic Disease Management
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Diagnostic Second Opinions
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Women's & Men's Health Screening
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Metabolic & Longevity Protocol
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Clinic Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  {clinicData.address.street}, {clinicData.address.suite}, {clinicData.address.city}, {clinicData.address.state} {clinicData.address.zip}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${clinicData.phone}`} className="hover:text-white transition-colors">
                  {clinicData.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${clinicData.email}`} className="hover:text-white transition-colors truncate">
                  {clinicData.email}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                <span>Doctor Admin Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            <p>
              © 2026 Dr. {doctorData.name}, MD. Vance Medical Clinic. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              General informational web application. For medical emergencies, always call 911 immediately.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={onOpenDisclaimer}
              className="hover:text-teal-400 transition-colors underline"
            >
              Medical Disclaimer
            </button>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-teal-400 transition-colors underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors ml-2"
              title="Back to top"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
