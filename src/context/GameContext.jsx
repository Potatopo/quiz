import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  teams: {
    team1: { name: '', score: 0 },
    team2: { name: '', score: 0 }
  },
  currentRound: 1,
  currentTeam: 1, // 1 or 2
  questionsData: null,
  gamePhase: 'teamSetup', // teamSetup, questionsLoader, categorySelection, difficultySelection, question, answer, roundComplete, round2Rules, round2Start, round2Comment, round2VideoSelection, round2Result, round2Success, round2Complete, round3Rules, round3Start, round3Question, round3Timer, round3Result, round3Success, gameComplete
  selectedCategory: null,
  selectedDifficulty: null,
  currentQuestion: null,
  currentAnswer: null,
  usedQuestions: new Set(),
  usedCategories: new Set(), // Відстеження використаних категорій у раунді 1
  // Round 2 specific state
  round2CurrentQuestion: null,
  round2CurrentCommentIndex: 0,
  round2SelectedVideo: null,
  round2UsedQuestions: new Set(),
  round2QuestionIndex: 0,
  round2DisabledVideos: new Set(), // Відстеження неактивних відео
  round2LastPoints: 0, // Бали за останню правильну відповідь
  round2RulesShown: false, // Чи показувалися правила другого раунду
  
  // Round 3 specific state
  round3CurrentQuestion: null,
  round3UsedQuestions: new Set(),
  round3QuestionIndex: 0,
  round3TimerActive: false,
  round3TimeLeft: 10,
  round3CorrectAnswers: 0,
  round3RulesShown: false // Чи показувалися правила третього раунду
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEAM_NAMES':
      return {
        ...state,
        teams: {
          team1: { ...state.teams.team1, name: action.payload.team1 },
          team2: { ...state.teams.team2, name: action.payload.team2 }
        },
        gamePhase: 'questionsLoader'
      };
    
    case 'SET_QUESTIONS_DATA':
      return {
        ...state,
        questionsData: action.payload
      };
    
    case 'SET_GAME_PHASE':
      return {
        ...state,
        gamePhase: action.payload
      };
    
    case 'SELECT_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
        gamePhase: 'difficultySelection'
      };
    
    case 'SELECT_DIFFICULTY':
      return {
        ...state,
        selectedDifficulty: action.payload
      };
    
    case 'SHOW_QUESTION':
      return {
        ...state,
        currentQuestion: action.payload,
        gamePhase: 'question'
      };
    
    case 'SHOW_ANSWER':
      return {
        ...state,
        currentAnswer: action.payload,
        gamePhase: 'answer'
      };
    
    case 'CORRECT_ANSWER':
      const answeringTeam = state.currentTeam === 1 ? 2 : 1; // Команда, яка відповідала
      const answeringTeamKey = `team${answeringTeam}`;
      return {
        ...state,
        teams: {
          ...state.teams,
          [answeringTeamKey]: {
            ...state.teams[answeringTeamKey],
            score: state.teams[answeringTeamKey].score + (state.selectedDifficulty === 'easy' ? 1 : 2)
          }
        },
        usedCategories: new Set([...state.usedCategories, state.selectedCategory]),
        gamePhase: state.usedCategories.size >= 5 ? 'roundComplete' : 'categorySelection'
      };
    
    case 'WRONG_ANSWER':
      return {
        ...state,
        usedCategories: new Set([...state.usedCategories, state.selectedCategory]),
        gamePhase: state.usedCategories.size >= 5 ? 'roundComplete' : 'categorySelection'
      };
    
    case 'SWITCH_TEAM':
      return {
        ...state,
        currentTeam: state.currentTeam === 1 ? 2 : 1,
        selectedCategory: null,
        selectedDifficulty: null,
        currentQuestion: null,
        currentAnswer: null
      };
    
    case 'START_ROUND2':
      return {
        ...state,
        currentRound: 2,
        gamePhase: state.round2RulesShown ? 'round2Start' : 'round2Rules',
        round2QuestionIndex: 0,
        round2UsedQuestions: new Set()
      };
    
    case 'ROUND2_RULES_SHOWN':
      return {
        ...state,
        round2RulesShown: true,
        gamePhase: 'round2Start'
      };
    
    case 'START_ROUND2_QUESTION':
      const round2Questions = state.questionsData?.rounds?.round2?.questions || [];
      const availableQuestions = round2Questions.filter((_, index) => !state.round2UsedQuestions.has(index));
      
      if (availableQuestions.length === 0) {
        return {
          ...state,
          gamePhase: 'round2Complete'
        };
      }
      
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const selectedQuestion = availableQuestions[randomIndex];
      const originalIndex = round2Questions.findIndex(q => q.id === selectedQuestion.id);
      
      return {
        ...state,
        round2CurrentQuestion: selectedQuestion,
        round2CurrentCommentIndex: 0,
        round2SelectedVideo: null,
        round2DisabledVideos: new Set(), // Скидаємо неактивні відео для нового питання
        gamePhase: 'round2Comment',
        round2UsedQuestions: new Set([...state.round2UsedQuestions, originalIndex])
      };
    
    case 'SHOW_NEXT_COMMENT':
      const nextCommentIndex = state.round2CurrentCommentIndex + 1;
      return {
        ...state,
        round2CurrentCommentIndex: nextCommentIndex,
        gamePhase: 'round2Comment'
      };
    
    case 'SELECT_VIDEO':
      return {
        ...state,
        round2SelectedVideo: action.payload,
        gamePhase: 'round2VideoSelection'
      };
    
    case 'CHECK_ROUND2_ANSWER':
      const isCorrect = state.round2SelectedVideo === state.round2CurrentQuestion.correctAnswer;
      const currentTeam = state.currentTeam;
      const teamKey = `team${currentTeam}`;
      
      if (isCorrect) {
        // Бали залежать від номера коментаря: 4, 3, 2, 1
        const points = 4 - state.round2CurrentCommentIndex;
        return {
          ...state,
          teams: {
            ...state.teams,
            [teamKey]: {
              ...state.teams[teamKey],
              score: state.teams[teamKey].score + points
            }
          },
          round2LastPoints: points,
          gamePhase: 'round2Success'
        };
      } else {
        // Додаємо обране відео до неактивних
        const newDisabledVideos = new Set([...state.round2DisabledVideos, state.round2SelectedVideo]);
        
        // Якщо є ще коментарі, показуємо наступний
        if (state.round2CurrentCommentIndex < state.round2CurrentQuestion.comments.length - 1) {
          return {
            ...state,
            round2CurrentCommentIndex: state.round2CurrentCommentIndex + 1,
            round2SelectedVideo: null, // Скидаємо вибір для наступного коментаря
            round2DisabledVideos: newDisabledVideos,
            gamePhase: 'round2Comment'
          };
        } else {
          // Всі коментарі показані, переходимо до наступної команди
          return {
            ...state,
            currentTeam: state.currentTeam === 1 ? 2 : 1,
            round2DisabledVideos: newDisabledVideos,
            gamePhase: 'round2Start'
          };
        }
      }
    
    case 'CONTINUE_ROUND2':
      const round2QuestionsList = state.questionsData?.rounds?.round2?.questions || [];
      const availableRound2Questions = round2QuestionsList.filter((_, index) => !state.round2UsedQuestions.has(index));
      
      if (availableRound2Questions.length === 0) {
        return {
          ...state,
          gamePhase: 'round2Complete'
        };
      }
      
      return {
        ...state,
        currentTeam: state.currentTeam === 1 ? 2 : 1,
        gamePhase: 'round2Start'
      };
    
    case 'START_ROUND3':
      return {
        ...state,
        currentRound: 3,
        gamePhase: state.round3RulesShown ? 'round3Start' : 'round3Rules',
        round3QuestionIndex: 0,
        round3UsedQuestions: new Set()
      };
    
    case 'ROUND3_RULES_SHOWN':
      return {
        ...state,
        round3RulesShown: true,
        gamePhase: 'round3Start'
      };
    
    case 'START_ROUND3_QUESTION':
      const round3Questions = state.questionsData?.rounds?.round3?.questions || [];
      const availableRound3Questions = round3Questions.filter((_, index) => !state.round3UsedQuestions.has(index));
      
      if (availableRound3Questions.length === 0) {
        return {
          ...state,
          gamePhase: 'gameComplete'
        };
      }
      
      const randomRound3Index = Math.floor(Math.random() * availableRound3Questions.length);
      const selectedRound3Question = availableRound3Questions[randomRound3Index];
      const actualRound3Index = round3Questions.findIndex(q => q.id === selectedRound3Question.id);
      
      return {
        ...state,
        round3CurrentQuestion: selectedRound3Question,
        round3UsedQuestions: new Set([...state.round3UsedQuestions, actualRound3Index]),
        round3QuestionIndex: actualRound3Index,
        round3TimerActive: false,
        round3TimeLeft: 10,
        round3CorrectAnswers: 0,
        gamePhase: 'round3Question'
      };
    
    case 'START_ROUND3_TIMER':
      return {
        ...state,
        round3TimerActive: true,
        round3TimeLeft: 10,
        gamePhase: 'round3Timer'
      };
    
    case 'TICK_ROUND3_TIMER':
      if (state.round3TimeLeft <= 1) {
        return {
          ...state,
          round3TimerActive: false,
          round3TimeLeft: 0,
          gamePhase: 'round3Result'
        };
      }
      return {
        ...state,
        round3TimeLeft: state.round3TimeLeft - 1
      };
    
    case 'ROUND3_ACCEPT_SCORE':
      return {
        ...state,
        round3CorrectAnswers: 1 // Завжди 1 бал за виконання завдання
      };
    
    case 'ROUND3_REJECT_SCORE':
      return {
        ...state,
        round3CorrectAnswers: 0 // 0 балів
      };
    
    case 'ROUND3_FINISH':
      const currentTeamKey = `team${state.currentTeam}`;
      const pointsEarned = state.round3CorrectAnswers;
      
      return {
        ...state,
        teams: {
          ...state.teams,
          [currentTeamKey]: {
            ...state.teams[currentTeamKey],
            score: state.teams[currentTeamKey].score + pointsEarned
          }
        },
        gamePhase: 'round3Success'
      };
    
    case 'CONTINUE_ROUND3':
      const round3QuestionsList = state.questionsData?.rounds?.round3?.questions || [];
      const availableRound3QuestionsList = round3QuestionsList.filter((_, index) => !state.round3UsedQuestions.has(index));
      
      if (availableRound3QuestionsList.length === 0) {
        return {
          ...state,
          gamePhase: 'gameComplete'
        };
      }
      
      return {
        ...state,
        currentTeam: state.currentTeam === 1 ? 2 : 1,
        gamePhase: 'round3Start'
      };
    
    case 'RESET_GAME':
      return initialState;
    
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
