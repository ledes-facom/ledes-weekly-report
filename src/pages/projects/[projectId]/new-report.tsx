import { styled } from '@stitches/react';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { FaTimes, FaPlusCircle } from 'react-icons/fa';
import { Header } from '../../../components';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TextInput } from '../../../components/TextInput';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import MainLayout from '../../../components/MainLayout';

const TaskLabel = styled('label', {
  color: '$primary',
  width: '16px',
});

const StyledForm = styled('form', {
  width: '100%',
  padding: '0 12px',
});

const NewReport = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      content: '',
    },
    {
      id: 2,
      content: '',
    },
    {
      id: 3,
      content: '',
    },
  ]);

  const defaultValues = {} as any;

  tasks.forEach((task) => {
    defaultValues['input-' + task.id] = task.content;
  });

  const { register, handleSubmit } = useForm({ defaultValues });

  const removeTask = (i: number) => {
    if (tasks.length <= 3) return;

    setTasks(tasks.filter((task, index) => index != i));
  };

  const newTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, content: '' }]);
  };

  const onSubmitForm = async (data: any) => {
    let content = '';

    for (let key in data) {
      content = content + data[key] + '\n';
    }

    const { data: response } = await axios.post('/api/reports', {
      content,
      projectId: router.query.projectId,
    });

    router.back();

    console.log(response.report);
  };

  return (
    <MainLayout>
      <form
        className="flex flex-col w-full text-gray-100"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <h1 className="mt-4 mb-4 text-2xl">Novo relatório</h1>

        <p>
          Digite suas tarefas realizadas, para novas tarefas use o botão no
          final da lista.
        </p>

        <div className="flex flex-col gap-2 mt-2">
          {tasks.map((task, i) => (
            <TextInput.Root key={task.id}>
              <TaskLabel htmlFor={'targetInput' + task.id}>{i + 1}.</TaskLabel>
              <TextInput.Input
                className="flex-1"
                register={register('input-' + task.id)}
              />
              <FaTimes className="text-primary" onClick={() => removeTask(i)} />
            </TextInput.Root>
          ))}
          <div
            className="bg-gray-100 h-11 rounded-lg cursor-pointer flex items-center justify-center mb-4"
            onClick={() => newTask()}
          >
            <FaPlusCircle className="text-primary text-3xl" />
          </div>
          <Button type="submit">Enviar relatório</Button>
        </div>
      </form>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default NewReport;
