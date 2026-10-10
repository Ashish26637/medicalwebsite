import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Heart, Sparkles, Clock, Star } from 'lucide-react';
import { doctorData } from '../data/doctorData';

interface HeroProps {
  onOpenBooking: () => void;
  onViewServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onViewServices }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Small Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/70 text-xs font-semibold text-teal-800 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
              <span>Trusted Medical Care · Internal Medicine & Wellness</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Expert Healthcare With a <span className="text-teal-700">Personal Touch</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Providing compassionate, evidence-based medical care focused on your health, comfort, and long-term wellbeing. Unhurried consultations designed around your unique health journey.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={onViewServices}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-teal-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <span>View Services</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Trust Indicators Grid */}
            <div className="pt-4 border-t border-slate-200/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">Experienced Doctor</h4>
                    <p className="text-[11px] text-slate-500">Board-certified physician</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">Patient-Centered</h4>
                    <p className="text-[11px] text-slate-500">Unhurried care plans</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">Modern Treatment</h4>
                    <p className="text-[11px] text-slate-500">Evidence-based science</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">Easy Booking</h4>
                    <p className="text-[11px] text-slate-500">Instant online request</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Doctor Portrait & Floating Stat Cards */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Image Container with Framing and Fallback */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 aspect-[3/4]">
                <img
                  src={doctorData.imagePath}
                  alt={`Dr. ${doctorData.name}, Senior Physician in Internal Medicine`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Graceful fallback if image path ever fails
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Subtle Gradient Scrim at bottom of photo for text contrast */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-5">
                  <div className="text-white">
                    <p className="text-sm font-semibold tracking-wide">
                      {doctorData.honorific} {doctorData.name}, MD
                    </p>
                    <p className="text-xs text-slate-200">
                      {doctorData.specialization} · ABIM Board Certified
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Information Card 1: Experience */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-3.5 shadow-lg border border-slate-200/90 flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                  12+
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Years Clinical Practice</p>
                  <p className="text-[11px] text-slate-500">Hospital & Outpatient</p>
                </div>
              </div>

              {/* Floating Information Card 2: Consultations & Rating */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-3.5 shadow-lg border border-slate-200/90 flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900">4.9 / 5.0 Rating</span>
                    <span className="text-[10px] text-slate-400">({doctorData.reviewsCount}+)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{doctorData.consultationsCount} Patients Consulted</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
