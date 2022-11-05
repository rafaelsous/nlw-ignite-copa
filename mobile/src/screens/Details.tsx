import { useEffect, useState } from 'react';
import { Share } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { HStack, useToast, VStack } from 'native-base';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PoolCardProps } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { Guesses } from '../components/Guesses';

import { api } from '../services/api';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Option } from '../components/Option';
import { EmptyRakingList } from '../components/EmptyRakingList';

type RouteParams = {
  id: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');

  const route = useRoute();
  const { id } = route.params as RouteParams;
  const toast = useToast();

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);

      const poolResponse = await api.get(`/pools/${id}`);

      setPoolDetails(poolResponse.data.pool);
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleShareCode() {
    await Share.share({
      message: poolDetails.code,
    });
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton showShareButton
        onShare={handleShareCode}
      />

      <VStack flex={1} px={5}>
        <PoolHeader data={poolDetails} />

        {
          poolDetails._count?.participants > 0
            ? <>
                <HStack mb={5} p={1} rounded="sm" bgColor="gray.800">
                  <Option
                    title="Seus palpites"
                    isSelected={optionSelected === 'guesses'}
                    onPress={() => setOptionSelected('guesses')}
                  />

                  <Option
                    title="Ranking do grupo"
                    isSelected={optionSelected === 'ranking'}
                    onPress={() => setOptionSelected('ranking')}
                  />
                </HStack>

                {
                  optionSelected === 'guesses'
                  ? <Guesses poolId={poolDetails.id} code={poolDetails.code} />
                  : <EmptyRakingList />
                }
              </>
            : <EmptyMyPoolList code={poolDetails.code} />
        }
      </VStack>
    </VStack>
  );
}