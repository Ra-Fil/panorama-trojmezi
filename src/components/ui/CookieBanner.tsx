import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

const STORAGE_KEY = 'cookie_consent_v2';

export type CookieConsent = {
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

export function getCookieConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const consent: CookieConsent = { analytics, marketing, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent('cookieConsentChange', { detail: consent }));
}

// --- Toggle switch ---

const Toggle: React.FC<{
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  id: string;
}> = ({ checked, onChange, disabled, id }) => (
  <button
    type="button"
    role="switch"
    id={id}
    aria-checked={checked}
    disabled={disabled}
    onClick={onChange}
    className={cn(
      'relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold',
      checked ? 'bg-gold' : 'bg-gray-200',
      disabled ? 'cursor-default' : 'cursor-pointer'
    )}
  >
    <span
      className={cn(
        'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200',
        checked ? 'translate-x-4' : 'translate-x-0'
      )}
    />
  </button>
);

// --- Category row ---

const CategoryRow: React.FC<{
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
  badge?: string;
}> = ({ id, title, description, checked, onToggle, disabled, badge }) => (
  <div className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <label htmlFor={id} className={cn('text-sm font-semibold', disabled ? 'text-ink/50 cursor-default' : 'text-ink cursor-pointer')}>
          {title}
        </label>
        {badge && (
          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-ink/40 font-bold">{badge}</span>
        )}
      </div>
      <p className="text-xs text-ink/50 leading-relaxed">{description}</p>
    </div>
    <div className="pt-0.5 shrink-0">
      <Toggle id={id} checked={checked} onChange={onToggle} disabled={disabled} />
    </div>
  </div>
);

// --- Main banner ---

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = getCookieConsent();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent(true, true);
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    saveConsent(false, false);
    setVisible(false);
  };

  const handleSaveSelection = () => {
    saveConsent(analytics, marketing);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 32, stiffness: 280 }}
          className="fixed bottom-0 left-0 right-0 z-[200] bg-white border-t border-gray-200 shadow-2xl"
          role="dialog"
          aria-modal="false"
          aria-label="Nastavení souborů cookie"
        >
          <div className="max-w-5xl mx-auto px-4 py-5">
            <AnimatePresence mode="wait">

              {/* --- Simple view --- */}
              {!showSettings && (
                <motion.div
                  key="simple"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-ink mb-1">Tento web používá soubory cookie</p>
                    <p className="text-sm text-ink/60 leading-relaxed">
                      Používáme cookies pro analytiku návštěvnosti a marketingové účely.
                      Vždy jsou aktivní technické cookies nezbytné pro fungování webu.{' '}
                      <button
                        type="button"
                        onClick={() => setShowSettings(true)}
                        className="text-gold underline underline-offset-2 hover:text-gold/70 transition-colors"
                      >
                        Nastavit předvolby
                      </button>
                    </p>
                  </div>
                  {/* Equal-prominence buttons — required by ÚOOÚ */}
                  <div className="flex gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={handleEssentialOnly}
                      className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-lg bg-white text-ink hover:bg-gray-50 transition-colors"
                    >
                      Pouze nezbytné
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium rounded-lg bg-gold text-white hover:bg-gold/90 transition-colors"
                    >
                      Přijmout vše
                    </button>
                  </div>
                </motion.div>
              )}

              {/* --- Settings view --- */}
              {showSettings && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-ink">Nastavení souborů cookie</p>
                    <button
                      type="button"
                      onClick={() => setShowSettings(false)}
                      className="text-xs text-ink/40 hover:text-ink transition-colors underline underline-offset-2"
                    >
                      ← Zpět
                    </button>
                  </div>

                  <div className="mb-4">
                    <CategoryRow
                      id="cookie-essential"
                      title="Nezbytné"
                      description="Zajišťují základní funkce webu — technické provoz rezervačního systému, nastavení a zapamatování vašich preferencí. Nelze zakázat."
                      checked={true}
                      onToggle={() => {}}
                      disabled
                      badge="Vždy aktivní"
                    />
                    <CategoryRow
                      id="cookie-analytics"
                      title="Analytické"
                      description="Pomáhají nám pochopit, jak návštěvníci web používají (Google Analytics, Hotjar apod.). Data jsou anonymizována a slouží ke zlepšení webu."
                      checked={analytics}
                      onToggle={() => setAnalytics(v => !v)}
                    />
                    <CategoryRow
                      id="cookie-marketing"
                      title="Marketingové"
                      description="Umožňují zobrazovat relevantní reklamy na jiných webech a měřit efektivitu kampaní (Meta Pixel, Google Ads apod.). Data mohou být sdílena s partnery."
                      checked={marketing}
                      onToggle={() => setMarketing(v => !v)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                      type="button"
                      onClick={handleEssentialOnly}
                      className="px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-lg bg-white text-ink hover:bg-gray-50 transition-colors"
                    >
                      Pouze nezbytné
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveSelection}
                      className="px-5 py-2.5 text-sm font-medium border border-gold rounded-lg text-gold hover:bg-gold/5 transition-colors"
                    >
                      Uložit výběr
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gold text-white hover:bg-gold/90 transition-colors"
                    >
                      Přijmout vše
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-ink/30 leading-relaxed">
                    Správce: Panorama Trojmezí, Dolní Lomná. Souhlas platí 12 měsíců a lze jej kdykoli odvolat
                    smazáním dat webu v nastavení prohlížeče nebo kontaktováním správce.
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
