import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DrawerStack from './DrawerStack';

const AuthsStack = createStackNavigator(
    {
        Drawer: DrawerStack
    },
    {
        headerMode: 'none'
    }
);
const AppContainer = createAppContainer(AuthsStack);

export default AppContainer;
