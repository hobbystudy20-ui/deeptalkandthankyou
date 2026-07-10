export type CategoryId =
  | 'bestie'
  | 'teman'
  | 'pasangan'
  | 'orangtua'
  | 'saudara'
  | 'keluarga'
  | 'guru'
  | 'rekankerja'
  | 'dirisendiri'
  | 'acak';

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  desc: string;
  gradient: string;
}

export const CATEGORIES: Category[] = [
  { id: 'bestie', label: 'Bestie', emoji: '👯', desc: 'Sahabat terdekatmu', gradient: 'from-pink-400 to-rose-400' },
  { id: 'teman', label: 'Teman', emoji: '👫', desc: 'Teman berbagi cerita', gradient: 'from-sky-400 to-cyan-400' },
  { id: 'pasangan', label: 'Pasangan', emoji: '❤️', desc: 'Orang yang paling spesial', gradient: 'from-rose-400 to-red-400' },
  { id: 'orangtua', label: 'Orang Tua', emoji: '👨‍👩‍👧', desc: 'Yang mengasuh dengan cinta', gradient: 'from-amber-400 to-orange-400' },
  { id: 'saudara', label: 'Saudara', emoji: '👨‍👩‍👦', desc: 'Kakak, adik, saudara kandung', gradient: 'from-emerald-400 to-teal-400' },
  { id: 'keluarga', label: 'Keluarga', emoji: '👨‍👩‍👧', desc: 'Orang-orang di rumah', gradient: 'from-violet-400 to-purple-400' },
  { id: 'guru', label: 'Guru', emoji: '🎓', desc: 'Yang membimbing perjalananmu', gradient: 'from-indigo-400 to-blue-400' },
  { id: 'rekankerja', label: 'Rekan Kerja', emoji: '💼', desc: 'Partner di dunia kerja', gradient: 'from-slate-400 to-gray-500' },
  { id: 'dirisendiri', label: 'Diri Sendiri', emoji: '🌱', desc: 'Refleksi untuk diri sendiri', gradient: 'from-lime-400 to-green-400' },
  { id: 'acak', label: 'Acak', emoji: '🎲', desc: 'Dari semua kategori', gradient: 'from-fuchsia-400 to-pink-400' },
];

/* ------------------------------------------------------------------ */
/*  Question generator                                                  */
/*  Combines stems × subjects × contexts to produce 200+ per category  */
/* ------------------------------------------------------------------ */

type Vars = { sub: string[]; ctx: string[] };

