import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Calendar,
  Download,
  AlertCircle,
  FileText,
  Navigation,
  RefreshCw,
  Star,
  MessageSquare,
  X,
  Plus,
} from 'lucide-react';
import { Booking } from '../../types';
import { downloadInvoiceFile } from '../../utils/invoiceGenerator';
import { api } from '../../api/client';
import { handleImageError } from '../../utils/imageFallback';

interface MyBookingsViewProps {
  bookings: Booking[];
  onBack: () => void;
  onExploreServices: () => void;
  onOpenHelp: () => void;
  onTrackBooking: (booking: Booking) => void;
  onOpenDirections: (booking: Booking) => void;
  onViewInvoice: (booking: Booking) => void;
  onOpenFeedback: (booking: Booking) => void;
  onCancelBooking?: (bookingId: string) => void;
  onRefreshBookings?: () => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  onBack,
  onExploreServices,
  onOpenHelp,
  onTrackBooking,
  onOpenDirections,
  onViewInvoice,
  onOpenFeedback,
  onCancelBooking,
  onRefreshBookings,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  // Cancellation Modal State
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('Changed my mind');
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  // Reschedule Modal State
  const [rescheduleModalBooking, setRescheduleModalBooking] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState<string>('');
  const [newSlot, setNewSlot] = useState<string>('02:00 PM - 04:00 PM');
  const [rescheduling, setRescheduling] = useState(false);
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);

  const handleDownloadInvoice = (booking: Booking) => {
    downloadInvoiceFile(booking);
    setDownloadSuccessId(booking.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  const handleConfirmCancel = async () => {
    if (!cancelModalBooking) return;
    setCancelling(true);
    setCancelError(null);
    try {
      await api.cancelBooking(cancelModalBooking.id, cancelReason);
      if (onCancelBooking) {
        onCancelBooking(cancelModalBooking.id);
      }
      if (onRefreshBookings) {
        onRefreshBookings();
      }
      setCancelModalBooking(null);
    } catch (err: any) {
      setCancelError(err.message || 'Failed to cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  const handleConfirmReschedule = async () => {
    if (!rescheduleModalBooking || !newDate) return;
    setRescheduling(true);
    setRescheduleError(null);
    try {
      await api.rescheduleBooking(rescheduleModalBooking.id, newDate, newSlot);
      if (onRefreshBookings) {
        onRefreshBookings();
      }
      setRescheduleModalBooking(null);
    } catch (err: any) {
      setRescheduleError(err.message || 'Failed to reschedule booking');
    } finally {
      setRescheduling(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeFilter === 'active') {
      return ['CONFIRMED', 'PARTNER_EN_ROUTE', 'WORK_IN_PROGRESS'].includes(b.status);
    }
    if (activeFilter === 'completed') {
      return ['COMPLETED', 'CANCELLED'].includes(b.status);
    }
    return true;
  });

  return (
    <div id="my-bookings-screen" className="min-h-screen bg-white">
      {/* Top Header matching Video 2 (← My bookings ... Help) */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <button
          id="my-bookings-back-btn"
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2.5 text-slate-900 hover:text-indigo-600 font-bold text-base sm:text-lg cursor-pointer transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 text-slate-800 group-hover:-translate-x-1 transition-transform" />
          <span>My bookings</span>
        </button>

        <button
          id="my-bookings-help-btn"
          type="button"
          onClick={onOpenHelp}
          className="text-xs sm:text-sm font-bold text-slate-700 hover:text-indigo-600 cursor-pointer px-3 py-1 rounded-xl hover:bg-slate-50 transition-colors"
        >
          Help
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* EXACT EMPTY STATE MATCHING VIDEO 2 */}
        {bookings.length === 0 || filteredBookings.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center max-w-md mx-auto animate-in fade-in duration-300">
            {/* Empty state headline */}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
              No bookings yet.
            </h2>
            {/* Exact subtitle from video */}
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mb-6">
              Looks like you haven't experienced quality services at home
            </p>
            {/* Exact action link with arrow from video */}
            <button
              id="explore-services-link"
              type="button"
              onClick={onExploreServices}
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer group"
            >
              <span>Explore our services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          /* POPULATED BOOKINGS LIST */
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({bookings.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('active')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === 'active'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('completed')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === 'completed'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Past & Completed
                </button>
              </div>

              {onRefreshBookings && (
                <button
                  type="button"
                  onClick={onRefreshBookings}
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              )}
            </div>

            {/* Booking Cards Grid */}
            <div className="space-y-4">
              {filteredBookings.map((booking) => {
                const isLive = ['CONFIRMED', 'PARTNER_EN_ROUTE', 'WORK_IN_PROGRESS'].includes(
                  booking.status
                );
                const isDone = booking.status === 'COMPLETED';
                const isCancelled = booking.status === 'CANCELLED';

                return (
                  <div
                    key={booking.id}
                    className="border border-slate-200/90 rounded-3xl p-5 sm:p-6 bg-white shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* Top row: Status pill & Booking ID */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isLive
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : isDone
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isLive && <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />}
                          {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {booking.status.replace(/_/g, ' ')}
                        </span>
                        {booking.isUrgent && (
                          <span className="bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5 text-rose-600" />
                            30-MIN EXPRESS
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] font-mono text-slate-400">
                        #{booking.id.slice(-6).toUpperCase()}
                      </span>
                    </div>

                    {/* Middle: Service Info & Price */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-y border-slate-100">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0">
                          <img
                            src={
                              booking.service.imageUrl ||
                              'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80'
                            }
                            alt={booking.service.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => handleImageError(e, 'service')}
                          />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 leading-tight">
                            {booking.service.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {booking.scheduledDate}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {booking.timeSlot}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <span className="text-lg font-black text-slate-900 font-mono">
                          ₹{booking.totalAmount}
                        </span>
                        <p className="text-[11px] text-slate-400">
                          {booking.paymentMethod === 'CASH' ? 'Cash on Delivery' : 'Paid Online'}
                        </p>
                      </div>
                    </div>

                    {/* Technician info (if assigned) */}
                    {booking.partner && (
                      <div className="mt-3 flex items-center justify-between text-xs bg-slate-50/80 p-2.5 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px]">
                            {booking.partner.name[0]}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800">{booking.partner.name}</span>
                            <span className="text-slate-400 text-[11px] ml-1.5">
                              ★ {booking.partner.rating || 4.9}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Verified Specialist
                        </span>
                      </div>
                    )}

                    {/* Actions Row */}
                    <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {isLive && (
                          <button
                            type="button"
                            onClick={() => onTrackBooking(booking)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Track Live Status</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onOpenDirections(booking)}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Navigation className="w-3.5 h-3.5 text-blue-600" />
                          <span>Map Directions</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadInvoice(booking)}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>{downloadSuccessId === booking.id ? 'Downloaded!' : 'Invoice'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {isLive && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setRescheduleModalBooking(booking);
                                setNewDate(booking.scheduledDate);
                                setNewSlot(booking.timeSlot);
                              }}
                              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:underline cursor-pointer"
                            >
                              Reschedule
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              type="button"
                              onClick={() => setCancelModalBooking(booking)}
                              className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {isDone && (
                          <button
                            type="button"
                            onClick={() => onOpenFeedback(booking)}
                            className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>{booking.userStarRating ? 'Edit Rating' : 'Rate Service'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Book Another Service Link */}
            <div className="pt-6 text-center">
              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                <span>+ Book another service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Cancel Booking</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to cancel service for <strong>{cancelModalBooking.service.title}</strong>? A 100% refund will be processed immediately.
            </p>
            {cancelError && <p className="text-xs text-rose-600 font-bold">{cancelError}</p>}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Cancellation</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold"
              >
                <option value="Changed my mind">Changed my mind</option>
                <option value="Booked by mistake">Booked by mistake</option>
                <option value="Issue resolved itself">Issue resolved itself</option>
                <option value="Need service at a different date">Need service at a different date</option>
                <option value="Other reason">Other reason</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalBooking(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={cancelling}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Reschedule Booking</h3>
            <p className="text-xs text-slate-500">
              Select a new date and time slot for <strong>{rescheduleModalBooking.service.title}</strong>.
            </p>
            {rescheduleError && <p className="text-xs text-rose-600 font-bold">{rescheduleError}</p>}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Time Slot</label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold"
                >
                  <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                  <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                  <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRescheduleModalBooking(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReschedule}
                disabled={rescheduling || !newDate}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                {rescheduling ? 'Saving...' : 'Update Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
