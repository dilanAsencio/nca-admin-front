import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import './style.css';
import { LandingProvider } from '@/providers/landing-context';
import { TenantProvider } from '@/providers/tenant-context';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => (
  <div className="custom-layout min-h-screen flex flex-col w-full absolute left-0 py-8
    px-[1rem]
    md:px-[2rem]
    lg:px-[7.5rem]">
        <LandingProvider>
          <Header />
          <main className="flex-1 w-full mx-auto">
            {children}
          </main>
          <Footer />
        </LandingProvider>
  </div>
);

export default LandingLayout;
