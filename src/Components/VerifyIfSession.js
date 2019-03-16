import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import AuthsStack from './Auths/AuthsStack';
import NoAuthsStack from './NoAuths/NoAuthsStack';
import SignIn from './NoAuths/SignIn';

class VerifyIfSession extends Component {
    componentWillReceiveProps = nextProps => {};

    componentDidMount = async () => {};

    render = () => {
        return (
            <View style={styles.container}>
                {false ? <SignIn /> : <NoAuthsStack />}
            </View>
        );
    };
}

const mapStateToProps = state => ({
    user: state.userStateReducer
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    }
});

export default connect(mapStateToProps)(VerifyIfSession);
