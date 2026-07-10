export interface Template {
  id: number;
  name: string;
  bg: string;          // background CSS (gradient or color)
  cardBg: string;      // inner card background
  text: string;        // main text color
  accent: string;      // accent color
  font: string;        // font family
  decoration?: string; // emoji or symbol decoration
  border?: string;     // border color
}

export const TEMPLATES: Template[] = [
  { id: 1, name: 'Minimal White', bg: '#FFFFFF', cardBg: '#FAFAFA', text: '#2F2F2F', accent: '#6C63FF', font: 'Plus Jakarta Sans', decoration: '✦', border: '#E5E5E5' },
  { id: 2, name: 'Love Pink', bg: 'linear-gradient(135deg,#FFE4EC,#FFC4D6)', cardBg: 'rgba(255,255,255,0.85)', text: '#8B3A5A', accent: '#E85A8A', font: 'Poppins', decoration: '💗' },
  { id: 3, name: 'Romantic Red', bg: 'linear-gradient(135deg,#FFD0D0,#FFB3B3)', cardBg: 'rgba(255,255,255,0.9)', text: '#A02828', accent: '#D93030', font: 'Poppins', decoration: '❤️' },
  { id: 4, name: 'Sakura', bg: 'linear-gradient(135deg,#FFF0F5,#FFDFE5)', cardBg: 'rgba(255,255,255,0.85)', text: '#9B4A6B', accent: '#FF8FA3', font: 'Poppins', decoration: '🌸' },
  { id: 5, name: 'Tulip', bg: 'linear-gradient(135deg,#FFF5E6,#FFE4CC)', cardBg: 'rgba(255,255,255,0.85)', text: '#9C5A1E', accent: '#FF9F45', font: 'Poppins', decoration: '🌷' },
  { id: 6, name: 'Daisy', bg: 'linear-gradient(135deg,#FFFDE7,#FFF59D)', cardBg: 'rgba(255,255,255,0.85)', text: '#7D6B0F', accent: '#FBC02D', font: 'Poppins', decoration: '🌼' },
  { id: 7, name: 'Sunflower', bg: 'linear-gradient(135deg,#FFF9C4,#FFD54F)', cardBg: 'rgba(255,255,255,0.85)', text: '#6D5A0F', accent: '#FFA000', font: 'Poppins', decoration: '🌻' },
  { id: 8, name: 'Rose', bg: 'linear-gradient(135deg,#FCE4EC,#F8BBD0)', cardBg: 'rgba(255,255,255,0.85)', text: '#9C2842', accent: '#E91E63', font: 'Poppins', decoration: '🌹' },
  { id: 9, name: 'Floral Garden', bg: 'linear-gradient(135deg,#F3E5F5,#E1BEE7)', cardBg: 'rgba(255,255,255,0.85)', text: '#6A1B9A', accent: '#AB47BC', font: 'Poppins', decoration: '🌺' },
  { id: 10, name: 'Botanical', bg: 'linear-gradient(135deg,#E8F5E9,#C8E6C9)', cardBg: 'rgba(255,255,255,0.85)', text: '#2E7D32', accent: '#66BB6A', font: 'Plus Jakarta Sans', decoration: '🌿' },
  { id: 11, name: 'Green Nature', bg: 'linear-gradient(135deg,#E0F2F1,#B2DFDB)', cardBg: 'rgba(255,255,255,0.85)', text: '#00695C', accent: '#26A69A', font: 'Plus Jakarta Sans', decoration: '🍃' },
  { id: 12, name: 'Butterfly', bg: 'linear-gradient(135deg,#F3E5F5,#E1BEE7)', cardBg: 'rgba(255,255,255,0.85)', text: '#7B1FA2', accent: '#BA68C8', font: 'Poppins', decoration: '🦋' },
  { id: 13, name: 'Sky Blue', bg: 'linear-gradient(135deg,#E3F2FD,#BBDEFB)', cardBg: 'rgba(255,255,255,0.85)', text: '#1565C0', accent: '#42A5F5', font: 'Plus Jakarta Sans', decoration: '☁️' },
  { id: 14, name: 'Moon & Stars', bg: 'linear-gradient(135deg,#1A1A2E,#16213E)', cardBg: 'rgba(255,255,255,0.1)', text: '#E0E0E0', accent: '#FFD700', font: 'Poppins', decoration: '🌙', border: 'rgba(255,215,0,0.3)' },
  { id: 15, name: 'Aesthetic Beige', bg: 'linear-gradient(135deg,#F5F0E8,#E8DCC8)', cardBg: 'rgba(255,255,255,0.7)', text: '#6D5D4E', accent: '#B89B72', font: 'Plus Jakarta Sans', decoration: '🤎' },
  { id: 16, name: 'Coquette', bg: 'linear-gradient(135deg,#FFE4EC,#FFD1DC)', cardBg: 'rgba(255,255,255,0.85)', text: '#C44B7A', accent: '#FF6B9D', font: 'Poppins', decoration: '🎀' },
  { id: 17, name: 'Vintage Letter', bg: 'linear-gradient(135deg,#F5E6CA,#E8D5A8)', cardBg: 'rgba(255,255,255,0.6)', text: '#5D4A2F', accent: '#A0855B', font: 'Poppins', decoration: '✉️', border: '#D4C4A0' },
  { id: 18, name: 'Soft Cream', bg: 'linear-gradient(135deg,#FFF8E1,#FFF3CD)', cardBg: 'rgba(255,255,255,0.85)', text: '#7A6A4F', accent: '#D4B860', font: 'Plus Jakarta Sans', decoration: '🧈' },
  { id: 19, name: 'Lavender', bg: 'linear-gradient(135deg,#F3E5F5,#EDE7F6)', cardBg: 'rgba(255,255,255,0.85)', text: '#5E35B1', accent: '#9575CD', font: 'Poppins', decoration: '💜' },
  { id: 20, name: 'Ocean Blue', bg: 'linear-gradient(135deg,#E0F7FA,#B2EBF2)', cardBg: 'rgba(255,255,255,0.85)', text: '#00838F', accent: '#26C6DA', font: 'Plus Jakarta Sans', decoration: '🌊' },
  { id: 21, name: 'Watercolor', bg: 'linear-gradient(135deg,#FCE4EC,#E3F2FD,#E8F5E9)', cardBg: 'rgba(255,255,255,0.8)', text: '#455A64', accent: '#7986CB', font: 'Poppins', decoration: '🎨' },
  { id: 22, name: 'Pastel', bg: 'linear-gradient(135deg,#FFE4EC,#E3F2FD,#FFFDE7)', cardBg: 'rgba(255,255,255,0.8)', text: '#5D4037', accent: '#FFB74D', font: 'Poppins', decoration: '🍡' },
  { id: 23, name: 'Elegant Gold', bg: 'linear-gradient(135deg,#FFF8E1,#FFE082)', cardBg: 'rgba(255,255,255,0.85)', text: '#5D4A0F', accent: '#C5A028', font: 'Poppins', decoration: '✨', border: '#E6C567' },
  { id: 24, name: 'Wildflower', bg: 'linear-gradient(135deg,#F1F8E9,#DCEDC8)', cardBg: 'rgba(255,255,255,0.85)', text: '#558B2F', accent: '#9CCC65', font: 'Plus Jakarta Sans', decoration: '🌼' },
  { id: 25, name: 'Autumn', bg: 'linear-gradient(135deg,#FFF3E0,#FFCCBC)', cardBg: 'rgba(255,255,255,0.85)', text: '#BF360C', accent: '#FF7043', font: 'Poppins', decoration: '🍂' },
  { id: 26, name: 'Winter', bg: 'linear-gradient(135deg,#E8EAF6,#C5CAE9)', cardBg: 'rgba(255,255,255,0.85)', text: '#283593', accent: '#7986CB', font: 'Plus Jakarta Sans', decoration: '❄️' },
  { id: 27, name: 'Sunset', bg: 'linear-gradient(135deg,#FFCCBC,#FFAB91,#FFCC80)', cardBg: 'rgba(255,255,255,0.8)', text: '#BF360C', accent: '#FF6F00', font: 'Poppins', decoration: '🌅' },
  { id: 28, name: 'Cute Doodle', bg: 'linear-gradient(135deg,#FFFDE7,#FFF9C4)', cardBg: 'rgba(255,255,255,0.85)', text: '#6D5A0F', accent: '#FFB400', font: 'Poppins', decoration: '✏️' },
  { id: 29, name: 'Handwritten Paper', bg: 'linear-gradient(135deg,#FAF3E0,#F0E6C8)', cardBg: 'rgba(255,255,255,0.6)', text: '#5D4A2F', accent: '#A0855B', font: 'Poppins', decoration: '📝', border: '#D4C4A0' },
  { id: 30, name: 'Premium Thank You Card', bg: 'linear-gradient(135deg,#1A1A2E,#16213E)', cardBg: 'rgba(255,255,255,0.08)', text: '#F5E6CA', accent: '#D4AF37', font: 'Poppins', decoration: '🏆', border: 'rgba(212,175,55,0.4)' },
];
