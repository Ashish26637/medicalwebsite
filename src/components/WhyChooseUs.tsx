import React from 'react';
import {
  Award,
  Clock,
  HeartHandshake,
  CheckCircle2,
  FileText,
  CalendarCheck,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Experienced Medical Leadership',
      description: 'Over 12 years of clinical excellence in acute hospital settings and private outpatient internal medicine.',
    },
    {
      icon: Clock,
      title: 'Unhurried, 45-Minute Appointments',
      description: 'We prioritize dedicated face-to-face physician time to listen, investigate thoroughly, and answer all questions.',
    },
    {
      icon: HeartHandshake,
      title: 'Personalized Clinical Care',
      description: 'Treatment plans crafted around your specific lifestyle, biomarkers, genetic risk factors, and long-term vitality goals.',
    },
    {
      icon: FileText,
      title: 'Transparent Decision-Making',
      description: 'Clear explanations of test results, medication choices, and diagnostic pathways with zero medical jargon.',
    },
    {
      icon: CalendarCheck,
      title: 'Effortless Appointment Scheduling',
      description: 'Quick online booking requests, respectful punctuality, and responsive patient communication coordinators.',
    },
    {
      icon: CheckCircle2,
      title: 'Evidence-Based Practice',
      description: 'Every recommendation is backed by peer-reviewed clinical guidelines, continuous medical education, and diagnostic rigour.',
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
            Patient-Centered Commitment
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Why Patients Choose Us
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            We hold ourselves to the highest standards of diagnostic precision, patient comfort, and respectful continuity of care.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="flex flex-col p-6 rounded-xl bg-slate-50/60 border border-slate-200/70 hover:border-teal-200 hover:bg-teal-50/20 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
