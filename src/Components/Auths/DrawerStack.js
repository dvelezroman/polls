import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import InputDataScreen from './InputDataScreen';
import SideBar from './SideBar';
import ResumeScreen from './ResumeScreen';

const MyDrawerNavigator = createDrawerNavigator(
    {
        Registrar: {
            screen: InputDataScreen
        },
        Resumen: {
            screen: ResumeScreen
        }
    },
    {
        drawerWidth: 200,
        contentComponent: props => <SideBar {...props} />
    }
);

const DrawerStack = createAppContainer(MyDrawerNavigator);

export default DrawerStack;
