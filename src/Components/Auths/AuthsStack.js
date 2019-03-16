import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignIn from '../NoAuths/SignIn';
import SignUp from '../NoAuths/SignUp';

const AuthsStack = createStackNavigator(
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
const AppContainer = createAppContainer(AuthsStack);

export default AppContainer;
