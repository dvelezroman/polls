import React, { Fragment } from 'react';
import { Button, Item, Input, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const Field = props => {
    return (
        <Item>
            <Input
                style={styles.textInput}
                placeholder={props.placeholder}
                textContentType={props.type}
                keyboardType={
                    props.name === 'email' ? 'email-address' : 'default'
                }
                onChangeText={props.onChange}
                autoCapitalize="none"
                secureTextEntry={
                    props.name === 'password' ||
                    props.name === 'conf_password'
                }
            />
        </Item>
    );
};

const SignUpForm = props => {
    return (
        <Fragment>
            <Field
                name="name"
                value={props.user.name}
                onChange={(value) => props.onChange('name', value)}
                placeholder="nombre"
                type="username"
            />
            <Field
                name="email"
                value={props.user.email}
                onChange={(value) => props.onChange('email', value)}
                placeholder="correo electrónico"
                type="emailAddress"
            />
            <Field
                name="password"
                value={props.user.password}
                onChange={(value) => props.onChange('password', value)}
                placeholder="ingrese una contraseña"
                type="password"
            />
            <Field
                name="conf_password"
                value={props.user.conf_password}
                onChange={(value) => props.onChange('conf_password', value)}
                placeholder="confirme contraseña"
                type="password"
            />
            <Button
                style={{ marginVertical: 20 }}
                full
                onPress={props.userRegisterHandler}
            >
                <Text>Registrar</Text>
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

export default SignUpForm;
