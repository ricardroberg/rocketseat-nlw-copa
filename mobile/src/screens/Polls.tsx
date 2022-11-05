import { VStack, Icon, Text } from 'native-base'
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../components/Button'
import { Header } from '../components/Header'

export function Polls() {
  const { navigate } = useNavigation()

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title='Meus boloes' />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={6}>
        <Button
          leftIcon={<Icon as={Octicons} name='search' color='black' size='md' />}
          title='BUSCAR BOLÃO POR CÓDIGO'
          onPress={() => navigate('find')}
        />
      </VStack>
      <Text color="gray.100" textAlign='center'>
        Você ainda não está participando de{'\n'} nenhum bolão, que tal buscar um por código{'\n'} ou criar um novo?
      </Text>
    </VStack>
  )
}