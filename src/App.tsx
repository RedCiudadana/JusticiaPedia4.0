import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './components/ui/Loading';

const Home = lazy(() => import('./pages/Home'));
const Institutions = lazy(() => import('./pages/Institutions'));
const InstitutionProfile = lazy(() => import('./pages/InstitutionProfile'));
const Commissions = lazy(() => import('./pages/Commissions'));
const CommissionProfile = lazy(() => import('./pages/CommissionProfile'));
const Candidates = lazy(() => import('./pages/Candidates'));
const CandidateProfile = lazy(() => import('./pages/CandidateProfile'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Documentation = lazy(() => import('./pages/Documentation'));
const News = lazy(() => import('./pages/News'));
const NewsArticle = lazy(() => import('./pages/NewsArticle'));
const SearchPage = lazy(() => import('./pages/Search'));
const NotFound = lazy(() => import('./pages/NotFound'));
const About = lazy(() => import('./pages/About'));
const WhatIsJusticiapedia = lazy(() => import('./pages/WhatIsJusticiapedia'));
const OpenData = lazy(() => import('./pages/OpenData'));
const Learn = lazy(() => import('./pages/Learn'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Resources = lazy(() => import('./pages/Resources'));

function App() {
  React.useEffect(() => {
    document.documentElement.style.setProperty('--color-primary-50', '#f0f4f8');
    document.documentElement.style.setProperty('--color-primary-100', '#d9e2ec');
    document.documentElement.style.setProperty('--color-primary-200', '#bcccdc');
    document.documentElement.style.setProperty('--color-primary-300', '#9fb3c8');
    document.documentElement.style.setProperty('--color-primary-400', '#829ab1');
    document.documentElement.style.setProperty('--color-primary-500', '#627d98');
    document.documentElement.style.setProperty('--color-primary-600', '#486581');
    document.documentElement.style.setProperty('--color-primary-700', '#334e68');
    document.documentElement.style.setProperty('--color-primary-800', '#243b53');
    document.documentElement.style.setProperty('--color-primary-900', '#102a43');
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading fullScreen text="" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instituciones" element={<Institutions />} />
          <Route path="/instituciones/:institutionId" element={<InstitutionProfile />} />
          <Route path="/comisiones" element={<Commissions />} />
          <Route path="/comisiones/:commissionId" element={<CommissionProfile />} />
          <Route path="/candidatos" element={<Candidates />} />
          <Route path="/candidatos/:candidateId" element={<CandidateProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documentacion" element={<Documentation />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/noticias/:articleId" element={<NewsArticle />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/acerca" element={<About />} />
          <Route path="/que-es-justiciapedia" element={<WhatIsJusticiapedia />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/legal/privacidad" element={<Privacy />} />
          <Route path="/legal/terminos" element={<Terms />} />
          <Route path="/legal/cookies" element={<Cookies />} />
          <Route path="/recursos/datos" element={<OpenData />} />
          <Route path="/aprende" element={<Learn />} />
          <Route path="/recursos/informes" element={<Resources />} />
          <Route path="/recursos/biblioteca" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
