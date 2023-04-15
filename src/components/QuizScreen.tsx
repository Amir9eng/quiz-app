import React, { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';

const QuizScreen = ({ quiz }: { quiz: any }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<any>(0);
  const timeToUse = parseInt(quiz.timeLimit, 10) * 60;
  const [timer, setTimer] = useState(timeToUse);
  const time = new Date();
  time.setSeconds(time.getSeconds() + timer);
  const { seconds, minutes } = useTimer({
    autoStart: true,
    expiryTimestamp: time,
  });
  const currentQuestion = quiz.quizQuestions[currentQuestionIndex];

  console.log({ currentQuestion });

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.quizQuestions.length - 1)
      setCurrentQuestionIndex(currentQuestion + 1);
    else if (currentQuestionIndex === quiz.quizQuestions.length - 1) {
      alert('Quiz Completed');
    }
  };

  const calculateResult = () => {
    let score = 0;
    quiz.quizQuestions.forEach((question: any) => {
      if (question.answer === question.selectedAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestion - 1);
    else if (currentQuestionIndex === 0) {
      alert('No Previous Question');
    }
  };

  return (
    <div>
      <section className="flex flex-col items-center">
        <h1>Quiz Screen</h1>
        <div className="timer-container mt-3">
          <p>Time Remaining</p>
          <span className="text-2xl">
            {minutes}:{seconds}
          </span>
        </div>
        <div className="question-card">
          <h2 className="question-text text-2xl font-semibold text-blue-700 my-4">
            {quiz.quizName}
          </h2>
          <div className="question-container">
            <p className="text-center">Question {currentQuestionIndex + 1}</p>
            <p className="text-2xl font-medium mb-4">
              {currentQuestion.question}
            </p>
            <p className="w-full text-center border-green-400 px-3 border-2 whitespace-nowrap text-black/30 rounded-xl mt-3 cursor-pointer">
              {currentQuestion.answer}
            </p>
            {currentQuestion.options.map((option: any) => (
              <p className="w-[90%] text-center border-green-400 px-3 border-2 whitespace-nowrap text-black/30 rounded-xl mt-2 cursor-pointer">
                {option}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between w-[50%] mt-3">
          <button
            className="bg-gray-400 py-2 px-2"
            onClick={() => prevQuestion()}
          >
            Prev
          </button>
          <button
            className="bg-blue-900 py-3 px-4 text-green-400"
            onClick={() => nextQuestion()}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default QuizScreen;
