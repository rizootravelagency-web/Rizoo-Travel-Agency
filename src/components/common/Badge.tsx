import React from 'react';
import { CheckCircle2, Flame, Star, Clock, Utensils, Home, Calendar } from 'lucide-react';

interface BadgeProps {
  type: 'verified' | 'urgent' | 'featured' | 'food' | 'accommodation' | 'overtime' | 'duty' | 'interview' | 'status';
  text?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, text, className = '' }) => {
  switch (type) {
    case 'verified':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs ${className}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{text || 'Verified Vacancy'}</span>
        </span>
      );

    case 'urgent':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white shadow-xs animate-pulse ${className}`}
        >
          <Flame className="w-3.5 h-3.5 fill-white text-rose-200" />
          <span>{text || 'Urgent Hiring'}</span>
        </span>
      );

    case 'featured':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 shadow-xs ${className}`}
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>{text || 'Featured Job'}</span>
        </span>
      );

    case 'food':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-800 border border-blue-100 ${className}`}
        >
          <Utensils className="w-3 h-3 text-blue-600" />
          <span>{text || 'Food Provided'}</span>
        </span>
      );

    case 'accommodation':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-50 text-indigo-800 border border-indigo-100 ${className}`}
        >
          <Home className="w-3 h-3 text-indigo-600" />
          <span>{text || 'Free Accommodation'}</span>
        </span>
      );

    case 'overtime':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-purple-800 border border-purple-100 ${className}`}
        >
          <Clock className="w-3 h-3 text-purple-600" />
          <span>{text || 'Overtime Available'}</span>
        </span>
      );

    case 'interview':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200 ${className}`}
        >
          <Calendar className="w-3 h-3 text-amber-600" />
          <span>{text || 'Interview Scheduled'}</span>
        </span>
      );

    case 'status':
    default: {
      const statusColor =
        text === 'Selected'
          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
          : text === 'Interview Scheduled'
          ? 'bg-amber-100 text-amber-800 border-amber-300'
          : text === 'Shortlisted'
          ? 'bg-blue-100 text-blue-800 border-blue-300'
          : text === 'Under Review'
          ? 'bg-purple-100 text-purple-800 border-purple-300'
          : text === 'Rejected'
          ? 'bg-red-100 text-red-800 border-red-300'
          : 'bg-slate-100 text-slate-800 border-slate-300';

      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColor} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
          <span>{text || 'Submitted'}</span>
        </span>
      );
    }
  }
};
