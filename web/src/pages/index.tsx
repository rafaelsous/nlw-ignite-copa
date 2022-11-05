import { FormEvent, useState } from 'react';
import Image from 'next/image';

import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import checkIconImg from '../assets/check-icon.svg';
import logoImg from '../assets/logo.svg';

import api from '../lib/axios';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');

  async function handleCreatePool(event: FormEvent) {
    event.preventDefault();

    if (poolTitle.trim().length === 0) {
      setPoolTitle('');
      return alert('Você deve informar um título válido para o seu bolão');
    }

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);
      alert('Bolão criado com sucesso, o código foi copiado para sua área de transferência!');
      setPoolTitle('');
    } catch (err) {
      console.log(err);
      alert('Falha ao criar bolão, tente novamente!');
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 font-bold text-5xl leading-tight text-white">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="Exemplo de avatars de usuários" />

          <strong className="font-bold text-xl text-gray-100">
            <span className="text-green-500">+{userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={handleCreatePool} className="mt-10 flex gap-2">
          <input
            type="text"
            required
            placeholder="Qual o nome do seu bolão?"
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)}
            className="flex-1 py-4 px-6 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100 placeholder-gray-300"
          />

          <button
            type="submit"
            className="flex items-center justify-center bg-yellow-500 py-4 px-6 rounded font-bold text-sm uppercase hover:bg-yellow-700 transition-colors"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="max-w-[400px] mt-4 text-gray-300 text-sm leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 flex justify-between border-t border-t-gray-600 text-gray-100 gap-6">
          <div className="flex items-center gap-6">
            <Image src={checkIconImg} alt="" />

            <div className="flex flex-col">
              <span className="text-gray-100 font-bold text-2xl">+{poolCount}</span>
              <span>Bolões criados </span>
            </div>
          </div>

          <div className="h-16 border-l border-l-gray-600" />
          
          <div className="flex items-center gap-6">
            <Image src={checkIconImg} alt="" />

            <div className="flex flex-col">
              <span className="text-gray-100 font-bold text-2xl">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo o resultado prévio da aplicação mobile do NLW Copa"
        quality={100}  
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [
    poolCountResponse, 
    guessesCountResponse, 
    usersCountResponse
  ] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count'),
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessesCountResponse.data.count,
      userCount: usersCountResponse.data.count,
    }
  }
}
