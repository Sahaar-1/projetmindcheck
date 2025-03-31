import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Evaluation.css";

const Evaluation = () => {
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(null);
  const [advice, setAdvice] = useState("");
  const [report, setReport] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  const questions = [
    { key: "stress", text: "Comment évaluez-vous votre niveau de stress actuellement ?", type: "scale" },
    { key: "anxiety", text: "Votre niveau d'anxiété, est-il plutôt élevé ou faible ?", type: "scale" },
    { key: "happiness", text: "Comment vous sentez-vous en termes de bonheur dans votre quotidien ?", type: "scale" },
    { key: "sleepQuality", text: "Comment décririez-vous la qualité de votre sommeil ?", type: "scale" },
    { key: "sleepDuration", text: "Combien d'heures dormez-vous en moyenne chaque nuit ?", type: "scale" },
    { key: "socialInteraction", text: "Avez-vous des interactions sociales régulières ?", type: "yesNo" },
    { key: "communicationDifficulty", text: "Rencontrez-vous des difficultés à communiquer avec les autres ?", type: "yesNo" },
    { key: "stressManagement", text: "Comment gérez-vous votre stress au quotidien ?", type: "scale" },
    { key: "relaxationStrategies", text: "Pratiquez-vous des techniques de relaxation pour vous détendre ?", type: "yesNo" },
    { key: "physicalActivity", text: "À quelle fréquence pratiquez-vous une activité physique ?", type: "scale" },
  ];

  // Charger les résultats précédents au montage du composant
  useEffect(() => {
    const loadPreviousResults = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('Pas de token trouvé');
          return;
        }

        // Vérifier d'abord le localStorage
        const savedScore = localStorage.getItem('evaluationScore');
        const savedResponses = localStorage.getItem('evaluationResponses');
        
        if (savedScore && savedResponses) {
          console.log('Chargement des résultats depuis le localStorage');
          setScore(parseFloat(savedScore));
          setResponses(JSON.parse(savedResponses));
          setAdvice(renderAdvice(parseFloat(savedScore)));
          setReport(renderReport(parseFloat(savedScore)));
          setIsSubmitted(true);
          return;
        }

        // Si pas de données dans le localStorage, récupérer depuis l'API
        console.log('Récupération des résultats depuis l\'API');
        const response = await fetch('http://localhost:5000/api/evaluation/last', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.evaluation) {
            console.log('Résultats trouvés:', data.evaluation);
            setResponses(data.evaluation.responses);
            setScore(data.evaluation.score);
            setAdvice(renderAdvice(data.evaluation.score));
            setReport(renderReport(data.evaluation.score));
            setIsSubmitted(true);
            
            // Sauvegarder dans le localStorage
            localStorage.setItem('evaluationScore', data.evaluation.score);
            localStorage.setItem('evaluationResponses', JSON.stringify(data.evaluation.responses));
          }
        } else if (response.status === 404) {
          console.log('Aucune évaluation trouvée');
          setIsSubmitted(false);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des résultats:', error);
        setIsSubmitted(false);
      }
    };

    loadPreviousResults();
  }, []);

  const handleResponse = (question, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [question]: value,
    }));
  };

  const calculatePercentage = () => {
    const totalScore = Object.values(responses).reduce((total, response) => {
      if (!response) return total;
      // For scale-based questions
      if (typeof response === "string") {
        if (response === "haute" || response === "bonne" || response === "longue") {
          return total + 5;
        } else if (response === "moyenne") {
          return total + 3;
        } else {
          return total + 1;
        }
      } 
      // For yes/no based questions
      if (response === "yes") {
        return total + 5; // Treating "Yes" as positive
      } else if (response === "no") {
        return total + 1; // Treating "No" as negative
      }
      return total;
    }, 0);

    return (totalScore / (questions.length * 5)) * 100;
  };

  const renderAdvice = (percentage) => {
    if (percentage < 40) return "Votre niveau de stress et d'anxiété semble élevé. Envisagez de parler à un professionnel de santé mentale.";
    if (percentage < 70) return "Votre bien-être mental est modéré. Adoptez des routines de relaxation et des interactions sociales régulières.";
    return "Votre santé mentale est globalement positive. Continuez à maintenir de bonnes habitudes de gestion du stress.";
  };

  const renderReport = (percentage) => {
    if (percentage < 40) return "Votre niveau de bien-être est préoccupant. Il est recommandé de consulter un professionnel de santé mentale.";
    if (percentage < 70) return "Vous avez un état mental relativement stable. Structurez vos journées et améliorez la qualité de votre sommeil.";
    return "Votre bien-être mental est bon. Continuez vos bonnes habitudes et cultivez un état d'esprit positif.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          answers: responses,
          score: calculatePercentage()
        })
      });

      if (response.ok) {
        const percentage = calculatePercentage();
        
        // Sauvegarder les résultats dans le localStorage
        localStorage.setItem('evaluationScore', percentage);
        localStorage.setItem('evaluationResponses', JSON.stringify(responses));
        
        // Rediriger vers la page des résultats
        navigate('/results', { state: { responses, score: percentage } });
      } else {
        console.error('Erreur lors de la soumission de l\'évaluation');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="evaluation-container">
      {!isSubmitted ? (
        <>
          <h2>Évaluation de votre santé mentale</h2>
          <div className="question">
            <p>{currentQuestion + 1}. {questions[currentQuestion].text}</p>
            <div className="buttons">
              {questions[currentQuestion].type === "scale" && ["haute", "moyenne", "faible"].map((value) => (
                <button
                  key={value}
                  className={`response-button ${responses[questions[currentQuestion].key] === value ? "selected" : ""}`}
                  onClick={() => handleResponse(questions[currentQuestion].key, value)}
                >
                  {value === "haute" ? "Élevé / Bonne / Longue" :
                   value === "moyenne" ? "Moyenne" : "Faible / Mauvaise / Courte"}
                </button>
              ))}

              {questions[currentQuestion].type === "yesNo" && ["yes", "no"].map((value) => (
                <button
                  key={value}
                  className={`response-button ${responses[questions[currentQuestion].key] === value ? "selected" : ""}`}
                  onClick={() => handleResponse(questions[currentQuestion].key, value)}
                >
                  {value === "yes" ? "Oui" : "Non"}
                </button>
              ))}
            </div>
          </div>

          <div className="navigation-buttons">
            {currentQuestion > 0 && (
              <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>Précédent</button>
            )}
            {currentQuestion < questions.length - 1 ? (
              <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Suivant</button>
            ) : (
              <button onClick={handleSubmit}>Terminer l'Évaluation</button>
            )}
          </div>
        </>
      ) : (
        <div className="results-section">
          <h3>Vos résultats</h3>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-value">{score}%</span>
            </div>
          </div>
          <div className="results-content">
            <div className="advice-section">
              <h4>Conseils personnalisés</h4>
              {advice}
            </div>
            <div className="report-section">
              <h4>Rapport détaillé</h4>
              {report}
            </div>
            <div className="action-buttons">
              <button 
                className="action-button results"
                onClick={() => navigate('/results', { state: { responses, score } })}
              >
                Voir les résultats en graphiques
              </button>
              <button 
                className="action-button restart"
                onClick={() => {
                  setResponses({});
                  setScore(null);
                  setAdvice("");
                  setReport("");
                  setIsSubmitted(false);
                  setCurrentQuestion(0);
                }}
              >
                Refaire l'évaluation
              </button>
              <button 
                className="action-button follow-up"
                onClick={() => navigate('/mental-follow-up', { state: { score } })}
              >
                Commencer le suivi mental
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evaluation;