import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { useGame } from '../context/GameContext';

const RoundComplete = () => {
  const { state, dispatch } = useGame();

  const handleStartRound2 = () => {
    dispatch({ type: 'START_ROUND2' });
  };

  const team1Score = state.teams.team1.score;
  const team2Score = state.teams.team2.score;
  const winner = team1Score > team2Score ? state.teams.team1.name : 
                 team2Score > team1Score ? state.teams.team2.name : null;

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Раунд 1 завершено!
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '300px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px', py: 6 }}>
          <Typography variant="h5" component="div" sx={{ mb: 3, fontWeight: 'bold' }}>
            Підсумок першого раунду:
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            <strong>{state.teams.team1.name}:</strong> {team1Score} балів
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            <strong>{state.teams.team2.name}:</strong> {team2Score} балів
          </Typography>
          
          {winner && (
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              Лідер після першого раунду: {winner}
            </Typography>
          )}
          
          {!winner && (
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              Нічия після першого раунду!
            </Typography>
          )}
        </CardContent>
      </Card>
      
      <Button
        variant="contained"
        size="large"
        startIcon={<PlayArrow />}
        onClick={handleStartRound2}
        sx={{ minWidth: 300, py: 2 }}
      >
        Перейти до раунду 2: Коментарі
      </Button>
    </Box>
  );
};

export default RoundComplete;
