import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent, LinearProgress } from '@mui/material';
import { useGame } from '../context/GameContext';

const Round3TimerDisplay = () => {
  const { state, dispatch } = useGame();

  if (!state.round3CurrentQuestion) {
    return null;
  }

  const currentTeamName = state.teams[`team${state.currentTeam}`].name;

  useEffect(() => {
    if (state.round3TimerActive) {
      const interval = setInterval(() => {
        dispatch({ type: 'TICK_ROUND3_TIMER' });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state.round3TimerActive, dispatch]);

  const progress = ((10 - state.round3TimeLeft) / 10) * 100;

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Раунд 3: П'яте десяте
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
        <Box component="span" sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          px: 2,
          py: 1,
          borderRadius: 2,
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          Команда {currentTeamName}
        </Box>
        <Box component="span" sx={{ mx: 2 }}>
          відповідає!
        </Box>
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '200px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '200px', py: 4 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
            Завдання:
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
            {state.round3CurrentQuestion.task}
          </Typography>
          
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: state.round3TimeLeft <= 3 ? 'error.main' : 'primary.main', mb: 2 }}>
            {state.round3TimeLeft}
          </Typography>
          
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              backgroundColor: 'grey.300',
              '& .MuiLinearProgress-bar': {
                backgroundColor: state.round3TimeLeft <= 3 ? 'error.main' : 'primary.main'
              }
            }} 
          />
          
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'text.secondary' }}>
            Називайте відповіді вголос!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Round3TimerDisplay;
