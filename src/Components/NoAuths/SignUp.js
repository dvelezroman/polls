import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Text, Button, Spinner, Toast } from 'native-base';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import SignUpForm from './Forms/SignUpForm';

import { user } from '../../ActionCreators/index';

const mapStateToProps = state => ({
    error: state.errorReducer,
    loading: state.loadingReducer,
    userRegister: state.userRegisterReducer,
});

const mapDispatchToProps = dispatch => ({
    signUp: values => dispatch(user.singUp(values)),
    cleanSuccessRegister: () => dispatch(user.cleanSuccessRegister()),
});

class SignUp extends Component {
    constructor() {
        super();
        this.state = {}
    }
    userRegisterHandler = values => {
        this.props.signUp(values);
    };

    static getDerivedStateFromProps(props) {
        if (props.userRegister) {
            Toast.show({
                text: 'Usuario nuevo registrado!',
                type: 'success',
                duration: 2000,
                onClose: () => {
                    props.cleanSuccessRegister()
                    props.navigation.navigate('SignIn');
                }
            });
        }
        return null
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    {!this.props.loading ? (
                        <Fragment>
                            <KeyboardAvoidingView behavior="padding" enabled>
                                <Text
                                    style={{
                                        color: '#C0C0C0',
                                        alignSelf: 'center'
                                    }}
                                >
                                    Registrar Nuevo Usuario
                                </Text>
                                <SignUpForm
                                    userRegisterHandler={
                                        this.userRegisterHandler
                                    }
                                />

                                <Button
                                    style={{ alignSelf: 'center' }}
                                    transparent
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text>Regresar</Text>
                                </Button>
                            </KeyboardAvoidingView>
                        </Fragment>
                    ) : (
                        <Spinner />
                    )}
                </Content>
            </Container>
        );
    }
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
)(SignUp);
