import { useLocation, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./Results.css";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Récupération sécurisée des données passées via navigate
  const { responses = {}, score = 0 } = location.state || {};

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
      "Activité physique",
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
          "#FF8C00", // Orange foncé
        ],
        hoverBackgroundColor: [
          "#FF6347", // Rouge corail
          "#4682B4", // Bleu acier
          "#32CD32", // Vert lime
          "#FFD700", // Jaune doré
          "#8A2BE2", // Bleu violet
          "#FF1493", // Rose profond
          "#20B2AA", // Bleu vert clair
          "#DC143C", // Rouge cramoisi
          "#00FA9A", // Vert menthe
          "#FF8C00", // Orange foncé
        ],
      },
    ],
  };

  const formattedScore = score ? score.toFixed(2) : "0.00";

  return (
    <>
    <div className="results-container">
      <h2>Résultats détaillés</h2>

      {/* Affichage du graphique */}
      <div className="chart-container">
        <Pie data={chartData} aria-label="Graphique des résultats de l'évaluation mentale" />
      </div>

      {/* Score global */}
      <div className="score-summary">
        <h3>Votre Score Global : {formattedScore}%</h3>
        <p>Ce graphique montre une répartition détaillée de vos réponses par catégorie.</p>
      </div>

      {/* Bouton pour revenir à l'évaluation */}
      <button onClick={() => navigate("/evaluation")}>Retour à l'évaluation</button>
    </div>
    </>
  );
};

export default Results;
