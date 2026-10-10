import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Car,
  Bus,
  ExternalLink,
  Navigation,
  Building,
} from 'lucide-react';
import { clinicData } from '../data/clinicData';

export const ClinicLocation: React.FC = () => {
  return (
    <section id="location" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
            Facility & Consultations
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Visit Our Clinic
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Designed for calmness, privacy, and clinical efficiency. Convenient parking and public transit access in the heart of Metro City.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Clinic Atmosphere Photo & Navigation Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 aspect-[16/9]">
              <img
                src="/src/assets/images/clinic_interior_1791637190307.jpg"
                alt="Vance Medical Clinic modern reception and tranquil consultation suite"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent text-white">
                <p className="text-xs font-semibold">Tranquil Reception & Patient Lounge</p>
                <p className="text-[11px] text-slate-200">Suite 320 · Medical Plaza Parkway</p>
              </div>
            </div>

            {/* Parking & Accessibility Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Patient Parking
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {clinicData.parkingInfo}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Public Transit
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {clinicData.publicTransit}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Address, Hours, & Directions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Direct Contact Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {clinicData.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {clinicData.address.street}, {clinicData.address.suite}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {clinicData.address.city}, {clinicData.address.state} {clinicData.address.zip}
                  </p>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-2">
                <a
                  href={clinicData.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions (Google Maps)</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </a>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Clock className="w-4 h-4 text-teal-700" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Clinic Consultation Hours
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                {clinicData.operatingHours.map((sched, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0"
                  >
                    <span className="font-semibold text-slate-700">{sched.day}</span>
                    <span
                      className={`font-medium ${
                        sched.isEmergencyClosed ? 'text-amber-800' : 'text-slate-900'
                      }`}
                    >
                      {sched.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Strip */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <a
                href={`tel:${clinicData.phone}`}
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-teal-300 hover:bg-teal-50/20 text-slate-900 font-semibold flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 block font-normal">Direct Call</span>
                  <span className="truncate">{clinicData.phone}</span>
                </div>
              </a>

              <a
                href={`mailto:${clinicData.email}`}
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-teal-300 hover:bg-teal-50/20 text-slate-900 font-semibold flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-teal-700" />
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 block font-normal">Email Desk</span>
                  <span className="truncate">{clinicData.email}</span>
                </div>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
