import React from 'react';
import LandingLayout from '@/components/public/layout/LandingLayout';

export default function PublicRootLayout({ children }: { children: React.ReactNode }) {
  return <LandingLayout>{children}</LandingLayout>;
}
