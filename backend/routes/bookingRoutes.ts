import { Router } from 'express';
import { db } from '../data/database';
import { COUPONS } from '../data/mockData';
import { Booking, BookingStatus } from '../types';

export const bookingRouter = Router();

// Get all bookings
bookingRouter.get('/', (req, res) => {
  res.json({ success: true, data: Array.from(db.bookings.values()) });
});

// Get single booking
bookingRouter.get('/:id', (req, res) => {
  const booking = db.bookings.get(req.params.id);
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
  res.json({ success: true, data: booking });
});

// Create new booking
bookingRouter.post('/', (req, res) => {
  const {
    serviceId,
    quantity = 1,
    isUrgent = false,
    scheduledDate,
    scheduledTimeSlot,
    userAddress,
    paymentMethod = 'UPI',
    notes,
    aiDiagnosis,
    couponCode,
    userId,
  } = req.body;

  const service = db.services.get(serviceId);
  if (!service) {
    return res.status(400).json({ success: false, error: 'Invalid service selected' });
  }

  if (!userAddress || !userAddress.line1 || !userAddress.locality) {
    return res.status(400).json({ success: false, error: 'Incomplete delivery address provided' });
  }

  const subtotal = service.price * quantity;
  const urgentFee = isUrgent ? service.urgentFee : 0;

  let discountAmount = 0;
  if (couponCode) {
    const coupon = COUPONS.find((c) => c.code.toUpperCase() === couponCode.toUpperCase().trim());
    if (coupon) {
      discountAmount = Math.min((subtotal * coupon.discountPercent) / 100, coupon.maxDiscount);
    }
  }

  const taxableAmount = Math.max(0, subtotal + urgentFee - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.18);
  const totalAmount = taxableAmount + taxAmount;

  // Find matching provider
  const categoryPartners = Array.from(db.providers.values()).filter(
    (p) => p.categoryId === service.categoryId && p.availability === 'available'
  );
  const assignedPartner = categoryPartners.length > 0 ? categoryPartners[0] : Array.from(db.providers.values())[0];

  const newBooking: Booking = {
    id: `UL-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: userId || 'usr-customer-101',
    userName: req.body.userName || 'Aarav Mehta',
    userPhone: req.body.userPhone || '+91 98765 12345',
    userAddress,
    service,
    quantity,
    isUrgent,
    scheduledDate: isUrgent ? new Date().toISOString().split('T')[0] : scheduledDate || 'Tomorrow',
    scheduledTimeSlot: isUrgent ? '30 Mins Express SOS' : scheduledTimeSlot || '10:00 AM - 11:00 AM',
    status: isUrgent ? 'PARTNER_EN_ROUTE' : 'CONFIRMED',
    partner: assignedPartner ? {
      id: assignedPartner.id,
      name: assignedPartner.fullName,
      phone: assignedPartner.phone,
      avatar: assignedPartner.avatar,
      categoryIds: [assignedPartner.categoryId],
      city: assignedPartner.city,
      rating: assignedPartner.rating,
      totalJobs: assignedPartner.totalJobs,
      experienceYears: assignedPartner.experienceYears,
      verified: assignedPartner.verified,
      skills: assignedPartner.skills,
      status: assignedPartner.availability,
      badge: assignedPartner.badge,
    } : undefined,
    subtotal,
    urgentFee,
    taxAmount,
    discountAmount: Math.round(discountAmount),
    totalAmount,
    paymentMethod,
    paymentStatus: 'PAID',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes,
    aiDiagnosis,
    etaMinutes: isUrgent ? 18 : 60,
    otpCode: String(Math.floor(1000 + Math.random() * 9000)),
  };

  db.bookings.set(newBooking.id, newBooking);

  // Add notification
  db.addNotification(
    newBooking.userId,
    isUrgent ? 'Emergency SOS Booked! ⚡' : 'Booking Confirmed! 🎉',
    `Your booking #${newBooking.id} for ${service.title} has been received.`,
    'BOOKING'
  );

  res.json({
    success: true,
    data: newBooking,
    message: isUrgent
      ? 'SOS Order Confirmed! Emergency partner dispatched immediately.'
      : 'Service booking scheduled successfully!',
  });
});

