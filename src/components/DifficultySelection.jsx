import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid
} from '@mui/material';
import { useGame } from '../context/GameContext';

const DifficultySelection = () => {
  const { state, dispatch } = useGame();

  if (!state.selectedCategory || !state.questionsData) {
    return null;
  }

  const category = state.questionsData.rounds.round1.categories[state.selectedCategory];
  const currentTeamName = state.teams[`team${state.currentTeam}`].name;
  const opponentTeamName = state.teams[`team${state.currentTeam === 1 ? 2 : 1}`].name;

  const handleDifficultySelect = (difficulty) => {
    // Показати питання після вибору складності
    const question = category.questions[difficulty];
    dispatch({ 
      type: 'SHOW_QUESTION', 
      payload: { 
        question: question.question,
        category: category.name,
        difficulty: difficulty
      } 
    });
    dispatch({ type: 'SELECT_DIFFICULTY', payload: difficulty });
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Вибір складності
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 2 }}>
        Категорія: <strong>{category.name}</strong>
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
        <strong>{opponentTeamName}</strong> буде відповідати на питання
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Card 
            sx={{ 
                height: '200px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 3
              }
            }}
            onClick={() => handleDifficultySelect('easy')}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" component="h2" color="success.main">
                Просте питання
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                1 бал
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Легше питання з категорії
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Card 
            sx={{ 
                height: '200px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 3
              }
            }}
            onClick={() => handleDifficultySelect('hard')}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" component="h2" color="error.main">
                Складне питання
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                2 бали
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Складніше питання з категорії
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DifficultySelection;
