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
                secureTextEntry={
                    props.input.name === 'password' ||
                    props.input.name === 'conf_password'
                }
            />
            {props.meta.touched && props.meta.error && (
                <Text style={styles.error}>{props.meta.error}</Text>
            )}
        </Item>
    );
};

const validate = (values, props) => {
    const errors = {};

    if (!props.image) {
        errors.image = 'requerido';
    }

    if (!values.name) {
        errors.name = 'requerido';
    } else if (values.name.length < 5) {
        errors.name = 'Nombre muy corto';
    } else if (values.name.length > 10) {
        errors.name = 'Nombre muy largo';
    }

    if (!values.email) {
        errors.email = 'required';
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

    return errors;
};

const SignUpForm = props => {
    return (
        <Fragment>
            <Field name="name" component={fieldName} placeholder="nombre" />
            <Field
                name="email"
                component={fieldName}
                placeholder="correo electrónico"
            />
            <Field
                name="password"
                component={fieldName}
                placeholder="ingrese una contraseña"
            />
            <Field
                name="conf_password"
                component={fieldName}
                placeholder="confirme contraseña"
            />
            <Button
                style={{ marginVertical: 20 }}
                full
                onPress={props.handleSubmit(props.userRegisterHandler)}
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

export default reduxForm({ form: 'SignUpForm', validate })(SignUpForm);
