import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { useGame } from '../context/GameContext';

const Round3Start = () => {
  const { state, dispatch } = useGame();

  const currentTeamName = state.teams[`team${state.currentTeam}`].name;

  const handleStartQuestion = () => {
    dispatch({ type: 'START_ROUND3_QUESTION' });
  };

  const handleShowRules = () => {
    dispatch({ type: 'ROUND3_RULES_SHOWN' });
  };

  // Якщо правила ще не показувалися, показуємо їх
  if (!state.round3RulesShown) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Раунд 3: П'яте десяте
        </Typography>
        
        <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Готові до третього раунду?
        </Typography>
        
        <Card sx={{ width: '100%', minHeight: '300px', mb: 4, display: 'block' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px', py: 6 }}>
            <Typography variant="h5" component="div" sx={{ mb: 3, fontWeight: 'bold' }}>
              Правила раунду "П'яте десяте":
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', maxWidth: '600px', mx: 'auto' }}>
              • Команді потрібно назвати 5 речей за 10 секунд
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', maxWidth: '600px', mx: 'auto' }}>
              • За кожну правильну відповідь команда отримує 1 бал
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', maxWidth: '600px', mx: 'auto' }}>
              • Таймер запускається по кнопці
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', maxWidth: '600px', mx: 'auto' }}>
              • Після закінчення часу команда отримує бали за правильні відповіді
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', maxWidth: '600px', mx: 'auto' }}>
              • Команди чергуються по 3 питання кожна
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
        Раунд 3: П'яте десяте
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

export default Round3Start;
