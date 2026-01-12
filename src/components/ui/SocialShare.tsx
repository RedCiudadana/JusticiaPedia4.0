import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link, Check, MessageCircle } from 'lucide-react';
import Button from './Button';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  variant?: 'buttons' | 'dropdown';
}

const SocialShare: React.FC<SocialShareProps> = ({
  url = window.location.href,
  title = document.title,
  description = '',
  className = '',
  variant = 'dropdown'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600 hover:text-white',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-sky-500 hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-700 hover:text-white',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-green-600 hover:text-white',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const openSocialLink = (socialUrl: string) => {
    window.open(socialUrl, '_blank', 'width=600,height=400');
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <Button
              key={social.name}
              variant="outline"
              size="sm"
              onClick={() => openSocialLink(social.url)}
              className={`transition-colors ${social.color}`}
              aria-label={`Compartir en ${social.name}`}
            >
              <Icon size={16} />
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="transition-colors hover:bg-gray-600 hover:text-white"
          aria-label="Copiar enlace"
        >
          {copied ? <Check size={16} /> : <Link size={16} />}
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
      >
        <Share2 size={16} className="mr-1" />
        Compartir
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={() => {
                      openSocialLink(social.url);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 transition-colors ${social.color}`}
                  >
                    <Icon size={16} className="mr-3" />
                    Compartir en {social.name}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  copyToClipboard();
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={16} className="mr-3 text-green-600" />
                    ¡Enlace copiado!
                  </>
                ) : (
                  <>
                    <Link size={16} className="mr-3" />
                    Copiar enlace
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialShare;