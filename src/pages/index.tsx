import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Container,
  HomeContainer,
  LoginContainer,
  LoginItems,
  Input,
  LoginTitle,
  Button,
  Link,
  Title,
  HomeContent,
} from '../components/HomeComponents';
import {
  faEnvelopesBulk,
  faCheck,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

type Inputs = {
  email: string;
  password: string;
};

const Home: NextPage = () => {
  const { handleSubmit, register } = useForm<Inputs>();
  const router = useRouter();

  const handleLoginSubmit: SubmitHandler<Inputs> = (data) => {
    router.push('/main');
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Ledes Weekly Report</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <HomeContainer>
          <Title>
            <FontAwesomeIcon
              color="#3fb0ac"
              width={100}
              icon={faEnvelopesBulk}
            />
            <h1>
              Ledes Weekly <br /> Report
            </h1>
          </Title>
          <HomeContent>
            <h3>
              Nossa plataforma é o lugar <br /> certo para o seu projeto
            </h3>
            <ul>
              <li>
                <FontAwesomeIcon width={15} icon={faCheck} />
                Gerencie seus alunos e projetos
              </li>
              <li>
                <FontAwesomeIcon width={15} icon={faCheck} />
                Mantenha um histórico de atividades
              </li>
              <li>
                <FontAwesomeIcon width={15} icon={faCheck} />
                Receba notificações
              </li>
              <li>
                <FontAwesomeIcon width={15} icon={faCheck} />
                Exporte seus relatórios
              </li>
            </ul>
          </HomeContent>
        </HomeContainer>

        <LoginContainer>
          <LoginItems onSubmit={handleSubmit(handleLoginSubmit)}>
            <LoginTitle>Entrar</LoginTitle>

            <Input
              icon={faEnvelope}
              type="text"
              placeholder="Email"
              register={register('email', { required: true })}
            />
            <Input
              icon={faLock}
              type="password"
              placeholder="Senha"
              register={register('password', { required: true })}
            />
            <Button type="submit">Acessar</Button>
            <Link href="#">Esqueceu sua senha?</Link>
          </LoginItems>
        </LoginContainer>
      </Container>
    </>
  );
};

export default Home;
