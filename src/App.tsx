import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
// import Form from './components/OldfForm';
import NewForm from './components/Form';
import QuizScreen from './components/Quizzes';

type TDisplay = 'createQuiz' | 'takeQuiz';
function App() {
  const [display, setDisplay] = useState<TDisplay>('createQuiz');
  const isCreateQuiz = display === 'createQuiz';

  const infoTextTopDisplay = isCreateQuiz ? 'Create your Quiz' : 'Take a Quiz';

  const buttonTextTopDisplay = isCreateQuiz ? 'Take Quiz' : 'Create Quiz';

  return (
    <div className="App flex flex-col  px-8 py-4">
      <button
        onClick={() => {
          setDisplay((currentDispaly) =>
            currentDispaly === 'createQuiz' ? 'takeQuiz' : 'createQuiz'
          );
        }}
        className="self-end bg-blue-300 rounded-md text-white font-semibold p-2"
      >
        {buttonTextTopDisplay}
      </button>
      <h1 className="text-3xl font-semibold text-center">Quiz App</h1>

      <h3 className="text-center text-lg mt-2 ">{infoTextTopDisplay}</h3>
      {/* <Form /> */}
      {isCreateQuiz ? <NewForm /> : <QuizScreen />}
    </div>
  );
}

export default App;
