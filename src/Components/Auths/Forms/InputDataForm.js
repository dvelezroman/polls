import React from 'react';
import { Button, Icon, Item, Input, Text, Label, Picker, View } from 'native-base';
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
                style={{ height: 50 }}
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
        <Item floatingLabel style={{ marginTop: 5 }}>
            <Label>{props.placeholder}</Label>
            <Input
                style={styles.textInput}
                type="number"
                keyboardType={'numeric'}
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

const isInt = value => value % 1 === 0;

const validate = values => {
    const errors = {};

    if (!values.mesa) {
        errors.mesa = 'requerido';
    } else if (
        values.mesa < 1 || !isInt(values.mesa)
    ) {
        errors.mesa = 'numero de mesa no valido';
    }

    if (!values.lasso) {
        errors.lasso = 'requerido';
    } else if (
        values.lasso < 0 || !isInt(values.lasso)
    ) {
        errors.lasso = 'numero no valido';
    }

    if (!values.lelo) {
        errors.lelo = 'requerido';
    } else if (
        values.lelo < 0 || !isInt(values.lelo)
    ) {
        errors.lelo = 'numero no valido';
    }

    if (!values.nulos) {
        errors.nulos = 'requerido';
    } else if (
        values.nulos < 0 || !isInt(values.nulos)
    ) {
        errors.nulos = 'numero no valido';
    }

    if (!values.blancos) {
        errors.blancos = 'requerido';
    } else if (
        values.blancos < 0 || !isInt(values.blancos)
    ) {
        errors.blancos = 'numero no valido';
    }

    return errors;
};

const InputDataForm = props => {
    return (
        <KeyboardAvoidingView behavior="height" enabled>
            <Text
                style={styles.title}
            >
                Datos de Junta Receptora del Voto
                </Text>
            <Field
                name="parroquia"
                component={pickerName}
                placeholder="Parroquia"
                selected={props.parroquia}
                data={props.parroquias}
                onSelect={props.onSelect}
                input="parroquia"
            />
            <Field
                name="recinto"
                component={pickerName}
                placeholder="Recinto"
                data={props.recintos}
                selected={props.recinto}
                onSelect={props.onSelect}
                input="recinto"
            />

            <Field
                name="sexo"
                component={pickerName}
                placeholder="Sexo"
                data={props.sexos}
                selected={props.sexo}
                onSelect={props.onSelect}
                input="sexo"
            />

            <Field
                name="mesa"
                component={fieldName}
                placeholder="Numero de Mesa"
            />

            <View style={styles.line} />

            <Text
                style={styles.title}
            >
                Datos de Votación
                </Text>
            <Field
                name="lasso"
                component={fieldName}
                placeholder="Votos para Guillermo Lasso"
            />
            <Field
                name="lelo"
                component={fieldName}
                placeholder="Votos para Andres Arauz"
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
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginVertical: 30,
                    alignSelf: 'center',
                    backgroundColor: 'blue'
                }}
                transparent
                onPress={() => props.onSubmit()}
            >
                <Text style={{ color: 'white' }}>Grabar</Text>
            </Button>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    textInput: {
        color: '#454545',
    },
    line: {
        height: 1,
        marginTop: 10
    },
    error: {
        color: '#EF2929FF',
        fontStyle: 'italic'
    },
    title: {
        fontSize: 14,
        marginTop: 10,
        alignSelf: 'center',
        color: '#c0c0c0'
    }
});

export default reduxForm({ form: 'InputDataForm', validate })(InputDataForm);