// Update booking status with complete lifecycle notifications & provider availability updates
bookingRouter.patch('/:id/status', (req, res) => {
  const { status } = req.body as { status: BookingStatus };
  const booking = db.bookings.get(req.params.id);

  if (!booking) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  const previousStatus = booking.status;
  booking.status = status;
  booking.updatedAt = new Date().toISOString();

  // Status lifecycle events & notifications
  if (status === 'PARTNER_ASSIGNED' || status === 'CONFIRMED') {
    db.addNotification(
      booking.userId,
      'Technician Confirmed! 🤝',
      `${booking.partner?.name || 'Technician'} has accepted your booking #${booking.id} for ${booking.service.title}.`,
      'BOOKING',
      { bookingId: booking.id }
    );
  } else if (status === 'PARTNER_EN_ROUTE') {
    booking.etaMinutes = booking.isUrgent ? 12 : 25;
    db.addNotification(
      booking.userId,
      'Technician On The Way! 🚀',
      `${booking.partner?.name || 'Technician'} is en route to ${booking.userAddress.locality}. Estimated arrival in ~${booking.etaMinutes} mins.`,
      'BOOKING',
      { bookingId: booking.id }
    );
  } else if (status === 'WORK_IN_PROGRESS') {
    if (booking.partner?.id && db.providers.has(booking.partner.id)) {
      db.providers.get(booking.partner.id)!.availability = 'busy';
    }
    db.addNotification(
      booking.userId,
      'Service In Progress 🛠️',
      `Technician has arrived and begun service inspection for ${booking.service.title}.`,
      'BOOKING',
      { bookingId: booking.id }
    );
  } else if (status === 'COMPLETED') {
    if (booking.partner?.id && db.providers.has(booking.partner.id)) {
      const p = db.providers.get(booking.partner.id)!;
      p.availability = 'available';
      p.totalJobs = (p.totalJobs || 0) + 1;
    }
    db.addNotification(
      booking.userId,
      'Service Completed! 🎉 Rate Your Experience',
      `Your service #${booking.id} (${booking.service.title}) is complete. Tap here to rate with voice or stars!`,
      'BOOKING',
      { bookingId: booking.id }
    );
  } else if (status === 'CANCELLED') {
    if (booking.partner?.id && db.providers.has(booking.partner.id)) {
      db.providers.get(booking.partner.id)!.availability = 'available';
    }
    db.addNotification(
      booking.userId,
      'Booking Cancelled',
      `Booking #${booking.id} has been cancelled.`,
      'BOOKING',
      { bookingId: booking.id }
    );
  }

  db.bookings.set(booking.id, booking);

  res.json({
    success: true,
    data: booking,
    message: `Booking #${booking.id} transitioned from ${previousStatus} to ${status}.`,
  });
});

// Cancel Booking (POST /api/bookings/:id/cancel)
bookingRouter.post('/:id/cancel', (req, res) => {
  const booking = db.bookings.get(req.params.id);
  if (!booking) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  if (booking.status === 'COMPLETED') {
    return res.status(400).json({ success: false, error: 'Completed bookings cannot be cancelled. You can request warranty re-inspection.' });
  }

  if (booking.status === 'CANCELLED') {
    return res.json({ success: true, data: booking, message: 'Booking is already cancelled.' });
  }

  const { reason = 'Cancelled by customer' } = req.body;
  booking.status = 'CANCELLED';
  booking.notes = booking.notes ? `${booking.notes} | Cancellation Reason: ${reason}` : `Cancellation Reason: ${reason}`;
  booking.updatedAt = new Date().toISOString();

  // Free partner
  if (booking.partner?.id && db.providers.has(booking.partner.id)) {
    db.providers.get(booking.partner.id)!.availability = 'available';
  }

  db.addNotification(
    booking.userId,
    'Booking Cancelled (100% Refundable)',
    `Booking #${booking.id} (${booking.service.title}) has been cancelled. Any pre-payments will be credited back instantly.`,
    'BOOKING',
    { bookingId: booking.id }
  );

  if (booking.partner?.id) {
    db.addNotification(
      booking.partner.id,
      'Job Cancelled by Customer',
      `Booking #${booking.id} has been cancelled. Your schedule has been freed up for other leads.`,
      'SYSTEM',
      { bookingId: booking.id }
    );
  }

  db.bookings.set(booking.id, booking);

  res.json({
    success: true,
    data: booking,
    message: `Booking #${booking.id} has been successfully cancelled.`,
  });
});

