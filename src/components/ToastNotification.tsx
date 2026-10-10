import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
  durationMs?: number;
}

export const ToastNotification: React.FC<ToastProps> = ({
  type,
  message,
  onClose,
  durationMs = 4500,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [onClose, durationMs]);

  const getStyle = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-900 text-white border-emerald-700',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
        };
      case 'error':
        return {
          bg: 'bg-rose-900 text-white border-rose-700',
          icon: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
        };
      case 'warning':
        return {
          bg: 'bg-amber-900 text-white border-amber-700',
          icon: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />,
        };
      case 'info':
      default:
        return {
          bg: 'bg-slate-900 text-white border-slate-700',
          icon: <Info className="w-4 h-4 text-teal-400 shrink-0" />,
        };
    }
  };

  const style = getStyle();

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-200"
    >
      <div
        className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-xl ${style.bg}`}
      >
        <div className="flex items-center gap-2.5">
          {style.icon}
          <p className="text-xs font-medium leading-snug">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white p-1 rounded transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
