// routes/stripe.routes.js
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// 1) CREATE PaymentIntent  -> POST /sp/stripe/payment-intents
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: (currency || 'inr').toLowerCase(),
      automatic_payment_methods: { enabled: true }
    });

    return res.json(paymentIntent);
  } catch (err) {
    console.error('Stripe create PI error', err);
    return res.status(500).json({ error: err.message });
  }
});

// 2) UPDATE PaymentIntent  -> POST /sp/stripe/payment-intents/:id
router.post('/payment-intents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // whatever fields you want to update, e.g. metadata, amount (if allowed)
    const updateData = req.body;

    const paymentIntent = await stripe.paymentIntents.update(id, updateData);
    return res.json(paymentIntent);
  } catch (err) {
    console.error('Stripe update PI error', err);
    return res.status(500).json({ error: err.message });
  }
});

// 3) RETRIEVE one PaymentIntent  -> GET /sp/stripe/payment-intents/:id
router.get('/payment-intents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    return res.json(paymentIntent);
  } catch (err) {
    console.error('Stripe retrieve PI error', err);
    return res.status(500).json({ error: err.message });
  }
});

// 4) LIST PaymentIntents  -> GET /sp/stripe/payment-intents?limit=10
router.get('/payment-intents', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;

    const list = await stripe.paymentIntents.list({
      limit: Math.min(limit, 100)
    });

    return res.json(list);
  } catch (err) {
    console.error('Stripe list PI error', err);
    return res.status(500).json({ error: err.message });
  }
});

// 5) CONFIRM PaymentIntent (server-side) -> POST /sp/stripe/payment-intents/:id/confirm
router.post('/payment-intents/:id/confirm', async (req, res) => {
  try {
    const { id } = req.params;
    const confirmData = req.body || {}; // e.g. {payment_method: 'pm_...'}

    const paymentIntent = await stripe.paymentIntents.confirm(id, confirmData);
    return res.json(paymentIntent);
  } catch (err) {
    console.error('Stripe confirm PI error', err);
    return res.status(500).json({ error: err.message });
  }
});

// 6) CANCEL PaymentIntent -> POST /sp/stripe/payment-intents/:id/cancel
router.post('/payment-intents/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const paymentIntent = await stripe.paymentIntents.cancel(id);
    return res.json(paymentIntent);
  } catch (err) {
    console.error('Stripe cancel PI error', err);
    return res.status(500).json({ error: err.message });
  }
});

// 7) CAPTURE (if you ever use manual capture) -> POST /sp/stripe/payment-intents/:id/capture
router.post('/payment-intents/:id/capture', async (req, res) => {
  try {
    const { id } = req.params;
    const paymentIntent = await stripe.paymentIntents.capture(id);
    return res.json(paymentIntent);
  } catch (err) {
    console.error('Stripe capture PI error', err);
    return res.status(500).json({ error: err.message });
  }
});
// POST /sp/stripe/payment-intents/:id/increment-authorization
router.post('/payment-intents/:id/increment-authorization', async (req, res) => {
  try {
    const { id } = req.params;
    // e.g. { amount: 1000 } to increase authorized amount
    const params = req.body;

    const paymentIntent = await stripe.paymentIntents.incrementAuthorization(
      id,
      params
    );
    return res.json(paymentIntent);
  } catch (err) {
    console.error('Stripe incrementAuthorization error', err);
    return res.status(500).json({ error: err.message });
  }
});

// POST /sp/stripe/payment-intents/:id/apply-customer-balance
router.post('/payment-intents/:id/apply-customer-balance', async (req, res) => {
  try {
    const { id } = req.params;
    const paymentIntent = await stripe.paymentIntents.applyCustomerBalance(id);
    return res.json(paymentIntent);
  } catch (err) {
    console.error('Stripe applyCustomerBalance error', err);
    return res.status(500).json({ error: err.message });
  }
});

// GET /sp/stripe/payment-intents/search?q=...
router.get('/payment-intents-search', async (req, res) => {
  try {
    const { query } = req;              // e.g. ?query=status:'succeeded'
    const q = query.q || query.query;   // support ?q= or ?query=
    if (!q) {
      return res.status(400).json({ error: 'Missing search query' });
    }

    const result = await stripe.paymentIntents.search({
      query: String(q)
    });
    return res.json(result);
  } catch (err) {
    console.error('Stripe search PI error', err);
    return res.status(500).json({ error: err.message });
  }
});

// POST /sp/stripe/payment-intents/:id/verify-microdeposits
router.post('/payment-intents/:id/verify-microdeposits', async (req, res) => {
  try {
    const { id } = req.params;
    const params = req.body; // e.g. { amounts: [32, 45] } or { descriptor_code: 'ABCD123' }

    const paymentIntent = await stripe.paymentIntents.verifyMicrodeposits(
      id,
      params
    );
    return res.json(paymentIntent);
  } catch (err) {
    console.error('Stripe verifyMicrodeposits error', err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
