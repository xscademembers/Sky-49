import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Users,
  Image,
  LayoutDashboard,
  Mail,
  Phone,
  Trash2,
  Eye,
  Upload,
  X,
  Plus,
  Loader2,
  CheckCircle2,
  Clock,
  Home,
  ChevronDown,
  ChevronUp,
  Menu,
} from 'lucide-react';

type ContactItem = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  wantsBrochure: boolean;
  isRead: boolean;
  createdAt: string;
};

type GalleryItem = {
  _id: string;
  src: string;
  title: string;
  desc: string;
  aspect: string;
  category: string;
  order: number;
};

type Tab = 'overview' | 'contacts' | 'gallery';

function getToken() {
  return localStorage.getItem('admin_token') || '';
}

function authHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
}

function interestLabel(val: string) {
  const map: Record<string, string> = {
    '3bhk': '3 BHK Luxury',
    '4bhk': '4 BHK Premium',
    penthouse: 'Sky Penthouse',
  };
  return map[val] || val;
}

// ─── Overview Tab ────────────────────────────────────────────

function OverviewTab({
  contacts,
  gallery,
}: {
  contacts: ContactItem[];
  gallery: GalleryItem[];
}) {
  const unread = contacts.filter((c) => !c.isRead).length;
  const today = contacts.filter(
    (c) => new Date(c.createdAt).toDateString() === new Date().toDateString()
  ).length;

  const stats = [
    { label: 'Total Inquiries', value: contacts.length, icon: Users, color: 'bg-blue-500/10 text-blue-600' },
    { label: 'Unread', value: unread, icon: Mail, color: 'bg-amber-500/10 text-amber-600' },
    { label: 'Today', value: today, icon: Clock, color: 'bg-green-500/10 text-green-600' },
    { label: 'Gallery Images', value: gallery.length, icon: Image, color: 'bg-purple-500/10 text-purple-600' },
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-charcoal sm:mb-6 sm:text-2xl">Dashboard Overview</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-stone/40 bg-white p-4 shadow-sm sm:p-6"
          >
            <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10 ${s.color}`}>
                <s.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted sm:text-xs">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-charcoal sm:text-3xl">{s.value}</p>
          </div>
        ))}
      </div>

      {contacts.length > 0 && (
        <div className="mt-6 sm:mt-8">
          <h3 className="mb-3 text-base font-semibold text-charcoal sm:mb-4 sm:text-lg">Recent Inquiries</h3>

          {/* Table for md+ */}
          <div className="hidden overflow-hidden rounded-xl border border-stone/40 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-stone/30 bg-stone/10">
                  <tr>
                    <th className="px-5 py-3 font-medium text-muted">Name</th>
                    <th className="px-5 py-3 font-medium text-muted">Interest</th>
                    <th className="px-5 py-3 font-medium text-muted">Date</th>
                    <th className="px-5 py-3 font-medium text-muted">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.slice(0, 5).map((c) => (
                    <tr key={c._id} className="border-b border-stone/20 last:border-0">
                      <td className="px-5 py-3 font-medium text-charcoal">
                        {c.firstName} {c.lastName}
                      </td>
                      <td className="px-5 py-3 text-muted">{interestLabel(c.interest)}</td>
                      <td className="px-5 py-3 text-muted">{formatDate(c.createdAt)}</td>
                      <td className="px-5 py-3">
                        {c.isRead ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                            <CheckCircle2 className="h-3 w-3" /> Read
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                            <Clock className="h-3 w-3" /> New
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card list for mobile */}
          <div className="space-y-2 md:hidden">
            {contacts.slice(0, 5).map((c) => (
              <div key={c._id} className="flex items-center gap-3 rounded-xl border border-stone/30 bg-white p-3 shadow-sm">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${!c.isRead ? 'bg-gold/20 text-gold' : 'bg-stone/30 text-muted'}`}>
                  {c.firstName[0]}{c.lastName?.[0] || ''}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-charcoal">{c.firstName} {c.lastName}</p>
                  <p className="truncate text-xs text-muted">{interestLabel(c.interest)} &middot; {formatDateShort(c.createdAt)}</p>
                </div>
                {c.isRead ? (
                  <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">Read</span>
                ) : (
                  <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">New</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Contacts Tab ────────────────────────────────────────────

function ContactsTab({
  contacts,
  onMarkRead,
  onDelete,
}: {
  contacts: ContactItem[];
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filtered = contacts.filter((c) => {
    if (filter === 'unread') return !c.isRead;
    if (filter === 'read') return c.isRead;
    return true;
  });

  const unreadCount = contacts.filter((c) => !c.isRead).length;
  const readCount = contacts.filter((c) => c.isRead).length;

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-charcoal sm:text-2xl">Contact Inquiries</h2>
        <div className="flex w-full gap-1.5 sm:w-auto sm:gap-2">
          {([
            { key: 'all' as const, count: contacts.length },
            { key: 'unread' as const, count: unreadCount },
            { key: 'read' as const, count: readCount },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-1 rounded-lg px-3 py-2 text-[11px] font-medium uppercase tracking-wider transition-colors sm:flex-none sm:px-4 sm:text-xs ${
                filter === f.key
                  ? 'bg-charcoal text-white'
                  : 'bg-stone/20 text-muted hover:bg-stone/40'
              }`}
            >
              {f.key} ({f.count})
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-stone/40 bg-white py-12 text-center sm:py-16">
          <Users className="mb-3 h-10 w-10 text-stone sm:mb-4 sm:h-12 sm:w-12" />
          <p className="text-base font-medium text-charcoal sm:text-lg">No inquiries yet</p>
          <p className="text-sm text-muted">Contact submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {filtered.map((c) => (
            <div
              key={c._id}
              className={`rounded-xl border bg-white shadow-sm transition-all ${
                !c.isRead ? 'border-gold/40 bg-gold/[0.02]' : 'border-stone/30'
              }`}
            >
              <div
                className="flex cursor-pointer items-center gap-3 px-3 py-3 sm:gap-4 sm:px-5 sm:py-4"
                onClick={() => setExpanded(expanded === c._id ? null : c._id)}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-10 sm:w-10 sm:text-sm ${
                    !c.isRead ? 'bg-gold/20 text-gold' : 'bg-stone/30 text-muted'
                  }`}
                >
                  {c.firstName[0]}{c.lastName?.[0] || ''}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-charcoal sm:text-base">
                      {c.firstName} {c.lastName}
                    </p>
                    {!c.isRead && (
                      <span className="shrink-0 rounded-full bg-gold px-1.5 py-0.5 text-[9px] font-bold uppercase text-white sm:px-2 sm:text-[10px]">
                        New
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted sm:text-sm">
                    {interestLabel(c.interest)} &middot; {formatDateShort(c.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="hidden text-xs text-muted lg:block">{formatDate(c.createdAt)}</span>
                  {expanded === c._id ? (
                    <ChevronUp className="h-4 w-4 text-muted" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted" />
                  )}
                </div>
              </div>

              {expanded === c._id && (
                <div className="border-t border-stone/20 px-3 py-4 sm:px-5 sm:py-5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    {c.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 shrink-0 text-muted" />
                        <a href={`mailto:${c.email}`} className="truncate text-charcoal hover:text-gold">
                          {c.email}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 shrink-0 text-muted" />
                      <a href={`tel:${c.phone}`} className="text-charcoal hover:text-gold">
                        {c.phone}
                      </a>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-muted sm:hidden">{formatDate(c.createdAt)}</p>

                  {c.message && (
                    <div className="mt-3 rounded-lg bg-stone/10 p-3 sm:mt-4 sm:p-4">
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-muted">Message</p>
                      <p className="text-sm text-charcoal">{c.message}</p>
                    </div>
                  )}

                  {c.wantsBrochure && (
                    <p className="mt-3 text-xs text-gold">Requested digital brochure</p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                    {!c.isRead && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onMarkRead(c._id); }}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-charcoal px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-gold"
                      >
                        <Eye className="h-3.5 w-3.5" /> Mark as Read
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(c._id); }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Gallery Tab ─────────────────────────────────────────────

function GalleryTab({
  gallery,
  onAddImage,
  onDelete,
  uploading,
}: {
  gallery: GalleryItem[];
  onAddImage: (data: { src: string; title: string; desc: string; category: string; aspect: string; order: number }) => void;
  onDelete: (id: string) => void;
  uploading: boolean;
}) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [src, setSrc] = useState('');
  const [category, setCategory] = useState('main');
  const [aspect, setAspect] = useState('aspect-[16/9]');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!src || !title) return;

    onAddImage({
      src,
      title,
      desc,
      category,
      aspect,
      order: gallery.length,
    });

    setTitle('');
    setDesc('');
    setSrc('');
    setShowForm(false);
  };

  const mainImages = gallery.filter((i) => i.category === 'main');
  const extraImages = gallery.filter((i) => i.category === 'extra');

  return (
    <div>
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h2 className="text-xl font-semibold text-charcoal sm:text-2xl">Gallery</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-charcoal px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-white transition-colors hover:bg-gold sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? 'Cancel' : 'Add Image'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-xl border border-stone/40 bg-white p-4 shadow-sm sm:mb-8 sm:p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <div>
              <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-widest text-muted sm:mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-stone/40 px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none sm:px-4"
                placeholder="Image title"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-widest text-muted sm:mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-stone/40 px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none sm:px-4"
              >
                <option value="main">Main Gallery</option>
                <option value="extra">Extra / More Perspectives</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-widest text-muted sm:mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                required
                className="w-full rounded-lg border border-stone/40 px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none sm:px-4"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-[11px] text-muted">
                Full URL (https://...) or public folder path (/image.png)
              </p>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-widest text-muted sm:mb-2">
                Description
              </label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full rounded-lg border border-stone/40 px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none sm:px-4"
                placeholder="Short description"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-widest text-muted sm:mb-2">
                Aspect Ratio
              </label>
              <select
                value={aspect}
                onChange={(e) => setAspect(e.target.value)}
                className="w-full rounded-lg border border-stone/40 px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none sm:px-4"
              >
                <option value="aspect-[16/9]">16:9 (Landscape)</option>
                <option value="aspect-[4/5]">4:5 (Portrait)</option>
                <option value="aspect-[3/4]">3:4 (Portrait)</option>
                <option value="aspect-square">1:1 (Square)</option>
                <option value="aspect-[16/10]">16:10 (Wide)</option>
              </select>
            </div>
          </div>

          {src && (
            <div className="mt-4">
              <img src={src} alt="Preview" className="h-32 rounded-lg object-cover sm:h-40" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          )}

          <button
            type="submit"
            disabled={uploading || !src || !title}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold/80 disabled:opacity-50 sm:mt-5 sm:w-auto"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" /> Add Image
              </>
            )}
          </button>
        </form>
      )}

      {gallery.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-stone/40 bg-white py-12 text-center sm:py-16">
          <Image className="mb-3 h-10 w-10 text-stone sm:mb-4 sm:h-12 sm:w-12" />
          <p className="text-base font-medium text-charcoal sm:text-lg">No gallery images</p>
          <p className="text-sm text-muted">Add images to populate the gallery.</p>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {mainImages.length > 0 && (
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted sm:mb-4 sm:text-sm">
                Main Gallery ({mainImages.length})
              </h3>
              <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
                {mainImages.map((img) => (
                  <GalleryCard key={img._id} image={img} onDelete={onDelete} />
                ))}
              </div>
            </div>
          )}

          {extraImages.length > 0 && (
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted sm:mb-4 sm:text-sm">
                More Perspectives ({extraImages.length})
              </h3>
              <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
                {extraImages.map((img) => (
                  <GalleryCard key={img._id} image={img} onDelete={onDelete} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GalleryCard({ image, onDelete }: { image: GalleryItem; onDelete: (id: string) => void }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-stone/30 bg-white shadow-sm">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image.src}
          alt={image.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-medium text-charcoal">{image.title}</p>
        {image.desc && <p className="mt-0.5 truncate text-xs text-muted">{image.desc}</p>}
        <div className="mt-2 flex items-center justify-between">
          <span className="rounded-md bg-stone/20 px-2 py-0.5 text-[10px] font-medium uppercase text-muted">
            {image.category}
          </span>
          <button
            onClick={() => onDelete(image._id)}
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────

export function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('overview');
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchData = useCallback(async () => {
    const token = getToken();
    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    try {
      const [contactsRes, galleryRes] = await Promise.all([
        fetch('/api/contacts', { headers: authHeaders() }),
        fetch('/api/gallery'),
      ]);

      if (contactsRes.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/admin', { replace: true });
        return;
      }

      setContacts(await contactsRes.json());
      setGallery(await galleryRes.json());
    } catch {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    document.title = 'Admin Dashboard | THE SKY49';
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin', { replace: true });
  };

  const handleMarkRead = async (id: string) => {
    await fetch(`/api/contacts/${id}/read`, {
      method: 'PATCH',
      headers: authHeaders(),
    });
    setContacts((prev) => prev.map((c) => (c._id === id ? { ...c, isRead: true } : c)));
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  const handleAddImage = async (data: { src: string; title: string; desc: string; category: string; aspect: string; order: number }) => {
    setUploading(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const newImage = await res.json();
        setGallery((prev) => [...prev, newImage]);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`/api/gallery/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    setGallery((prev) => prev.filter((i) => i._id !== id));
  };

  const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'gallery', label: 'Gallery', icon: Image },
  ];

  const unreadBadge = contacts.filter((c) => !c.isRead).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-warm-white">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-stone/40 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="font-serif text-lg text-charcoal sm:text-xl">THE SKY49</h1>
            <span className="rounded-md bg-gold/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gold sm:px-2 sm:text-[10px]">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-muted transition-colors hover:bg-stone/20 hover:text-charcoal sm:px-3"
              title="View Site"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">View Site</span>
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg bg-stone/10 px-2 py-2 text-xs font-medium text-muted transition-colors hover:bg-red-50 hover:text-red-600 sm:px-3"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
        {/* Tab Navigation - desktop */}
        <nav className="mb-6 hidden gap-1 rounded-xl border border-stone/30 bg-white p-1.5 shadow-sm sm:mb-8 sm:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all sm:px-5 ${
                tab === item.id
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'text-muted hover:bg-stone/20 hover:text-charcoal'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.id === 'contacts' && unreadBadge > 0 && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
                  {unreadBadge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Tab Navigation - mobile bottom bar */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone/30 bg-white/95 backdrop-blur-md sm:hidden">
          <div className="flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium uppercase tracking-wider transition-colors ${
                  tab === item.id ? 'text-gold' : 'text-muted'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
                {item.id === 'contacts' && unreadBadge > 0 && (
                  <span className="absolute right-1/4 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-white">
                    {unreadBadge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="pb-20 sm:pb-0">
          {tab === 'overview' && <OverviewTab contacts={contacts} gallery={gallery} />}
          {tab === 'contacts' && (
            <ContactsTab
              contacts={contacts}
              onMarkRead={handleMarkRead}
              onDelete={handleDeleteContact}
            />
          )}
          {tab === 'gallery' && (
            <GalleryTab
              gallery={gallery}
              onAddImage={handleAddImage}
              onDelete={handleDeleteImage}
              uploading={uploading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
