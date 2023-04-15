import React, { FormEvent, useState } from 'react';
import { generateId } from '../utils';

import './Form.css';
import { addQuiz } from '../services/firebase/firebase.helper';

const defaultFormData = {
  quizName: '',
  quizDescription: '',
  gradeType: '',
  timeLimit: '',
  quizQuestions: [
    {
      id: generateId(),
      question: '',
      answer: '',
      options: ['', '', ''],
    },
  ],
};

const Form = () => {
  const [form, setForm] = useState(defaultFormData);

  const updateField = (field: keyof typeof defaultFormData, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const updateQuestionField = (
    field: keyof typeof defaultFormData['quizQuestions'][number],
    value: string,
    id: string
  ) => {
    setForm({
      ...form,
      quizQuestions: form.quizQuestions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            [field]: value,
          };
        }
        return question;
      }),
    });
  };

  const updateOptionField = (
    field: keyof typeof defaultFormData['quizQuestions'][number]['options'],
    value: string,
    id: string
  ) => {
    setForm({
      ...form,
      quizQuestions: form.quizQuestions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            options: question.options.map((option, index) => {
              if (index === Number(field)) {
                return value;
              }
              return option;
            }),
          };
        }
        return question;
      }),
    });
  };

  const submitQuiz = (e: FormEvent) => {
    e.preventDefault();
    console.log({ form });
    addQuiz(form);
    setForm(defaultFormData);
  };

  const addQuestion = () => {
    setForm({
      ...form,
      quizQuestions: [
        ...form.quizQuestions,
        {
          id: generateId(),
          question: '',
          answer: '',
          options: ['', '', ''],
        },
      ],
    });
  };

  const deleteQuestion = (id: string) => {
    setForm({
      ...form,
      quizQuestions: form.quizQuestions.filter(
        (question) => question.id !== id
      ),
    });
  };

  return (
    <form onSubmit={submitQuiz}>
      <input
        className="input-field"
        value={form.quizName}
        onChange={(e) => updateField('quizName', e.target.value)}
        placeholder="Quiz Name"
        required
      />

      <input
        className="input-field"
        value={form.quizDescription}
        onChange={(e) => updateField('quizDescription', e.target.value)}
        placeholder="Quiz Description"
        required
      />
      <select
        name=""
        id="grade-type"
        value={form.gradeType}
        onChange={(e) => {
          updateField('gradeType', e.target.value);
        }}
        required
      >
        <option value="" disabled>
          Select Grade Type
        </option>
        <option value="Letter Grading">Letter Grading</option>
        <option value="Percentage Grading">Percentage Grading</option>
      </select>

      <select
        name=""
        id="time-limit"
        value={form.timeLimit}
        onChange={(e) => {
          updateField('timeLimit', e.target.value);
        }}
        required
      >
        <option value="" disabled>
          Select Quiz Time Limit
        </option>
        <option value="5">5min</option>
        <option value="10">10min</option>
        <option value="15">15min</option>
        <option value="20">20min</option>
      </select>

      <div className="questions-wrapper">
        {form.quizQuestions.map((question, index, arr) => (
          <div key={question.id} className="question">
            <span className="absolute -left-6 top-[0.5rem]">{index + 1}.</span>
            <input
              className="input-field question-field"
              value={question.question}
              onChange={(e) =>
                updateQuestionField('question', e.target.value, question.id)
              }
              placeholder="Question"
              required
            />

            {index > 0 && (
              <img
                onClick={() => {
                  deleteQuestion(question.id);
                }}
                src="/assets/vectors/delete.svg"
                alt="delete-icon"
                className="w-6 h-6 absolute -right-9 top-[0.6rem]"
              />
            )}
            {index === arr.length - 1 && (
              <img
                onClick={() => {
                  addQuestion();
                }}
                src="/assets/vectors/add.svg"
                alt="add-icon"
                className={`w-7 h-7 absolute ${
                  index === 0 ? '-right-9' : '-right-16'
                } top-[0.5rem]`}
              />
            )}
            <input
              className="input-field question-field"
              value={question.answer}
              onChange={(e) =>
                updateQuestionField('answer', e.target.value, question.id)
              }
              placeholder="Answer"
              required
            />
            <div className="options">
              {question.options.map((option, index: number) => (
                <input
                  className="input-field option-field"
                  key={index}
                  value={option}
                  onChange={(e) =>
                    updateOptionField(index, e.target.value, question.id)
                  }
                  placeholder="Option"
                  required
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="submit">Submit</button>
    </form>
  );
};

export default Form;
