import { collectionRef } from '.';
import { addDoc, getDocs, getDoc, doc } from 'firebase/firestore';

export const addQuiz = async (quiz: any) => {
  try {
    console.log('hereeee');

    const docRef = await addDoc(collectionRef, { testing: 'yesss' });
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
