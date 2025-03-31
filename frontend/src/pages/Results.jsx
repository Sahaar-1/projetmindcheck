import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./Results.css";

const Results = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Charger les résultats depuis le localStorage
    const savedScore = localStorage.getItem('evaluationScore');
    const savedResponses = localStorage.getItem('evaluationResponses');
    
    if (savedScore && savedResponses) {
      setScore(parseFloat(savedScore));
      setResponses(JSON.parse(savedResponses));
    } else {
      // Si pas de résultats, rediriger vers l'évaluation
      navigate('/evaluation');
    }
  }, [navigate]);

  if (!Object.keys(responses).length) {
    return (
      <div className="results-container">
        <p>Aucune donnée n'a été fournie. Veuillez effectuer l'évaluation.</p>
        <button onClick={() => navigate("/evaluation")}>Retour à l'évaluation</button>
      </div>
    );
  }

  // Fonction pour convertir les réponses en valeurs numériques
  const getValue = (value) => {
    const mapping = {
      haute: 5,
      bonne: 5,
      longue: 5,
      moyenne: 3,
      basse: 1,
      faible: 1,
      courte: 1,
      yes: 5,
      no: 1
    };
    return mapping[value] || 0;
  };

  // Préparation des données pour le graphique
  const chartData = {
    labels: [
      "Stress",
      "Anxiété",
      "Bonheur",
      "Qualité du sommeil",
      "Durée du sommeil",
      "Interactions sociales",
      "Difficultés de communication",
      "Gestion du stress",
      "Stratégies de relaxation",
      "Activité physique"
    ],
    datasets: [
      {
        label: "Évaluation mentale",
        data: Object.values(responses).map(getValue),
        backgroundColor: [
          "#FF6347", // Rouge corail
          "#4682B4", // Bleu acier
          "#32CD32", // Vert lime
          "#FFD700", // Jaune doré
          "#8A2BE2", // Bleu violet
          "#FF1493", // Rose profond
          "#20B2AA", // Bleu vert clair
          "#DC143C", // Rouge cramoisi
          "#00FA9A", // Vert menthe
          "#FF8C00"  // Orange foncé
        ]
      }
    ]
  };

  const formattedScore = score ? score.toFixed(2) : "0.00";

  return (
    <div className="results-container">
      <h2>Résultats de votre évaluation</h2>
      
      <div className="score-section">
        <h3>Score global : {formattedScore}%</h3>
        <div className="score-bar">
          <div 
            className="score-fill"
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      <div className="chart-section">
        <h3>Répartition des réponses</h3>
        <div className="chart-container">
          <Pie data={chartData} />
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="start-evaluation-button"
          onClick={() => navigate('/evaluation')}
        >
          Faire une nouvelle évaluation
        </button>
        <button 
          className="follow-up-button"
          onClick={() => navigate('/mental-follow-up')}
        >
          Voir le suivi mental
        </button>
      </div>
    </div>
  );
};

export default Results;