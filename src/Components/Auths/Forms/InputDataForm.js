import React, { Fragment } from 'react';
import { Button, Icon, Item, Input, Text, Label, Picker } from 'native-base';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const pickerName = props => {
    const { data, input } = props;
    return (
        <Item picker>
            <Picker
                style={{ flex: 1 }}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={props.selected}
                onValueChange={value => props.onSelect({ name: input, value })}
            >
                {data.map((item, i) => (
                    <Picker.Item
                        key={i}
                        label={item.label}
                        value={item.value}
                    />
                ))}
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
            <KeyboardAvoidingView behavior="padding" enabled>
                <Field
                    name="parroquia"
                    component={pickerName}
                    placeholder="Parroquia"
                    selected={props.parroquia}
                    data={props.parroquias}
                    onSelect={props.onSelect}
                    input="parroquia"
                />
                {props.recintos.lenght > 0 ? (
                    <Field
                        name="recinto"
                        component={pickerName}
                        placeholder="Recinto"
                        data={props.recintos}
                        selected={props.recinto}
                        onSelect={props.onSelect}
                        input="recinto"
                    />
                ) : null}

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
            </KeyboardAvoidingView>
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