const V: Record<Exclude<CategoryId, 'acak'>, Vars> = {
  bestie: {
    sub: ['kita berdua', 'persahabatan kita', 'kamu sebagai sahabatku', 'diriku di matamu', 'hubungan kita selama ini', 'kebersamaan kita', 'momen-momen kita'],
    ctx: ['saat pertama kali jadi sahabat', 'saat kita berpisah jauh', 'saat kita tertawa bareng', 'saat kita sedih bareng', 'saat kita berkelahi', 'saat kita kangen', 'saat kita dewasa nanti', 'saat kita sukses bareng'],
  },
  teman: {
    sub: ['kita sebagai teman', 'persahabatan kita', 'kamu sebagai teman', 'diriku menurutmu', 'hubungan kita', 'kebersamaan kita', 'pertemanan kita sejauh ini'],
    ctx: ['saat pertama kali kenal', 'saat kita jarang ketemu', 'saat kita tertawa bareng', 'saat kita berbeda pendapat', 'saat kita dewasa', 'saat kita sibuk sendiri', 'saat kita kangen', 'saat kita berpisah'],
  },
  pasangan: {
    sub: ['kita berdua', 'cinta kita', 'kamu sebagai pasanganku', 'diriku di matamu', 'hubungan kita', 'kebersamaan kita', 'rasa sayang kita', 'masa depan kita'],
    ctx: ['saat pertama kali jatuh cinta', 'saat kita berpisah sementara', 'saat kita bertengkar', 'saat kita bahagia', 'saat kita sedih bareng', 'saat kita kangen', 'saat kita menua bersama', 'saat kita berpisah untuk selamanya'],
  },
  orangtua: {
    sub: ['kita berdua', 'kasih sayang kita', 'kamu sebagai orang tuaku', 'diriku di mata orang tuaku', 'hubungan kita', 'kebersamaan kita', 'peranmu dalam hidupku', 'cinta orang tua'],
    ctx: ['saat aku masih kecil', 'saat aku tumbuh dewasa', 'saat aku berjauhan darimu', 'saat aku berbuat salah', 'saat aku sukses', 'saat aku sedih', 'saat aku menua', 'saat aku jadi orang tua'],
  },
  saudara: {
    sub: ['kita berdua', 'persaudaraan kita', 'kamu sebagai saudaraku', 'diriku di matamu', 'hubungan kita', 'kebersamaan kita', 'ikatan kita', 'masa kecil kita'],
    ctx: ['saat kita masih kecil', 'saat kita tumbuh dewasa', 'saat kita berpisah rumah', 'saat kita berkelahi', 'saat kita bercanda', 'saat kita saling jaga', 'saat kita menua', 'saat kita berpisah jauh'],
  },
  keluarga: {
    sub: ['keluarga kita', 'kita semua', 'kamu sebagai keluargaku', 'diriku dalam keluarga', 'ikatan keluarga kita', 'kebersamaan keluarga', 'rumah kita', 'cinta keluarga'],
    ctx: ['saat kumpul bareng', 'saat perayaan keluarga', 'saat ada yang sedih', 'saat ada yang sakit', 'saat liburan bareng', 'saat kita berpisah', 'saat kita dewasa', 'saat kita menua'],
  },
  guru: {
    sub: ['kita berdua', 'pembelajaran kita', 'kamu sebagai guruku', 'diriku sebagai muridmu', 'bimbinganmu', 'pelajaran darimu', 'pengaruhmu padaku', 'ilmu yang kamu berikan'],
    ctx: ['saat pertama kali belajar darimu', 'saat aku kesulitan', 'saat aku sukses', 'saat aku berbuat salah', 'saat kita berpisah', 'saat aku dewasa', 'saat aku mengajar orang lain', 'saat aku mengingatmu'],
  },
  rekankerja: {
    sub: ['kita sebagai rekan kerja', 'kerja sama kita', 'kamu sebagai rekan kerjaku', 'diriku di tempat kerja', 'hubungan kerja kita', 'proyek kita', 'tim kita', 'profesionalisme kita'],
    ctx: ['saat proyek sulit', 'saat kita sukses', 'saat kita berbeda pendapat', 'saat kita lembur bareng', 'saat kita berpisah tim', 'saat kita promosi', 'saat kita stres', 'saat kita libur bareng'],
  },
  dirisendiri: {
    sub: ['diriku sendiri', 'aku di masa lalu', 'aku di masa kini', 'aku di masa depan', 'hatiku', 'pikiranku', 'citaku', 'diri yang sebenarnya'],
    ctx: ['saat aku sendirian', 'saat aku sedih', 'saat aku bahagia', 'saat aku gagal', 'saat aku sukses', 'saat aku ragu', 'saat aku bersyukur', 'saat aku menua'],
  },
};

