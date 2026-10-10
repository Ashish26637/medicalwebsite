import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Calendar,
  User,
  Shield,
  FileText,
  AlertCircle,
  ChevronDown,
  Database,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { Appointment, AppointmentStatus } from '../types';
import { appointmentService } from '../services/appointmentService';
import { formatDatePretty } from '../utils/validation';
import { doctorData } from '../data/doctorData';
import { checkSupabaseConnection, SUPABASE_SETUP_SQL, SUPABASE_URL } from '../lib/supabase';

interface DoctorAdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onNotification: (type: 'success' | 'info' | 'error', message: string) => void;
}

export const DoctorAdminDashboard: React.FC<DoctorAdminDashboardProps> = ({
  isOpen,
  onClose,
  onNotification,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState<string>('');
  const [supabaseStatus, setSupabaseStatus] = useState<{
    connected: boolean;
    tableReady: boolean;
    error?: string;
  }>({ connected: true, tableReady: false });
  const [showSqlModal, setShowSqlModal] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [data, conn] = await Promise.all([
        appointmentService.getAppointments(),
        checkSupabaseConnection(),
      ]);
      setAppointments(data);
      setSupabaseStatus(conn);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
    onNotification('success', 'Supabase SQL copied to clipboard! Paste it into Supabase SQL Editor.');
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter & Search & Sort
  const filteredAppointments = appointments
    .filter((apt) => {
      const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
      const matchesQuery =
        apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.phone.includes(searchQuery) ||
        apt.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.preferredDate.localeCompare(b.preferredDate);
      }
      if (sortBy === 'name') {
        return a.patientName.localeCompare(b.patientName);
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  const handleUpdateStatus = async (id: string, newStatus: AppointmentStatus) => {
    try {
      await appointmentService.updateAppointmentStatus(id, newStatus, adminNoteInput);
      await loadData();
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      onNotification(
        'success',
        `Appointment ${id} status updated to "${newStatus}".`
      );
    } catch (err) {
      console.error(err);
      onNotification('error', 'Failed to update status.');
    }
  };

  const handleResetData = async () => {
    if (window.confirm('Reset all demo appointments to initial clinical seed state?')) {
      const reset = await appointmentService.resetToDemoData();
      setAppointments(reset);
      setSelectedAppointment(null);
      onNotification('info', 'Demo appointments reset to baseline state.');
    }
  };

  // Metrics
  const totalRequests = appointments.length;
  const pendingRequests = appointments.filter((a) => a.status === 'requested').length;
  const confirmedRequests = appointments.filter((a) => a.status === 'confirmed').length;
  const completedRequests = appointments.filter((a) => a.status === 'completed').length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="bg-white rounded-2xl max-w-6xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="admin-title" className="text-sm sm:text-base font-bold">
                  Doctor & Staff Administrative Portal
                </h3>
                <span className="text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  <span>Supabase Live</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Dr. {doctorData.name}, MD · Practice Management Interface
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSqlModal(true)}
              className="px-2.5 py-1 text-xs font-medium text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/60 rounded-lg flex items-center gap-1.5 transition-colors"
              title="View Supabase Table Setup SQL"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Supabase SQL Setup</span>
            </button>

            <button
              onClick={handleResetData}
              className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Reset demo storage"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Seed</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Supabase Connection Status Bar */}
        <div className="bg-slate-800/90 border-b border-slate-700 px-6 py-2 text-[11px] text-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>
              <strong>Supabase Project:</strong> <code className="bg-slate-900 px-1.5 py-0.5 rounded text-teal-300 font-mono">gcemimgzgoprmpunnphf.supabase.co</code>
            </span>
            <span className="text-slate-400 hidden sm:inline">·</span>
            <span className={supabaseStatus.tableReady ? 'text-emerald-300' : 'text-amber-300'}>
              {supabaseStatus.tableReady
                ? '✓ Table "appointments" active & connected'
                : '⚠ Table "appointments" setup ready to run'}
            </span>
          </div>

          <button
            onClick={() => setShowSqlModal(true)}
            className="text-teal-300 hover:text-white underline text-[11px] font-medium flex items-center gap-1"
          >
            <span>View SQL Tables Script</span>
          </button>
        </div>

        {/* Prototype Security Notice Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 text-[11px] text-amber-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>
              <strong>Clinical Demonstration Mode:</strong> Data is synchronized with browser localStorage. Do not enter real Protected Health Information (PHI) without HIPAA-compliant authentication and backend encryption.
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Total Requests
              </span>
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {totalRequests}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                Pending Requests
              </span>
              <span className="text-2xl font-extrabold text-amber-900 tabular-nums">
                {pendingRequests}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200">
              <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider block">
                Confirmed Slots
              </span>
              <span className="text-2xl font-extrabold text-teal-900 tabular-nums">
                {confirmedRequests}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                Completed Visits
              </span>
              <span className="text-2xl font-extrabold text-emerald-900 tabular-nums">
                {completedRequests}
              </span>
            </div>
          </div>

          {/* Search, Filter & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by patient name, phone, email, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {['all', 'requested', 'confirmed', 'completed', 'cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md capitalize whitespace-nowrap transition-colors ${
                    statusFilter === st
                      ? 'bg-teal-700 text-white font-semibold shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                  }`}
                >
                  {st === 'requested' ? 'Pending' : st}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-slate-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
              >
                <option value="date">Date</option>
                <option value="name">Patient Name</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Ref ID</th>
                    <th className="py-3 px-4">Patient</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Requested Schedule</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        No appointments found matching your search or filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr
                        key={apt.id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="py-3 px-4 font-mono font-bold text-teal-800">
                          {apt.id}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{apt.patientName}</div>
                          <div className="text-[11px] text-slate-500">
                            {apt.phone} · {apt.email}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {apt.serviceName}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">
                            {formatDatePretty(apt.preferredDate)}
                          </div>
                          <div className="text-[11px] text-slate-500">{apt.preferredTime}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                              apt.status === 'confirmed'
                                ? 'bg-teal-100 text-teal-800'
                                : apt.status === 'requested'
                                ? 'bg-amber-100 text-amber-800'
                                : apt.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600 line-through'
                            }`}
                          >
                            {apt.status === 'requested' ? 'Pending' : apt.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedAppointment(apt);
                              setAdminNoteInput(apt.adminNotes || '');
                            }}
                            className="px-2 py-1 text-[11px] font-semibold text-slate-700 hover:text-teal-800 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                          >
                            View
                          </button>

                          {apt.status === 'requested' && (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'confirmed')}
                              className="px-2 py-1 text-[11px] font-semibold text-teal-800 bg-teal-100 hover:bg-teal-200 rounded transition-colors"
                            >
                              Approve
                            </button>
                          )}

                          {apt.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'completed')}
                              className="px-2 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded transition-colors"
                            >
                              Complete
                            </button>
                          )}

                          {apt.status !== 'cancelled' && (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                              className="px-2 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal / Panel for Detailed View of Selected Appointment */}
          {selectedAppointment && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-700" />
                  <h4 className="font-bold text-slate-900 text-sm">
                    Appointment Details — {selectedAppointment.id}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Close Detail
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Patient:</span>
                  <p className="font-bold text-slate-900">{selectedAppointment.patientName}</p>
                  <p className="text-slate-600">{selectedAppointment.phone}</p>
                  <p className="text-slate-600">{selectedAppointment.email}</p>
                  {selectedAppointment.dateOfBirth && (
                    <p className="text-slate-500">DOB: {selectedAppointment.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Service & Timing:</span>
                  <p className="font-bold text-slate-900">{selectedAppointment.serviceName}</p>
                  <p className="text-slate-600">
                    {formatDatePretty(selectedAppointment.preferredDate)} at{' '}
                    {selectedAppointment.preferredTime}
                  </p>
                  <p className="text-slate-500">
                    {selectedAppointment.isFirstVisit ? 'First-time Patient' : 'Returning Patient'}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Reason for Visit:</span>
                  <p className="italic text-slate-700 bg-white p-2 rounded border border-slate-200 mt-1">
                    "{selectedAppointment.reasonForVisit}"
                  </p>
                </div>
              </div>

              {/* Admin Notes Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical / Front-Desk Notes
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Called patient, insurance verified, scheduled for room 2..."
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedAppointment.id, selectedAppointment.status)
                    }
                    className="px-3 py-1.5 bg-teal-700 text-white rounded-lg text-xs font-semibold hover:bg-teal-800 transition-colors"
                  >
                    Save Note
                  </button>
                </div>
              </div>

              {/* Quick Status Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Change Status:</span>
                {(['requested', 'confirmed', 'completed', 'cancelled'] as AppointmentStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedAppointment.id, st)}
                      className={`px-2.5 py-1 text-xs font-medium rounded capitalize ${
                        selectedAppointment.status === st
                          ? 'bg-slate-900 text-white font-bold'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {st === 'requested' ? 'Pending' : st}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between shrink-0">
          <span>
            Connected Provider: Dr. {doctorData.name}, MD · Supabase Project: <code className="font-mono text-slate-700">gcemimgzgoprmpunnphf</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-lg transition-colors"
          >
            Close Portal
          </button>
        </div>

      </div>

      {/* Supabase SQL Setup Script Modal */}
      {showSqlModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-bold">Supabase Database Tables Setup</h4>
                  <p className="text-[11px] text-slate-400">Project: gcemimgzgoprmpunnphf</p>
                </div>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
              <p>
                To store appointments directly in your Supabase project, execute the SQL script below in your{' '}
                <a
                  href="https://supabase.com/dashboard/project/gcemimgzgoprmpunnphf/sql/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-teal-700 underline inline-flex items-center gap-1"
                >
                  <span>Supabase SQL Editor</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                .
              </p>

              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto max-h-72 border border-slate-800">
                  {SUPABASE_SETUP_SQL}
                </pre>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setShowSqlModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <a
                  href="https://supabase.com/dashboard/project/gcemimgzgoprmpunnphf/sql/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Supabase SQL Editor</span>
                </a>

                <button
                  onClick={copySqlToClipboard}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
