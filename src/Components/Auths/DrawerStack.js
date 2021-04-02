import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import InputDataScreen from './InputDataScreen';
import SideBar from './SideBar';
import ResumeScreen from './ResumeScreen';
import ResumeAdminScreen from './ResumeAdminScreen';

const MyDrawerNavigator = createDrawerNavigator(
    {
        Registrar: {
            screen: InputDataScreen
        },
        Resumen: {
            screen: ResumeScreen
        },
        Todo: {
            screen: ResumeAdminScreen
        }
    },
    {
        drawerWidth: 200,
        contentComponent: props => <SideBar {...props} />
    }
);

const DrawerStack = createAppContainer(MyDrawerNavigator);

export default DrawerStack;
