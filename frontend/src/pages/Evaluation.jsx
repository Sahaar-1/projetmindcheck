import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Evaluation.css";

const Evaluation = () => {
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(null);
  const [advice, setAdvice] = useState("");
  const [report, setReport] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
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

  // Charger les réponses et le score depuis localStorage
  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem("evaluationResponses"));
    const savedScore = localStorage.getItem("evaluationScore");

    if (savedResponses) {
      setResponses(savedResponses);
    }
    if (savedScore) {
      setScore(savedScore);
    }
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
    if (percentage < 40) return "Votre niveau de stress et d’anxiété semble élevé. Envisagez de parler à un professionnel de santé mentale.";
    if (percentage < 70) return "Votre bien-être mental est modéré. Adoptez des routines de relaxation et des interactions sociales régulières.";
    return "Votre santé mentale est globalement positive. Continuez à maintenir de bonnes habitudes de gestion du stress.";
  };

  const renderReport = (percentage) => {
    if (percentage < 40) return "Votre niveau de bien-être est préoccupant. Il est recommandé de consulter un professionnel de santé mentale.";
    if (percentage < 70) return "Vous avez un état mental relativement stable. Structurez vos journées et améliorez la qualité de votre sommeil.";
    return "Votre bien-être mental est bon. Continuez vos bonnes habitudes et cultivez un état d'esprit positif.";
  };

  const handleSubmit = async () => {
    if (Object.keys(responses).length !== questions.length) {
      setAlertMessage("Veuillez répondre à toutes les questions avant de soumettre.");
      return;
    }

    setAlertMessage("");
    const percentage = calculatePercentage();
    setScore(percentage);
    setAdvice(renderAdvice(percentage));
    setReport(renderReport(percentage));
    setIsSubmitted(true);

    // Envoie de l'évaluation avec un ID d'évaluation (par exemple, 1)
    const evaluationId = 1;

    try {
      const response = await fetch('http://localhost:5000/api/evaluation/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          evaluationId: evaluationId,
          responses: responses,
          score: percentage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'enregistrement');
      }

      const data = await response.json();
      console.log(data.message); 
    } catch (error) {
      console.error('Erreur:', error);
      setAlertMessage(error.message || 'Erreur lors de l\'enregistrement de l\'évaluation');
    }

    localStorage.setItem("evaluationResponses", JSON.stringify(responses));
    localStorage.setItem("evaluationScore", percentage);
  };

  const handleMentalFollowUp = () => {
    navigate("/suivi-mental", { state: { score } });
  };

  const handleViewDetails = () => {
    navigate("/results", { state: { responses, score } });
  };

  return (
      <div className="evaluation-container">
        <h2>Évaluation de votre santé mentale</h2>

        <div className="question">
          <p>{currentQuestion + 1}. {questions[currentQuestion].text}</p>
          <div className="buttons">
            {/* Render different buttons based on question type */}
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

        {alertMessage && <p className="alert-message">{alertMessage}</p>}

        {isSubmitted && (
          <div className="results">
            <h3>Votre Score : {score.toFixed(2)}%</h3>
            <h4>Conseils</h4>
            <p>{advice}</p>
            <h4>Rapport</h4>
            <p>{report}</p>
            <div className="details-button">
              <button onClick={handleViewDetails}>Voir plus de détails</button>
            </div>
            <div className="follow-up-button">
              <button onClick={handleMentalFollowUp}>Suivi de l'état mental</button>
            </div>
          </div>
        )}
      </div>
  );
};

export default Evaluation;
