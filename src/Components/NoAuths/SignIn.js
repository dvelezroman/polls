import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Container, Content, Text, View, Button, Item } from 'native-base';
import { StyleSheet } from 'react-native';
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
    state = {
        fontLoaded: false
    };
    userSignInHandler = values => {
        this.props.signIn(values);
    };

    // async componentWillMount() {
    //     await Font.loadAsync({
    //         Roboto: require('native-base/Fonts/Roboto.ttf'),
    //         Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    //         ...Ionicons.font
    //     });
    //     this.setState({ fontLoaded: true });
    // }

    render = () => {
        const { navigation, error, logged } = this.props;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    {this.state.fontLoaded ? (
                        <Fragment>
                            <Text
                                style={{
                                    color: '#EEEEECFF',
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
                    ) : null}
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
