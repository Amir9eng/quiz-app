import React, { Fragment, useEffect, useState } from 'react';
import { IQuiz, getQuizzez } from '../services/firebase/firebase.helper';
import QuizScreen from './QuizScreen';

const Quizzes = () => {
  const [quizzez, setQuizzez] = useState<any>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz | null>(null);

  const getQuizData = async () => {
    try {
      const data = await getQuizzez();
      setQuizzez(data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getQuizData();
  }, []);

  return (
    <div>
      {!selectedQuiz ? (
        <ol>
          {quizzez.map((quiz: any, quizIndex: number) => (
            <div
              key={quizIndex}
              className="flex items-center cursor-pointer"
              onClick={() => {
                setSelectedQuiz(quiz);
              }}
            >
              <span>{quizIndex + 1}.</span>
              <li>{quiz.quizName}</li>
            </div>
          ))}
        </ol>
      ) : (
        <div>
          <QuizScreen quiz={selectedQuiz} />
        </div>
      )}
    </div>
  );
};

export default Quizzes;
