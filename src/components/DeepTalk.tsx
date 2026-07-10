import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Copy, Share2, Download, FileText, RotateCcw, Link2, Check, Loader2, Plus, Trash2, PencilLine } from 'lucide-react';
import { CATEGORIES, getQuestions, type CategoryId } from '../data/questions';

interface DeepTalkProps {
  onBack: () => void;
  initialCategory?: CategoryId | null;
}

type Stage = 'select' | 'manual-edit' | 'questions';

export default function DeepTalk({ onBack, initialCategory }: DeepTalkProps) {
  const [stage, setStage] = useState<Stage>(initialCategory ? 'questions' : 'select');
  const [selectedCat, setSelectedCat] = useState<CategoryId | null>(initialCategory ?? null);
  const [isManual, setIsManual] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState<'png' | 'pdf' | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  // Manual mode question drafts
  const [manualQuestions, setManualQuestions] = useState<string[]>(['', '', '']);

  useEffect(() => {
    if (initialCategory) {
      startCategory(initialCategory);
    }
  }, []);

  function startCategory(cat: CategoryId) {
    setSelectedCat(cat);
    setIsManual(false);
    setQuestions(getQuestions(cat, 15));
    setAnswers({});
    setStage('questions');
  }

  function startManual() {
    setSelectedCat(null);
    setIsManual(true);
    setManualQuestions(['', '', '']);
    setStage('manual-edit');
  }

  function launchManual() {
    const filled = manualQuestions.map((q) => q.trim()).filter((q) => q.length > 0);
    if (filled.length === 0) return;
    setQuestions(filled);
    setAnswers({});
    setStage('questions');
  }

  function addManualField() {
    setManualQuestions([...manualQuestions, '']);
  }

  function removeManualField(idx: number) {
    if (manualQuestions.length <= 1) return;
    setManualQuestions(manualQuestions.filter((_, i) => i !== idx));
  }

  function updateManualField(idx: number, val: string) {
    setManualQuestions(manualQuestions.map((q, i) => (i === idx ? val : q)));
  }

  function reset() {
    setAnswers({});
    if (isManual) {
      setQuestions(questions);
    } else {
      setQuestions(getQuestions(selectedCat!, 15));
    }
  }

  async function copyLink() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  function shareWhatsApp() {
    const url = window.location.href;
    const msg = `Hai! 🤍 Aku ingin mengajak kamu mengisi halaman DeepTalk ini. Jawab dengan santai ya. Setelah selesai, download hasilnya lalu kirim kembali ke WhatsApp ini. Terima kasih.\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  }

  async function downloadPNG() {
    if (!captureRef.current) return;
    setDownloading('png');
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#F8F8FB',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `deeptalk-${isManual ? 'manual' : selectedCat}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(null);
    }
  }

  async function downloadPDF() {
    if (!captureRef.current) return;
    setDownloading('pdf');
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#F8F8FB',
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const pageHeight = pdf.internal.pageSize.getHeight();
      let heightLeft = pdfHeight;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`deeptalk-${isManual ? 'manual' : selectedCat}-${Date.now()}.pdf`);
    } finally {
      setDownloading(null);
    }
  }

  /* ---------- Stage: Category Selection ---------- */
  if (stage === 'select') {
    return (
      <div className="min-h-screen flex flex-col px-5 pt-6 pb-12">
        <Header title="DeepTalk" subtitle="Pilih kategori untuk memulai" onBack={onBack} />
        <div className="w-full max-w-md mx-auto mt-8 grid grid-cols-2 gap-3 animate-fade-up">
          {/* Manual card — first */}
          <button
            onClick={startManual}
            className="group col-span-2 bg-gradient-to-br from-primary to-secondary rounded-4xl p-5 shadow-glow hover:shadow-soft-lg transition-all duration-400 hover:-translate-y-1 active:scale-95 text-left animate-fade-scale"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-400">
                <PencilLine className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-[15px]">Manual — Isi Sendiri</h3>
                <p className="text-xs text-white/70 mt-0.5 leading-relaxed">Tulis pertanyaanmu sendiri, bebas sesuai keinginan</p>
              </div>
            </div>
          </button>

          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => startCategory(cat.id)}
              className="group bg-card rounded-4xl p-5 shadow-soft hover:shadow-soft-lg transition-all duration-400 hover:-translate-y-1 active:scale-95 border border-primary/5 text-left animate-fade-scale"
              style={{ animationDelay: `${(i + 1) * 40}ms` }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-400`}>
                {cat.emoji}
              </div>
              <h3 className="font-bold text-ink text-[15px]">{cat.label}</h3>
              <p className="text-xs text-ink/45 mt-0.5 leading-relaxed">{cat.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ---------- Stage: Manual Edit ---------- */
  if (stage === 'manual-edit') {
    const filledCount = manualQuestions.filter((q) => q.trim().length > 0).length;
    return (
      <div className="min-h-screen flex flex-col px-5 pt-6 pb-12">
        <Header title="DeepTalk Manual" subtitle="Tulis pertanyaan sendiri" onBack={onBack} />

        <div className="w-full max-w-md mx-auto mt-6 animate-fade-up">
          <div className="bg-card rounded-4xl p-5 shadow-soft border border-primary/5 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <PencilLine className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-ink">Tulis Pertanyaanmu</h2>
                <p className="text-xs text-ink/45">Buat pertanyaan sendiri untuk dikirim ke orang yang kamu pilih</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {manualQuestions.map((q, i) => (
              <div key={i} className="bg-card rounded-3xl p-4 shadow-soft border border-primary/5 animate-fade-scale" style={{ animationDelay: `${i * 40}ms` }}>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-1">
                    {i + 1}
                  </span>
                  <textarea
                    value={q}
                    onChange={(e) => updateManualField(i, e.target.value)}
                    placeholder={`Pertanyaan ${i + 1}...`}
                    rows={2}
                    className="flex-1 text-sm text-ink bg-cream/50 rounded-2xl p-3 resize-none border border-primary/10 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-ink/30"
                  />
                  <button
                    onClick={() => removeManualField(i)}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-all active:scale-90"
                    aria-label="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addManualField}
            className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-card shadow-soft border border-dashed border-primary/30 text-sm font-semibold text-primary hover:bg-primary/5 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Tambah Pertanyaan
          </button>

          <button
            onClick={launchManual}
            disabled={filledCount === 0}
            className="w-full mt-3 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-glow text-sm hover:brightness-105 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Lanjut ke Halaman Jawaban
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
          {filledCount === 0 && (
            <p className="text-xs text-ink/40 text-center mt-2">Isi minimal 1 pertanyaan untuk lanjut</p>
          )}
          {filledCount > 0 && (
            <p className="text-xs text-primary/60 text-center mt-2">{filledCount} pertanyaan siap</p>
          )}
        </div>
      </div>
    );
  }

  /* ---------- Stage: Questions ---------- */
  const cat = selectedCat ? CATEGORIES.find((c) => c.id === selectedCat) : null;
  const headerLabel = isManual ? 'Manual ✍️' : `${cat!.emoji} ${cat!.label}`;
  return (
    <div className="min-h-screen flex flex-col px-5 pt-6 pb-12">
      <Header title="DeepTalk" subtitle={`Kategori: ${headerLabel}`} onBack={onBack} />

      {/* Share buttons */}
      <div className="w-full max-w-md mx-auto mt-6 flex gap-3 animate-fade-up">
        <button
          onClick={copyLink}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-card shadow-soft border border-primary/10 text-sm font-semibold text-ink hover:bg-primary/5 transition-all active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4 text-primary" />}
          {copied ? 'Tersalin!' : 'Copy Link'}
        </button>
        <button
          onClick={shareWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#25D366] text-white shadow-soft text-sm font-semibold hover:brightness-105 transition-all active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          WhatsApp
        </button>
      </div>

      {/* Questions capture area */}
      <div ref={captureRef} className="w-full max-w-md mx-auto mt-6 space-y-4">
        <div className="bg-card rounded-4xl p-6 shadow-soft border border-primary/5">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{isManual ? '✍️' : cat!.emoji}</span>
            <h2 className="text-lg font-bold text-ink">DeepTalk {isManual ? 'Manual' : cat!.label}</h2>
          </div>
          <p className="text-xs text-ink/45">Jawab dengan santai dan jujur. Setelah selesai, download hasilnya.</p>
        </div>

        {questions.map((q, i) => (
          <div key={i} className="bg-card rounded-4xl p-5 shadow-soft border border-primary/5 animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start gap-3 mb-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm font-semibold text-ink leading-relaxed pt-0.5">{q}</p>
            </div>
            <textarea
              value={answers[i] ?? ''}
              onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
              placeholder="Tulis jawabanmu di sini..."
              rows={3}
              className="w-full text-sm text-ink bg-cream/50 rounded-2xl p-3.5 resize-none border border-primary/10 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-ink/30"
            />
          </div>
        ))}
      </div>

      {/* Bottom actions */}
      <div className="w-full max-w-md mx-auto mt-6 grid grid-cols-2 gap-3 animate-fade-up">
        <button
          onClick={downloadPNG}
          disabled={downloading !== null}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-card shadow-soft border border-primary/10 text-sm font-semibold text-ink hover:bg-primary/5 transition-all active:scale-95 disabled:opacity-50"
        >
          {downloading === 'png' ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Download className="w-4 h-4 text-primary" />}
          Download PNG
        </button>
        <button
          onClick={downloadPDF}
          disabled={downloading !== null}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-card shadow-soft border border-primary/10 text-sm font-semibold text-ink hover:bg-primary/5 transition-all active:scale-95 disabled:opacity-50"
        >
          {downloading === 'pdf' ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <FileText className="w-4 h-4 text-primary" />}
          Download PDF
        </button>
        <button
          onClick={reset}
          className="col-span-2 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white shadow-soft text-sm font-semibold hover:brightness-105 transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Jawaban
        </button>
      </div>
    </div>
  );
}

function Header({ title, subtitle, onBack }: { title: string; subtitle: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 max-w-md mx-auto w-full">
      <button
        onClick={onBack}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-card shadow-soft border border-primary/10 flex items-center justify-center hover:bg-primary/5 transition-all active:scale-90"
      >
        <ArrowLeft className="w-5 h-5 text-ink" />
      </button>
      <div>
        <h1 className="text-xl font-bold text-ink leading-tight">{title}</h1>
        <p className="text-xs text-ink/50">{subtitle}</p>
      </div>
    </div>
  );
}
