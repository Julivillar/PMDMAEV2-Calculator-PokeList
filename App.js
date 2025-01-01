import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ejercicio1 from './Screens/Ejercicio1';
import Ejercicio2 from './Screens/Ejercicio2';
import { Card } from './Components/Card';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Ejercicio2Stack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ejercicio2List"
        component={Ejercicio2}
        options={{ headerShown: false, headerMode: 'none' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Card"
          component={Card}
          options={{ headerShown: true, headerMode: 'none' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Ejercicio2" component={Ejercicio2Stack} />
        <Tab.Screen name="Ejercicio1" component={Ejercicio1} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
