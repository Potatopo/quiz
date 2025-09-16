import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid
} from '@mui/material';
import { Comment, PlayArrow } from '@mui/icons-material';
import { useGame } from '../context/GameContext';

const Round2CommentDisplay = () => {
  const { state, dispatch } = useGame();

  if (!state.round2CurrentQuestion) {
    return null;
  }

  const currentTeamName = state.teams[`team${state.currentTeam}`].name;
  const currentComment = state.round2CurrentQuestion.comments[state.round2CurrentCommentIndex];
  const videos = state.round2CurrentQuestion.videos;
  const correctAnswer = state.round2CurrentQuestion.correctAnswer;

  const handleVideoSelect = (videoIndex) => {
    dispatch({ type: 'SELECT_VIDEO', payload: videoIndex });
  };

  const handleCheckAnswer = () => {
    dispatch({ type: 'CHECK_ROUND2_ANSWER' });
  };

  const isVideoDisabled = (videoIndex) => {
    // Перевіряємо, чи відео в списку неактивних
    return state.round2DisabledVideos.has(videoIndex);
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Раунд 2: Коментарі
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
        <Box component="span" sx={{ 
          backgroundColor: 'primary.main', 
          color: 'white', 
          px: 2, 
          py: 1, 
          borderRadius: 2,
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          Команда {currentTeamName}
        </Box>
        <Box component="span" sx={{ mx: 2 }}>
          обирає відео за коментарем
        </Box>
      </Typography>
      
      {/* Відображення поточного коментаря */}
      <Card sx={{ width: '100%', minHeight: '200px', mb: 4, display: 'block' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '200px', py: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Comment sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              Коментар {state.round2CurrentCommentIndex + 1} з {state.round2CurrentQuestion.comments.length}
            </Typography>
            <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', ml: 2 }}>
              (Можливо отримати: {4 - state.round2CurrentCommentIndex} балів)
            </Typography>
          </Box>
          
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            "{currentComment}"
          </Typography>
        </CardContent>
      </Card>
      
      {/* Відображення відео для вибору */}
      <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
        Оберіть відео:
      </Typography>
      
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '120px',
                width: '100%',
                cursor: isVideoDisabled(index) ? 'not-allowed' : 'pointer',
                opacity: isVideoDisabled(index) ? 0.5 : 1,
                transition: 'transform 0.2s',
                '&:hover': !isVideoDisabled(index) ? {
                  transform: 'scale(1.05)',
                  boxShadow: 3
                } : {},
                backgroundColor: state.round2SelectedVideo === index ? 'primary.light' : 'background.paper',
                color: state.round2SelectedVideo === index ? 'primary.contrastText' : 'text.primary'
              }}
              onClick={() => !isVideoDisabled(index) && handleVideoSelect(index)}
            >
              <CardContent sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%',
                textAlign: 'center',
                py: 2
              }}>
                <Box>
                  <PlayArrow sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                    {video}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Кнопка для підтвердження вибору */}
      {state.round2SelectedVideo !== null && (
        <Button
          variant="contained"
          size="large"
          onClick={handleCheckAnswer}
          sx={{ minWidth: 250, py: 2 }}
        >
          Підтвердити вибір
        </Button>
      )}
    </Box>
  );
};

export default Round2CommentDisplay;
