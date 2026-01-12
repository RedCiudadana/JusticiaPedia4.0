import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Institutions from './pages/Institutions';
import InstitutionProfile from './pages/InstitutionProfile';
import Commissions from './pages/Commissions';
import CommissionProfile from './pages/CommissionProfile';
import Candidates from './pages/Candidates';
import CandidateProfile from './pages/CandidateProfile';
import Dashboard from './pages/Dashboard';
import Documentation from './pages/Documentation';
import News from './pages/News';
import NewsArticle from './pages/NewsArticle';
import SearchPage from './pages/Search';
import NotFound from './pages/NotFound';
import About from './pages/About';
import WhatIsJusticiapedia from './pages/WhatIsJusticiapedia';
import OpenData from './pages/OpenData';
import Learn from './pages/Learn';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Resources from './pages/Resources';

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
    </BrowserRouter>
  );
}

export default App;