// Reschedule Booking (POST /api/bookings/:id/reschedule)
bookingRouter.post('/:id/reschedule', (req, res) => {
  const booking = db.bookings.get(req.params.id);
  if (!booking) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
    return res.status(400).json({ success: false, error: `Cannot reschedule a ${booking.status.toLowerCase()} booking.` });
  }

  const { scheduledDate, scheduledTimeSlot } = req.body;
  if (!scheduledDate || !scheduledTimeSlot) {
    return res.status(400).json({ success: false, error: 'Please provide both scheduledDate and scheduledTimeSlot.' });
  }

  booking.scheduledDate = scheduledDate;
  booking.scheduledTimeSlot = scheduledTimeSlot;
  booking.updatedAt = new Date().toISOString();

  db.addNotification(
    booking.userId,
    'Booking Rescheduled Successfully 📅',
    `Your booking #${booking.id} is now confirmed for ${scheduledDate} at ${scheduledTimeSlot}.`,
    'BOOKING',
    { bookingId: booking.id }
  );

  if (booking.partner?.id) {
    db.addNotification(
      booking.partner.id,
      'Job Rescheduled by Customer',
      `Job #${booking.id} rescheduled to ${scheduledDate} (${scheduledTimeSlot}).`,
      'SYSTEM',
      { bookingId: booking.id }
    );
  }

  db.bookings.set(booking.id, booking);

  res.json({
    success: true,
    data: booking,
    message: `Booking #${booking.id} rescheduled to ${scheduledDate} (${scheduledTimeSlot}).`,
  });
});

