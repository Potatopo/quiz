import React from 'react';
import { useGame } from '../context/GameContext';
import TeamSetup from './TeamSetup';
import QuestionsLoader from './QuestionsLoader';
import CategorySelection from './CategorySelection';
import DifficultySelection from './DifficultySelection';
import QuestionDisplay from './QuestionDisplay';
import AnswerDisplay from './AnswerDisplay';
import ScoreDisplay from './ScoreDisplay';
import Round2Start from './Round2Start';
import Round2CommentDisplay from './Round2CommentDisplay';
import RoundComplete from './RoundComplete';
import Round2Success from './Round2Success';
import Round2Complete from './Round2Complete';
import Round3Start from './Round3Start';
import Round3QuestionDisplay from './Round3QuestionDisplay';
import Round3TimerDisplay from './Round3TimerDisplay';
import Round3ResultDisplay from './Round3ResultDisplay';
import Round3Success from './Round3Success';
import GameComplete from './GameComplete';

const GameManager = () => {
  const { state } = useGame();

  const renderCurrentPhase = () => {
    switch (state.gamePhase) {
      case 'teamSetup':
        return <TeamSetup />;
      
      case 'questionsLoader':
        return <QuestionsLoader />;
      
      case 'categorySelection':
        return <CategorySelection />;
      
      case 'difficultySelection':
        return <DifficultySelection />;
      
      case 'question':
        return <QuestionDisplay />;
      
      case 'answer':
        return <AnswerDisplay />;
      
      case 'round2Start':
      case 'round2Rules':
        return <Round2Start />;
      
      case 'round2Comment':
      case 'round2VideoSelection':
        return <Round2CommentDisplay />;
      
      case 'round2Success':
        return <Round2Success />;
      
      case 'roundComplete':
        return <RoundComplete />;
      
      case 'round2Complete':
        return <Round2Complete />;
      
      case 'round3Rules':
      case 'round3Start':
        return <Round3Start />;
      
      case 'round3Question':
        return <Round3QuestionDisplay />;
      
      case 'round3Timer':
        return <Round3TimerDisplay />;
      
      case 'round3Result':
        return <Round3ResultDisplay />;
      
      case 'round3Success':
        return <Round3Success />;
      
      case 'gameComplete':
        return <GameComplete />;
      
      default:
        return <TeamSetup />;
    }
  };

  return (
    <>
      <ScoreDisplay />
      {renderCurrentPhase()}
    </>
  );
};

export default GameManager;
