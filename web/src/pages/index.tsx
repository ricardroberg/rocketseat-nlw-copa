import { FormEvent, useState } from 'react'

import { api } from '../lib/axios'
import Image from 'next/image'

import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import iconCheckImg from '../assets/icon-check.svg'
import logoImg from '../assets/logo.svg'

interface HomeProps {
  pollCount: number
  guessCount: number
  usersCount: number
}

export default function Home({ pollCount, guessCount, usersCount }: HomeProps) {
  const [pollTitle, setPollTitle] = useState("")


  async function createPoll(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/polls', {
        title: pollTitle
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso! O código foi copiado para área de transferência.')
      setPollTitle('')
    } catch (err) {
      alert('Falha ao criar o bolão. Tente novamente!')
    }

  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logoImg} alt='NLW Copa' />
        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersAvatarExampleImg} alt="" />
          <strong className='text-nlwGray-100 text-xl'>
            <span className='text-nlwGreen-500'>+{usersCount}</span> pessoas já estão usando
          </strong>
        </div>
        <form
          onSubmit={createPoll}
          className='mt-10 flex gap-2'>
          <input className='flex-1 px-6 py-4 rounded bg-nlwGray-800 border border-nlwGray-600 text-sm text-gray-100'
            type="text"
            required
            placeholder='Qual nome do seu bolão?'
            onChange={event => setPollTitle(event.target.value)}
            value={pollTitle}
          />
          <button
            className='bg-nlwYellow-500 px-6 py-4 rounded text-nlwGray-900 font-bold text-sm uppercase hover:bg-nlwYellow-700'
            type='submit'
          >CRIAR MEU BOLÃO</button>
        </form>
        <p className='mt-4 text-sm text-nlwGray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>
        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-nlwGray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{pollCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className='w-px h-14 bg-nlwGray-600'></div>
          <div>
            <div className='flex items-center gap-6'>
              <Image src={iconCheckImg} alt="" />
              <div className='flex flex-col'>
                <span className='font-bold text-2xl'>+{guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Image
        src={appPreviewImg} alt="dois celulares exibindo uma prévia da aplicação móvel da NLW Copa"
        quality={100}
      />
    </div>
  )
}

export const getStaticProps = async () => {

  const [pollCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
    api('polls/count'),
    api('guesses/count'),
    api('users/count'),
  ])

  return {
    props: {
      pollCount: pollCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count
    },
    revalidate: 300
  }
}