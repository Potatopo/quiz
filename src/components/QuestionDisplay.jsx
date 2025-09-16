import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button
} from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { useGame } from '../context/GameContext';

const QuestionDisplay = () => {
  const { state, dispatch } = useGame();

  if (!state.currentQuestion) {
    return null;
  }

  const opponentTeamName = state.teams[`team${state.currentTeam === 1 ? 2 : 1}`].name;

  const handleSubmitAnswer = () => {
    const category = state.questionsData.rounds.round1.categories[state.selectedCategory];
    const answer = category.questions[state.selectedDifficulty].answer;
    dispatch({ type: 'SHOW_ANSWER', payload: answer });
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Питання
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 2 }}>
        Категорія: <strong>{state.currentQuestion.category}</strong>
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Команда <strong>{opponentTeamName}</strong> відповідає
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '300px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px', py: 6 }}>
          <Typography variant="h5" component="div" sx={{ mb: 4, lineHeight: 1.6 }}>
            {state.currentQuestion.question}
          </Typography>
          
          <Typography variant="body1" color="text.secondary">
            Складність: {state.currentQuestion.difficulty === 'easy' ? 'Просте' : 'Складне'} 
            ({state.currentQuestion.difficulty === 'easy' ? '1' : '2'} бал)
          </Typography>
        </CardContent>
      </Card>
      
      <Button
        variant="contained"
        size="large"
        startIcon={<HelpOutline />}
        onClick={handleSubmitAnswer}
        sx={{ minWidth: 250 }}
      >
        Я можу зараховувати цю відповідь?
      </Button>
    </Box>
  );
};

export default QuestionDisplay;
