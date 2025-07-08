import React from 'react';
import PublicLayout from '@/components/public/layout/PublicLayout';

export default function PublicRootLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
