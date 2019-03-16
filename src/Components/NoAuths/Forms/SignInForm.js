import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const fieldName = props => {
    return (
        <View>
            <TextInput
                style={styles.textInput}
                placeholder={props.placeholder}
                onChangeText={props.input.onChange}
                value={props.input.value}
                keyboardType={
                    props.input.name === 'email' ? 'email-address' : 'default'
                }
                autoCapitalize="none"
                onBlur={props.input.onBlur}
                secureTextEntry={
                    props.input.name === 'password' ||
                    props.input.name === 'r_password'
                }
            />
            {props.meta.touched && props.meta.error && (
                <Text style={styles.error}>{props.meta.error}</Text>
            )}
            <View style={styles.line} />
        </View>
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
        <View>
            <Field name="email" component={fieldName} placeholder="correo" />
            <Field
                name="password"
                component={fieldName}
                placeholder="contraseña"
            />
            <View style={{ paddingVertical: 5 }}>
                <Button
                    title="Ingresar"
                    onPress={props.handleSubmit(props.userSignInHandler)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        marginBottom: 5,
        height: 16,
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
