import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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
