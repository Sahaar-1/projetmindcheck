import React from 'react';
import { 
  FaVideo, 
  FaFileAlt, 
  FaPodcast, 
  FaDumbbell, 
  FaBook, 
  FaPrayingHands, 
  FaYinYang, 
  FaSun, 
  FaCloud 
} from 'react-icons/fa';
import './Resources.css';

const ResourceLink = ({ href, title, icon, description }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="resource-link">
      <span className="resource-icon">{icon}</span>
      <div className="resource-content">
        <span className="resource-title">{title}</span>
        {description && <p className="resource-description">{description}</p>}
      </div>
    </a>
  );
};

const Resources = () => {
  const resourcesData = {
    videos: [
      { 
        title: 'How to Manage Anxiety',
        link: 'https://www.youtube.com/watch?v=O-6f5wQXSu8',
        icon: <FaVideo />,
        description: 'Techniques pratiques pour gérer l\'anxiété au quotidien'
      },
      { 
        title: 'The Science of Well-Being',
        link: 'https://www.youtube.com/watch?v=ZknUbXOOjfA',
        icon: <FaVideo />,
        description: 'Cours de Yale sur le bien-être et le bonheur'
      },
      { 
        title: 'Understanding Depression',
        link: 'https://www.youtube.com/watch?v=V4BdHJpJXyA',
        icon: <FaVideo />,
        description: 'Comprendre la dépression et ses mécanismes'
      },
      { 
        title: 'Mindfulness Meditation for Beginners',
        link: 'https://www.youtube.com/watch?v=sz6C-dVGhtk',
        icon: <FaVideo />,
        description: 'Guide de méditation pour débutants'
      },
      { 
        title: 'Stress Management Techniques',
        link: 'https://www.youtube.com/watch?v=8jeBPdkW8GA',
        icon: <FaVideo />,
        description: 'Techniques efficaces de gestion du stress'
      },
      { 
        title: 'Sleep Hygiene Tips',
        link: 'https://www.youtube.com/watch?v=A5dE25ANU0k',
        icon: <FaVideo />,
        description: 'Améliorer la qualité de votre sommeil'
      },
      { 
        title: 'Emotional Intelligence',
        link: 'https://www.youtube.com/watch?v=n9h8fG1DKhA',
        icon: <FaVideo />,
        description: 'Développer son intelligence émotionnelle'
      },
      { 
        title: 'Cognitive Behavioral Therapy Techniques',
        link: 'https://www.youtube.com/watch?v=ZdyOwZ4_RnI',
        icon: <FaVideo />,
        description: 'Introduction aux techniques de TCC'
      }
    ],
    articles: [
      { 
        title: 'Mental Health Benefits of Exercise',
        link: 'https://www.healthline.com/nutrition/mental-health-benefits-of-exercise',
        icon: <FaFileAlt />,
        description: 'Impact de l\'exercice sur la santé mentale'
      },
      { 
        title: 'How to Develop a Positive Mindset',
        link: 'https://www.verywellmind.com/how-to-develop-a-positive-mindset-5194581',
        icon: <FaFileAlt />,
        description: 'Cultiver une attitude positive'
      },
      { 
        title: 'How to Cope with Stress Effectively',
        link: 'https://www.psychologytoday.com/us/articles/how-to-cope-with-stress-effectively',
        icon: <FaFileAlt />,
        description: 'Stratégies de gestion du stress'
      },
      { 
        title: 'The Power of Positive Thinking',
        link: 'https://www.psychologytoday.com/us/articles/the-power-of-positive-thinking',
        icon: <FaFileAlt />,
        description: 'Les bienfaits de la pensée positive'
      },
      { 
        title: 'Understanding Emotional Intelligence',
        link: 'https://www.verywellmind.com/what-is-emotional-intelligence-2795423',
        icon: <FaFileAlt />,
        description: 'Guide complet sur l\'intelligence émotionnelle'
      },
      { 
        title: 'Building Resilience',
        link: 'https://www.apa.org/topics/resilience',
        icon: <FaFileAlt />,
        description: 'Développer sa résilience psychologique'
      },
      { 
        title: 'Improving Self-Esteem',
        link: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/self-esteem/',
        icon: <FaFileAlt />,
        description: 'Techniques pour améliorer l\'estime de soi'
      },
      { 
        title: 'Healthy Sleep Habits',
        link: 'https://www.sleepfoundation.org/sleep-hygiene',
        icon: <FaFileAlt />,
        description: 'Guide pour un meilleur sommeil'
      }
    ],
    podcasts: [
      { 
        title: 'The Daily Meditation Podcast',
        link: 'https://podcasts.apple.com/us/podcast/the-daily-meditation-podcast/id902963722',
        icon: <FaPodcast />,
        description: 'Méditations guidées quotidiennes'
      },
      { 
        title: 'Unlocking Us with Brené Brown',
        link: 'https://brenebrown.com/podcast/introducing-unlocking-us/',
        icon: <FaPodcast />,
        description: 'Conversations sur le développement personnel'
      },
      { 
        title: 'Therapy Chat',
        link: 'https://www.therapychatpodcast.com/',
        icon: <FaPodcast />,
        description: 'Discussions thérapeutiques hebdomadaires'
      },
      { 
        title: 'Mindful Muslim Podcast',
        link: 'https://www.mindfulmuslimpodcast.com/',
        icon: <FaPodcast />,
        description: 'Bien-être mental et spiritualité'
      },
      { 
        title: 'Mental Health Happy Hour',
        link: 'https://mentalpod.com/',
        icon: <FaPodcast />,
        description: 'Conversations ouvertes sur la santé mentale'
      },
      { 
        title: 'Anxiety Guru Show',
        link: 'https://www.anxietyguru.net/',
        icon: <FaPodcast />,
        description: 'Gestion de l\'anxiété et des attaques de panique'
      },
      { 
        title: 'Sleep With Me',
        link: 'https://www.sleepwithmepodcast.com/',
        icon: <FaPodcast />,
        description: 'Histoires apaisantes pour mieux dormir'
      },
      { 
        title: 'Happiness Lab',
        link: 'https://www.happinesslab.fm/',
        icon: <FaPodcast />,
        description: 'La science du bonheur expliquée'
      }
    ],
    exercises: [
      { 
        title: 'Breathing Exercises for Stress',
        link: 'https://www.headspace.com/meditation/breathing-exercises',
        icon: <FaDumbbell />,
        description: 'Exercices de respiration anti-stress'
      },
      { 
        title: 'Yoga for Beginners',
        link: 'https://www.doyogawithme.com/',
        icon: <FaDumbbell />,
        description: 'Cours de yoga pour débutants'
      },
      { 
        title: 'Progressive Muscle Relaxation',
        link: 'https://www.anxietycoach.com/pml.html',
        icon: <FaDumbbell />,
        description: 'Technique de relaxation musculaire'
      },
      { 
        title: 'Mindful Walking Exercise',
        link: 'https://www.meditationoasis.com/podcast/mindful-walking-exercise/',
        icon: <FaDumbbell />,
        description: 'Marche méditative guidée'
      },
      { 
        title: 'Stress Relief Stretches',
        link: 'https://www.healthline.com/health/stretching-exercises',
        icon: <FaDumbbell />,
        description: 'Étirements anti-stress'
      },
      { 
        title: 'Tai Chi for Mental Health',
        link: 'https://www.taichiforhealthinstitute.org/',
        icon: <FaDumbbell />,
        description: 'Tai Chi pour le bien-être mental'
      },
      { 
        title: 'Qigong Exercises',
        link: 'https://www.qigonginstitute.org/',
        icon: <FaDumbbell />,
        description: 'Exercices énergétiques traditionnels'
      },
      { 
        title: 'Dance Therapy Movements',
        link: 'https://adta.org/',
        icon: <FaDumbbell />,
        description: 'Mouvements thérapeutiques par la danse'
      }
    ],
    meditation: [
      { 
        title: 'Headspace',
        link: 'https://www.headspace.com/',
        icon: <FaPrayingHands />,
        description: 'Application de méditation guidée'
      },
      { 
        title: 'Calm',
        link: 'https://www.calm.com/',
        icon: <FaCloud />,
        description: 'Méditation et histoires pour dormir'
      },
      { 
        title: 'Insight Timer',
        link: 'https://insighttimer.com/',
        icon: <FaSun />,
        description: 'Méditations gratuites variées'
      },
      { 
        title: 'Ten Percent Happier',
        link: 'https://www.tenpercent.com/',
        icon: <FaYinYang />,
        description: 'Méditation pour sceptiques'
      }
    ],
    books: [
      { 
        title: 'The Anxiety and Phobia Workbook',
        link: 'https://www.amazon.com/Anxiety-Phobia-Workbook-Edmund-Bourne/dp/1626252157',
        icon: <FaBook />,
        description: 'Guide pratique pour gérer l\'anxiété'
      },
      { 
        title: 'The Happiness of Pursuit',
        link: 'https://www.amazon.com/Happiness-Pursuit-Finding-Quest-Change/dp/0385348843',
        icon: <FaBook />,
        description: 'Trouver le sens de sa vie'
      },
      { 
        title: 'Mind Over Mood',
        link: 'https://www.amazon.com/Mind-Over-Mood-Second-Changing/dp/1462520421',
        icon: <FaBook />,
        description: 'Changer ses pensées pour changer sa vie'
      },
      { 
        title: 'The Body Keeps the Score',
        link: 'https://www.amazon.com/Body-Keeps-Score-Healing-Trauma/dp/0143127748',
        icon: <FaBook />,
        description: 'Comprendre et guérir les traumatismes'
      }
    ]
  };

  return (
    <div className="resources-container">
      <h2 className="resources-title">🌟 Ressources Utiles pour Votre Bien-être Mental 🌟</h2>
      <p className="resources-description">
        Découvrez une collection soigneusement sélectionnée de ressources pour soutenir votre parcours vers le bien-être mental.
      </p>
      
      {Object.keys(resourcesData).map((category) => (
        <section key={category} className="resource-section">
          <h3 className="section-title">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h3>
          <ul className="resource-list">
            {resourcesData[category].map((resource, index) => (
              <li key={index} className="resource-item">
                <ResourceLink
                  href={resource.link}
                  title={resource.title}
                  icon={resource.icon}
                  description={resource.description}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
      
      <div className="resources-footer">
        <p>
          Ces ressources sont régulièrement mises à jour pour vous offrir le meilleur soutien possible.
          N'hésitez pas à les explorer et à les intégrer dans votre routine de bien-être.
        </p>
      </div>
    </div>
  );
};

export default Resources;
