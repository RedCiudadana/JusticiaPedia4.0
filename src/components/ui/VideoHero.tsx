import React from 'react';
import Container from './Container';

interface VideoHeroProps {
  title: string;
  subtitle?: string;
  videoUrl?: string;
  overlayOpacity?: number;
}

const VideoHero: React.FC<VideoHeroProps> = ({
  title,
  subtitle,
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-people-working-in-an-office-4612-large.mp4',
  overlayOpacity = 0.6
}) => {
  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-justice-900">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/60 to-black/70"
        style={{ opacity: overlayOpacity }}
      />

      <div className="relative h-full flex items-center">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-md">
                {subtitle}
              </p>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default VideoHero;

