import { useState, useRef } from 'react';
import { ArrowLeft, Sparkles, Copy, RefreshCw, Check, Download, Palette } from 'lucide-react';
import { TEMPLATES, type Template } from '../data/templates';
import { generateThankYou, type ThankYouInput, type Length, type Style, type EmojiLevel } from '../data/generator';

interface ThankYouProps {
  onBack: () => void;
}

const RELATIONS = ['Ayah', 'Ibu', 'Orang Tua', 'Kakak', 'Adik', 'Kakek', 'Nenek', 'Saudara', 'Teman', 'Bestie', 'Pasangan', 'Guru', 'Dosen', 'Rekan Kerja', 'Atasan', 'Tetangga', 'Lainnya'];
const LENGTHS: { id: Length; label: string }[] = [{ id: 'singkat', label: 'Singkat' }, { id: 'sedang', label: 'Sedang' }, { id: 'panjang', label: 'Panjang' }];
const STYLES: { id: Style; label: string }[] = [{ id: 'formal', label: 'Formal' }, { id: 'santai', label: 'Santai' }, { id: 'hangat', label: 'Hangat' }, { id: 'menyentuh', label: 'Menyentuh' }, { id: 'lucu', label: 'Lucu' }, { id: 'puitis', label: 'Puitis' }];
const EMOJIS: { id: EmojiLevel; label: string }[] = [{ id: 'tanpa', label: 'Tanpa Emoji' }, { id: 'sedikit', label: 'Sedikit Emoji' }, { id: 'banyak', label: 'Banyak Emoji' }];

