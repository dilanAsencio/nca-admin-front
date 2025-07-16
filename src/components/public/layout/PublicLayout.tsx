import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import './style.css';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => (
  <div className="custom-layout min-h-screen flex flex-col w-full absolute left-0 py-8
    px-[1rem]
    md:px-[2rem]
    lg:px-[7.5rem]">
    <Header />
    <main className="flex-1 w-full mx-auto">
      {children}
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
