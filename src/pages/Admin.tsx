import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LogOut, Globe, Save, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '../lib/utils';
import { RichTextEditor } from '../components/admin/RichTextEditor';
import { defaultTranslations } from '../i18n';

type Lang = 'cs' | 'en';
type TranslationData = { cs: Record<string, any>; en: Record<string, any> };
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

function deepMerge(base: Record<string, any>, override: Record<string, any>): Record<string, any> {
  const result = { ...base };
  for (const key in override) {
    const v = override[key];
    if (
      v !== null && typeof v === 'object' && !Array.isArray(v) &&
      key in base && typeof base[key] === 'object' && !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key], v);
    } else if (v !== undefined) {
      result[key] = v;
    }
  }
  return result;
}

// --- Login ---

const LoginForm: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('admin_token', token);
        onLogin(token);
      } else if (res.status === 429) {
        setError('Příliš mnoho pokusů. Zkuste to za 15 minut.');
      } else {
        setError('Nesprávné přihlašovací údaje.');
      }
    } catch {
      setError('Chyba připojení k serveru.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-100">
        <h1 className="text-2xl font-serif text-ink mb-1 text-center">Administrace</h1>
        <p className="text-ink/40 text-sm text-center mb-7">Panorama Trojmezí</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-ink/50 uppercase tracking-wider mb-1.5">
              Uživatelské jméno
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors"
              autoComplete="username"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs text-ink/50 uppercase tracking-wider mb-1.5">Heslo</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm outline-none focus:border-gold transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm flex items-center gap-2">
              <AlertCircle size={14} />
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-white py-2.5 rounded-lg text-sm font-bold tracking-wider uppercase hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Přihlašuji...' : 'Přihlásit se'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Field helpers ---

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-xs text-ink/50 uppercase tracking-wider mb-1.5">{children}</label>
);

const PlainField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}> = ({ label, value, onChange, multiline = true }) => (
  <div>
    <FieldLabel>{label}</FieldLabel>
    {multiline ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold transition-colors resize-y"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold transition-colors"
      />
    )}
  </div>
);

const RichField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  langKey: string;
}> = ({ label, value, onChange, langKey }) => (
  <div>
    <FieldLabel>{label}</FieldLabel>
    <RichTextEditor key={langKey} value={value} onChange={onChange} />
  </div>
);

// --- Section accordion ---

const SectionBlock: React.FC<{
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ label, open, onToggle, children }) => (
  <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
    >
      <span className="font-bold text-ink tracking-wide">{label}</span>
      <ChevronDown size={18} className={cn('text-gold transition-transform duration-200', open && 'rotate-180')} />
    </button>
    {open && (
      <div className="px-6 py-6 bg-white border-t border-gray-50 space-y-6">
        {children}
      </div>
    )}
  </div>
);

