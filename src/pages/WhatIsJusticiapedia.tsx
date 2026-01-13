import React, { useState } from 'react';
import { AlertCircle, Target, Eye, Users, Shield, BookOpen, TrendingUp, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';

const WhatIsJusticiapedia: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const problems = [
    {
      icon: AlertCircle,
      title: 'Desinterés ciudadano',
      description: 'Falta de participación en procesos clave'
    },
    {
      icon: Eye,
      title: 'Baja comprensión',
      description: 'Desconocimiento del funcionamiento institucional'
    },
    {
      icon: Shield,
      title: 'Débil control social',
      description: 'Limitada capacidad de vigilancia ciudadana'
    },
    {
      icon: Users,
      title: 'Desconfianza institucional',
      description: 'Pérdida de credibilidad en las instituciones'
    },
    {
      icon: TrendingUp,
      title: 'Normalización de la impunidad',
      description: 'Aceptación pasiva de prácticas irregulares'
    }
  ];

  const objectives = [
    {
      icon: Users,
      title: 'Acercar la justicia a la ciudadanía',
      description: 'Traduciendo un sistema complejo en información clara y comprensible.'
    },
    {
      icon: BookOpen,
      title: 'Democratizar el acceso a la información',
      description: 'Facilitando datos, documentos y explicaciones en un solo lugar.'
    },
    {
      icon: Eye,
      title: 'Fortalecer la transparencia',
      description: 'Visibilizando procesos, actores y decisiones clave del sector justicia.'
    },
    {
      icon: Target,
      title: 'Promover participación informada',
      description: 'Para que la ciudadanía pueda opinar, vigilar y exigir con conocimiento.'
    }
  ];

  const faqs = [
    {
      question: '¿Qué es Justiciapedia?',
      answer: `Para hablar de Justiciapedia es necesario mencionar una serie de elementos que generan contexto al respecto. Por ejemplo, históricamente el poder judicial y el entorno referente de los demás actores que integran el sector justicia ha sido abordado únicamente por una pequeña élite técnica que comprende los vericuetos y complejidades de la administración de justicia. Esto en un país como Guatemala donde las brechas de desigualdad y el poco acceso a educación superior y lo cerrado de los clanes profesionales hace que la justicia vista como un todo sea un tema poco abordado, poco comprendido y, por lo tanto, ajeno para los guatemaltecos y guatemaltecas en términos generales.

Teniendo esto como un pequeño antecedente, notamos que ese es uno de los retos grandes que están pendientes en Guatemala y que una forma de empapar a la población pasa por la mediatización de los contenidos y la presentación amigable de los elementos y procesos más técnicos y complejos, como los diversos procesos de elección de autoridades en donde se implementan los procedimientos desarrollados por Comisiones de Postulación. En ese mismo sentido, consideramos que estos temas deben ser difundidos y hacer que el acceso a este tipo de información sea democratizado, compartido y entendible.

Por lo tanto, vemos a Justiciapedia como esa herramienta que busca acercar a la ciudadanía en general a un campo que históricamente ha sido reservado para juristas y académicos, para así abordar un tema complejo y muy específico desde una perspectiva más accesible y atractiva para el público en general.`
    },
    {
      question: '¿Qué queremos con Justiciapedia?',
      answer: `En términos sencillos, queremos acercar a guatemaltecos y guatemaltecas con el sector justicia, hacer que sea comprensible un tema que nos debe interesar a todos y todas. Esto buscamos concretarlo al mostrar de forma interactiva y sencilla los rangos de alcance que tiene el Organismo Judicial y demás actores que intervienen en proceso judicial, es decir, Ministerio Público, Oficina del Procurador de los Derechos Humanos, Instituto Nacional de Ciencias Forenses, Procuraduría General de la Nación, Corte de Constitucionalidad, Consejo de la Carrera Judicial, Contraloría General de Cuentas, Instituto de la Defensa Pública Penal y Tribunal Supremo Electoral. Finalmente, es necesario remarcar que hacemos esto porque creemos qué ante más transparencia, menos impunidad e injusticia y esto es fundamental para la construcción de sociedades más equitativas, democráticas y prósperas.`
    },
    {
      question: '¿Por qué trabajar con Justiciapedia?',
      answer: `Porque en Red Ciudadana creemos que el acceso a la justicia es un derecho inalienable para todos y todas, también porque creemos que la justicia y su administración debe tener una relación funcional y activa entre usuarios y los diversos actores, en donde los habitantes sepan quienes son los profesionales del derecho encargados de dirimir las controversias suscitadas en su comunidad. También porque creemos que una forma de atacar las brechas que nos dividen a guatemaltecos y guatemaltecas pasa también por transparentar el sector justicia; para que podamos ver a la impunidad como ese estadio que podemos combatir con trabajo continuo, comprometido y multisectorial.`
    },
    {
      question: '¿Cuál es el fundamento legal de Justiciapedia?',
      answer: `Justiciapedia busca configurar entre sí la transparencia que nos otorga el libre acceso a la información o habeas data plasmado en la Constitución Política de la República de Guatemala. Asimismo, en el legítimo ejercicio del derecho de petición y empleando la Ley de Acceso a la Información Pública, hemos obtenido la data que se presenta en la plataforma.

Artículo 30: Publicidad de los actos administrativos. Todos los actos de la administración son públicos. Los interesados tienen derecho a obtener, en cualquier tiempo, informes, copias, reproducciones y certificaciones que soliciten y la exhibición de los expedientes que deseen consultar, salvo que se trate de asuntos militares o diplomáticos de seguridad nacional, o de datos suministrados por particulares bajo garantía de confidencia.

Artículo 31: Acceso a archivos y registros estatales. Toda persona tiene el derecho de conocer lo que de ella conste en archivos, fichas o cualquier otra forma de registros estatales, y la finalidad a que se dedica esta información, así como a corrección, rectificación y actualización. Quedan prohibidos los registros y archivos de filiación política, excepto los propios de las autoridades electorales y de los partidos políticos.`
    },
    {
      question: '¿Qué es una Comisión de Postulación?',
      answer: 'Entendemos como Comisión de Postulación al órgano colegiado que desarrollará determinados procesos de elección previamente establecidos en la Constitución Política de la República o alguna otra ley ordinaria y que se regirá por lo establecido en la Ley de Comisiones de Postulación.'
    },
    {
      question: '¿Qué es la ley de Comisiones de Postulación?',
      answer: `La Ley de Comisiones de Postulación es el decreto legislativo número 19 – 2009. Este decreto es promulgado por el Organismo Legislativo el 21 de mayo de 2009 y surge por la necesidad de trasparentar y democratizar los procesos de elección de funcionarios públicos del más alto nivel. Este decreto en su artículo segundo desarrolla cuatro principios, los cuales deben observarse siempre que se aplique esta ley en los procesos correspondientes:

• Transparencia
• Excelencia profesional
• Objetividad
• Publicidad`
    },
    {
      question: '¿Qué funcionarios serán elegidos por medio de procesos de comisión de postulación?',
      answer: `• Magistrados/as de Corte Suprema de Justicia
• Magistrados/as de Salas de la Corte de Apelaciones
• Contralor/a General de Cuentas
• Fiscal General de la República y Jefe/a del Ministerio Público
• Procurador/a de los Derechos Humanos
• Cualquier otro funcionario que fuere designado por medio de Comisiones de Postulación`
    },
    {
      question: '¿Quiénes pueden ser Comisionados?',
      answer: `Según el decreto 19 – 2009, para poder optar al puesto de comisionado, el aspirante deberá cumplir los siguientes requisitos:

• Ser guatemalteco
• Colegiado activo
• Tener al menos 5 años de ejercicio profesional
• Estar en pleno ejercicio de sus derechos civiles y políticos
• No estar inhabilitado para ejercer cargos públicos
• Presentar constancia de no haber sido sancionado por el Colegio Profesional respectivo
• Presentar constancia de antecedentes penales
• Presentar constancia de antecedentes policiacos`
    },
    {
      question: '¿Cuál es el quorum mínimo para una Comisión de Postulación?',
      answer: 'Para la celebración de sesiones se requiere la presencia de dos terceras partes del total de miembros que integran la comisión y tampoco se aceptarán representaciones. Asimismo, las decisiones deberán tomarse por dos tercios del total de miembros, salvo los casos en los que una ley específica determine otro precepto. Todas las sesiones deberán constar en acta, la cual deberá ser firmada por todos los participantes.'
    },
    {
      question: '¿Qué hace una Comisión de Postulación?',
      answer: `Aprobar el perfil de los aspirantes: La elaboración del perfil debe buscar elevar la calidad ética, académica, profesional, profesional y de proyección humana.

Aspectos a considerar al momento de elaborar el perfil del aspirante:

• Elemento ético que responde a la moral, honorabilidad, rectitud, independencia, imparcialidad.
• Elemento académico que corresponde a la docencia universitaria, títulos académicos, estudios, ensayos, publicaciones y participación en eventos académicos.
• Elemento profesional que corresponde a la experiencia del aspirante.
• Proyección humana que corresponde a vocación de servicio y liderazgo.

Aprobar la tabla de gradación: Esta tabla deberá ser empleada como la herramienta o instrumento que mida la ponderación del aspirante según su perfil, valorando de uno a cien los méritos académicos, éticos, profesionales y su proyección humana.`
    },
    {
      question: '¿Cómo convocan las comisiones de postulación?',
      answer: 'Las Comisiones de Postulación deberán de convocar por medio de publicación hecha en el Diario Oficial (Diario de Centro América) y en dos diarios de mayor circulación. En la convocatoria señalarán los documentos que deben presentar los aspirantes, la fecha y hora límite para presentar expediente de aspirante, requisitos legales y cualquier otra información que consideren pertinentes.'
    },
    {
      question: '¿Cómo se elaboran las nóminas de aspirantes elegibles dentro de los procesos de Comisión de Postulación?',
      answer: `Después de la evaluación hecha al expediente de todos los aspirantes, se iniciarán el proceso de integración de nóminas. Este proceso se realizará votando por cada perfil de aspirante para determinar si es alguien que debe integrar la nómina o no. Se iniciará votando por el aspirante con mejor puntuación y en los casos donde exista empate entre los aspirantes, se votará por orden alfabético de los apellidos.

Respecto los aspirantes a Magistrado/a de Corte Suprema de Justicia, Sala de Corte de Apelaciones, Fiscal General y Jefe/a del Ministerio Público, Procurador/a de los Derechos Humanos y Contralor/a General de Cuentas deberán obtener los votos de dos tercios del total de integrantes de la Comisión de Postulación.

Finalmente, la votación terminará cuando se complete el número de candidatos que deben incluirse en la nómina.`
    },
    {
      question: '¿Lo dispuesto por una comisión puede ser impugnado?',
      answer: 'Sí, según el artículo 28 del decreto 19-2009 las impugnaciones deberán plantearse en un plazo de 72 horas después de la publicación de la nómina y deberán ser resueltas en un plazo no mayor de 72 horas.'
    },
    {
      question: '¿A dónde se remiten las nóminas elaboradas por las Comisiones de Postulación?',
      answer: `En los procesos de elección de magistrados/as de Corte Suprema de Justicia, magistrados/as de Sala de Corte de Apelaciones, Contralor/a General de Cuentas, Director/a del Instituto de la Defensa Pública Penal y Procurador/a de los Derechos Humanos, las nóminas de elegibles deberán dirigirse al Congreso de la República, cuyo pleno decidirá quienes serán los aspirantes electos.

En los procesos de elección de Jefe/a del Ministerio Público las nóminas se remitirán al Presidente de la República.

Las nóminas deberán remitirse a donde correspondan, con toda la documentación del caso con un plazo de al menos 20 días de anticipación a la fecha que establece el plazo constitucional.`
    }
  ];

  return (
    <PageLayout
      title="¿Qué es Justiciapedia?"
      description="Conoce más sobre nuestra plataforma y nuestra misión de transparentar el sector justicia en Guatemala."
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-justice-900 rounded-2xl p-8 md:p-12 lg:p-16 mb-16 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-justice-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            ¿Qué es Justiciapedia?
          </h1>
          <div className="space-y-6 text-lg md:text-xl text-primary-100 leading-relaxed">
            <p>
              Justiciapedia es una <strong className="text-justice-300">herramienta digital ciudadana</strong> que busca acercar el sector justicia a la población, haciendo comprensibles procesos que históricamente han sido técnicos, cerrados y poco accesibles.
            </p>
            <p>
              En Guatemala, la justicia ha sido tradicionalmente un tema reservado para juristas, académicos y pequeños círculos especializados. Esto ha generado distancia, desinformación y desconfianza. <strong className="text-justice-300">Justiciapedia rompe esa barrera</strong>, poniendo la información pública al alcance de todas y todos, de forma clara, interactiva y transparente.
            </p>
            <p>
              Aquí podrás entender <strong className="text-justice-300">quiénes toman las decisiones</strong>, cómo se eligen las autoridades, qué instituciones intervienen y qué derechos tiene la ciudadanía para informarse y participar.
            </p>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="mb-16">
        <Card className="overflow-hidden border-2 border-neutral-100">
          <CardHeader className="bg-gradient-to-r from-justice-50 to-justice-50 border-b border-justice-100">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-justice-100 rounded-xl flex items-center justify-center mr-4">
                <AlertCircle size={28} className="text-justice-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-neutral-900">¿Qué problema aborda?</h2>
                <p className="text-lg text-neutral-700 mt-1">Un sistema complejo, una ciudadanía excluida</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 md:p-10">
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              La falta de información clara y accesible sobre el sector justicia genera múltiples consecuencias negativas:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {problems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-justice-50 to-justice-100 p-6 rounded-lg border border-justice-200 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-justice-100 rounded-full flex items-center justify-center mb-4">
                      <Icon size={24} className="text-justice-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">{problem.title}</h3>
                    <p className="text-neutral-600 text-sm">{problem.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-justice-50 border-l-4 border-justice-600 p-6 rounded-r-lg">
              <p className="text-lg text-neutral-800 leading-relaxed">
                <strong>Cuando la ciudadanía no entiende cómo funciona la justicia</strong>, es más difícil exigir rendición de cuentas y defender la democracia. <strong className="text-neutral-700">Justiciapedia nace para cerrar esa brecha de información y conocimiento.</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Objectives Section */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-justice-50 to-justice-50 border-b border-justice-100">
            <div className="flex items-center">
              <Target size={32} className="text-justice-600 mr-4" />
              <div>
                <h2 className="text-3xl font-bold text-neutral-900">¿Qué buscamos con Justiciapedia?</h2>
                <p className="text-lg text-neutral-700 mt-1">Nuestros objetivos</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 md:p-10">
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              Justiciapedia busca:
            </p>

            <div className="space-y-6">
              {objectives.map((objective, index) => {
                const Icon = objective.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start bg-white border border-justice-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-justice-100 to-justice-100 rounded-full flex items-center justify-center mr-5">
                      <Icon size={28} className="text-justice-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{objective.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{objective.description}</p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <CheckCircle size={24} className="text-justice-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guiding Principle Section - Highlighted */}
      <div className="mb-16">
        <Card className="overflow-hidden bg-gradient-to-br from-neutral-600 via-justice-700 to-justice-600 text-white shadow-2xl">
          <CardContent className="p-10 md:p-14 lg:p-20 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <Shield size={64} className="mx-auto text-teal-100" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                Nuestro principio rector
              </h2>
              <div className="h-1 w-24 bg-teal-300 mx-auto mb-10"></div>
              <p className="text-3xl md:text-4xl lg:text-6xl font-bold mb-10 leading-tight text-white">
                A mayor transparencia,<br />menor impunidad.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-justice-50 leading-relaxed max-w-2xl mx-auto">
                Creemos que la información pública, cuando es clara y accesible, se convierte en una herramienta poderosa para combatir la impunidad y fortalecer una sociedad más justa, democrática y equitativa.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-justice-50 to-justice-50 border-b border-justice-100">
            <div className="flex items-center">
              <HelpCircle size={32} className="text-justice-600 mr-4" />
              <div>
                <h2 className="text-3xl font-bold text-neutral-900">Preguntas Frecuentes</h2>
                <p className="text-lg text-neutral-700 mt-1">Todo lo que necesitas saber sobre Justiciapedia</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 md:p-10">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-justice-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 bg-white hover:bg-justice-50 transition-colors text-left"
                  >
                    <span className="text-lg font-semibold text-neutral-900 pr-4">
                      {faq.question}
                    </span>
                    {openFaqIndex === index ? (
                      <ChevronUp className="flex-shrink-0 text-justice-600" size={24} />
                    ) : (
                      <ChevronDown className="flex-shrink-0 text-justice-400" size={24} />
                    )}
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-5 pb-5 bg-justice-50 border-t border-justice-200">
                      <div className="pt-4 text-justice-700 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-justice-50 via-teal-50 to-justice-50 rounded-2xl p-10 md:p-12 text-center border border-justice-200 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
          Explora Justiciapedia
        </h2>
        <p className="text-lg md:text-xl text-neutral-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Descubre cómo funcionan las instituciones, conoce a los aspirantes y accede a información transparente sobre el sector justicia en Guatemala.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.href = '/instituciones'}
            className="px-8 py-4 bg-justice-600 text-white rounded-xl font-semibold hover:bg-justice-700 transition-all shadow-md hover:shadow-xl transform hover:scale-105"
          >
            Ver Instituciones
          </button>
          <button
            onClick={() => window.location.href = '/candidatos'}
            className="px-8 py-4 bg-white text-justice-600 border-2 border-justice-600 rounded-xl font-semibold hover:bg-justice-50 transition-all shadow-md hover:shadow-lg"
          >
            Conocer Aspirantes
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default WhatIsJusticiapedia;


