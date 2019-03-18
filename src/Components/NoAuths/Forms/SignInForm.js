import React, { Fragment } from 'react';
import { Button, Item, Input, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const fieldName = props => {
    return (
        <Item>
            <Input
                style={styles.textInput}
                placeholder={props.placeholder}
                value={props.input.value}
                keyboardType={
                    props.input.name === 'email' ? 'email-address' : 'default'
                }
                onChangeText={props.input.onChange}
                autoCapitalize="none"
                onBlur={props.input.onBlur}
                secureTextEntry={props.input.name === 'password'}
            />
            {props.meta.touched && props.meta.error && (
                <Text style={styles.error}>{props.meta.error}</Text>
            )}
        </Item>
    );
};

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
    return errors;
};

const SignInForm = props => {
    return (
        <Fragment>
            <Field name="email" component={fieldName} placeholder="correo" />
            <Field
                name="password"
                component={fieldName}
                placeholder="contraseña"
            />
            <Button
                style={{ marginVertical: 20 }}
                full
                onPress={props.handleSubmit(props.userSignInHandler)}
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

export default reduxForm({ form: 'SignInForm', validate })(SignInForm);
