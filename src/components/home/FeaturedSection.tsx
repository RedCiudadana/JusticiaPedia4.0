import React from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import Container from '../ui/Container';
import Card, { CardContent } from '../ui/Card';

interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface FeaturedSectionProps {
  title: string;
  description?: string;
  items: FeaturedItem[];
  viewAllLink?: string;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title,
  description,
  items,
  viewAllLink,
}) => {
  const handleItemClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-justice-50 rounded-full mb-4">
              <Building2 size={18} className="text-justice-600" />
              <span className="text-sm font-semibold text-justice-700">Destacado</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-neutral-600 max-w-2xl">{description}</p>
            )}
          </div>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Ver todos
              <ArrowRight size={18} />
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card
              key={item.id}
              className="group h-full flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl border-2 border-neutral-100 hover:border-justice-200 overflow-hidden"
              onClick={() => handleItemClick(item.link)}
            >
              <div className="h-52 overflow-hidden relative bg-neutral-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="flex-1 flex flex-col p-6 bg-white">
                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-600 mb-4 flex-1 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center gap-1 text-primary-600 font-semibold text-sm pt-4 border-t border-neutral-100 group-hover:gap-2 transition-all">
                  <span>Más información</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedSection;
