import React, { useState } from 'react';
import { CheckCircle2, Award, Calendar, BookOpen, Stethoscope, ChevronRight } from 'lucide-react';
import { doctorData } from '../data/doctorData';

interface AboutDoctorProps {
  onOpenBooking: () => void;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({ onOpenBooking }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase (Images) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100">
              <img
                src={doctorData.consultationImage}
                alt={`Dr. ${doctorData.name} conducting patient consultation in exam room`}
                className="w-full h-80 sm:h-96 object-cover object-center"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-5">
                <span className="text-white text-xs font-medium bg-teal-900/80 backdrop-blur-xs px-3 py-1 rounded-md">
                  Patient Consultation & Examination Suite
                </span>
              </div>
            </div>

            {/* Quick credentials card below image */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-teal-700" />
                <span>Hospital & Academic Affiliations</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {doctorData.hospitalAffiliations.map((affil, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-700 font-bold">·</span>
                    <span>{affil}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy & Credentials Checklist */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
                Meet Your Physician
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                {doctorData.honorific} {doctorData.name}, MD
              </h2>
              <p className="text-sm sm:text-base text-teal-800 font-medium mt-1">
                {doctorData.specialization} · {doctorData.title}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {doctorData.bio}
            </p>

            {/* Clinical Philosophy Quote */}
            <div className="p-4 sm:p-5 rounded-xl bg-teal-50/60 border border-teal-100 text-slate-800">
              <p className="text-xs font-semibold text-teal-900 uppercase tracking-wider mb-1">
                Clinical Philosophy
              </p>
              <p className="text-xs sm:text-sm italic text-slate-700 leading-relaxed">
                "{doctorData.clinicalPhilosophy}"
              </p>
            </div>

            {/* Credentials Checklist */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Verified Medical Qualifications & Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {doctorData.qualifications.map((qual, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{qual}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas of Expertise Tags */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Clinical Focus Areas
              </h3>
              <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
                {doctorData.areasOfExpertise.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-[11px] font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200/80">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation</span>
              </button>

              <a
                href="#experience"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-teal-800 transition-colors"
              >
                <span>View Full Career Timeline</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
