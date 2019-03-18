import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Container, Content, Text, Button, Spinner } from 'native-base';
import { StyleSheet } from 'react-native';
import SignInForm from './Forms/SignInForm';
import { user } from '../../ActionCreators';

const mapStateToProps = state => ({
    form: state.form,
    error: state.errorReducer,
    logged: state.userReducer,
    loading: state.loadingReducer
});

const mapDispatchToProps = dispatch => ({
    signIn: values => dispatch(user.signIn(values))
});

class SignIn extends Component {
    state = {
        fontLoaded: false
    };

    isCancelled = false;

    userSignInHandler = values => {
        this.props.signIn(values);
    };

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font
        });

        !this.isCancelled && this.setState({ fontLoaded: true });
    }

    componentWillUnmount() {
        this.isCancelled = true; // esto cancela el setState en caso de que exista una sesión iniciada
    }

    render = () => {
        const { navigation, error, logged } = this.props;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    {this.state.fontLoaded && !this.props.loading ? (
                        <Fragment>
                            <Text
                                style={{
                                    color: '#C0C0C0',
                                    alignSelf: 'center'
                                }}
                            >
                                Ingresar
                            </Text>
                            <SignInForm
                                userSignInHandler={this.userSignInHandler}
                            />

                            <Button
                                style={{ alignSelf: 'center' }}
                                transparent
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                <Text>Crear Usuario</Text>
                            </Button>
                        </Fragment>
                    ) : (
                        <Spinner />
                    )}
                </Content>
            </Container>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E3436FF',
        justifyContent: 'center',
        paddingHorizontal: 20
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
