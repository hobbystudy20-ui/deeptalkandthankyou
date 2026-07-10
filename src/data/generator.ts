export type Length = 'singkat' | 'sedang' | 'panjang';
export type Style = 'formal' | 'santai' | 'hangat' | 'menyentuh' | 'lucu' | 'puitis';
export type EmojiLevel = 'tanpa' | 'sedikit' | 'banyak';

export interface ThankYouInput {
  name: string;
  relation: string;
  reason: string;
  memory: string;
  length: Length;
  style: Style;
  emoji: EmojiLevel;
}

const EMOJI_POOL = ['🤍', '💛', '✨', '🌸', '🦋', '🌿', '☀️', '💫', '🌷', '🤗', '🙏', '💖', '🌙', '🍃', '🌻', '💗'];

function pickEmojis(level: EmojiLevel): string {
  if (level === 'tanpa') return '';
  const count = level === 'sedikit' ? 2 : 5;
  const chosen: string[] = [];
  for (let i = 0; i < count; i++) chosen.push(EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)]);
  return chosen.join(' ');
}

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function buildOpening(style: Style, name: string, emojiStr: string): string {
  const e = emojiStr ? ` ${emojiStr.split(' ')[0]}` : '';
  switch (style) {
    case 'formal': return `Yth. ${name},\n\n`;
    case 'santai': return `Hai ${name}! 👋\n\n`;
    case 'hangat': return `Untuk ${name} tersayang,${e}\n\n`;
    case 'menyentuh': return `${name},\n\n`;
    case 'lucu': return `Hei ${name}! 🌟\n\n`;
    case 'puitis': return `Untukmu, ${name},\n\n`;
  }
}

function buildBody(input: ThankYouInput, emojiStr: string): string {
  const { relation, reason, memory, length, style } = input;
  const parts: string[] = [];
  const e = emojiStr ? ` ${emojiStr}` : '';

  const gratitudeLines = {
    formal: [
      `Saya ingin menyampaikan rasa terima kasih yang tulus kepada ${relation === 'Lainnya' ? 'Anda' : relation} atas ${reason}.`,
      `Penghargaaman ini saya sampaikan dengan penuh rasa hormat dan syukur.`,
    ],
    santai: [
      `Aku cuma mau bilang makasih banget ya, karena ${reason}.`,
      `Bener-bener nggak nyangka bisa ngerasain hal kayak gitu, dan itu partly karena kamu.`,
    ],
    hangat: [
      `Aku mau mengucapkan terima kasih dari hati yang paling dalam, karena ${reason}.`,
      `Kamu mungkin nggak sadar, tapi hal itu benar-benar berarti untukku.`,
    ],
    menyentuh: [
      `Ada banyak hal yang ingin aku katakan, tapi mungkin yang paling penting adalah: terima kasih, karena ${reason}.`,
      `Kadang satu hal kecil bisa mengubah segalanya, dan kamu sudah melakukan itu untukku tanpa kau sadari.`,
    ],
    lucu: [
      `Jadi gini, aku lagi mikir banget sama ${reason}, dan aku akhirnya sadar: kamu itu bener-bener jago bikin hal jadi lebih baik!`,
      `Makasih ya udah jadi orang sekeren itu, gratis pula.`,
    ],
    puitis: [
      `Di antara semua hal yang berlalu, ada satu yang ingin kupegang erat: rasa syukur untukmu, karena ${reason}.`,
      `Seperti bunga yang mekar di musim semi, kebaikanmu tumbuh di hatiku tanpa kau ketahui.`,
    ],
  };

  const memoryLines = {
    formal: memory ? `Saya juga ingin menyampaikan apresiasi atas kenangan kita bersama, khususnya ${memory}. Hal tersebut meninggalkan kesan yang mendalam.` : '',
    santai: memory ? `Oh ya, aku masih inget banget waktu ${memory}. Moments kayak gitu yang bikin aku mikir, untung banget kenal kamu.` : '',
    hangat: memory ? `Aku masih ingat jelas ${memory}. Kenangan itu selalu menghangatkan hatiku setiap kali teringat.` : '',
    menyentuh: memory ? `Aku tidak akan pernah melupakan ${memory}. Saat itu, aku merasa benar-benar beruntung memiliki kamu dalam hidupku.` : '',
    lucu: memory ? `Terus yang lucu, aku masih inget waktu ${memory}. Kalau dipikir-pikir, kita emang cocok banget jadi team!` : '',
    puitis: memory ? `Masih terasa hangat ${memory}, seperti senja yang tak pernah benar-benar pergi.` : '',
  };

  const closingLines = {
    formal: `Saya berharap hubungan baik ini dapat terus terjaga. Sekali lagi, terima kasih.`,
    santai: `Pokoknya makasih banyak ya! Jangan bosan-bosan jadi orang baik kayak gitu. 🙌`,
    hangat: `Sekali lagi, terima kasih sudah hadir dalam hidupku. Kamu berarti lebih dari yang kamu tahu.${e}`,
    menyentuh: `Terima kasih, sudah menjadi bagian dari ceritaku. Semoga kamu selalu diberikan kebahagiaan sebesar yang kamu berikan kepadaku.`,
    lucu: `Yaudah gitu aja, makasih banyak! Jangan lupa traktir balik ya 😆`,
    puitis: `Terima kasih, untuk segalanya. Semoga waktu selalu berpihak pada kita yang baik satu sama lain.`,
  };

  parts.push(gratitudeLines[style][0]);
  if (length !== 'singkat') parts.push(gratitudeLines[style][1]);
  if (memory && memoryLines[style]) parts.push(memoryLines[style]);
  if (length === 'panjang') {
    parts.push(style === 'puitis'
      ? 'Setiap pertemuan meninggalkan jejak, dan jejakmu adalah yang paling indah pernah kukenal.'
      : 'Aku harap kamu tahu, bahwa kehadiranmu bukan sesuatu yang biasa bagiku. Kamu membuat hari-hari terasa lebih ringan.');
  }
  parts.push(closingLines[style]);

  return parts.join('\n\n');
}

function buildClosing(style: Style, emojiStr: string): string {
  const e = emojiStr ? ` ${emojiStr}` : '';
  switch (style) {
    case 'formal': return `\n\nHormat saya,`;
    case 'santai': return `\n\nSalam hangat dari aku,${e}`;
    case 'hangat': return `\n\nDengan cinta,${e}`;
    case 'menyentuh': return `\n\nSelalu,${e}`;
    case 'lucu': return `\n\nSalam satu jempol!${e}`;
    case 'puitis': return `\n\n—dengan tulus,${e}`;
  }
}

export function generateThankYou(input: ThankYouInput): string {
  const emojiStr = pickEmojis(input.emoji);
  const opening = buildOpening(input.style, input.name, emojiStr);
  const body = buildBody(input, emojiStr);
  const closing = buildClosing(input.style, emojiStr);
  return opening + body + closing;
}
