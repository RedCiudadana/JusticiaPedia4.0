export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  imageUrl: string;
  category: string;
  author?: string;
  readTime?: number;
  views?: number;
  featured?: boolean;
  tags?: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Proceso de selección para la Corte Suprema de Justicia inicia en marzo',
    excerpt: 'La Comisión de Postulación ha establecido el calendario para el proceso de selección de magistrados de la CSJ, con importantes cambios en los criterios de evaluación.',
    date: '2024-02-15',
    imageUrl: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg',
    category: 'Procesos de Selección',
    author: 'María González',
    readTime: 5,
    views: 1250,
    featured: true,
    tags: ['CSJ', 'magistrados', 'selección', 'comisión']
  },
  {
    id: '2',
    title: 'Análisis: Los desafíos de la independencia judicial en Guatemala',
    excerpt: 'Un estudio detallado sobre los retos que enfrenta el sistema judicial guatemalteco para mantener su independencia frente a presiones políticas y económicas.',
    date: '2024-02-10',
    imageUrl: 'https://images.pexels.com/photos/5668481/pexels-photo-5668481.jpeg',
    category: 'Análisis',
    author: 'Dr. Carlos Mendoza',
    readTime: 12,
    views: 890,
    featured: true,
    tags: ['independencia', 'análisis', 'sistema judicial', 'política']
  },
  {
    id: '3',
    title: 'Entrevista con expertos: El futuro de la justicia en Guatemala',
    excerpt: 'Conversamos con destacados juristas sobre las perspectivas del sistema judicial guatemalteco y las reformas necesarias para fortalecerlo.',
    date: '2024-02-05',
    imageUrl: 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg',
    category: 'Entrevistas',
    author: 'Ana Rodríguez',
    readTime: 8,
    views: 675,
    featured: true,
    tags: ['entrevista', 'expertos', 'futuro', 'reformas']
  },
  {
    id: '4',
    title: 'Nuevos criterios de transparencia en las comisiones de postulación',
    excerpt: 'Las comisiones implementan medidas adicionales para garantizar mayor transparencia en los procesos de selección de autoridades judiciales.',
    date: '2024-01-28',
    imageUrl: 'https://images.pexels.com/photos/8111965/pexels-photo-8111965.jpeg',
    category: 'Noticias',
    author: 'Luis Hernández',
    readTime: 6,
    views: 542,
    tags: ['transparencia', 'comisiones', 'criterios', 'selección']
  },
  {
    id: '5',
    title: 'Perfil: Los candidatos más destacados para la Corte de Constitucionalidad',
    excerpt: 'Análisis de los perfiles académicos y profesionales de los principales candidatos a magistrados de la CC.',
    date: '2024-01-22',
    imageUrl: 'https://images.pexels.com/photos/5325105/pexels-photo-5325105.jpeg',
    category: 'Reportajes',
    author: 'Patricia Morales',
    readTime: 10,
    views: 1100,
    tags: ['candidatos', 'CC', 'perfiles', 'magistrados']
  },
  {
    id: '6',
    title: 'La importancia de la participación ciudadana en la justicia',
    excerpt: 'Cómo los ciudadanos pueden involucrarse activamente en el fortalecimiento del sistema judicial guatemalteco.',
    date: '2024-01-18',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    category: 'Opinión',
    author: 'Roberto Silva',
    readTime: 7,
    views: 423,
    tags: ['participación', 'ciudadanía', 'justicia', 'democracia']
  },
  {
    id: '7',
    title: 'Tecnología y modernización en el sistema judicial',
    excerpt: 'Las iniciativas de digitalización que están transformando la administración de justicia en Guatemala.',
    date: '2024-01-15',
    imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    category: 'Noticias',
    author: 'Carmen López',
    readTime: 9,
    views: 789,
    tags: ['tecnología', 'modernización', 'digitalización', 'eficiencia']
  },
  {
    id: '8',
    title: 'Presupuesto judicial 2024: Análisis de la asignación de recursos',
    excerpt: 'Desglose detallado del presupuesto asignado al Organismo Judicial y su distribución entre las diferentes instituciones.',
    date: '2024-01-10',
    imageUrl: 'https://images.pexels.com/photos/3760778/pexels-photo-3760778.jpeg',
    category: 'Análisis',
    author: 'Fernando Castro',
    readTime: 11,
    views: 634,
    tags: ['presupuesto', 'recursos', 'organismo judicial', '2024']
  },
  {
    id: '9',
    title: 'Capacitación judicial: Programas de formación continua',
    excerpt: 'Los programas de capacitación que fortalecen las competencias de jueces y magistrados en Guatemala.',
    date: '2024-01-05',
    imageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    category: 'Noticias',
    author: 'Mónica Pérez',
    readTime: 6,
    views: 456,
    tags: ['capacitación', 'formación', 'jueces', 'competencias']
  },
  {
    id: '10',
    title: 'Retos de la justicia penal en casos de corrupción',
    excerpt: 'Análisis de los desafíos que enfrenta el sistema penal guatemalteco en la persecución de delitos de corrupción.',
    date: '2023-12-28',
    imageUrl: 'https://images.pexels.com/photos/5668879/pexels-photo-5668879.jpeg',
    category: 'Análisis',
    author: 'Diego Ramírez',
    readTime: 13,
    views: 1050,
    tags: ['justicia penal', 'corrupción', 'persecución', 'desafíos']
  },
  {
    id: '11',
    title: 'Entrevista: Fiscal General habla sobre prioridades 2024',
    excerpt: 'La Fiscal General comparte su visión sobre las prioridades del Ministerio Público para el año 2024.',
    date: '2023-12-20',
    imageUrl: 'https://images.pexels.com/photos/8112111/pexels-photo-8112111.jpeg',
    category: 'Entrevistas',
    author: 'Alejandra Vásquez',
    readTime: 15,
    views: 892,
    tags: ['fiscal general', 'MP', 'prioridades', 'entrevista']
  },
  {
    id: '12',
    title: 'Acceso a la justicia en comunidades rurales',
    excerpt: 'Los esfuerzos para garantizar que las comunidades rurales tengan acceso efectivo al sistema de justicia.',
    date: '2023-12-15',
    imageUrl: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg',
    category: 'Reportajes',
    author: 'Sandra Morales',
    readTime: 8,
    views: 567,
    tags: ['acceso', 'justicia', 'rural', 'comunidades']
  },
  {
    id: '13',
    title: 'Balance 2023: Logros y desafíos del sistema judicial',
    excerpt: 'Un recuento de los principales logros y retos que enfrentó el sistema judicial guatemalteco durante 2023.',
    date: '2023-12-10',
    imageUrl: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg',
    category: 'Análisis',
    author: 'Jorge Mendoza',
    readTime: 14,
    views: 1200,
    featured: false,
    tags: ['balance', '2023', 'logros', 'desafíos']
  },
  {
    id: '14',
    title: 'Innovación en la resolución de conflictos',
    excerpt: 'Nuevos métodos alternativos de resolución de conflictos que se implementan en el sistema judicial.',
    date: '2023-12-05',
    imageUrl: 'https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg',
    category: 'Noticias',
    author: 'Elena Ruiz',
    readTime: 7,
    views: 445,
    tags: ['innovación', 'resolución', 'conflictos', 'métodos alternativos']
  },
  {
    id: '15',
    title: 'La carrera judicial: Oportunidades y requisitos',
    excerpt: 'Guía completa sobre cómo ingresar y desarrollarse en la carrera judicial guatemalteca.',
    date: '2023-11-28',
    imageUrl: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg',
    category: 'Reportajes',
    author: 'Miguel Torres',
    readTime: 12,
    views: 723,
    tags: ['carrera judicial', 'oportunidades', 'requisitos', 'desarrollo']
  }
];