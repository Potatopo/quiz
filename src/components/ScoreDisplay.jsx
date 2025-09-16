import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip
} from '@mui/material';
import { useGame } from '../context/GameContext';

const ScoreDisplay = () => {
  const { state } = useGame();

  if (!state.teams.team1.name || !state.teams.team2.name) {
    return null;
  }

  return (
    <Box sx={{ mb: 4, width: '100%' }}>
      <Card sx={{ width: '100%', display: 'block' }}>
        <CardContent>
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          {state.currentRound === 1 ? 'Раунд 1: Підстава' : 
           state.currentRound === 2 ? 'Раунд 2: Коментарі' : 
           'Раунд 3: П\'яте десяте'}
        </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h6" color="primary">
                {state.teams.team1.name}
              </Typography>
              <Typography variant="h4" component="div">
                {state.teams.team1.score}
              </Typography>
              {state.currentTeam === 1 && (
                <Chip label="Активна команда" color="primary" size="small" />
              )}
            </Box>
            
            <Typography variant="h4" color="text.secondary">
              VS
            </Typography>
            
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h6" color="secondary">
                {state.teams.team2.name}
              </Typography>
              <Typography variant="h4" component="div">
                {state.teams.team2.score}
              </Typography>
              {state.currentTeam === 2 && (
                <Chip label="Активна команда" color="secondary" size="small" />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ScoreDisplay;
