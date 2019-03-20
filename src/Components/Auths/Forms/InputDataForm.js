import React, { Fragment } from 'react';
import { Button, Icon, Item, Input, Text, Label, Picker } from 'native-base';
import { StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const pickerName = props => {
    return (
        <Item picker>
            <Picker
                style={{ flex: 1 }}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={props.input.value}
                onValueChange={props.input.onChange}
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
                type="number"
                keyboardType={'phone-pad'}
                onChangeText={props.input.onChange}
                autoCapitalize="none"
                onBlur={props.input.onBlur}
            />
            {props.meta.touched && props.meta.error && (
                <Text style={styles.error}>{props.meta.error}</Text>
            )}
        </Item>
    );
};

const validate = (values, props) => {
    const errors = {};
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
                name="mesa"
                component={fieldName}
                placeholder="Numero de Mesa"
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