const STEMS: string[] = [
  'Momen apa yang paling bikin kamu ingat {sub}?',
  'Hal apa yang pernah bikin {sub} kecewa menurutmu?',
  'Kalau harus menggambarkan {sub} dengan tiga kata, apa saja?',
  'Apa sifat terbaik {sub}?',
  'Hal apa yang ingin kamu sampaikan tentang {sub} tetapi belum pernah kamu katakan?',
  'Apa yang paling kamu syukuri dari {sub}?',
  'Kalau bisa mengulang satu momen {ctx}, mana yang akan kamu pilih?',
  'Apa yang membuat {sub} terasa istimewa?',
  'Hal kecil apa yang bikin kamu senang dengan {sub}?',
  'Apa yang pertama terbayang di kepalamu saat mengingat {sub}?',
  'Kalau {sub} jadi sebuah lagu, lagu apa yang cocok?',
  'Apa hal paling lucu dari {sub}?',
  'Hal apa yang bikin kamu bangga dengan {sub}?',
  'Apa yang kamu harapkan untuk {sub} ke depannya?',
  'Kalau bisa memberi satu hadiah untuk {sub}, apa yang akan kamu berikan?',
  'Apa yang paling berkesan dari {ctx}?',
  'Hal apa yang bikin kamu merasa aman dengan {sub}?',
  'Apa yang kamu pelajari dari {sub}?',
  'Kalau {sub} jadi warna, warna apa yang cocok?',
  'Hal apa yang bikin kamu merasa dihargai {ctx}?',
  'Apa yang bikin kamu merasa dekat dengan {sub}?',
  'Kalau {sub} jadi musim, musim apa yang cocok?',
  'Apa yang bikin kamu tersenyum saat mengingat {sub}?',
  'Hal apa yang kamu ingat paling jelas dari {ctx}?',
  'Apa yang membuat {sub} berbeda dari yang lain?',
  'Kalau {sub} jadi cuaca, cuaca seperti apa yang cocok?',
  'Apa hal paling manis dari {sub}?',
  'Hal apa yang bikin kamu ingin menjaga {sub}?',
  'Apa yang kamu rindukan dari {sub}?',
  'Kalau {sub} jadi tempat, tempat seperti apa yang cocok?',
  'Apa hal paling jujur yang ingin kamu katakan tentang {sub}?',
  'Hal apa yang bikin kamu merasa nyaman dengan {sub}?',
  'Apa yang kamu syukuri dari {ctx}?',
  'Kalau {sub} jadi makanan, makanan apa yang cocok?',
  'Apa yang bikin kamu merasa beruntung memiliki {sub}?',
  'Hal apa yang pernah bikin kamu terharu {ctx}?',
  'Apa yang paling kamu kagumi dari {sub}?',
  'Kalau {sub} jadi waktu, pagi, siang, atau malam?',
  'Apa yang bikin kamu merasa diterima {ctx}?',
  'Hal apa yang bikin kamu merasa dipahami {ctx}?',
  'Apa yang kamu ingat sebagai awal {sub}?',
  'Kalau {sub} jadi bunga, bunga apa yang cocok?',
  'Apa hal paling berharga dari {sub}?',
  'Hal apa yang bikin kamu ingin terus bersama {sub}?',
  'Apa yang kamu harap tidak pernah berubah dari {sub}?',
  'Kalau {sub} jadi cerita, cerita seperti apa?',
  'Apa yang bikin kamu merasa dicintai {ctx}?',
  'Hal apa yang bikin kamu merasa jadi versi terbaik dirimu {ctx}?',
  'Apa yang paling kamu ingat dari {sub} saat ini?',
  'Kalau {sub} jadi kenangan, kenangan mana yang paling kuat?',
  'Apa hal kecil yang bikin kamu merasa diingat {ctx}?',
  'Hal apa yang bikin kamu merasa jadi bagian penting dari {sub}?',
  'Apa yang kamu ingin katakan {ctx} tetapi belum sempat?',
  'Kalau {sub} jadi aroma, aroma apa yang cocok?',
  'Apa yang bikin kamu merasa pulang saat bersama {sub}?',
  'Hal apa yang bikin kamu merasa tenang {ctx}?',
  'Apa yang paling kamu sukai dari {sub}?',
  'Kalau {sub} jadi momen, momen mana yang paling berarti?',
  'Apa yang bikin kamu merasa menjadi diri sendiri {ctx}?',
  'Hal apa yang kamu rindukan dari {ctx}?',
  'Apa yang kamu pelajari tentang dirimu dari {sub}?',
  'Kalau {sub} jadi perasaan, perasaan apa yang muncul?',
  'Apa hal paling jujur yang pernah kamu rasakan tentang {sub}?',
  'Hal apa yang bikin kamu ingin menjadi lebih baik {ctx}?',
  'Apa yang bikin kamu merasa tidak sendirian {ctx}?',
  'Kalau {sub} jadi cahaya, cahaya seperti apa?',
  'Apa yang paling kamu ingat dari pertama kali {ctx}?',
  'Hal apa yang bikin kamu merasa waktu berhenti {ctx}?',
  'Apa yang bikin kamu merasa diterima apa adanya {ctx}?',
  'Kalau {sub} jadi kata, kata apa yang paling cocok?',
  'Apa hal paling tak terduga dari {sub}?',
  'Hal apa yang bikin kamu merasa berharga {ctx}?',
  'Apa yang kamu ingat paling kuat dari {sub}?',
  'Kalau {sub} jadi film, genre apa yang cocok?',
  'Apa yang bikin kamu merasa damai {ctx}?',
  'Hal apa yang pernah bikin kamu tertawa lepas {ctx}?',
  'Apa yang paling kamu hargai dari {sub}?',
  'Kalau {sub} jadi angka, angka berapa?',
  'Apa hal paling berani yang ingin kamu lakukan untuk {sub}?',
  'Hal apa yang bikin kamu merasa terhubung dengan {sub}?',
  'Apa yang kamu ingat dari {sub} saat kamu sedih?',
  'Kalau {sub} jadi surat, surat untuk siapa?',
  'Apa yang bikin kamu merasa bersemangat {ctx}?',
  'Hal apa yang bikin kamu merasa dewasa {ctx}?',
  'Apa yang paling ingin kamu jaga dari {sub}?',
  'Kalau {sub} jadi janji, janji apa yang akan kamu buat?',
  'Apa hal paling sederhana yang bikin kamu bahagia {ctx}?',
  'Hal apa yang bikin kamu merasa kuat {ctx}?',
  'Apa yang kamu ingat dari {sub} saat kamu bahagia?',
  'Kalau {sub} jadi bintang, bintang mana?',
  'Apa yang bikin kamu merasa menjadi keluarga {ctx}?',
  'Hal apa yang bikin kamu merasa jadi diri yang utuh {ctx}?',
  'Apa yang paling ingin kamu bagikan tentang {sub}?',
  'Kalau {sub} jadi mimpi, mimpi seperti apa?',
  'Apa hal paling dalam yang ingin kamu sampaikan tentang {sub}?',
  'Hal apa yang bikin kamu merasa dicintai tanpa syarat {ctx}?',
  'Apa yang kamu ingat dari {sub} saat kamu ragu?',
  'Kalau {sub} jadi musik, nada apa yang cocok?',
  'Apa yang bikin kamu merasa punya tempat pulang {ctx}?',
  'Hal apa yang bikin kamu merasa menjadi versi paling lembut dirimu {ctx}?',
  'Apa yang paling ingin kamu ucapkan terima kasih untuk {sub}?',
  'Kalau {sub} jadi hujan, hujan seperti apa?',
  'Apa hal paling jujur yang ingin kamu tulis untuk {sub}?',
  'Hal apa yang bikin kamu merasa jadi bagian dari sesuatu yang lebih besar {ctx}?',
  'Apa yang kamu ingat dari {sub} saat kamu merasa kehilangan?',
  'Kalau {sub} jadi senja, senja seperti apa?',
  'Apa yang bikin kamu merasa diperhatikan {ctx}?',
  'Hal apa yang bikin kamu merasa jadi diri yang paling jujur {ctx}?',
  'Apa yang paling ingin kamu ingat tentang {sub} selamanya?',
];

