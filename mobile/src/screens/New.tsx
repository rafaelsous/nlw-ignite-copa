import { useState } from 'react';
import { Heading, Text, VStack, useToast } from 'native-base';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import { api } from '../services/api';

import Logo from '../assets/logo.svg';

export function New() {
  const [poolTitle, setPoolTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handlePoolCreate() {
    if (!poolTitle.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão!',
        placement: 'top',
        bgColor: 'red.500',
      });
    };

    try {
      const poolResponse = await api.post('/pools', {
        title: poolTitle,
      });

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      setPoolTitle('');
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível criar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} backgroundColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          my={8}
          fontSize="xl"
          color="white"
          textAlign="center"
          lineHeight="md"
        >
          Crie seu próprio bolão da copa {`\n`}
          e compartilhe entre amigos!
        </Heading>

        <Input
          placeholder="Qual o nome do seu bolão?"
          value={poolTitle}
          onChangeText={setPoolTitle}
        />
        <Button
          mt={2}
          title="Criar meu bolão"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />
        
        <Text
          mt={4}
          px={9}
          textAlign="center"
          lineHeight="xl"
          color="gray.200"
        >
          Após criar seu bolão, você receberá um código 
          único que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}