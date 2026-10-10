import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { doctorData } from '../data/doctorData';
import { appointmentService } from '../services/appointmentService';
import { Appointment } from '../types';
import {
  isValidEmail,
  isValidPhone,
  isFutureDate,
  isSunday,
  formatDatePretty,
  getTodayDateString,
  getMaxDateString,
} from '../utils/validation';

interface AppointmentBookingProps {
  initialServiceId?: string;
  onAppointmentBooked?: (appointment: Appointment) => void;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  initialServiceId,
  onAppointmentBooked,
}) => {
  // 1: Service, 2: Date & Time, 3: Patient Details, 4: Review, 5: Success
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || servicesData[0]?.id || ''
  );
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('09:30 AM');
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [reasonForVisit, setReasonForVisit] = useState<string>('');
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);

  // Validation Error State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  // Set default preferred date to tomorrow or next business day
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.getDay() === 0) {
      tomorrow.setDate(tomorrow.getDate() + 1); // Skip Sunday
    }
    const y = tomorrow.getFullYear();
    const m = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const d = String(tomorrow.getDate()).padStart(2, '0');
    setPreferredDate(`${y}-${m}-${d}`);
  }, []);

  const timeSlots = [
    '08:30 AM',
    '09:30 AM',
    '10:30 AM',
    '11:15 AM',
    '01:30 PM',
    '02:30 PM',
    '03:30 PM',
    '04:15 PM',
  ];

  const selectedService = servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];

  // Validation step-by-step
  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!selectedServiceId) {
        newErrors.service = 'Please select a medical service.';
      }
    } else if (step === 2) {
      if (!preferredDate) {
        newErrors.date = 'Please choose a preferred appointment date.';
      } else if (!isFutureDate(preferredDate)) {
        newErrors.date = 'Appointments must be scheduled for today or future dates.';
      } else if (isSunday(preferredDate)) {
        newErrors.date = 'The clinic is closed on Sundays for routine appointments. Please pick Monday through Saturday.';
      }

      if (!preferredTime) {
        newErrors.time = 'Please select a preferred consultation time slot.';
      }
    } else if (step === 3) {
      if (!patientName.trim()) {
        newErrors.name = 'Full patient name is required.';
      } else if (patientName.trim().length < 2) {
        newErrors.name = 'Please provide a valid full name.';
      }

      if (!phone.trim()) {
        newErrors.phone = 'Phone number is required so our clinic can reach you.';
      } else if (!isValidPhone(phone)) {
        newErrors.phone = 'Please enter a valid phone number (e.g. (555) 234-5678).';
      }

      if (!email.trim()) {
        newErrors.email = 'Email address is required for confirmation.';
      } else if (!isValidEmail(email)) {
        newErrors.email = 'Please enter a valid email address.';
      }

      if (!reasonForVisit.trim()) {
        newErrors.reason = 'Please provide a brief reason or symptoms for your visit.';
      } else if (reasonForVisit.trim().length < 5) {
        newErrors.reason = 'Please describe your reason for visit in a few words.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      // Scroll form into view gently
      const formEl = document.getElementById('booking');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handlePrevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    try {
      const created = await appointmentService.createAppointment({
        patientName: patientName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        dateOfBirth: dateOfBirth.trim() || undefined,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        preferredDate,
        preferredTime,
        reasonForVisit: reasonForVisit.trim(),
        isFirstVisit,
      });

      setCreatedAppointment(created);
      setCurrentStep(5);
      if (onAppointmentBooked) {
        onAppointmentBooked(created);
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Unable to submit request at this moment. Please call our clinic directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetBooking = () => {
    setCurrentStep(1);
    setCreatedAppointment(null);
    setPatientName('');
    setPhone('');
    setEmail('');
    setDateOfBirth('');
    setReasonForVisit('');
    setErrors({});
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
            Schedule Your Visit
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Book an Appointment
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
            Choose your preferred service, date, and time. Our patient coordinator will confirm your exact consultation schedule.
          </p>
        </div>

        {/* Stepper Progress Bar (Steps 1 to 5) */}
        <div className="mb-8 sm:mb-10" aria-label="Booking Progress">
          <div className="flex items-center justify-between relative max-w-2xl mx-auto">
            {/* Background connecting bar */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-200 -z-0" />
            
            {/* Active connecting bar */}
            <div
              className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-teal-600 transition-all duration-300 -z-0"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />

            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Date & Time' },
              { num: 3, label: 'Your Details' },
              { num: 4, label: 'Review' },
              { num: 5, label: 'Confirmed' },
            ].map((step) => {
              const isPassed = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div key={step.num} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                      isPassed
                        ? 'bg-teal-700 text-white'
                        : isCurrent
                        ? 'bg-teal-700 text-white ring-4 ring-teal-100 shadow-sm'
                        : 'bg-white text-slate-500 border-2 border-slate-300'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : step.num}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-semibold mt-1.5 hidden sm:inline whitespace-nowrap ${
                      isCurrent ? 'text-teal-900 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Booking Container */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
          
          {/* STEP 1: Select Service */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg font-bold text-slate-900">
                  Step 1: Choose Your Medical Service
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select the type of consultation that best matches your healthcare needs.
                </p>
              </div>

              {errors.service && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.service}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {servicesData.map((svc) => {
                  const isSelected = selectedServiceId === svc.id;
                  return (
                    <label
                      key={svc.id}
                      onClick={() => setSelectedServiceId(svc.id)}
                      className={`cursor-pointer flex flex-col justify-between p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-white border-teal-600 ring-2 ring-teal-600/20 shadow-xs'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="serviceRadio"
                            checked={isSelected}
                            onChange={() => setSelectedServiceId(svc.id)}
                            className="text-teal-600 focus:ring-teal-500 w-4 h-4"
                          />
                          <span className="text-xs sm:text-sm font-bold text-slate-900">
                            {svc.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                          {svc.durationMinutes} min
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 pl-6 line-clamp-2">
                        {svc.shortDescription}
                      </p>
                    </label>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors"
                >
                  <span>Continue to Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Date & Time */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg font-bold text-slate-900">
                  Step 2: Choose Preferred Date & Time
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Selected Service: <strong className="text-teal-900">{selectedService.name}</strong> ({selectedService.durationMinutes} min)
                </p>
              </div>

              {errors.date && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.date}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Picker */}
                <div>
                  <label htmlFor="pref-date" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Preferred Consultation Date *
                  </label>
                  <div className="relative">
                    <input
                      id="pref-date"
                      type="date"
                      min={getTodayDateString()}
                      max={getMaxDateString()}
                      value={preferredDate}
                      onChange={(e) => {
                        setPreferredDate(e.target.value);
                        setErrors((prev) => ({ ...prev, date: '' }));
                      }}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Operating Hours: Mon–Thu (8:30am–5:30pm), Fri (8:30am–4pm), Sat (9am–1pm). Closed Sundays.
                  </p>
                  {preferredDate && !isSunday(preferredDate) && isFutureDate(preferredDate) && (
                    <div className="mt-3 p-2.5 rounded-lg bg-teal-50 text-teal-800 text-xs font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span>Selected: {formatDatePretty(preferredDate)}</span>
                    </div>
                  )}
                </div>

                {/* Time Slot Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Preferred Time Slot *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = preferredTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setPreferredTime(slot)}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                            isSelected
                              ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Exact consultation start may vary slightly depending on thoroughness required.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Services</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors"
                >
                  <span>Patient Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Enter Patient Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg font-bold text-slate-900">
                  Step 3: Patient Information & Contact
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your information is kept strictly confidential and used solely for appointment scheduling.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="patient-name" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Full Patient Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="patient-name"
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={patientName}
                      onChange={(e) => {
                        setPatientName(e.target.value);
                        setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="patient-phone" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="patient-phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="patient-email" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="patient-email"
                      type="email"
                      placeholder="patient@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                {/* Date of Birth (Optional) */}
                <div>
                  <label htmlFor="patient-dob" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Date of Birth <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="patient-dob"
                    type="date"
                    max={getTodayDateString()}
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                {/* First Time Patient Toggle */}
                <div className="flex items-center gap-3 pt-6">
                  <input
                    id="first-visit-check"
                    type="checkbox"
                    checked={isFirstVisit}
                    onChange={(e) => setIsFirstVisit(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 border-slate-300"
                  />
                  <label htmlFor="first-visit-check" className="text-xs font-medium text-slate-700 cursor-pointer">
                    This is my first time visiting Dr. Vance's clinic
                  </label>
                </div>

                {/* Reason for Visit */}
                <div className="sm:col-span-2">
                  <label htmlFor="visit-reason" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Reason for Visit / Main Symptoms *
                  </label>
                  <textarea
                    id="visit-reason"
                    rows={3}
                    placeholder="Briefly describe your symptoms, goals, or health concerns..."
                    value={reasonForVisit}
                    onChange={(e) => {
                      setReasonForVisit(e.target.value);
                      setErrors((prev) => ({ ...prev, reason: '' }));
                    }}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                  {errors.reason && <p className="text-xs text-red-600 mt-1">{errors.reason}</p>}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Schedule</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors"
                >
                  <span>Review Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review Request */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg font-bold text-slate-900">
                  Step 4: Review Your Consultation Request
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Please review the details before submitting your request to Dr. Vance's clinical team.
                </p>
              </div>

              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.submit}</span>
                </div>
              )}

              {/* Summary Card */}
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 space-y-4">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">
                      Selected Medical Service
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      {selectedService.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Standard consultation duration: {selectedService.durationMinutes} minutes
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-teal-700 hover:underline font-semibold"
                  >
                    Change
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-100 pb-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Preferred Schedule:</span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      {formatDatePretty(preferredDate)} at {preferredTime}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Patient Status:</span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      {isFirstVisit ? 'New Patient (First Visit)' : 'Returning Patient'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-100 pb-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Patient Name:</span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      {patientName}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Contact Details:</span>
                    <p className="text-xs font-semibold text-slate-900 mt-0.5">
                      {phone} · {email}
                    </p>
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-slate-400 block font-medium">Reason for Consultation:</span>
                  <p className="text-xs text-slate-700 mt-1 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    "{reasonForVisit}"
                  </p>
                </div>
              </div>

              {/* Medical Notice */}
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-slate-700 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-teal-900">Appointment Request Notice</p>
                  <p className="mt-0.5 text-slate-600 text-[11px] leading-relaxed">
                    By submitting this request, your details are sent directly to our patient coordination desk. Our team will verify insurance and availability and contact you within 1 business day to confirm your exact appointment.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitBooking}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-60 rounded-xl shadow-md transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Request Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Success & Confirmation */}
          {currentStep === 5 && createdAppointment && (
            <div className="text-center py-6 sm:py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="max-w-md mx-auto">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
                  Appointment Request Submitted
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Your Request Has Been Received
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{createdAppointment.patientName}</strong>. Your request reference is <strong className="font-mono text-teal-800">{createdAppointment.id}</strong>.
                </p>
              </div>

              {/* Request Recap Card */}
              <div className="max-w-md mx-auto bg-white rounded-xl p-5 border border-slate-200 text-left space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-900">{createdAppointment.serviceName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Requested Date:</span>
                  <span className="font-semibold text-slate-900">{formatDatePretty(createdAppointment.preferredDate)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Requested Time:</span>
                  <span className="font-semibold text-slate-900">{createdAppointment.preferredTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Physician:</span>
                  <span className="font-semibold text-slate-900">Dr. {doctorData.name}, MD</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                    Pending Staff Confirmation
                  </span>
                </div>
              </div>

              {/* What happens next explanation */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-100 text-xs text-slate-600 text-left space-y-2">
                <h4 className="font-bold text-slate-900">What Happens Next?</h4>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Our clinic patient coordinator reviews your requested slot.</li>
                  <li>We will contact you via phone or email within 1 business day.</li>
                  <li>Once finalized, an official calendar confirmation and intake paperwork link will be sent.</li>
                </ol>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetBooking}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-xs hover:bg-slate-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Submit Another Request</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
