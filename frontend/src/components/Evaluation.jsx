import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Slider,
  TextField,
  Button,
  Box,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Evaluation = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastEvaluation, setLastEvaluation] = useState(null);
  const [formData, setFormData] = useState({
    mood: 5,
    anxiety: 5,
    sleep: 5,
    energy: 5,
    notes: ''
  });

  useEffect(() => {
    const fetchLastEvaluation = async () => {
      if (!token) {
        setError("Vous devez être connecté pour accéder à cette page");
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:5000/api/evaluation/last', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Session expirée, veuillez vous reconnecter");
            navigate('/login');
            return;
          }
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setLastEvaluation(data);
      } catch (error) {
        console.error('Erreur:', error);
        setError(error.message || "Erreur lors de la récupération de la dernière évaluation");
      } finally {
        setLoading(false);
      }
    };

    fetchLastEvaluation();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Vous devez être connecté pour soumettre une évaluation");
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expirée, veuillez vous reconnecter");
          navigate('/login');
          return;
        }
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setLastEvaluation(data);
      setFormData({
        mood: 5,
        anxiety: 5,
        sleep: 5,
        energy: 5,
        notes: ''
      });
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message || "Erreur lors de l'envoi de l'évaluation");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (event, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotesChange = (event) => {
    setFormData(prev => ({
      ...prev,
      notes: event.target.value
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="h4" gutterBottom>
          Évaluation de votre état mental
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography gutterBottom>Humeur</Typography>
              <Slider
                value={formData.mood}
                onChange={handleChange('mood')}
                min={1}
                max={10}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Anxiété</Typography>
              <Slider
                value={formData.anxiety}
                onChange={handleChange('anxiety')}
                min={1}
                max={10}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Qualité du sommeil</Typography>
              <Slider
                value={formData.sleep}
                onChange={handleChange('sleep')}
                min={1}
                max={10}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Niveau d'énergie</Typography>
              <Slider
                value={formData.energy}
                onChange={handleChange('energy')}
                min={1}
                max={10}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notes"
                value={formData.notes}
                onChange={handleNotesChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Envoi en cours...' : 'Soumettre l\'évaluation'}
              </Button>
            </Grid>
          </Grid>
        </form>

        {lastEvaluation && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Dernière évaluation
            </Typography>
            <Typography>
              Date: {new Date(lastEvaluation.date).toLocaleDateString()}
            </Typography>
            <Typography>Humeur: {lastEvaluation.mood}/10</Typography>
            <Typography>Anxiété: {lastEvaluation.anxiety}/10</Typography>
            <Typography>Sommeil: {lastEvaluation.sleep}/10</Typography>
            <Typography>Énergie: {lastEvaluation.energy}/10</Typography>
            {lastEvaluation.notes && (
              <Typography>Notes: {lastEvaluation.notes}</Typography>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Evaluation; 