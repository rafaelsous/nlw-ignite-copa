import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base';

interface ButtonProps extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({ title, type = 'PRIMARY', ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      rounded="sm"
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.600' : 'yellow.600'
      }}
      _loading={{
        _spinner: { color: type === 'SECONDARY' ? 'white' : 'gray.900' }
      }}
      _icon={{
        color: type === 'SECONDARY' ? 'white' : 'gray.900',
        size: "md",
        marginRight: "1",
      }}
      {...rest}
    >
      <Text
        color={type === 'SECONDARY' ? 'white' : 'gray.800'}
        fontSize="sm"
        bold
        textTransform="uppercase"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}