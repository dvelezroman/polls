import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';
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
    View
} from 'native-base';
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
    isCancelled = false;

    userSignInHandler = values => {
        this.props.signIn(values);
    };

    componentWillUnmount() {
        this.isCancelled = true; // esto cancela el setState en caso de que exista una sesión iniciada
    }

    render = () => {
        const { navigation, error, logged } = this.props;
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
                                    fontSize: 12,
                                    alignSelf: 'center',
                                    fontFamily: 'Roboto',
                                    fontStyle: 'italic',
                                    color: 'white'
                                }}
                            >
                                Versión: 20190320
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    alignSelf: 'center',
                                    fontFamily: 'Roboto',
                                    fontStyle: 'italic',
                                    color: 'white'
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
