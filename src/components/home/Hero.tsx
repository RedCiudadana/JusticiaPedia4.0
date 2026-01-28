import React from 'react';
import HeroSlider from '../ui/HeroSlider';
import slide1 from '../../assets/SLIDER_BANNERS/JP-01.png';

const Hero: React.FC = () => {
  const slides = [
    {
      title: 'Justiciapedia',
      description: 'Una plataforma ciudadana para conocer, entender y vigilar el sector justicia en Guatemala. Accede a información transparente sobre aspirantes, comisiones e instituciones.',
      imageUrl: slide1,
    },
    {
      title: 'Transparencia en la Justicia',
      description: 'Conoce a los aspirantes a cargos judiciales, sus trayectorias y calificaciones. Información verificada al alcance de todos.',
      imageUrl: slide1,
    },
    {
      title: 'Vigilancia Ciudadana',
      description: 'Monitorea los procesos de selección de autoridades judiciales. Tu participación fortalece la democracia.',
      imageUrl: slide1,
    },
  ];

  return (
    <div className="relative -mt-8">
      <HeroSlider slides={slides} autoplayInterval={8000} />
    </div>
  );
};

export default Hero;
