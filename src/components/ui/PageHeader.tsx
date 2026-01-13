import React from 'react';

interface PageHeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`py-8 border-b border-neutral-200 mb-16 ${className}`}>
      {title && (
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">{title}</h1>
      )}
      {description && (
        <p className="text-lg text-neutral-600 max-w-3xl">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;

