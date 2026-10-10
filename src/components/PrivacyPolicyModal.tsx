import React from 'react';
import { X, Lock, ShieldCheck } from 'lucide-react';
import { clinicData } from '../data/clinicData';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <h3 id="privacy-title" className="text-base font-bold text-slate-900">
              Privacy Policy & Data Security Notice
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close privacy modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-950 font-medium">
            <strong>Demonstration Architecture Notice:</strong> This web application provides a frontend clinic scheduling workflow. In this prototype deployment, submitted demo records are stored locally in your browser's LocalStorage. Before deploying for real patient consultations, a HIPAA-compliant encrypted database backend with Business Associate Agreements (BAAs) must be configured.
          </div>

          <h4 className="font-bold text-slate-900 text-sm">
            1. Information We Collect
          </h4>
          <p>
            When utilizing our website, we may collect information you voluntarily provide, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details (such as full name, email address, telephone number)</li>
            <li>Consultation preferences (desired medical service, requested date, time slot)</li>
            <li>General descriptions of your reason for consultation or inquiries</li>
          </ul>

          <h4 className="font-bold text-slate-900 text-sm">
            2. How We Use Your Information
          </h4>
          <p>
            Collected details are used solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Review and coordinate clinical appointment bookings</li>
            <li>Respond to patient inquiries submitted via contact forms</li>
            <li>Provide relevant clinical preparation guidance prior to visits</li>
          </ul>

          <h4 className="font-bold text-slate-900 text-sm">
            3. Cookies & Local Storage
          </h4>
          <p>
            This application uses browser local storage strictly to preserve your demo booking state and preferences within your browser session. We do not engage in unauthorized third-party cross-site advertising tracking.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">
            4. Data Security & Protected Health Information (PHI)
          </h4>
          <p>
            We take patient data confidentiality seriously. For active clinical patients, all medical records, prescription histories, and laboratory diagnostics are handled through certified, encrypted electronic health records (EHR) platforms governed by federal healthcare privacy regulations.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">
            5. User Rights & Contact
          </h4>
          <p>
            You have the right to request deletion or modification of your contact information at any time. To exercise these rights or ask privacy questions, please contact our privacy liaison at{' '}
            <a href={`mailto:${clinicData.email}`} className="text-teal-700 underline font-semibold">
              {clinicData.email}
            </a>{' '}
            or call our clinic at {clinicData.phone}.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
          >
            Close Privacy Notice
          </button>
        </div>

      </div>
    </div>
  );
};
