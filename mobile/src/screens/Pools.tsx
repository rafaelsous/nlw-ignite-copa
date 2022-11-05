import { Octicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList, Icon, useToast, VStack } from 'native-base';
import { useCallback, useState } from 'react';

import { Button } from '../components/Button';
import { EmptyPoolList } from '../components/EmptyPoolList';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PoolCard, PoolCardProps } from '../components/PoolCard';

import { api } from '../services/api';

export function Pools() {
  const [pools, setPools] = useState<PoolCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { navigate } = useNavigation();
  const toast = useToast();

  async function fetchPools() {
    try {
      setIsLoading(true);

      const getPoolsResponse = await api.get('/pools');
      setPools(getPoolsResponse.data.pools);
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar seus bolões',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPools();
  }, []));

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>

      {
        isLoading
          ? <Loading />
          : <FlatList
            px={5}
            data={pools}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PoolCard
                data={item}
                onPress={() => navigate('details', { id: item.id })}
              />
            )}
            ListEmptyComponent={<EmptyPoolList />}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 10 }}
          />
      }
    </VStack>
  );
}