import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
    Container,
    Content,
    Text,
    Button,
    Spinner,
    Footer,
    Body,
    Left,
    Thumbnail,
    Toast,
    View
} from 'native-base';
import { StyleSheet } from 'react-native';
import SignInForm from './Forms/SignInForm';
import { user } from '../../ActionCreators';

const mapStateToProps = state => ({
    error: state.errorReducer,
    logged: state.userReducer,
    loading: state.loadingReducer
});

const mapDispatchToProps = dispatch => ({
    signIn: values => dispatch(user.signIn(values))
});

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'requerido';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'correo inválido';
    }

    if (!values.password) {
        errors.password = 'requerido';
    } else if (values.password.length < 5) {
        errors.password = 'contraseña muy corta';
    } else if (values.password.length > 15) {
        errors.password = 'contraseña muy larga';
    }
    
    if (Object.keys(errors).length) {
        return errors;
    }
    return null;
};
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                password: "",
            }
        }
    };

    isCancelled = false;

    userSignInHandler = () => {
        if (validate(this.state.user)) {
            Toast.show({
                text: 'Formulario con errores...!',
                type: 'warning',
                duration: 2000,
            });
        } else {
            this.props.signIn(this.state.user);
        }
    };

    componentWillUnmount() {
        this.isCancelled = true; // esto cancela el setState en caso de que exista una sesión iniciada
    }

    onChange = (name, value) => {
        const { user } = this.state;
        user[name] = value;
        this.setState({ user })
    }

    render = () => {
        const { navigation, form } = this.props;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    {!this.props.loading ? (
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
                                onChange={this.onChange}
                                user={this.state.user}
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
                <Footer style={{ flexDirection: 'row', height: 40 }}>
                    <Body style={{ flex: 5 }}>
                        <View
                            style={{ marginLeft: 10, flexDirection: 'column' }}
                        >
                            <Text
                                style={{
                                    fontSize: 10,
                                    alignSelf: 'center',
                                    fontFamily: 'Roboto',
                                    fontStyle: 'italic',
                                    color: 'blue'
                                }}
                            >
                                Versión: 20210401
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    alignSelf: 'center',
                                    fontFamily: 'Roboto',
                                    fontStyle: 'italic',
                                    color: 'blue'
                                }}
                            >
                                CaffeinaSW, software factory.
                            </Text>
                        </View>
                    </Body>
                    <Left style={{ flex: 1 }}>
                        <Thumbnail
                            source={{
                                uri:
                                    'http://ecuadoruniversitario.com/wp-content/uploads/2015/04/cne-logo.png'
                            }}
                        />
                    </Left>
                </Footer>
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
