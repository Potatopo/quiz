import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button
} from '@mui/material';
import { CheckCircle, ArrowForward } from '@mui/icons-material';
import { useGame } from '../context/GameContext';

const Round2Success = () => {
  const { state, dispatch } = useGame();

  const currentTeamName = state.teams[`team${state.currentTeam}`].name;
  const points = state.round2LastPoints;

  const handleContinue = () => {
    dispatch({ type: 'CONTINUE_ROUND2' });
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Вітаємо! 🎉
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '300px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px', py: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <CheckCircle sx={{ fontSize: 60, color: 'success.main', mr: 2 }} />
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'success.main' }}>
              Правильно!
            </Typography>
          </Box>
          
          <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
            Команді <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>{currentTeamName}</Box>
          </Typography>
          
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
            +{points} {points === 1 ? 'бал' : points < 5 ? 'бали' : 'балів'}
          </Typography>
          
          <Typography variant="h6" color="text.secondary">
            Переходимо до наступної команди
          </Typography>
        </CardContent>
      </Card>
      
      <Button
        variant="contained"
        size="large"
        endIcon={<ArrowForward />}
        onClick={handleContinue}
        sx={{ minWidth: 300, py: 2 }}
      >
        Продовжити гру
      </Button>
    </Box>
  );
};

export default Round2Success;
