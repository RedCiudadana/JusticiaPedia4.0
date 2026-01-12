import React from 'react';
import Layout from './Layout';
import Container from '../ui/Container';

interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  headerContent?: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  title,
  subtitle,
  imageUrl,
  headerContent,
}) => {
  return (
    <Layout title={title}>
      <div className="bg-gradient-to-b from-primary-600 to-primary-800 text-white py-12">
        <Container>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {imageUrl && (
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
              {subtitle && (
                <p className="text-xl text-white/80 mb-4">{subtitle}</p>
              )}
              {headerContent}
            </div>
          </div>
        </Container>
      </div>
      <Container className="py-8 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">{children}</div>
      </Container>
    </Layout>
  );
};

export default ProfileLayout;