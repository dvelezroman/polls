import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, StyleSheet } from 'react-native';
import SignUpForm from './Forms/SignUpForm';

import { user } from '../../ActionCreators/index';

const mapStateToProps = state => ({
    error: state.errorReducer
});

const mapDispatchToProps = dispatch => ({
    signUp: values => dispatch(user.singUp(values))
});

class SignUp extends Component {
    userRegisterHandler = values => {
        this.props.signUp(values);
    };

    componentWillUnmount() {}

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <SignUpForm userRegisterHandler={this.userRegisterHandler} />
                <View style={{ paddingVertical: 5 }}>
                    <Button
                        title="Regresar"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E3436FF',
        justifyContent: 'center',
        paddingHorizontal: 16
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);
