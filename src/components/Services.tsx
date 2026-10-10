import React, { useState } from 'react';
import {
  Stethoscope,
  ShieldCheck,
  Activity,
  FileSearch,
  HeartPulse,
  UserCheck,
  Sparkles,
  ClipboardCheck,
  Clock,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { MedicalService } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalService, setActiveModalService] = useState<MedicalService | null>(null);

  const categories = ['All', 'General', 'Preventive', 'Specialist', 'Diagnostics'];

  const filteredServices =
    selectedCategory === 'All'
      ? servicesData
      : servicesData.filter((s) => s.category === selectedCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'FileSearch':
        return <FileSearch className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'ClipboardCheck':
      default:
        return <ClipboardCheck className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
            Comprehensive Clinical Practice
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Our Medical Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Delivering evidence-based clinical diagnostics, preventative wellness reviews, and tailored chronic care protocols with dedicated physician attention.
          </p>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6 p-1.5 bg-slate-200/70 rounded-xl max-w-lg mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between bg-white rounded-xl p-6 border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    {service.category} Care
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>{service.durationMinutes} min consultation</span>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex items-center justify-between gap-2 mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-teal-800 hover:bg-teal-50 rounded-md transition-colors"
                  title="Book this service"
                >
                  Book Slot
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Booking Prompt Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              Need a personalized clinical assessment or unsure which service fits?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Our front desk coordinator will happily guide you to the appropriate consultation schedule.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking('general-consultation')}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </button>
        </div>

      </div>

      {/* Modal View */}
      {activeModalService && (
        <ServiceDetailModal
          service={activeModalService}
          onClose={() => setActiveModalService(null)}
          onSelectAndBook={onOpenBooking}
        />
      )}
    </section>
  );
};
