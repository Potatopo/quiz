import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useGame } from '../context/GameContext';

const Round3Success = () => {
  const { state, dispatch } = useGame();

  const currentTeamName = state.teams[`team${state.currentTeam}`].name;
  const pointsEarned = state.round3CorrectAnswers;

  const handleContinue = () => {
    dispatch({ type: 'CONTINUE_ROUND3' });
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Card sx={{ width: '100%', minHeight: '300px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px', py: 4 }}>
          <CheckCircleOutline sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'success.main' }}>
            Вітаємо!
          </Typography>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Команді <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>{currentTeamName}</Box> зараховано <Box component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>{pointsEarned}</Box> балів!
          </Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleContinue}
        sx={{ minWidth: 250, py: 2 }}
      >
        Продовжити гру
      </Button>
    </Box>
  );
};

export default Round3Success;
