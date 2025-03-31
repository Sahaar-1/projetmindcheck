import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from 'react-icons/fa';
import { format, addDays, differenceInDays } from "date-fns";
import './MentalFollowUp.css';

const MentalFollowUp = () => {
  const navigate = useNavigate();
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur a terminé l'évaluation
    const savedScore = localStorage.getItem("evaluationScore");
    if (savedScore) {
      setScore(parseFloat(savedScore));
    }
  }, []);

  // Si l'utilisateur n'a pas de score, rediriger vers l'évaluation
  if (!score) {
    return (
      <div className="no-evaluation-message">
        <h3>Oups ! Il semble que vous n'ayez pas encore complété l'évaluation.</h3>
        <p>Veuillez terminer l'évaluation pour commencer votre suivi. C'est rapide et facile !</p>
        <button 
          className="start-evaluation-button"
          onClick={() => navigate('/evaluation')}
        >
          Commencer l'évaluation
        </button>
      </div>
    );
  }

  const currentDate = new Date();
  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");

  const getFollowUpPlan = () => {
    let endDate, daysDuration, plan, message = null;

    if (score < 40) {
      endDate = addDays(currentDate, 30);
      daysDuration = differenceInDays(endDate, currentDate);
      plan = [
        "Jour 1-5: Pratiquez la respiration profonde (5-10 minutes chaque matin)...",
        "Jour 6-10: Notez vos pensées et émotions dans un carnet...",
        "Jour 11-15: Faites une promenade quotidienne de 30 minutes...",
        "Jour 16-20: Pratiquez la méditation en pleine conscience...",
        "Jour 21-30: Évaluez vos progrès et ajustez vos objectifs..."
      ];
    } else if (score < 70) {
      endDate = addDays(currentDate, 21);
      daysDuration = differenceInDays(endDate, currentDate);
      plan = [
        "Jour 1-5: Pratiquez la respiration profonde...",
        "Jour 6-10: Commencez à tenir un journal...",
        "Jour 11-15: Pratiquez la relaxation musculaire progressive...",
        "Jour 16-21: Engagez-vous dans des activités sociales..."
      ];
    } else if (score < 90) {
      endDate = addDays(currentDate, 14);
      daysDuration = differenceInDays(endDate, currentDate);
      plan = [
        "Jour 1-3: Pratiquez des exercices de relaxation...",
        "Jour 4-7: Pratiquez une activité physique modérée...",
        "Jour 8-11: Engagez-vous dans des activités créatives...",
        "Jour 12-14: Évaluez vos progrès et ajustez vos objectifs..."
      ];
    } else {
      message = "Votre santé mentale est excellente ! Vous méritez une pause, vous êtes trop bon pour avoir besoin de suivi ! 🌟";
      return {
        startDate: formattedCurrentDate,
        endDate: formattedCurrentDate,
        daysDuration: 0,
        plan: [],
        message
      };
    }

    return {
      startDate: formattedCurrentDate,
      endDate: format(endDate, "yyyy-MM-dd"),
      daysDuration,
      plan,
      message
    };
  };

  const { startDate, endDate, daysDuration, plan = [], message } = getFollowUpPlan();

  const handleTaskToggle = (index) => {
    const updatedCheckedTasks = [...checkedTasks];
    
    if (updatedCheckedTasks.length <= index) {
      updatedCheckedTasks.length = index + 1;
    }

    updatedCheckedTasks[index] = !updatedCheckedTasks[index];
    setCheckedTasks(updatedCheckedTasks);
  };

  // Calcul du nombre de tâches accomplies
  const completedTasksCount = checkedTasks.filter(task => task).length;

  return (
    <div className="follow-up-container">
      <h2>Suivi Mental <FaCheckCircle className="step-icon" /></h2>
      <div className="date-container">
        <p><strong>Date de début du suivi :</strong> {startDate}</p>
        <p><strong>Date de fin du suivi :</strong> {endDate}</p>
        <p><strong>Durée :</strong> {daysDuration} jours</p>
      </div>

      <h4>Plan d'action pour améliorer votre bien-être :</h4>
      {message && <p className="positive-message">{message}</p>}

      {plan.length > 0 && (
        <ul className="plan-list">
          {plan.map((task, index) => (
            <li key={index} className="plan-item" onClick={() => handleTaskToggle(index)}>
              <FaCheckCircle
                className={`check-icon ${checkedTasks[index] ? "checked" : ""}`}
              />
              {task}
            </li>
          ))}
        </ul>
      )}

      {!message && (
        <p className="message">
          Vous êtes sur la bonne voie pour améliorer votre bien-être mental. Veuillez suivre les étapes du plan d'action chaque jour...
        </p>
      )}

      <div className="quotes-section">
        <p className="quote">"Le bien-être mental est un voyage..."</p>
        <p className="quote">"La santé mentale est tout aussi importante que la santé physique..."</p>
      </div>

      {plan.length > 0 && (
        <div className="completed-tasks">
          <p><strong>Tâches complétées :</strong> {completedTasksCount} / {plan.length}</p>
        </div>
      )}
    </div>
  );
};

export default MentalFollowUp;