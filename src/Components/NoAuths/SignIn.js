import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, StyleSheet } from 'react-native';
import SignInForm from './Forms/SignInForm';
import { user } from '../../ActionCreators';

const mapStateToProps = state => ({
    form: state.form,
    error: state.errorReducer,
    logged: state.userReducer
});

const mapDispatchToProps = dispatch => ({
    signIn: values => dispatch(user.signIn(values))
});

class SignIn extends Component {
    userSignInHandler = values => {
        this.props.signIn(values);
    };

    render = () => {
        const { navigation, error, logged } = this.props;
        console.log(logged);
        return (
            <View style={styles.container}>
                <Text style={{ color: '#EEEEECFF' }}>Ingresar</Text>
                <SignInForm userSignInHandler={this.userSignInHandler} />
                <View style={{ paddingVertical: 5 }}>
                    <Button
                        title="Crear Usuario"
                        onPress={() => {
                            navigation.navigate('SignUp');
                        }}
                    />
                </View>
            </View>
        );
    };
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
)(SignIn);
