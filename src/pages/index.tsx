import Head from 'next/head';
import { Header } from '../components';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { ProjectsList, ReportsList } from '../components';
import { GetServerSidePropsContext } from 'next';

const Main = ({ userData }: { userData: any }) => {
  return (
    <>
      <Head>
        <title>Ledes Weekly Report - Inicio</title>
      </Head>
      <Header />

      <main className="flex w-full min-h-[calc(100%-64px)]">
        <div className="bg-primary flex-1 flex flex-col px-6 text-gray-100">
          <h1 className="text-2xl mt-6 mb-4">
            Bem vindo {userData.name.split(' ')[0]}!
          </h1>

          <ProjectsList />

          <div className="w-full h-[2px] bg-gray-800 mt-8"></div>

          <ReportsList />

          <div className="w-full h-[2px] bg-gray-800 mt-8"></div>
        </div>
      </main>
    </>
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

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .limit(1)
    .single();

  if (error) {
    await supabase.auth.signOut();

    return { props: {} };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
      userData: data,
    },
  };
};

export default Main;
