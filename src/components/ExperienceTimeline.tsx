import React from 'react';
import { Calendar, GraduationCap, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { doctorData } from '../data/doctorData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
            Clinical Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Experience & Medical Qualifications
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            A continuous dedication to clinical mastery, advanced internal medicine diagnostics, and patient-first healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Timeline */}
          <div className="lg:col-span-8">
            <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-200/80 space-y-8 sm:space-y-10">
              {doctorData.educationTimeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-white border-4 border-teal-600 group-hover:border-teal-700 transition-colors" />

                  <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 hover:border-teal-200 hover:shadow-xs transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-teal-700 font-mono">
                        {item.year}
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{item.institution}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {item.role}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Board Certifications & Licensure Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Active Certifications
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                {doctorData.boardCertifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Clinical Memberships
                </h3>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <span className="text-teal-700 font-bold">·</span>
                  <span>Fellow, American College of Physicians (FACP)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-teal-700 font-bold">·</span>
                  <span>American Medical Association (AMA)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-teal-700 font-bold">·</span>
                  <span>Society of General Internal Medicine</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-teal-700 font-bold">·</span>
                  <span>Continuing Medical Education (CME) Certified</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-teal-950">
              <p className="font-semibold mb-1">Notice of Professional Transparency:</p>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                All credentials, hospital privileges, and state board licensing are verified and in active standing without restrictions.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
