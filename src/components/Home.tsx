import { MessageCircleHeart, Mail, ArrowRight, Sparkles } from 'lucide-react';

interface HomeProps {
  onDeepTalk: () => void;
  onThankYou: () => void;
}

export default function Home({ onDeepTalk, onThankYou }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center px-5 pt-16 pb-12">
      <div className="w-full max-w-md animate-fade-up">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass shadow-soft mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-ink/70 tracking-wide">Premium Greeting App</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-ink leading-tight text-balance">
            DeepTalk
            <span className="block text-primary mt-1">& Say Thank You</span>
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-ink/60 text-balance">
            Ungkapkan isi hati melalui pertanyaan bermakna dan ucapan terima kasih yang tulus.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {/* DeepTalk Card */}
          <button
            onClick={onDeepTalk}
            className="group w-full text-left bg-card rounded-4xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] border border-primary/5"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500">
                <MessageCircleHeart className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                  <span>💬</span> DeepTalk
                </h2>
                <p className="mt-1.5 text-sm text-ink/55 leading-relaxed">
                  Buat halaman DeepTalk untuk dikirim kepada orang yang kamu pilih.
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">Mulai</span>
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
              </div>
            </div>
          </button>

          {/* Thank You Card */}
          <button
            onClick={onThankYou}
            className="group w-full text-left bg-card rounded-4xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] border border-secondary/5"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                  <span>💌</span> Say Thank You
                </h2>
                <p className="mt-1.5 text-sm text-ink/55 leading-relaxed">
                  Buat ucapan terima kasih yang hangat hanya dalam beberapa detik.
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-secondary">Mulai</span>
              <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-500">
                <ArrowRight className="w-4 h-4 text-secondary group-hover:text-white transition-colors" />
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-xs text-ink/35">
          Dibuat dengan 🤍 untuk orang-orang tersayang
        </p>
      </div>
    </div>
  );
}
