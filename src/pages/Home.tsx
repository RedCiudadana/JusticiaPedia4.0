import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import FeatureBlocks from '../components/home/FeatureBlocks';
import FeaturedSection from '../components/home/FeaturedSection';
import StatsSection from '../components/home/StatsSection';
import NewsSection from '../components/home/NewsSection';

const Home: React.FC = () => {
  const featuredInstitutions = [
    {
      id: 'institution-1',
      title: 'Corte Suprema de Justicia',
      description: 'Máximo tribunal de justicia en Guatemala, responsable de garantizar el estado de derecho.',
      imageUrl: 'https://raw.githubusercontent.com/RedCiudadana/Instituciones-Justiciapedia/gh-pages/1.-Corte-Suprema-de-Justicia-(CSJ).png',
      link: '/instituciones/institution-1',
    },
    {
      id: 'institution-6',
      title: 'Corte de Constitucionalidad',
      description: 'Tribunal permanente con funciones específicas en materia constitucional.',
      imageUrl: 'https://raw.githubusercontent.com/RedCiudadana/Instituciones-Justiciapedia/gh-pages/6.-Corte-de-Constitucionalidad-(CC).png',
      link: '/instituciones/institution-6',
    },
    {
      id: 'institution-7',
      title: 'Ministerio Público',
      description: 'Institución auxiliar de la administración de justicia, responsable de la acción penal pública.',
      imageUrl: 'https://raw.githubusercontent.com/RedCiudadana/Instituciones-Justiciapedia/gh-pages/7.-Ministerio-Publico-(MP).png',
      link: '/instituciones/institution-7',
    },
  ];

  return (
    <Layout>
      <Hero />
      <AboutSection />
      <FeatureBlocks />
      
      <FeaturedSection 
        title="Instituciones de Justicia" 
        description="Conoce las principales instituciones del sistema de justicia en Guatemala."
        items={featuredInstitutions}
        viewAllLink="/instituciones"
      />
      
      <StatsSection />

      <NewsSection />
    </Layout>
  );
};

export default Home;