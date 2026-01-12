import React, { useEffect } from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import FeedbackButton from '../ui/FeedbackButton';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'JusticiapedIA', 
  description = 'Transparencia en los procesos de designación de autoridades judiciales en Guatemala' 
}) => {
  useEffect(() => {
    // Update the document title
    const defaultTitle = document.querySelector('title[data-default]');
    if (defaultTitle) {
      defaultTitle.textContent = title;
    }

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [title, description]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Navbar />
      <main className="flex-grow pt-[130px]">
        {children}
      </main>
      <Footer />
      <FeedbackButton />
    </div>
  );
};

export default Layout;