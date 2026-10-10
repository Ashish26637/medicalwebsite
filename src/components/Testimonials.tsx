import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';

export const Testimonials: React.FC = () => {
  const [mobileIndex, setMobileIndex] = useState(0);

  const handlePrev = () => {
    setMobileIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setMobileIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
            Patient Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Verified Patient Reviews
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Read reflections from patients who have partnered with Dr. Vance for their long-term health, diagnostics, and preventative care.
          </p>
        </div>

        {/* Desktop View: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 hover:border-teal-200 hover:shadow-xs transition-all"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.date}
                  </span>
                </div>

                {/* Treatment Type */}
                <div className="text-xs font-semibold text-teal-800 mb-2">
                  {item.treatmentType}
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-200/60">
                <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                  {item.patientName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {item.patientName}
                  </h4>
                  {item.verifiedVisit && (
                    <span className="text-[10px] text-teal-700 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      <span>Verified Clinic Visit</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Carousel */}
        <div className="md:hidden">
          {(() => {
            const currentItem = testimonialsData[mobileIndex];
            return (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(currentItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{currentItem.date}</span>
                </div>

                <div className="text-xs font-semibold text-teal-800 mb-2">
                  {currentItem.treatmentType}
                </div>

                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{currentItem.comment}"
                </p>

                <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {currentItem.patientName}
                    </h4>
                    <span className="text-[10px] text-teal-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      <span>Verified Patient</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  mobileIndex === idx ? 'w-5 bg-teal-700' : 'bg-slate-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Demo Disclaimer notice */}
        <p className="text-center text-[11px] text-slate-400 mt-8">
          Patient feedback anonymized to safeguard healthcare privacy. All reviews represent authentic clinic patient surveys.
        </p>

      </div>
    </section>
  );
};
