import { SubmitHandler, useForm } from 'react-hook-form';
import { schema } from '../schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData } from '../schema/schema';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    toast.success('FormData Submitted Successfully', {
      position: 'top-right',
    });
    console.log('data submitted', data);
    reset();  // Clears the form
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col my-10 items-center justify-center'
    >
      {errors?.username && <p>{errors.username.message}</p>}
      <label htmlFor='username' className='text-md text-pink-600'>
        Username
      </label>
      <input
        type='text'
        {...register('username')}
        className='rounded-full px-4 focus:outline-none focus:opacity-100'
        placeholder='Enter your username'
        required={true}
      />

      {errors?.email && <p>{errors.email.message}</p>}
      <label htmlFor='email' className='text-md text-pink-600'>
        Email
      </label>
      <input
        type='email'
        {...register('email')}
        className='rounded-full max-w-80 px-4 focus:opacity-100'
        placeholder='Enter your Email'
        required={true}
      />

      {errors?.password && <p>{errors.password.message}</p>}
      <label htmlFor='password' className='text-md text-pink-600 marginStyle'>
        Password
      </label>
      <input
        type='password'
        {...register('password')}
        placeholder='Enter your password'
        className='rounded-full max-w-80 px-4 focus:opacity-100 focus:outline-none'
        required={true}
      />

      <label htmlFor='ConfirmPassword' className='text-md text-pink-600 marginStyle'>
        Confirm Password
      </label>
      {errors?.ConfirmPassword && <p>{errors.ConfirmPassword.message}</p>}
      <input
        type='password'
        {...register('ConfirmPassword')}
        placeholder='Confirm your password'
        className='rounded-full max-w-80 px-4 focus:opacity-100 focus:outline-none'
        required={true}
      />

      <div className='flex gap-2 items-center justify-center'>
        <button
          type='submit'
          className='border-none cursor-pointer text-white rounded-full text-base gap-2 my-2 w-[6rem] bg-gray-900 px-4'
        >
          Submit
        </button>
        <button
          type='button'
          className='border-none cursor-pointer text-white rounded-full text-base gap-2 my-2 w-[6rem] bg-gray-900 px-4'
          onClick={() => reset()}  // This now clears the form
        >
          Reset
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Form;
