import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-200 shadow-soft hover:shadow-medium active:scale-95',
    secondary: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus-visible:ring-neutral-200 shadow-soft hover:shadow-medium active:scale-95',
    outline: 'border-2 border-primary-600 bg-transparent text-primary-600 hover:bg-primary-600 hover:text-white focus-visible:ring-primary-200 active:scale-95',
    ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-200 active:scale-95',
    danger: 'bg-error-600 text-white hover:bg-error-700 focus-visible:ring-error-200 shadow-soft hover:shadow-medium active:scale-95',
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm rounded-lg',
    md: 'h-11 px-4 py-2 text-sm rounded-lg',
    lg: 'h-12 px-6 py-3 text-base rounded-xl',
    xl: 'h-14 px-8 py-4 text-lg rounded-xl',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button 
      className={classes} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

export default Button;