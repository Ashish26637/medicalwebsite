import React, { useState } from 'react';
import { AlertCircle, Phone, X } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export const EmergencyBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Medical Emergency Notice"
      className="bg-amber-50 border-b border-amber-200/80 px-4 py-2.5 text-xs text-amber-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-amber-900">Medical Emergency?</strong> This online service is for non-urgent consultations only. In a life-threatening emergency, please call{' '}
            <a href="tel:911" className="font-bold underline text-amber-900 hover:text-amber-950">
              {clinicData.emergencyPhone}
            </a>{' '}
            or visit the nearest emergency room immediately.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:911"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-amber-200/70 hover:bg-amber-200 text-amber-900 rounded transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>Call 911</span>
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-amber-700 hover:text-amber-950 rounded transition-colors"
            aria-label="Dismiss emergency banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
