import React, { Fragment } from 'react';
import { Button, Item, Input, Text } from 'native-base';
import { StyleSheet } from 'react-native';
// import { Field, reduxForm } from 'redux-form';

const Field = props => {
    return (
        <Item>
            <Input
                style={styles.textInput}
                placeholder={props.placeholder}
                value={props.value}
                keyboardType={
                    props.name === 'email' ? 'email-address' : 'default'
                }
                onChangeText={props.onChange}
                autoCapitalize="none"
                secureTextEntry={props.name === 'password'}
            />
        </Item>
    );
};

const SignInForm = props => {
    return (
        <Fragment>
            <Field
                name="email"
                value={props.user.email}
                onChange={value => props.onChange('email', value)}
                placeholder="correo"
            />
            <Field
                name="password"
                value={props.user.password}
                onChange={(value) => props.onChange('password', value)}
                placeholder="contraseña"
            />
            <Button
                style={{ marginVertical: 20 }}
                full
                onPress={() => props.userSignInHandler()}
            >
                <Text>Ingresar</Text>
            </Button>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    textInput: {
        color: '#fff'
    },
    line: {
        height: 1,
        backgroundColor: '#DCDCDC'
    },
    error: {
        color: '#EF2929FF',
        fontStyle: 'italic'
    }
});

export default SignInForm;
