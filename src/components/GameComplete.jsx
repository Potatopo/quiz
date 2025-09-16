import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import { useGame } from '../context/GameContext';

const GameComplete = () => {
  const { state, dispatch } = useGame();

  const team1Score = state.teams.team1.score;
  const team2Score = state.teams.team2.score;
  const winner = team1Score > team2Score ? state.teams.team1.name : 
                team2Score > team1Score ? state.teams.team2.name : 
                'Нічия';

  const handleResetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Гра завершена!
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '400px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '400px', py: 6 }}>
          <EmojiEvents sx={{ fontSize: 100, color: 'warning.main', mb: 3 }} />
          
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}>
            Переможець: {winner}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mb: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                {state.teams.team1.name}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: team1Score > team2Score ? 'success.main' : 'text.primary' }}>
                {team1Score}
              </Typography>
            </Box>
            
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
              VS
            </Typography>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                {state.teams.team2.name}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: team2Score > team1Score ? 'success.main' : 'text.primary' }}>
                {team2Score}
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Дякуємо за гру! 🎉
          </Typography>
        </CardContent>
      </Card>
      
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleResetGame}
        sx={{ minWidth: 250, py: 2 }}
      >
        Почати нову гру
      </Button>
    </Box>
  );
};

export default GameComplete;
