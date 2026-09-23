import { Prompt } from 'next/font/google';
import './globals.css';

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'ล่าหมา หมาล่า',
  description: 'ระบบสั่งอาหารร้านหมาล่า ล่าหมา หมาล่า',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={prompt.className}>{children}</body>
    </html>
  );
}
