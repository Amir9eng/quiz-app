import { collectionRef } from '.';
import { addDoc, getDocs, getDoc, doc } from 'firebase/firestore';

export interface IQuiz {
  quizName: string;
  quizDescription: string;
  timeLimit: string;
  gradeType: string;
  quizQuestions: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

export const addQuiz = async (quiz: IQuiz) => {
  try {
    console.log('hereeee');

    const docRef = await addDoc(collectionRef, quiz);
    console.log('after adding');

    return docRef.id;
  } catch (error) {
    console.log({ error });
  }
};

export const getQuizzez = async () => {
  try {
    const snapshot = await getDocs(collectionRef);
    const quizzez = snapshot.docs.map((doc) => doc.data());
    return quizzez;
  } catch (error) {}
};

export const getQuiz = async (id: string) => {
  try {
    const quizRef = doc(collectionRef, id);
    const docRef = await getDoc(quizRef);
    return docRef.data();
  } catch (error) {}
};