function fill(stem: string, sub: string, ctx: string): string {
  return stem.replace('{sub}', sub).replace('{ctx}', ctx);
}

function generateFor(cat: Exclude<CategoryId, 'acak'>): string[] {
  const { sub, ctx } = V[cat];
  const out = new Set<string>();
  for (const s of sub) {
    for (const c of ctx) {
      for (const stem of STEMS) {
        if (!stem.includes('{ctx}') || c) {
          out.add(fill(stem, s, c));
          if (out.size >= 220) break;
        }
      }
      if (out.size >= 220) break;
    }
    if (out.size >= 220) break;
  }
  return Array.from(out);
}

const DB: Record<Exclude<CategoryId, 'acak'>, string[]> = {
  bestie: generateFor('bestie'),
  teman: generateFor('teman'),
  pasangan: generateFor('pasangan'),
  orangtua: generateFor('orangtua'),
  saudara: generateFor('saudara'),
  keluarga: generateFor('keluarga'),
  guru: generateFor('guru'),
  rekankerja: generateFor('rekankerja'),
  dirisendiri: generateFor('dirisendiri'),
};

export function getQuestions(cat: CategoryId, count = 15): string[] {
  let pool: string[];
  if (cat === 'acak') {
    pool = Object.values(DB).flat();
  } else {
    pool = DB[cat];
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
