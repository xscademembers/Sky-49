import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';

// ─── MongoDB Connection (cached for serverless warm starts) ──

const cached = (global as any).__mongoose || { conn: null, promise: null };
(global as any).__mongoose = cached;

async function connectDB() {
  if (cached.conn) return cached.conn;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// ─── Mongoose Models (guard against re-compilation) ──────────

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, required: true },
  interest: { type: String, required: true },
  message: { type: String, default: '' },
  wantsBrochure: { type: Boolean, default: false },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

const gallerySchema = new mongoose.Schema({
  src: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  aspect: { type: String, default: 'aspect-[16/9]' },
  category: { type: String, enum: ['main', 'extra'], default: 'main' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', gallerySchema);

// ─── Gallery Seed ────────────────────────────────────────────

const defaultImages = [
  { src: '/2000-x-1333-1024x682.png', aspect: 'aspect-[4/5]', title: 'The Facade', desc: 'Iconic architecture that redefines the Tellapur skyline.', category: 'main', order: 0 },
  { src: '/3-1024x682.png', aspect: 'aspect-[16/9]', title: 'Living Spaces', desc: 'Expansive, sunlit interiors designed for modern luxury.', category: 'main', order: 1 },
  { src: '/5-1024x682.png', aspect: 'aspect-square', title: 'Master Suite', desc: 'A private sanctuary of comfort and elegance.', category: 'main', order: 2 },
  { src: '/4-1024x682.png', aspect: 'aspect-[3/4]', title: 'Bath Elegance', desc: 'Spa-inspired bathrooms with premium fixtures.', category: 'main', order: 3 },
  { src: '/3-1-1024x682.png', aspect: 'aspect-[16/10]', title: 'Landscaped Arrival', desc: 'A curated approach to the everyday arrival experience.', category: 'extra', order: 4 },
  { src: '/12%20(1).png', aspect: 'aspect-[16/10]', title: 'Resort-Style Living', desc: 'Outdoor leisure crafted for year-round enjoyment.', category: 'extra', order: 5 },
];

let seeded = false;
async function seedGallery() {
  if (seeded) return;
  const count = await GalleryImage.countDocuments();
  if (count === 0) await GalleryImage.insertMany(defaultImages);
  seeded = true;
}

// ─── Auth Middleware ─────────────────────────────────────────

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) { res.status(401).json({ error: 'No token' }); return; }
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'sky49-secret');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ─── Express App ─────────────────────────────────────────────

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await connectDB();
    await seedGallery();
    next();
  } catch (err: any) {
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

// ── Auth ──

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@thesky49.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'sky49admin';

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'sky49-secret', { expiresIn: '24h' });
    res.json({ token, email });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// ── Contacts ──

app.post('/api/contacts', async (req: Request, res: Response) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/contacts', authMiddleware, async (_req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/contacts/:id/read', authMiddleware, async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(contact);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/contacts/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── Gallery ──

app.get('/api/gallery', async (_req: Request, res: Response) => {
  try {
    const images = await GalleryImage.find().sort({ order: 1, createdAt: 1 });
    res.json(images);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/gallery', authMiddleware, async (req: Request, res: Response) => {
  try {
    const src = req.body.src || '';
    if (!src) { res.status(400).json({ error: 'Image URL is required' }); return; }
    const image = await GalleryImage.create({
      src,
      title: req.body.title || 'Untitled',
      desc: req.body.desc || '',
      aspect: req.body.aspect || 'aspect-[16/9]',
      category: req.body.category || 'main',
      order: parseInt(req.body.order) || 0,
    });
    res.status(201).json(image);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/gallery/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(image);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/gallery/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
