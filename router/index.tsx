/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Image, TouchableOpacity} from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../src/screens/HomeScreen';
import DetailScreen from '../src/screens/DetailScreen';
import SearchScreen from '../src/screens/SearchScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Router = () => {
  const Stack = createNativeStackNavigator();
  // const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            headerLargeTitle: true,
            headerTitle: 'Pokédex',
            headerRight: () => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                  <MaterialIcons name="search" color="black" size={32} />
                </TouchableOpacity>
              );
            },
          })}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          // options={{headerShown: false}}
        />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            // options={{headerShown: false}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
