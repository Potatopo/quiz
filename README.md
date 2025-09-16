# Quiz App

A modern React-based quiz application built with Vite and Material-UI.

## Features

- Interactive quiz interface
- Multiple choice questions
- Real-time progress tracking
- Results page with detailed feedback
- Responsive design with Material-UI components

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── Home.jsx        # Landing page
│   ├── Quiz.jsx        # Quiz interface
│   └── Results.jsx     # Results page
├── App.jsx             # Main app component with routing
└── main.jsx            # App entry point
```

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **Material-UI (MUI)** - UI component library
- **React Router** - Client-side routing
- **Emotion** - CSS-in-JS styling

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

To add your own quiz questions, edit the `sampleQuestions` array in `src/components/Quiz.jsx`.

## License

This project is open source and available under the MIT License.