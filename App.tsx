/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {createContext, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';

import LoginScreen from './src/Authentication/LoginScreen';
import RegisterScreen from './src/Authentication/Registration';
import HomeScreen from './src/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const AppContext = createContext({
  itemCount: 0,
  incrementCount: () => {},
  Authenticate: () => {},
});

type RootStackParamList = {
  RegisterScreen: undefined;
  LoginScreen: undefined;
};

type HomeStackParamList = {
  HomeScreen: {username: string};
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [itemCount, setItemCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const Authenticate = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  const incrementCount = () => {
    setItemCount(itemCount + 1);
  };

  return (
    // <SafeAreaView>

    <NavigationContainer>
      <AppContext.Provider value={{itemCount, incrementCount, Authenticate}}>
        {/* {isAuthenticated ? (
          <HomeStack.Navigator initialRouteName="HomeScreen">
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
          </HomeStack.Navigator>
        ) : ( */}
        <RootStack.Navigator initialRouteName="RegisterScreen">
          <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
          <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        </RootStack.Navigator>
        {/* )} */}
        {/* <HomeScreen route={{params: {username: 'test'}}} /> */}
        <Text>App</Text>
      </AppContext.Provider>
    </NavigationContainer>

    // </SafeAreaView>
  );
}

export default App;
