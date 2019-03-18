import React, { Component } from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import InputDataScreen from './InputDataScreen';
import SideBar from './SideBar';

const MyDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: InputDataScreen
        }
    },
    {
        drawerWidth: 200,
        contentComponent: props => <SideBar {...props} />
    }
);

const DrawerStack = createAppContainer(MyDrawerNavigator);

export default DrawerStack;