// Submit Customer Feedback & Review for Booking (Text / Voice)
bookingRouter.post('/:id/feedback', (req, res) => {
  try {
    const booking = db.bookings.get(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    const {
      rating = 5,
      reviewText = '',
      workPhotos = [],
      source = 'text',
      sentiment = rating >= 4 ? 'POSITIVE' : rating === 3 ? 'NEUTRAL' : 'NEGATIVE',
      detectedIssues = [],
    } = req.body;

    const numRating = Number(rating) || 5;
    const finalReviewText = String(reviewText || '').trim() || 'Service completed satisfactorily.';

    // 1. Create Review in db.reviews
    const targetProviderId = booking.partner?.id || 'partner-101';
    const newReview = {
      id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      bookingId: booking.id,
      userId: booking.userId,
      userName: booking.userName || 'Verified Customer',
      providerId: targetProviderId,
      serviceId: booking.service.id,
      serviceTitle: booking.service.title,
      rating: numRating,
      comment: finalReviewText,
      sentiment: sentiment as any,
      detectedIssues: Array.isArray(detectedIssues) ? detectedIssues : [],
      positivePoints: numRating >= 4 ? ['High quality service', 'On-time completion'] : [],
      negativePoints: numRating <= 2 ? ['Customer dissatisfaction noted'] : [],
      serviceQualityScore: numRating,
      professionalismScore: numRating,
      timelinessScore: numRating,
      problemResolutionScore: numRating,
      source: source as 'voice' | 'text',
      workPhotos: Array.isArray(workPhotos) ? workPhotos : [],
      createdAt: new Date().toISOString(),
    };

    db.reviews.set(newReview.id, newReview);

    // 2. Update Booking
    booking.userStarRating = numRating;
    booking.userReviewText = finalReviewText;
    booking.workPhotos = newReview.workPhotos;
    if (source === 'voice') {
      booking.voiceFeedbackText = finalReviewText;
      booking.voiceFeedbackRating = numRating;
      booking.voiceFeedbackSentiment = sentiment as any;
      booking.voiceFeedbackAt = new Date().toISOString();
    }
    booking.updatedAt = new Date().toISOString();
    db.bookings.set(booking.id, booking);

    // 3. Update Provider Rating & Score
    if (targetProviderId && db.providers.has(targetProviderId)) {
      const prov = db.providers.get(targetProviderId)!;
      const totalJobs = Math.max(prov.totalJobs || 1, 1);
      const updatedRating = Number(((prov.rating * totalJobs + numRating) / (totalJobs + 1)).toFixed(2));
      prov.rating = Math.max(1, Math.min(5, updatedRating));
      db.providers.set(targetProviderId, prov);

      let pScore = db.providerScores.get(targetProviderId);
      if (pScore) {
        pScore.ratingScore = prov.rating;
        if (source === 'voice') {
          pScore.voiceFeedbackCount = (pScore.voiceFeedbackCount || 0) + 1;
        }
        if (!pScore.recentSentiments) pScore.recentSentiments = [];
        pScore.recentSentiments.unshift({
          text: finalReviewText.slice(0, 80),
          sentiment: String(sentiment),
          rating: numRating,
          date: new Date().toISOString(),
        });
        if (pScore.recentSentiments.length > 8) pScore.recentSentiments.pop();
        db.providerScores.set(targetProviderId, pScore);
      }

      // Add Notification to Provider
      db.addNotification(
        prov.userId || 'usr-provider-101',
        `⭐ New Review Received (${numRating}★)`,
        `${booking.userName} reviewed your work on ${booking.service.title}: "${finalReviewText.slice(0, 60)}"`,
        'SYSTEM'
      );
    }

    // 4. If critical or negative review, alert Admin
    if (numRating <= 2 || sentiment === 'CRITICAL' || sentiment === 'NEGATIVE') {
      db.addNotification(
        'usr-admin-1',
        `⚠️ Negative Service Review Alert`,
        `Low rating (${numRating}★) on booking #${booking.id} by ${booking.userName} for ${booking.service.title}.`,
        'SECURITY'
      );
    }

    res.json({
      success: true,
      data: {
        review: newReview,
        booking,
      },
      message: 'Feedback and rating submitted successfully!',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Directions info for booking
bookingRouter.get('/:id/directions', (req, res) => {
  try {
    const booking = db.bookings.get(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    const addressQuery = [
      booking.userAddress.line1,
      booking.userAddress.landmark ? `Near ${booking.userAddress.landmark}` : '',
      booking.userAddress.locality,
      booking.userAddress.city,
      booking.userAddress.pincode,
    ]
      .filter(Boolean)
      .join(', ');

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressQuery)}&travelmode=driving`;
    const appleMapsUrl = `https://maps.apple.com/?daddr=${encodeURIComponent(addressQuery)}&dirflg=d`;
    const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(addressQuery)}&navigate=yes`;

    res.json({
      success: true,
      data: {
        bookingId: booking.id,
        customerName: booking.userName,
        customerPhone: booking.userPhone,
        destinationAddress: addressQuery,
        scheduledSlot: booking.scheduledTimeSlot,
        googleMapsUrl,
        appleMapsUrl,
        wazeUrl,
        oneHourAlertSent: Boolean(booking.oneHourAlertSent),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Trigger 1-Hour Service Alert
bookingRouter.post('/trigger-1hr-alert', (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ success: false, error: 'bookingId is required' });
    }

    const result = db.triggerOneHourAlert(bookingId);
    res.json({
      success: true,
      data: result,
      message: '1-Hour Service Reminder Push Alert dispatched with One-Click Directions link.',
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});
