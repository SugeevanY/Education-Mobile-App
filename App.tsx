/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {createContext, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import LoginScreen from './src/Authentication/LoginScreen';
import RegisterScreen from './src/Authentication/Registration';
import HomeScreen from './src/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

interface AppContextType {
  itemCount: number;
  incrementCount: () => void;
  Authenticate: () => void;
  user: string;
  updateUser: (name: string) => void;
}

const defaultState: AppContextType = {
  itemCount: 0,
  incrementCount: () => {},
  Authenticate: () => {},
  user: 'Guest',
  updateUser: () => {},
};

export const AppContext = createContext<AppContextType>(defaultState);

export const UserNameContext = createContext(null);

type RootStackParamList = {
  RegisterScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [itemCount, setItemCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('');

  const Authenticate = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  const incrementCount = () => {
    setItemCount(itemCount + 1);
  };

  const updateUser = (name: string) => {
    setUser(name);
  };

  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{itemCount, incrementCount, Authenticate, updateUser, user}}>
        <SafeAreaProvider>
          <RootStack.Navigator initialRouteName="RegisterScreen">
            <RootStack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            {/* )} */}
          </RootStack.Navigator>
        </SafeAreaProvider>
      </AppContext.Provider>
    </NavigationContainer>
  );
}

export default App;
