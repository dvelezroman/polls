import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Text, Button, Spinner, Toast } from 'native-base';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import SignUpForm from './Forms/SignUpForm';

import { user } from '../../ActionCreators/index';

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'requerido';
    } else if (values.name.length < 5) {
        errors.name = 'Nombre muy corto';
    } else if (values.name.length > 10) {
        errors.name = 'Nombre muy largo';
    }

    if (!values.email) {
        errors.email = 'requerido';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'direccion de correo inválido';
    }

    if (!values.password) {
        errors.password = 'requerido';
    } else if (values.password.length < 5) {
        errors.password = 'password muy corta';
    } else if (values.password.length > 15) {
        errors.password = 'password muy larga';
    }

    if (!values.conf_password) {
        errors.conf_password = 'requerido';
    } else if (values.conf_password !== values.password) {
        errors.conf_password = 'contraseña no coincide';
    }

    if (Object.keys(errors).length) {
        return errors;
    }
    return null;
};

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
        this.state = {
            user: {
                name: "",
                email: "",
                password: "",
                conf_password: "",
            }
        }
    }

    userRegisterHandler = () => {
        if (validate(this.state.user)) {
            Toast.show({
                text: 'Formulario con errores...!',
                type: 'warning',
                duration: 2000,
            });
        } else {
            this.props.signUp(this.state.user);
        }
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

    onChange = (name, value) => {
        const { user } = this.state;
        user[name] = value;
        this.setState({ user })
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
                                    user={this.state.user}
                                    onChange={this.onChange}
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
