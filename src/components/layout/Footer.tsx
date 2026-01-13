import React from 'react';
import { Twitter, Instagram, Scale, ExternalLink, Youtube } from 'lucide-react';
import { FOOTER_SECTIONS, SOCIAL_LINKS, SITE_NAME } from '../../utils/constants';
import Container from '../ui/Container';
import Logo from '../../assets/logorednegro.png';

const TikTokIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter size={20} />;
      case 'instagram':
        return <Instagram size={20} />;
      case 'tiktok':
        return <TikTokIcon size={20} />;
      case 'youtube':
        return <Youtube size={20} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer Content */}
      <div>
        <Container className="section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* About Site */}
            <div className="lg:col-span-1">
              <img src={Logo} alt={SITE_NAME} className="h-10 mb-4" style={{ filter: 'invert(100%)' }}/>
              <p className="text-primary-50 mb-6 leading-relaxed">
                Plataforma cívica dedicada a promover la transparencia en los procesos de
                designación de autoridades judiciales en Guatemala.
              </p>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = getSocialIcon(social.platform);
                  return Icon ? (
                    <a
                      key={social.platform}
                      href={social.href}
                      className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Seguir en ${social.platform}`}
                    >
                      {Icon}
                    </a>
                  ) : null;
                })}
              </div>
            </div>

            {/* Footer Sections */}
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold mb-6 text-white">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-primary-50 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <span>{link.title}</span>
                        <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;