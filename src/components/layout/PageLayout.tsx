import React from 'react';
import Layout from './Layout';
import Container from '../ui/Container';
import PageHeader from '../ui/PageHeader';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  headerClassName = '',
  contentClassName = '',
}) => {
  const normalizedTitle = title?.trim();
  const normalizedDescription = description?.trim();
  const showHeader = Boolean(normalizedTitle || normalizedDescription);
  const contentSpacing = showHeader ? 'pb-12 -mt-8' : 'pb-12';

  return (
    <Layout
      title={normalizedTitle || undefined}
      description={normalizedDescription || undefined}
    >
      <Container>
        {showHeader && (
          <PageHeader
            title={normalizedTitle}
            description={normalizedDescription}
            className={headerClassName}
          />
        )}
        <div className={`${contentSpacing} ${contentClassName}`}>{children}</div>
      </Container>
    </Layout>
  );
};

export default PageLayout;
