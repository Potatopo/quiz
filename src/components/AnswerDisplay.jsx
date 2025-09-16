import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useGame } from '../context/GameContext';

const AnswerDisplay = () => {
  const { state, dispatch } = useGame();

  if (!state.currentAnswer) {
    return null;
  }

  const opponentTeamName = state.teams[`team${state.currentTeam === 1 ? 2 : 1}`].name;

  const handleCorrectAnswer = () => {
    dispatch({ type: 'CORRECT_ANSWER' });
    dispatch({ type: 'SWITCH_TEAM' });
  };

  const handleWrongAnswer = () => {
    dispatch({ type: 'WRONG_ANSWER' });
    dispatch({ type: 'SWITCH_TEAM' });
  };


  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Відповідь
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Команда <strong>{opponentTeamName}</strong> відповіла правильно?
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '300px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px', py: 4 }}>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Правильна відповідь:
          </Typography>
          
          <Typography variant="h4" component="div" color="primary" sx={{ fontWeight: 'bold' }}>
            {state.currentAnswer}
          </Typography>
        </CardContent>
      </Card>
      
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<CheckCircle />}
            onClick={handleCorrectAnswer}
            sx={{ minWidth: 200, py: 2 }}
          >
            Правильно
          </Button>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="error"
            size="large"
            startIcon={<Cancel />}
            onClick={handleWrongAnswer}
            sx={{ minWidth: 200, py: 2 }}
          >
            Неправильно
          </Button>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default AnswerDisplay;