// --- Main ---

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') ?? '');
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('admin_token'));
  const [data, setData] = useState<TranslationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<Lang>('cs');
  const [openSection, setOpenSection] = useState<string>('about');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    fetch('/api/translations')
      .then(r => r.json())
      .then((overrides: Partial<TranslationData>) => {
        const merged: TranslationData = {
          cs: deepMerge(defaultTranslations.cs, overrides.cs ?? {}),
          en: deepMerge(defaultTranslations.en, overrides.en ?? {}),
        };
        // Migrate old intro1/2/3 → intro
        for (const l of ['cs', 'en'] as Lang[]) {
          const about = merged[l].about;
          if (!about.intro && (about.intro1 || about.intro2 || about.intro3)) {
            about.intro = [about.intro1, about.intro2, about.intro3]
              .filter(Boolean)
              .map((s: string) => `<p>${s}</p>`)
              .join('');
          }
          // Migrate old facilities.blocks[] → facilities.text
          const fac = merged[l].apartments?.facilities;
          if (fac && !fac.text && Array.isArray(fac.blocks)) {
            fac.text = fac.blocks
              .filter(Boolean)
              .map((s: string) => `<p>${s}</p>`)
              .join('');
          }
          // Migrate old layout.living/bedrooms → layout.text
          const layout = merged[l].apartments?.layout;
          if (layout && !layout.text && layout.living) {
            layout.text = `<ul><li><b>${layout.living}</b></li><li><b>${layout.bedrooms?.title ?? ''}</b><br>${layout.bedrooms?.room1 ?? ''}<br>${layout.bedrooms?.room2 ?? ''}</li></ul>`;
          }
          // Migrate old pricing.notes[] → pricing.notesText
          const pricing = merged[l].apartments?.pricing;
          if (pricing && !pricing.notesText && Array.isArray(pricing.notes)) {
            pricing.notesText = pricing.notes.filter(Boolean).map((s: string) => `<p>${s}</p>`).join('');
          }
        }
        setData(merged);
      })
      .catch(() => {
        setData({
          cs: structuredClone(defaultTranslations.cs),
          en: structuredClone(defaultTranslations.en),
        });
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const handleLogin = (t: string) => {
    setToken(t);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setIsLoggedIn(false);
    setData(null);
  };

  const get = (path: string): string => {
    if (!data) return '';
    return path.split('.').reduce((obj: any, key) => obj?.[key], data[lang]) ?? '';
  };

  const set = (path: string, value: string) => {
    setData(prev => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      const parts = path.split('.');
      let obj: any = next[lang];
      for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
      obj[parts[parts.length - 1]] = value;
      return next;
    });
    setSaveStatus('idle');
  };

  const getReview = (idx: number, field: 'name' | 'text'): string =>
    data?.[lang]?.reviews?.items?.[idx]?.[field] ?? '';

  const setReview = (idx: number, field: 'name' | 'text', value: string) => {
    setData(prev => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      next[lang].reviews.items[idx][field] = value;
      return next;
    });
    setSaveStatus('idle');
  };

  const handleSave = async () => {
    if (!data) return;
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/translations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else if (res.status === 401) {
        handleLogout();
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  if (!isLoggedIn) return <LoginForm onLogin={handleLogin} />;

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const toggle = (id: string) => setOpenSection(prev => (prev === id ? '' : id));
  const langKey = (path: string) => `${lang}-${path}`;
  const reviewCount = (defaultTranslations.cs.reviews?.items as any[])?.length ?? 3;

  return (
    <div className="min-h-screen bg-paper pb-24">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-serif text-ink text-lg whitespace-nowrap">Administrace</span>
            <span className="text-ink/30 hidden sm:block">|</span>
            <span className="text-ink/50 text-sm hidden sm:block">Panorama Trojmezí</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              {(['cs', 'en'] as Lang[]).map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors',
                    lang === l ? 'bg-gold text-white' : 'bg-white text-ink/50 hover:bg-gray-50'
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link
              to="/"
              className="text-ink/40 hover:text-gold transition-colors text-sm flex items-center gap-1.5 px-2 py-1.5"
            >
              <Globe size={14} />
              <span className="hidden sm:inline">Web</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-ink/40 hover:text-red-500 transition-colors flex items-center gap-1.5 text-sm px-2 py-1.5"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Odhlásit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">

        {/* Ubytování */}
        <SectionBlock label="Ubytování" open={openSection === 'about'} onToggle={() => toggle('about')}>
          <RichField label="Úvodní text" value={get('about.intro')} onChange={v => set('about.intro', v)} langKey={langKey('about.intro')} />
          <PlainField label="——— PO PŘÍJEZDU" value={get('about.welcome.text')} onChange={v => set('about.welcome.text', v)} />
          <RichField label="——— FINSKÁ SAUNA" value={get('about.sauna.text')} onChange={v => set('about.sauna.text', v)} langKey={langKey('about.sauna.text')} />
        </SectionBlock>

        {/* Apartmány */}
        <SectionBlock label="Apartmány" open={openSection === 'apartments'} onToggle={() => toggle('apartments')}>
          <RichField label="Úvodní text" value={get('apartments.intro')} onChange={v => set('apartments.intro', v)} langKey={langKey('apartments.intro')} />
          <RichField label="Odrážky" value={get('apartments.layout.text')} onChange={v => set('apartments.layout.text', v)} langKey={langKey('apartments.layout.text')} />
          <RichField label="——— VYBAVENÍ A SLUŽBY" value={get('apartments.facilities.text')} onChange={v => set('apartments.facilities.text', v)} langKey={langKey('apartments.facilities.text')} />
          <RichField label="Poznámka k ceníku" value={get('apartments.pricing.footer')} onChange={v => set('apartments.pricing.footer', v)} langKey={langKey('apartments.pricing.footer')} />
          <PlainField label="Speciální termíny" value={get('apartments.pricing.special.footer')} onChange={v => set('apartments.pricing.special.footer', v)} />
          <RichField label="Poznámky (dole pod ceníkem)" value={get('apartments.pricing.notesText')} onChange={v => set('apartments.pricing.notesText', v)} langKey={langKey('apartments.pricing.notesText')} />
        </SectionBlock>

        {/* Tipy na výlet */}
        <SectionBlock label="Tipy na výlet" open={openSection === 'tips'} onToggle={() => toggle('tips')}>
          <RichField
            label="Výlety po okolí"
            value={get('tips.preparing')}
            onChange={v => set('tips.preparing', v)}
            langKey={langKey('tips.preparing')}
          />
        </SectionBlock>

        {/* Recenze */}
        <SectionBlock label="Co o nás říkají hosté" open={openSection === 'reviews'} onToggle={() => toggle('reviews')}>
          {Array.from({ length: reviewCount }, (_, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3">
              <p className="text-xs text-gold uppercase tracking-widest font-bold">Recenze {i + 1}</p>
              <PlainField label="Jméno" value={getReview(i, 'name')} onChange={v => setReview(i, 'name', v)} multiline={false} />
              <PlainField label="Text" value={getReview(i, 'text')} onChange={v => setReview(i, 'text', v)} />
            </div>
          ))}
        </SectionBlock>

      </div>

      {/* Save bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex-1">
            {saveStatus === 'saved' && (
              <span className="text-green-600 text-sm flex items-center gap-2">
                <CheckCircle size={15} />
                Uloženo — změny se projeví při příštím načtení webu
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-red-500 text-sm flex items-center gap-2">
                <AlertCircle size={15} />
                Chyba při ukládání, zkuste to znovu
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center gap-2 bg-gold text-white px-6 py-2.5 rounded-xl text-sm font-bold tracking-wider uppercase hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            <Save size={15} />
            {saveStatus === 'saving' ? 'Ukládám...' : 'Uložit vše'}
          </button>
        </div>
      </div>
    </div>
  );
}
