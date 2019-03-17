import React, { Component } from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import SelectDataScreen from './SelectDataScreen';
import SideBar from './SideBar';

const MyDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: SelectDataScreen
        }
    },
    {
        drawerWidth: 200,
        contentComponent: props => <SideBar {...props} />
    }
);

const DrawerStack = createAppContainer(MyDrawerNavigator);

export default DrawerStack;
