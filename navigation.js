import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import Add from './components/Add'
import Save from './components/Save'


const Stack = createStackNavigator()
const screenOption = {
  headerShown: false,
}

export const SignedInStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={screenOption}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Save" component={Save} />
    </Stack.Navigator>
  </NavigationContainer>
)

export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={screenOption}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)