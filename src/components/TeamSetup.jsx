import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Grid
} from '@mui/material';
import { useGame } from '../context/GameContext';

const TeamSetup = () => {
  const { dispatch } = useGame();
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  const handleStart = () => {
    if (team1Name.trim() && team2Name.trim()) {
      dispatch({
        type: 'SET_TEAM_NAMES',
        payload: {
          team1: team1Name.trim(),
          team2: team2Name.trim()
        }
      });
      dispatch({ type: 'SET_GAME_PHASE', payload: 'questionsLoader' });
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Налаштування команд
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Введіть назви команд для початку вікторини
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '300px', display: 'block' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px' }}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Назва команди 1"
                  value={team1Name}
                  onChange={(e) => setTeam1Name(e.target.value)}
                  variant="outlined"
                  placeholder="Наприклад: Дракони"
                />
              </Grid>
              
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Назва команди 2"
                  value={team2Name}
                  onChange={(e) => setTeam2Name(e.target.value)}
                  variant="outlined"
                  placeholder="Наприклад: Тигри"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleStart}
                disabled={!team1Name.trim() || !team2Name.trim()}
                sx={{ minWidth: 200 }}
              >
                Почати гру
              </Button>
            </Box>
          </CardContent>
        </Card>
    </Box>
  );
};

export default TeamSetup;