export default function ThankYou({ onBack }: ThankYouProps) {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [reason, setReason] = useState('');
  const [memory, setMemory] = useState('');
  const [length, setLength] = useState<Length>('sedang');
  const [style, setStyle] = useState<Style>('hangat');
  const [emoji, setEmoji] = useState<EmojiLevel>('sedikit');
  const [result, setResult] = useState('');
  const [templateIdx, setTemplateIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  function handleGenerate() {
    if (!name.trim() || !reason.trim()) return;
    const input: ThankYouInput = { name: name.trim(), relation, reason: reason.trim(), memory: memory.trim(), length, style, emoji };
    setResult(generateThankYou(input));
  }

  function handleRegenerate() {
    if (!name.trim() || !reason.trim()) return;
    const input: ThankYouInput = { name: name.trim(), relation, reason: reason.trim(), memory: memory.trim(), length, style, emoji };
    setResult(generateThankYou(input));
  }

  async function copyText() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  }

  async function downloadPNG() {
    if (!resultRef.current) return;
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(resultRef.current, { backgroundColor: null, scale: 2, useCORS: true });
    const link = document.createElement('a');
    link.download = `thankyou-${name}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  const tpl: Template = TEMPLATES[templateIdx];
  const canGenerate = name.trim() && reason.trim();

  return (
    <div className="min-h-screen flex flex-col px-5 pt-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3 max-w-md mx-auto w-full">
        <button onClick={onBack} className="flex-shrink-0 w-10 h-10 rounded-full bg-card shadow-soft border border-primary/10 flex items-center justify-center hover:bg-primary/5 transition-all active:scale-90">
          <ArrowLeft className="w-5 h-5 text-ink" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-ink leading-tight">💌 Say Thank You</h1>
          <p className="text-xs text-ink/50">Buat ucapan terima kasih yang hangat</p>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto mt-6">
        {/* Form */}
        <div className="bg-card rounded-4xl p-6 shadow-soft border border-primary/5 space-y-5 animate-fade-up">
          <Field label="Nama Penerima">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Ibu, Ayah, Dinda..."
              className="input"
            />
          </Field>

          <Field label="Hubungan">
            <div className="flex flex-wrap gap-2">
              {RELATIONS.map((r) => (
                <Chip key={r} active={relation === r} onClick={() => setRelation(r)}>{r}</Chip>
              ))}
            </div>
          </Field>

          <Field label="Alasan ingin mengucapkan terima kasih">
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Contoh: sudah selalu mendukungku, sabar mengajariku..."
              rows={3}
              className="input resize-none"
            />
          </Field>

          <Field label="Kenangan bersama (opsional)">
            <textarea
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
              placeholder="Contoh: saat kita liburan ke pantai, saat kamu menemani aku saat sakit..."
              rows={2}
              className="input resize-none"
            />
          </Field>

          <Field label="Panjang Ucapan">
            <div className="flex gap-2">
              {LENGTHS.map((l) => (
                <Chip key={l.id} active={length === l.id} onClick={() => setLength(l.id)}>{l.label}</Chip>
              ))}
            </div>
          </Field>

          <Field label="Gaya Bahasa">
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <Chip key={s.id} active={style === s.id} onClick={() => setStyle(s.id)}>{s.label}</Chip>
              ))}
            </div>
          </Field>

          <Field label="Emoji">
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map((e) => (
                <Chip key={e.id} active={emoji === e.id} onClick={() => setEmoji(e.id)}>{e.label}</Chip>
              ))}
            </div>
          </Field>

          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-glow text-sm hover:brightness-105 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5" />
            Generate
          </button>
          {!canGenerate && (
            <p className="text-xs text-ink/40 text-center -mt-2">Isi nama dan alasan untuk menghasilkan ucapan</p>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 animate-fade-up">
            {/* Template picker toggle */}
            <button
              onClick={() => setShowTemplates((v) => !v)}
              className="w-full flex items-center justify-between py-3 px-4 rounded-2xl bg-card shadow-soft border border-primary/10 text-sm font-semibold text-ink hover:bg-primary/5 transition-all mb-4"
            >
              <span className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" />
                Template: {tpl.name}
              </span>
              <span className="text-xs text-primary">{showTemplates ? 'Sembunyikan' : 'Pilih'}</span>
            </button>

            {/* Template grid */}
            {showTemplates && (
              <div className="grid grid-cols-3 gap-2 mb-4 max-h-64 overflow-y-auto scrollbar-hide animate-fade-scale p-1">
                {TEMPLATES.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplateIdx(i)}
                    className={`rounded-2xl p-2 text-center transition-all active:scale-95 ${templateIdx === i ? 'ring-2 ring-primary scale-105' : 'ring-1 ring-primary/10'}`}
                    style={{ background: t.bg }}
                  >
                    <span className="text-lg block">{t.decoration}</span>
                    <span className="text-[10px] font-semibold block mt-1" style={{ color: t.text }}>{t.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Preview card */}
            <div
              ref={resultRef}
              className="rounded-4xl p-7 shadow-soft-lg transition-all duration-500"
              style={{
                background: tpl.bg,
                border: tpl.border ? `1px solid ${tpl.border}` : '1px solid rgba(108,99,255,0.08)',
              }}
            >
              <div
                className="rounded-3xl p-6 transition-all duration-500"
                style={{
                  background: tpl.cardBg,
                  fontFamily: tpl.font,
                }}
              >
                <div className="text-3xl mb-3 text-center">{tpl.decoration}</div>
                <p
                  className="whitespace-pre-wrap text-[15px] leading-relaxed text-center"
                  style={{ color: tpl.text }}
                >
                  {result}
                </p>
                <div className="mt-4 text-center text-2xl">{tpl.decoration}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={copyText}
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-card shadow-soft border border-primary/10 text-sm font-semibold text-ink hover:bg-primary/5 transition-all active:scale-95"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-primary" />}
                {copied ? 'Tersalin!' : 'Copy Text'}
              </button>
              <button
                onClick={handleRegenerate}
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-card shadow-soft border border-primary/10 text-sm font-semibold text-ink hover:bg-primary/5 transition-all active:scale-95"
              >
                <RefreshCw className="w-4 h-4 text-primary" />
                Generate Lagi
              </button>
              <button
                onClick={downloadPNG}
                className="col-span-2 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white shadow-soft text-sm font-semibold hover:brightness-105 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download PNG
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Shared input styles */}
      <style>{`
        .input {
          width: 100%;
          font-size: 14px;
          color: #2F2F2F;
          background: rgba(248,248,251,0.7);
          border-radius: 16px;
          padding: 12px 14px;
          border: 1px solid rgba(108,99,255,0.1);
          outline: none;
          transition: all 0.3s;
        }
        .input:focus {
          border-color: rgba(108,99,255,0.35);
          box-shadow: 0 0 0 3px rgba(108,99,255,0.1);
        }
        .input::placeholder { color: rgba(47,47,47,0.3); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink/60 mb-2 ml-1">{label}</label>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
        active
          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow scale-105'
          : 'bg-cream text-ink/60 border border-primary/10 hover:border-primary/30'
      }`}
    >
      {children}
    </button>
  );
}
