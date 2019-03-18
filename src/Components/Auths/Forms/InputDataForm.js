import React, { Fragment } from 'react';
import { Button, Icon, Item, Input, Text, Label, Picker } from 'native-base';
import { StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const pickerName = props => {
    return (
        <Item picker>
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={props.input.value}
                onValueChange={props.input.onChange}
                //onValueChange={this.onValueChange('parroquia')}
            >
                <Picker.Item label="Tosagua" value="Tosagua" />
                <Picker.Item label="Bachillero" value="Bachillero" />
                <Picker.Item
                    label="Angel Pedro Giler, (La Estancilla)"
                    value="Estancilla"
                />
            </Picker>
        </Item>
    );
};

const fieldName = props => {
    return (
        <Item floatingLabel>
            <Label>{props.placeholder}</Label>
            <Input
                style={styles.textInput}
                value={props.input.value}
                keyboardType={'phone-pad'}
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

const InputDataForm = props => {
    return (
        <Fragment>
            <Field
                name="parroquia"
                component={pickerName}
                placeholder="Parroquia"
            />
            <Field
                name="favor"
                component={fieldName}
                placeholder="Votos a favor"
            />
            <Field
                name="nulos"
                component={fieldName}
                placeholder="Votos Nulos"
            />
            <Field
                name="blancos"
                component={fieldName}
                placeholder="Votos en Blanco"
            />
            <Button
                style={{ marginVertical: 20 }}
                full
                onPress={props.handleSubmit(props.registerDataHandler)}
            >
                <Text>Registrar</Text>
            </Button>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    textInput: {
        color: '#454545'
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

export default reduxForm({ form: 'InputDataForm', validate })(InputDataForm);
