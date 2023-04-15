import { useForm } from 'react-hook-form';
import { addQuiz } from '../services/firebase/firebase.helper';

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const defaultFormData = {
    quizName: '',
    quizDescription: '',
    gradeType: '',
    quizQuestions: [
      {
        id: '',
        question: '',
        answer: '',
        options: [],
      },
    ],
  };

  const onSubmit = async (formData: any) => {
    console.log({ formData });

    try {
      await addQuiz(formData);
    } catch (error) {
      console.log({ error });
    }
  };

  // console.log(errors);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col flex mx-auto w-2/3 py-4 mt-4"
      >
        <input
          type="text"
          className="p-3"
          placeholder="Quiz Name"
          {...register('Quiz Name', {
            // required: true,
            min: 4,
            maxLength: 80,
            pattern: /string/i,
          })}
        />
        <input
          type="text"
          className="p-3"
          placeholder="Description"
          {...register('Description', {
            // required: true,
            maxLength: 100,
          })}
        />
        <select
          {...register('Grade Type', {
            // required: true
          })}
          className="p-3"
        >
          <option value="Letter Grading">Letter Grading</option>
          <option value=" Percentage Grades"> Percentage Grades</option>
          <option value="Pass/Fail">Pass/Fail</option>
        </select>

        <input type="text" placeholder="Pass Mark" />
        <div className="py-4 flex flex-col gap-y-4">
          <div className="flex text-2xl gap-x-4">
            <p className="border-solid border-black border-[1px] bg-white px-2 rounded-md">
              A
            </p>
            <p className="border-solid border-black border-2 bg-white px-2 rounded-md">
              70%-100%
            </p>
          </div>
          <div className="flex text-2xl gap-x-4">
            <p className="border-solid border-black border-[1px] bg-white px-2 rounded-md">
              B
            </p>
            <p className="border-solid border-black border-2 bg-white px-2 rounded-md">
              60%-69%
            </p>
          </div>
          <div className="flex text-2xl gap-x-4">
            <p className="border-solid border-black border-[1px] bg-white px-2 rounded-md">
              C
            </p>
            <p className="border-solid border-black border-2 bg-white px-2 rounded-md">
              50%-59%
            </p>
          </div>
        </div>
        <div>
          Add Your Question here :
          <aside className="flex items-center justify-center gap-x-4">
            {' '}
            {/* <h2 className="text-xl bg-white border-[1px] border-solid border-black px-5 py-2 rounded-md">
            Question
          </h2>{' '} */}
            <input
              type="text"
              className="p-3"
              placeholder="Put your question here"
              {...register('Question', {
                // required: true,
                maxLength: 100,
              })}
            />
            <button className="text-2xl border-green-500 text-green-500 border-2 border-solid rounded-full px-3 py-1 flex items-center">
              +
            </button>
          </aside>
          <aside className="grid-cols-2 grid gap-4 mt-6">
            <div className="bg-white border-[1px] border-solid border-black p-3 rounded-md">
              <input
                type="text"
                className="p-3"
                placeholder="Answer"
                {...register('Answer', {
                  //  required: true,
                  maxLength: 100,
                })}
              />
            </div>
            <div className="flex gap-x-3">
              <div className="bg-white border-[1px] border-solid border-black p-3 rounded-md flex-grow">
                <input
                  type="text"
                  className="px-3"
                  placeholder="Option 1"
                  {...register('Option 1', {
                    // required: true,
                    maxLength: 100,
                  })}
                />
              </div>
            </div>
            <div className="flex gap-x-3 items-center">
              <div className="bg-white border-[1px] border-solid border-black p-3 rounded-md flex-grow">
                <input
                  type="text"
                  className="p-3"
                  placeholder="Option 2"
                  {...register('Option 2', {
                    //  required: true,
                    maxLength: 100,
                  })}
                />
              </div>
              <button className="text-2xl border-red-500 text-red-500 border-2 border-solid rounded-full px-1 py-1 flex items-center">
                <img src="/delete.png" alt="delete" className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-x-3 items-center">
              <div className="bg-white border-[1px] border-solid border-black p-3 rounded-md flex-grow">
                <input
                  type="text"
                  className="p-3"
                  placeholder="Option 3"
                  {...register('Option 3', {
                    // required: true,
                    maxLength: 100,
                  })}
                />
              </div>
              <button className="text-2xl border-red-500 text-red-500 border-2 border-solid rounded-full px-1 py-1 flex items-center">
                <img src="/delete.png" alt="delete" className="h-4 w-4" />
              </button>
            </div>
          </aside>
        </div>
        <input type="submit" className="bg-red-500 text-white py-2 mt-6" />
      </form>
      <span
        onClick={async () => await addQuiz()}
        className="h-12 w-12 text-center bg-blue-800"
      >
        click me
      </span>
    </>
  );
}
