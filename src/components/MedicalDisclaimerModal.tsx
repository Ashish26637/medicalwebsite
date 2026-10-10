import React from 'react';
import { X, AlertTriangle, ShieldCheck } from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { doctorData } from '../data/doctorData';

interface MedicalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicalDisclaimerModal: React.FC<MedicalDisclaimerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 id="disclaimer-title" className="text-base font-bold text-slate-900">
              Medical & Clinical Disclaimer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close disclaimer modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
            <strong>Emergency Medical Warning:</strong> If you are experiencing a life-threatening medical emergency, call 911 (or your local emergency services) or go to the nearest hospital emergency room immediately. Do not rely on this website or electronic communication for acute emergency medical assistance.
          </div>

          <h4 className="font-bold text-slate-900 text-sm">
            1. Informational Purposes Only
          </h4>
          <p>
            The content, articles, service descriptions, and materials presented on this website are provided solely for general informational and educational purposes. Nothing contained on this site is intended to be used as medical advice, clinical diagnosis, or prescriptive medical treatment.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">
            2. No Physician-Patient Relationship Created via Web Browsing
          </h4>
          <p>
            Viewing this website, submitting an appointment request, or contacting {clinicData.name} through electronic forms does not establish a formal physician-patient relationship with Dr. {doctorData.name}, MD. A formal physician-patient relationship is only established after an in-person or authorized clinical consultation and mutually executed clinical intake agreement.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">
            3. Always Consult a Qualified Healthcare Professional
          </h4>
          <p>
            Always seek the advice of your personal physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay seeking treatment because of something you have read on this website.
          </p>

          <h4 className="font-bold text-slate-900 text-sm">
            4. Scope of Online Appointment Requests
          </h4>
          <p>
            Submissions through the appointment scheduling tool constitute a preliminary scheduling request and do not guarantee appointment availability or immediate clinical review.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
          >
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
};
