import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { CheckCircleOutline, Cancel } from '@mui/icons-material';
import { useGame } from '../context/GameContext';

const Round3ResultDisplay = () => {
  const { state, dispatch } = useGame();

  if (!state.round3CurrentQuestion) {
    return null;
  }

  const currentTeamName = state.teams[`team${state.currentTeam}`].name;

  const handleAcceptScore = () => {
    dispatch({ type: 'ROUND3_ACCEPT_SCORE' });
    dispatch({ type: 'ROUND3_FINISH' });
  };

  const handleRejectScore = () => {
    dispatch({ type: 'ROUND3_REJECT_SCORE' });
    dispatch({ type: 'ROUND3_FINISH' });
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Раунд 3: П'яте десяте
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '300px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px', py: 4 }}>
          <CheckCircleOutline sx={{ fontSize: 80, color: 'warning.main', mb: 3 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'warning.main' }}>
            Час вийшов!
          </Typography>
          
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Команда <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>{currentTeamName}</Box> виконала завдання?
          </Typography>
          
          <Typography variant="h6" component="div" sx={{ mb: 3 }}>
            Завдання: <Box component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>{state.round3CurrentQuestion.task}</Box>
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
            Правильні відповіді: {state.round3CurrentQuestion.answers.slice(0, 5).join(', ')}
          </Typography>
        </CardContent>
      </Card>
      
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<CheckCircleOutline />}
            onClick={handleAcceptScore}
            sx={{ minWidth: 200, py: 2 }}
          >
            Так, зарахувати бал
          </Button>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="error"
            size="large"
            startIcon={<Cancel />}
            onClick={handleRejectScore}
            sx={{ minWidth: 200, py: 2 }}
          >
            Ні, не зарахувати
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Round3ResultDisplay;
