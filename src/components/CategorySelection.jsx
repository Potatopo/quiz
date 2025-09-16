import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button
} from '@mui/material';
import { useGame } from '../context/GameContext';

const CategorySelection = () => {
  const { state, dispatch } = useGame();

  if (!state.questionsData) {
    return null;
  }

  const allCategories = state.questionsData.rounds.round1.categories;
  
  const currentTeamName = state.teams[`team${state.currentTeam}`].name;
  const opponentTeamName = state.teams[`team${state.currentTeam === 1 ? 2 : 1}`].name;

  const handleCategorySelect = (categoryKey) => {
    if (!state.usedCategories.has(categoryKey)) {
      dispatch({ type: 'SELECT_CATEGORY', payload: categoryKey });
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Вибір категорії
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
        <strong>{currentTeamName}</strong> обирає категорію для команди <strong>{opponentTeamName}</strong>
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {Object.entries(allCategories).map(([key, category]) => {
          const isUsed = state.usedCategories.has(key);
          return (
          <Grid item size={4} key={key}>
            <Card 
              sx={{ 
                height: '180px',
                width: '100%',
                cursor: isUsed ? 'not-allowed' : 'pointer',
                opacity: isUsed ? 0.5 : 1,
                transition: 'transform 0.2s',
                '&:hover': !isUsed ? {
                  transform: 'scale(1.05)',
                  boxShadow: 3
                } : {},
                backgroundColor: isUsed ? 'grey.200' : 'background.paper'
              }}
              onClick={() => handleCategorySelect(key)}
            >
              <CardContent sx={{ textAlign: 'center', py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: isUsed ? 'text.disabled' : 'text.primary' }}>
                  {category.name}
                </Typography>
                {isUsed && (
                  <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                    Використано
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CategorySelection;
