import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/Store';
import { View, Root } from 'native-base';
import { StyleSheet, YellowBox } from 'react-native';
import Home from './src/Home';

console.disableYellowBox = ['Setting a timer'];
console.disableYellowBox = ['Remote debugger'];

YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings(['Remote debugger']);

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Provider store={store}>
                    <Root>
                        <Home />
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
