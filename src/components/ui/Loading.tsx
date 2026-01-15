import React from 'react';
import loader from '../../assets/loader.gif';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'xl',
  text = 'Cargando...',
  fullScreen = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <img src={loader} alt="Loading" className={`${sizeClasses[size]}`} />
      {text && (
        <p className={`${textSizeClasses[size]} text-neutral-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;

