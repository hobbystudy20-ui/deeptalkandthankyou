import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'pwa-install-dismissed';
const DISMISS_DURATION = 1000 * 60 * 60 * 24 * 3; // 3 days

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt && Date.now() - parseInt(dismissedAt) < DISMISS_DURATION) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Auto-show after slight delay for smooth entrance
      setTimeout(() => setVisible(true), 1500);
    };

    window.addEventListener('beforeinstallprompt', handler);

    const installedHandler = () => {
      setInstalled(true);
      setVisible(false);
    };
    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setInstalled(true);
      setVisible(false);
    } else {
      // User dismissed — remember for 3 days
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
      setVisible(false);
    }
    setDeferredPrompt(null);
    setInstalling(false);
  }

  function handleDismiss() {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setVisible(false);
  }

  if (installed || !visible || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 animate-fade-up">
      <div className="max-w-md mx-auto bg-card rounded-4xl shadow-soft-lg border border-primary/10 p-4 flex items-center gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
          <Smartphone className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-ink">Install DeepTalk</p>
          <p className="text-xs text-ink/50 leading-relaxed">Akses lebih cepat, bisa dipakai offline</p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-cream flex items-center justify-center text-ink/40 hover:text-ink/70 transition-colors active:scale-90"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>
        <button
          onClick={handleInstall}
          disabled={installing}
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-glow hover:brightness-105 transition-all active:scale-95 disabled:opacity-60"
        >
          <Download className="w-4 h-4" />
          {installing ? '...' : 'Install'}
        </button>
      </div>
    </div>
  );
}
