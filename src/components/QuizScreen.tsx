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
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestion - 1);
  };

  return (
    <div>
      <h1>Quiz Screen</h1>
      <div className="question-card">
        <h2 className="question-text">{quiz.quizName}</h2>
        <div className="question-container">
          <p>{currentQuestion.question}</p>
          <p>{currentQuestion.answer}</p>
          <span>
            {minutes}:{seconds}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
