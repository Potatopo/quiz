import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useGame } from '../context/GameContext';

const Round2Complete = () => {
  const { state, dispatch } = useGame();

  const team1Score = state.teams.team1.score;
  const team2Score = state.teams.team2.score;
  const leadingTeam = team1Score > team2Score ? state.teams.team1.name : 
                     team2Score > team1Score ? state.teams.team2.name : 
                     'Нічия';

  const handleStartRound3 = () => {
    dispatch({ type: 'START_ROUND3' });
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Раунд 2 завершено!
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '300px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px', py: 6 }}>
          <Typography variant="h5" component="div" sx={{ mb: 3, fontWeight: 'bold' }}>
            Результати другого раунду:
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mb: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                {state.teams.team1.name}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {team1Score}
              </Typography>
            </Box>
            
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
              VS
            </Typography>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                {state.teams.team2.name}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {team2Score}
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Лідер: {leadingTeam}
          </Typography>
        </CardContent>
      </Card>
      
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleStartRound3}
        sx={{ minWidth: 300, py: 2 }}
      >
        Перейти до раунду 3: П'яте десяте
      </Button>
    </Box>
  );
};

export default Round2Complete;
