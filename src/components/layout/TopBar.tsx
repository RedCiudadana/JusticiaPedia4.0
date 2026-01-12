import React from 'react';
import { Twitter, Instagram, Mail, Phone, Youtube } from 'lucide-react';
import Container from '../ui/Container';
import { SOCIAL_LINKS } from '../../utils/constants';

const TikTokIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const TopBar: React.FC = () => {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter size={14} />;
      case 'instagram':
        return <Instagram size={14} />;
      case 'tiktok':
        return <TikTokIcon size={14} />;
      case 'youtube':
        return <Youtube size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900 text-white py-2.5 text-sm border-b border-slate-700 fixed top-0 left-0 right-0 z-50">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-slate-300 text-xs font-medium">Una iniciativa de</span>
            <span className="text-white font-semibold">Red Ciudadana</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-300 text-xs mr-2 hidden md:inline font-medium">Síguenos:</span>
            <div className="flex items-center space-x-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = getSocialIcon(social.platform);
                return Icon ? (
                  <a
                    key={social.platform}
                    href={social.href}
                    className="hover:text-blue-300 transition-all duration-200 transform hover:scale-110 p-1.5 rounded-md hover:bg-slate-800"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Seguir a Red Ciudadana en ${social.platform}`}
                    title={`Seguir a Red Ciudadana en ${social.platform}`}
                  >
                    {Icon}
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopBar;