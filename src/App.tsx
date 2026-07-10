import { useState, useEffect } from 'react';
import { FlowerBackground } from './components/FlowerBackground';
import Home from './components/Home';
import DeepTalk from './components/DeepTalk';
import ThankYou from './components/ThankYou';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import type { CategoryId } from './data/questions';

type View = 'home' | 'deeptalk' | 'thankyou';

function parseHash(): { view: View; category: CategoryId | null } {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [route, cat] = hash.split('/');
  if (route === 'deeptalk') {
    const validCats: CategoryId[] = ['bestie','teman','pasangan','orangtua','saudara','keluarga','guru','rekankerja','dirisendiri','acak'];
    return { view: 'deeptalk', category: validCats.includes(cat as CategoryId) ? (cat as CategoryId) : null };
  }
  if (route === 'thankyou') return { view: 'thankyou', category: null };
  return { view: 'home', category: null };
}

export default function App() {
  const [view, setView] = useState<View>('home');
  const [category, setCategory] = useState<CategoryId | null>(null);

  useEffect(() => {
    const { view: v, category: c } = parseHash();
    setView(v);
    setCategory(c);
  }, []);

  function go(v: View, cat?: CategoryId) {
    setView(v);
    if (v === 'deeptalk' && cat) {
      setCategory(cat);
      window.location.hash = `/deeptalk/${cat}`;
    } else if (v === 'deeptalk') {
      setCategory(null);
      window.location.hash = '/deeptalk';
    } else if (v === 'thankyou') {
      window.location.hash = '/thankyou';
    } else {
      window.location.hash = '';
    }
  }

  return (
    <div className="relative min-h-screen">
      <FlowerBackground />
      {view === 'home' && (
        <Home
          onDeepTalk={() => go('deeptalk')}
          onThankYou={() => go('thankyou')}
        />
      )}
      {view === 'deeptalk' && (
        <DeepTalk
          onBack={() => go('home')}
          initialCategory={category}
        />
      )}
      {view === 'thankyou' && (
        <ThankYou onBack={() => go('home')} />
      )}
      <PWAInstallPrompt />
    </div>
  );
}
