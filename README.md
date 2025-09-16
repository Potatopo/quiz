# Quiz Game 🧠

An interactive web quiz game for teams with three rounds of different types of challenges. Built with React using Material-UI for a modern and user-friendly interface.

## 🎯 Features

- **Team Game**: Support for two teams with score tracking
- **Three Rounds**: Different types of challenges for variety
- **Ukrainian Localization**: Fully localized in Ukrainian
- **Modern UI**: Using Material-UI for beautiful interface
- **Responsive Design**: Works on different devices

## 🎮 Game Rules

### Round 1: Classic Questions
- Teams take turns selecting category and difficulty level
- **Easy Questions**: 1 point for correct answer
- **Hard Questions**: 2 points for correct answer
- Round ends after all categories are used

### Round 2: Guess Video by Comments
- Teams are shown video comments one by one
- After each comment, team can try to guess the video
- **Points for correct answer**:
  - After 1st comment: 4 points
  - After 2nd comment: 3 points
  - After 3rd comment: 2 points
  - After 4th comment: 1 point
- If answer is wrong, next comment is shown

### Round 3: Speed and Knowledge
- Teams receive speed challenges (e.g., "name 5 European capitals")
- 10 seconds given to complete the task
- Team gets 1 point for correctly completed task

## 🚀 Installation and Setup

### Requirements
- Node.js (version 16 or newer)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

### Other Commands

```bash
# Build for production
npm run build

# Preview build
npm run preview

# Run ESLint code check
npm run lint
```

## 🏗️ Project Architecture

```
src/
├── components/          # React components
│   ├── GameManager.jsx  # Main game manager
│   ├── TeamSetup.jsx    # Team setup
│   ├── QuestionDisplay.jsx # Question display
│   └── ...              # Other components
├── context/
│   └── GameContext.jsx  # Game state context
├── data/
│   └── defaultQuestions.json # Questions and tasks
└── App.jsx             # Main component
```

## 📊 Data Structure

### Questions (Round 1)
```json
{
  "rounds": {
    "round1": {
      "categories": {
        "history": {
          "name": "Історія",
          "questions": {
            "easy": { "question": "...", "answer": "..." },
            "hard": { "question": "...", "answer": "..." }
          }
        }
      }
    }
  }
}
```

### Video Tasks (Round 2)
```json
{
  "round2": {
    "questions": [{
      "id": "video1",
      "comments": ["коментар 1", "коментар 2", ...],
      "videos": ["відео 1", "відео 2", ...],
      "correctAnswer": 0
    }]
  }
}
```

### Speed Tasks (Round 3)
```json
{
  "round3": {
    "questions": [{
      "id": "round3_1",
      "task": "назвати 5 столиць Європи",
      "answers": ["Париж", "Лондон", ...]
    }]
  }
}
```

## 🛠️ Technologies

- **React 19** - Main framework
- **Material-UI 7** - UI components and themes
- **Vite** - Build tool and development server
- **ESLint** - Code linter
- **React Router DOM** - Routing

## 🎨 Customization

### Adding New Questions
Edit the `src/data/defaultQuestions.json` file and add new categories, questions or tasks.

### Changing Theme
Modify the Material-UI theme in `src/App.jsx`:

```jsx
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
});
```

### Timer Settings
Change the time for round 3 in `src/context/GameContext.jsx`:

```jsx
round3TimeLeft: 10, // seconds
```

## 📝 License

This project is developed for educational purposes.

## 🤝 Contributing

Suggestions for game improvements are welcome! Create issues and pull requests.

---

**Have fun playing! 🎉**