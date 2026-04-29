import type { Metadata } from 'next';
import { APP_NAME } from '@/shared/config/constants';
import './globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Feature-first 아키텍처로 만든 Todo 앱 예시',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
