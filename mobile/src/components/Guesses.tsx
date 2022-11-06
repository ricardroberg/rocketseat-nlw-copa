import { useEffect, useState } from 'react';
import { useToast, FlatList } from 'native-base';

import { api } from '../services/api';

import { Game, GameProps } from './Game'
import { Loading } from './Loading';
import { EmptyMyPollList } from './EmptyMyPollList';

interface Props {
  pollId: string;
  code: string
}

export function Guesses({ pollId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  const toast = useToast()

  async function fetchGames() {

    try {
      setIsLoading(true)

      const response = await api.get(`/polls/${pollId}/games`)
      setGames(response.data.games)
      console.log(response.data.games)
      

    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível carregar os jogos!',
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar do palpite!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

      setFirstTeamPoints(null) 
      setSecondTeamPoints(null)

      toast.show({
        title: 'Palpite realizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })
      fetchGames()

    } catch (error) {
      console.log(error)
      console.log((error.response?.data))
      toast.show({
        title: 'Não foi possível enviar o palpite!',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchGames()
  }, [pollId])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPollList code={code} />}
    />
  );
}
