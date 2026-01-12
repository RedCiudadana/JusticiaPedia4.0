import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  variant = 'default'
}) => {
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white shadow-soft hover:shadow-medium border border-neutral-200',
    elevated: 'bg-white shadow-medium hover:shadow-strong border border-neutral-200',
    outlined: 'bg-white border-2 border-neutral-300 hover:border-primary-300 hover:shadow-soft',
    glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-soft hover:shadow-medium',
  };

  const interactiveClasses = onClick ? 'cursor-pointer hover:-translate-y-1 active:scale-98' : '';

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 border-b border-neutral-200 bg-neutral-50/50 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 border-t border-neutral-200 bg-neutral-50/50 ${className}`}>
      {children}
    </div>
  );
};

export default Card;