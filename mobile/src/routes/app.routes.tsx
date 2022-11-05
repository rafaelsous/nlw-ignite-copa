import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { Platform } from 'react-native';

import { New } from '../screens/New';
import { Pools } from '../screens/Pools';
import { Find } from '../screens/Find';
import { Details } from '../screens/Details';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, fonts, fontSizes, sizes } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          height: sizes[22],
          backgroundColor: colors.gray[800],
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontFamily: fonts['medium'],
          fontSize: fontSizes.md,
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'ios' ? -10 : 0,
        }
      }}
    >
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle size={sizes[6]} color={color} />
          ),
          tabBarLabel: 'Novo bolão',
        }}
      />

      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall size={sizes[6]} color={color} />
          ),
          tabBarLabel: 'Meus bolões',
        }}
      />

      <Screen
        name="find"
        component={Find}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="details"
        component={Details}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}