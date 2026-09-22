import { Router } from 'express';
import { db } from '../data/database';
import { authenticateToken } from '../middleware/authMiddleware';

export const userRouter = Router();

// Add Address
userRouter.post('/addresses', authenticateToken, (req: any, res) => {
  try {
    const userId = req.user.id;
    const { label, line1, locality, city, pincode, landmark, isDefault } = req.body;

    if (!line1 || !locality || !city || !pincode) {
      return res.status(400).json({ success: false, error: 'Incomplete address details.' });
    }

    const address = db.addAddress(userId, {
      label: label || 'Home',
      line1,
      locality,
      city,
      pincode,
      landmark,
      isDefault: Boolean(isDefault),
    });

    res.status(201).json({ success: true, data: address, message: 'Address saved successfully!' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update Address
userRouter.put('/addresses/:id', authenticateToken, (req: any, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;
    const updated = db.updateAddress(userId, addressId, req.body);
    res.json({ success: true, data: updated, message: 'Address updated.' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete Address
userRouter.delete('/addresses/:id', authenticateToken, (req: any, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;
    const deleted = db.deleteAddress(userId, addressId);
    res.json({ success: deleted, message: deleted ? 'Address deleted.' : 'Address not found.' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update Profile
userRouter.put('/profile', authenticateToken, (req: any, res) => {
  try {
    const userId = req.user.id;
    const user = db.users.get(userId);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    const { fullName, phone, city, avatar } = req.body;
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (city) user.city = city;
    if (avatar) user.avatar = avatar;

    user.updatedAt = new Date().toISOString();
    res.json({ success: true, data: db.sanitizeUser(user), message: 'Profile updated.' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get User Notifications
userRouter.get('/notifications', authenticateToken, (req: any, res) => {
  const userId = req.user.id;
  const list = db.getUserNotifications(userId);
  res.json({ success: true, data: list });
});

// Mark Notification Read
userRouter.patch('/notifications/:id/read', authenticateToken, (req: any, res) => {
  const marked = db.markNotificationRead(req.params.id);
  res.json({ success: marked });
});

// Get Loyalty Points Summary & Ledger
userRouter.get('/loyalty', (req: any, res) => {
  try {
    const userId = req.user?.id || req.query.userId || 'usr-customer-101';
    const summary = db.getLoyaltySummary(userId);
    res.json({ success: true, data: summary });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Redeem Loyalty Points for Discount
userRouter.post('/loyalty/redeem', (req: any, res) => {
  try {
    const userId = req.user?.id || req.body.userId || 'usr-customer-101';
    const { points, bookingId, description } = req.body;
    if (!points || points <= 0) {
      return res.status(400).json({ success: false, error: 'Valid points count required for redemption.' });
    }
    const result = db.redeemLoyaltyPoints(userId, Number(points), bookingId, description);
    res.json({
      success: true,
      data: result,
      message: `Successfully redeemed ${result.redeemedPoints} loyalty points (₹${result.discountAmount} discount applied)!`,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Simulate Earning Loyalty Points for a Completed Booking
userRouter.post('/loyalty/simulate-earn', (req: any, res) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ success: false, error: 'Booking ID required.' });
    }
    const result = db.awardCompletedBookingPoints(bookingId);
    res.json({
      success: true,
      data: result,
      message: `Earned ${result.pointsEarned} loyalty points! New balance: ${result.newBalance} pts.`,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});
