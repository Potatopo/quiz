import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert
} from '@mui/material';
import { Upload, Quiz } from '@mui/icons-material';
import { useGame } from '../context/GameContext';
import defaultQuestions from '../data/defaultQuestions.json';

const QuestionsLoader = () => {
  const { dispatch } = useGame();
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/json') {
      setError('Будь ласка, виберіть JSON файл');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const questionsData = JSON.parse(e.target.result);
        dispatch({ type: 'SET_QUESTIONS_DATA', payload: questionsData });
        dispatch({ type: 'SET_GAME_PHASE', payload: 'categorySelection' });
        setError('');
      } catch (err) {
        setError('Помилка при читанні файлу. Перевірте формат JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleUseDefault = () => {
    dispatch({ type: 'SET_QUESTIONS_DATA', payload: defaultQuestions });
    dispatch({ type: 'SET_GAME_PHASE', payload: 'categorySelection' });
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
      <Quiz sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
      
      <Typography variant="h4" component="h1" gutterBottom>
        Завантаження питань
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Виберіть файл з питаннями або використайте стандартний набір
      </Typography>
      
      <Card sx={{ width: '100%', minHeight: '300px', display: 'block' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px' }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box sx={{ mb: 3 }}>
              <input
                accept=".json"
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<Upload />}
                  size="large"
                  sx={{ mb: 2 }}
                >
                  Завантажити JSON файл
                </Button>
              </label>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              або
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              onClick={handleUseDefault}
              sx={{ minWidth: 200 }}
            >
              Використати стандартні питання
            </Button>
          </CardContent>
        </Card>
    </Box>
  );
};

export default QuestionsLoader;
