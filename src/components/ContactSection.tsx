import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { appointmentService } from '../services/appointmentService';
import { isValidEmail, isValidPhone } from '../utils/validation';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Consultation Inquiry');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Please enter your name.';
    if (!email.trim() || !isValidEmail(email)) newErrors.email = 'Please provide a valid email address.';
    if (!phone.trim() || !isValidPhone(phone)) newErrors.phone = 'Please provide a valid contact phone number.';
    if (!message.trim() || message.trim().length < 8) newErrors.message = 'Please provide your inquiry message (min 8 characters).';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await appointmentService.sendContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject,
        message: message.trim(),
      });

      setIsSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Unable to send message at this moment. Please call us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
            Direct Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Talk to Our Clinic
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Have questions regarding consultation fees, medical records transfer, or new patient intake? Reach our patient coordinator directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Quick Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-slate-900">
                Clinic Coordination Desk
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our front desk is staffed Monday through Friday during clinic hours. We respond to all electronic inquiries within 24 business hours.
              </p>

              <div className="space-y-4 pt-2">
                {/* Telephone */}
                <a
                  href={`tel:${clinicData.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Phone Consultation Line</span>
                    <span className="text-sm font-bold text-slate-900">{clinicData.phone}</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${clinicData.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] text-slate-400 font-medium block">General Inquiries Email</span>
                    <span className="text-sm font-bold text-slate-900 truncate">{clinicData.email}</span>
                  </div>
                </a>

                {/* WhatsApp Direct Messaging */}
                <a
                  href={`https://wa.me/${clinicData.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-emerald-800 font-medium block">WhatsApp Patient Line</span>
                    <span className="text-sm font-bold text-emerald-950">{clinicData.whatsapp}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-emerald-700 mr-2" />
                </a>
              </div>

              {/* Privacy advisory note */}
              <div className="pt-2 text-[11px] text-slate-400 italic">
                Notice: Please do not submit emergency medical symptoms or confidential diagnostic photos via standard web forms.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              
              {isSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for contacting Dr. Vance's office. Our patient care coordinator will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-5 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Send a Message to the Clinic
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Fill out the form below and our staff will respond promptly.
                  </p>

                  {errors.form && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                      {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrors((prev) => ({ ...prev, phone: '' }));
                        }}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                      {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    >
                      <option value="General Consultation Inquiry">General Consultation Inquiry</option>
                      <option value="Insurance & Billing Coverage">Insurance & Billing Coverage</option>
                      <option value="Medical Records Request">Medical Records Request</option>
                      <option value="Telemedicine Availability">Telemedicine Availability</option>
                      <option value="Other Inquiries">Other Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="How can our clinical team help you today?"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setErrors((prev) => ({ ...prev, message: '' }));
                      }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                    {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 rounded-xl shadow-xs transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
