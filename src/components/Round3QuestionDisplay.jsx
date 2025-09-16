import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { useGame } from '../context/GameContext';

const Round3QuestionDisplay = () => {
  const { state, dispatch } = useGame();

  if (!state.round3CurrentQuestion) {
    return null;
  }

  const currentTeamName = state.teams[`team${state.currentTeam}`].name;

  const handleStartTimer = () => {
    dispatch({ type: 'START_ROUND3_TIMER' });
  };

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
          готова відповідати?
        </Box>
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '200px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '200px', py: 4 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
            Завдання:
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {state.round3CurrentQuestion.task}
          </Typography>
        </CardContent>
      </Card>
      
      <Button
        variant="contained"
        color="success"
        size="large"
        startIcon={<PlayArrow />}
        onClick={handleStartTimer}
        sx={{ minWidth: 300, py: 2 }}
      >
        Запустити таймер (10 секунд)
      </Button>
    </Box>
  );
};

export default Round3QuestionDisplay;
