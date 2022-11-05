import { Center, Icon, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Logo from '../assets/logo.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function SignIn() {
  const { isUserLoading, signIn } = useAuth();

  return (
    <Center flex={1} backgroundColor="gray.900" paddingX={7}>
      <Logo
        width={212}
        height={40}
      />

      <Button
        type="SECONDARY"
        title="Entrar com Google"
        leftIcon={<Icon as={MaterialCommunityIcons} name="google" />}
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
      />

      <Text
        fontSize="sm"
        color="gray.200"
        lineHeight="xl"
        textAlign="center"
        mt={4}
      >
        Não utilizamos nenhuma informação além {`\n`}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}
