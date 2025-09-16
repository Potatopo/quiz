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

const Round2Start = () => {
  const { state, dispatch } = useGame();

  const currentTeamName = state.teams[`team${state.currentTeam}`].name;

  const handleStartQuestion = () => {
    dispatch({ type: 'START_ROUND2_QUESTION' });
  };

  const handleShowRules = () => {
    dispatch({ type: 'ROUND2_RULES_SHOWN' });
  };

  // Якщо правила ще не показувалися, показуємо їх
  if (!state.round2RulesShown) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Раунд 2: Коментарі
        </Typography>
        
        <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Готові до другого раунду?
        </Typography>
        
        <Card sx={{ width: '100%', minHeight: '300px', mb: 4, display: 'block' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px', py: 6 }}>
            <Typography variant="h5" component="div" sx={{ mb: 3, fontWeight: 'bold' }}>
              Правила раунду "Коментарі":
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', maxWidth: '600px', mx: 'auto' }}>
              • Вам буде показано коментарі з під YouTube відео
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', maxWidth: '600px', mx: 'auto' }}>
              • Ви маєте обирати правильне відео з 4 варіантів
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', maxWidth: '600px', mx: 'auto' }}>
              • Якщо не вгадаєте з першого коментаря, покажемо другий
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', maxWidth: '600px', mx: 'auto' }}>
              • Бали: 1-й коментар = 4 бали, 2-й = 3 бали, 3-й = 2 бали, 4-й = 1 бал
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', maxWidth: '600px', mx: 'auto' }}>
              • Неправильно обрані відео стають неактивними
            </Typography>
          </CardContent>
        </Card>
        
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrow />}
          onClick={handleShowRules}
          sx={{ minWidth: 300, py: 2 }}
        >
          Розумію, почати гру
        </Button>
      </Box>
    );
  }

  // Якщо правила вже показувалися, показуємо простий екран для наступної команди
  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Раунд 2: Коментарі
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Команда <strong>{currentTeamName}</strong> готова до наступного питання?
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '200px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '200px', py: 6 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Готові продовжити?
          </Typography>
        </CardContent>
      </Card>
      
      <Button
        variant="contained"
        size="large"
        startIcon={<PlayArrow />}
        onClick={handleStartQuestion}
        sx={{ minWidth: 300, py: 2 }}
      >
        Почати питання
      </Button>
    </Box>
  );
};

export default Round2Start;
