import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import Button from './Button';

const NavigateToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed right-6 bottom-24 z-40">
      <Button
        onClick={scrollToTop}
        className="bg-primary-600 hover:bg-primary-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Ir arriba"
      >
        <ChevronUp size={24} />
      </Button>
    </div>
  );
};

export default NavigateToTopButton;