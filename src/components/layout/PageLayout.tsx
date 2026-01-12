import React from 'react';
import Layout from './Layout';
import Container from '../ui/Container';
import PageHeader from '../ui/PageHeader';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
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
  return (
    <Layout title={title} description={description}>
      <Container>
        <PageHeader
          title={title}
          description={description}
          className={headerClassName}
        />
        <div className={`pb-12 -mt-8 ${contentClassName}`}>{children}</div>
      </Container>
    </Layout>
  );
};

export default PageLayout;