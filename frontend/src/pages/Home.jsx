import React from 'react';
import { motion } from 'framer-motion';

// Fonctionnalités à afficher avec icônes
const features = [
  { icon: '🌱', text: 'Suivi de l’humeur', description: 'Suivez l’évolution de votre humeur chaque jour pour mieux comprendre vos émotions.' },
  { icon: '📈', text: 'Statistiques détaillées', description: 'Visualisez des graphiques et des statistiques qui vous aident à suivre vos progrès.' },
  { icon: '🎧', text: 'Conseils et ressources', description: 'Accédez à une bibliothèque de conseils audio, vidéo et écrits pour améliorer votre bien-être.' },
  { icon: '🧘‍♂️', text: 'Exercices de relaxation', description: 'Trouvez des exercices de méditation et de relaxation pour vous apaiser et réduire le stress.' },
  { icon: '📅', text: 'Suivi des objectifs', description: 'Fixez des objectifs pour améliorer votre santé mentale et suivez vos progrès.' },
  { icon: '💬', text: 'Journal de bord', description: 'Écrivez vos pensées et émotions pour mieux les comprendre et les exprimer.' },
];

const Home = () => {
  const homePageStyle = {
    background: 'linear-gradient(135deg, #f6f9fc, #e8f1fc)',
    color: '#2c3e50',
    padding: '80px 20px',
    textAlign: 'center',
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: '100vh',
  };

  const homeTitleStyle = {
    fontSize: '42px',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '15px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    lineHeight: '1.3',
  };

  const homeDescriptionStyle = {
    fontSize: '20px',
    color: '#7f8c8d',
    maxWidth: '800px',
    lineHeight: '1.8',
    textAlign: 'left',
    padding: '0 15px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    marginBottom: '40px',
  };

  const homeCtaBtnStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '600',
    textDecoration: 'none',
    padding: '14px 30px',
    borderRadius: '40px',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    marginTop: '30px',
    letterSpacing: '1px',
    boxShadow: '0 5px 15px rgba(52, 152, 219, 0.3)',
    animation: 'pulse 2s infinite',
  };

  const homeImageContainerStyle = {
    textAlign: 'center',
    marginTop: '40px',
  };

  const homeImageStyle = {
    width: '50%',
    height: 'auto',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  };

  const FeatureSection = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', flexWrap: 'wrap' }}>
      {features.map((feature, index) => (
        <motion.div 
          key={index} 
          style={{ margin: '0 20px', textAlign: 'center', maxWidth: '300px', padding: '20px', borderRadius: '10px', background: '#ecf0f1', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <div style={{ fontSize: '40px', color: '#3498db' }}>{feature.icon}</div>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#34495e' }}>{feature.text}</p>
          <p style={{ fontSize: '16px', color: '#7f8c8d', lineHeight: '1.6' }}>{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );

  return (

    <div style={homePageStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <motion.h1 
            style={homeTitleStyle} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
          >
            Bienvenue sur MindCheck
          </motion.h1>

          <motion.p 
            style={homeDescriptionStyle}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }}
          >
            **MindCheck** est une application innovante qui vous aide à prendre soin de votre bien-être mental. En quelques minutes par jour, suivez l’évolution de votre humeur, analysez vos émotions et accédez à une bibliothèque complète de ressources pour vous aider à atteindre un équilibre émotionnel optimal.
            <br /><br />
            Grâce à des outils simples et puissants, MindCheck vous accompagne dans votre parcours de santé mentale, avec des conseils adaptés et des exercices de relaxation. Vous pourrez facilement fixer des objectifs et suivre vos progrès à chaque étape de votre voyage vers le mieux-être.
          </motion.p>

          <a 
            href="/evaluation" 
            style={homeCtaBtnStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
            onMouseDown={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Commencer maintenant
          </a>
        </div>

        <div style={{ flex: 1.5 }}>
          <div style={homeImageContainerStyle}>
            <img 
              src="The importance of mental health and self-care in the modern world.jpg" 
              alt="Illustration du bien-être mental"
              style={homeImageStyle}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      <FeatureSection />
    </div>
  );
};

export default Home;
