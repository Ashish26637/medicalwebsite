import React from 'react';
import { Award, Users, Stethoscope, Star } from 'lucide-react';
import { doctorData } from '../data/doctorData';

export const Stats: React.FC = () => {
  const stats = [
    {
      label: 'Years Experience',
      value: `${doctorData.experienceYears}+`,
      subtext: 'Clinical hospital & private practice',
      icon: Award,
    },
    {
      label: 'Patients Consulted',
      value: doctorData.consultationsCount,
      subtext: 'Longitudinal adult primary care',
      icon: Users,
    },
    {
      label: 'Medical Services',
      value: '20+',
      subtext: 'Preventive, chronic & diagnostic',
      icon: Stethoscope,
    },
    {
      label: 'Patient Rating',
      value: `${doctorData.rating} / 5.0`,
      subtext: `Based on ${doctorData.reviewsCount}+ verified reviews`,
      icon: Star,
    },
  ];

  return (
    <section className="bg-white py-10 sm:py-12 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start p-4 sm:p-5 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:border-teal-200 hover:bg-teal-50/20 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums font-mono">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
