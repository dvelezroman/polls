import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/Store';
import { View, Root } from 'native-base';
import { StyleSheet, LogBox } from 'react-native';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';

import Home from './src/Home';

LogBox.ignoreAllLogs = ['Setting a timer'];
LogBox.ignoreAllLogs = ['Remote debugger'];

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            fontLoaded: false,
        };
        this.loadFont();
    }
    async loadFont() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font
        });
        this.setState({ fontLoaded: true });
    }
    render() {
        return (
            <View style={styles.container}>
                <Provider store={store}>
                    <Root>
                        {this.state.fontLoaded ?
                            <Home /> :
                            null
                        }
                    </Root>
                </Provider>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
