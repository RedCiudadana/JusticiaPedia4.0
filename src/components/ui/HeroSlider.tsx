import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Scale, ArrowRight } from 'lucide-react';

interface Slide {
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  backgroundColor?: string;
  link?: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoplayInterval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  autoplayInterval = 5000
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoplayInterval]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.play().catch(err => console.log('Video play failed:', err));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {slide.videoUrl ? (
            <div className="absolute inset-0">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src={slide.videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/70 to-secondary-900/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
            </div>
          ) : slide.imageUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/70 to-secondary-900/60" />
            </div>
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900"
            />
          )}

          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6 md:px-8">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                  <Scale size={18} className="text-justice-400" />
                  <span className="text-sm font-semibold text-white/90">Plataforma de Transparencia Judicial</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                  {slide.title}
                </h2>

                <p className="text-lg md:text-xl lg:text-2xl text-white/85 mb-10 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/candidatos"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-justice-500 hover:bg-justice-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>Explorar Aspirantes</span>
                    <ArrowRight size={20} />
                  </a>
                  <a
                    href="/que-es-justiciapedia"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
                  >
                    <span>Conocer más</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-10 h-3 bg-justice-500 rounded-full'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </div>
  );
};

export default HeroSlider;
