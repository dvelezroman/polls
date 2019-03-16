import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';

const NoAuthsStack = createStackNavigator(
    {
        SignIn: {
            screen: SignIn
        },
        SignUp: {
            screen: SignUp
        }
    },
    {
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(NoAuthsStack);

export default AppContainer;
