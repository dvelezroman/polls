import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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
