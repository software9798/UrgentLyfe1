import { Router } from 'express';
import { db } from '../data/database';
import { authenticateToken, requireRoles } from '../middleware/authMiddleware';

export const providerRouter = Router();

// Update Provider Profile & Skills & Category
providerRouter.put('/profile', authenticateToken, requireRoles('PROVIDER', 'ADMIN'), (req: any, res) => {
  try {
    const userId = req.user.id;
    let providerProf: any;

    for (const p of db.providers.values()) {
      if (p.userId === userId) {
        providerProf = p;
        break;
      }
    }

    if (!providerProf) {
      return res.status(404).json({ success: false, error: 'Provider profile not found.' });
    }

    const updated = db.updateProviderProfile(providerProf.id, req.body);
    res.json({ success: true, data: updated, message: 'Provider profile updated successfully!' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Toggle Provider Availability
providerRouter.patch('/availability', authenticateToken, requireRoles('PROVIDER', 'ADMIN'), (req: any, res) => {
  try {
    const userId = req.user.id;
    const { availability } = req.body;

    let providerProf: any;
    for (const p of db.providers.values()) {
      if (p.userId === userId) {
        providerProf = p;
        break;
      }
    }

    if (!providerProf) {
      return res.status(404).json({ success: false, error: 'Provider profile not found.' });
    }

    providerProf.availability = availability;
    res.json({ success: true, data: providerProf, message: `Status updated to ${availability}` });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get Provider Assigned Bookings
providerRouter.get('/bookings', authenticateToken, requireRoles('PROVIDER', 'ADMIN'), (req: any, res) => {
  const userId = req.user.id;
  let providerId: string | undefined;

  for (const p of db.providers.values()) {
    if (p.userId === userId) {
      providerId = p.id;
      break;
    }
  }

  const assigned = Array.from(db.bookings.values()).filter(
    (b) => b.partner?.id === providerId || req.user.role === 'ADMIN'
  );

  res.json({ success: true, data: assigned });
});

// Get Provider AI Score
providerRouter.get('/:id/score', (req, res) => {
  const providerId = req.params.id;
  let score = db.providerScores.get(providerId);

  if (!score) {
    const prov = db.providers.get(providerId);
    score = {
      id: `score-${providerId}`,
      providerId,
      ratingScore: prov?.rating || 4.9,
      speedScore: 98,
      completionRate: 99,
      overallScore: prov?.rating || 4.9,
      qualityScore: 95,
      behaviorScore: 97,
      punctualityScore: 94,
      priceSatisfactionScore: 92,
      voiceFeedbackCount: 4,
      recentSentiments: [
        { text: 'Polite speech and very clean jet wash work', sentiment: 'POSITIVE', rating: 5.0 },
        { text: 'Arrived exactly in 15 minutes during rain emergency', sentiment: 'POSITIVE', rating: 5.0 },
      ],
      aiSuggestions: [
        'Maintain 100% OTP verification on job start to boost ranking',
        'Wear UrgentLyfe uniform badge for higher customer trust score',
      ],
      updatedAt: new Date().toISOString(),
    };
    db.providerScores.set(providerId, score);
  }

  res.json({ success: true, data: score });
});

// Get Provider Reviews (from both text and voice feedback)
providerRouter.get('/:id/reviews', (req, res) => {
  const providerId = req.params.id;
  const reviews = Array.from(db.reviews.values())
    .filter((r) => r.providerId === providerId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  res.json({ success: true, data: reviews, total: reviews.length });
});

// Get Provider Comprehensive Performance Metrics
providerRouter.get('/:id/performance', (req, res) => {
  const providerId = req.params.id;
  const prov = db.providers.get(providerId);
  const reviews = Array.from(db.reviews.values()).filter((r) => r.providerId === providerId);
  const completedJobs = Array.from(db.bookings.values()).filter(
    (b) => b.partner?.id === providerId && b.status === 'COMPLETED'
  );

  const voiceReviews = reviews.filter((r) => r.source === 'voice');
  const textReviews = reviews.filter((r) => r.source !== 'voice');

  const positiveReviews = reviews.filter((r) => r.rating >= 4 || r.sentiment === 'POSITIVE');
  const criticalReviews = reviews.filter((r) => r.rating <= 2 || r.sentiment === 'CRITICAL' || r.sentiment === 'NEGATIVE');

  const avgRating = reviews.length > 0
    ? Number((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(2))
    : prov?.rating || 5.0;

  const score = db.providerScores.get(providerId);

  res.json({
    success: true,
    data: {
      providerId,
      providerName: prov?.fullName,
      totalCompletedJobs: completedJobs.length,
      averageRating: avgRating,
      totalReviews: reviews.length,
      voiceReviewsCount: voiceReviews.length,
      textReviewsCount: textReviews.length,
      positiveCount: positiveReviews.length,
      criticalCount: criticalReviews.length,
      satisfactionRate: reviews.length > 0 ? Math.round((positiveReviews.length / reviews.length) * 100) : 98,
      qualityScore: score?.qualityScore || 95,
      punctualityScore: score?.punctualityScore || 96,
      behaviorScore: score?.behaviorScore || 98,
      recentReviews: reviews.slice(0, 10),
    },
  });
});
