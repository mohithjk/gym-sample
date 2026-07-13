import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const MONGO_URI = process.env.VITE_MONGO_URI || process.env.MONGO_URI || '';
const JWT_SECRET = process.env.JWT_SECRET || 'ironcore-secret-key';

let db: any;
let connected = false;

async function connectDB() {
  if (connected) return;
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db('gym');
  connected = true;
  console.log('✅ Connected to MongoDB');
}

// Middleware to ensure DB is connected on every request
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// ── Register ──────────────────────────────────────────────
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    const users = db.collection('users');
    const existing = await users.findOne({ email });
    if (existing)
      return res.status(409).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const result = await users.insertOne({
      name,
      email,
      password: hashed,
      role: email === 'admin@ironcore.com' ? 'admin' : 'user',
      hasPaid: email === 'admin@ironcore.com',
      createdAt: new Date(),
    });

    const user = {
      id: result.insertedId.toString(),
      name,
      email,
      role: email === 'admin@ironcore.com' ? 'admin' : 'user',
      hasPaid: email === 'admin@ironcore.com',
    };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Login ─────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    const users = db.collection('users');
    const user = await users.findOne({ email });
    if (!user)
      return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ error: 'Invalid email or password' });

    const payload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      hasPaid: user.hasPaid,
      tier: user.tier,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Update Payment Status ─────────────────────────────────
app.patch('/api/users/:id/payment', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET);

    const { hasPaid, tier } = req.body;
    const users = db.collection('users');
    await users.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { hasPaid, tier } }
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Health ────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Required: export default app for Vercel serverless
export default app;
