import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Container, Content, Text, View, Button, Item } from 'native-base';
import { StyleSheet } from 'react-native';
import SignUpForm from './Forms/SignUpForm';

import { user } from '../../ActionCreators/index';

const mapStateToProps = state => ({
    error: state.errorReducer
});

const mapDispatchToProps = dispatch => ({
    signUp: values => dispatch(user.singUp(values))
});

class SignUp extends Component {
    state = {
        fontLoaded: false
    };
    userRegisterHandler = values => {
        this.props.signUp(values);
    };

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    {this.state.fontLoaded ? (
                        <Fragment>
                            <Text
                                style={{
                                    color: '#C0C0C0',
                                    alignSelf: 'center'
                                }}
                            >
                                Registrar Nuevo Usuario
                            </Text>
                            <SignUpForm
                                userRegisterHandler={this.userRegisterHandler}
                            />

                            <Button
                                style={{ alignSelf: 'center' }}
                                transparent
                                onPress={() => navigation.goBack()}
                            >
                                <Text>Regresar</Text>
                            </Button>
                        </Fragment>
                    ) : null}
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
