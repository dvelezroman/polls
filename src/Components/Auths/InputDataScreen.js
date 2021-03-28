import React, { Component } from 'react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import {
    Container,
    Badge,
    Header,
    Body,
    Content,
    Button,
    Icon,
    Right,
    Text,
    Title,
    Subtitle,
    Left,
    Form,
    Toast
} from 'native-base';

import { storage, loading } from '../../ActionCreators';
import InputDataForm from './Forms/InputDataForm';

import { tosagua } from './Mock';
const data = tosagua;

const mapStateToProps = state => ({
    logged: state.userReducer,
    loading: state.loadingReducer
});

const mapDispatchToProps = dispatch => ({
    saveRegs: values => dispatch(storage.saveToStorage(values)),
    fetchRegsFromLocal: () => dispatch(storage.getFromStorage()),
    clearRegs: () => dispatch(storage.clearStorage()),
    working: () => dispatch(loading.working()),
    rest: () => dispatch(loading.rest())
});

const initialState = {
    mesa: null,
    lasso: null,
    lelo: null,
    blancos: null,
    nulos: null,
    parroquia: null,
    recinto: null,
    register: {},
    msg: 'Cargando...',
    sexo: null,
}
class InputDataScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            provincia: 'Manabi',
            canton: null,
            mesa: null,
            lasso: null,
            lelo: null,
            blancos: null,
            nulos: null,
            parroquia: null,
            recinto: null,
            recintos: [],
            register: {},
            msg: 'Cargando...',
            sexo: null,
        };
        this.resetState = this.resetState.bind(this);
    }

    resetState = () => {
        this.setState(initialState);
    }

    filterRecintos = parroquia => {
        const recintos = data.recintos;
        const recintosFiltered = filter(
            recintos,
            recinto => recinto.from === parroquia
        );
        return recintosFiltered;
    };

    onChangeInput = (name, value) => {
        this.setState({ [name]: value })
    }

    onSelect = item => {
        let recintos = this.state.recintos;
        let recinto = this.state.recinto;
        if (item.name === 'parroquia') {
            recintos = this.filterRecintos(item.value);
            recinto = recintos[0].value;
        }
        this.setState({ [item.name]: item.value, recintos, recinto });
    };

    registerDataHandler = () => {
        const {
            provincia,
            canton,
            parroquia, 
            recinto,
            sexo,
            mesa,
            lasso,
            lelo,
            blancos,
            nulos
        } = this.state

        if (!mesa || !lasso || !lelo || !blancos || !nulos || !recinto || !sexo) {
            Toast.show({
                text: 'Debe completar los datos!',
                type: 'warning',
                duration: 2000
            });
        } else {
            this.props.working();
            const register = {
                provincia,
                canton,
                parroquia,
                recinto,
                mesa,
                lasso,
                lelo,
                blancos,
                nulos,
                sexo,
                responsable: {
                    nombre: this.props.logged.username,
                    email: this.props.logged.email,
                }
            };
            this.props.saveRegs(register);
            this.props.rest(() => this.resetState());
        }
    };

    componentDidMount = () => {
        // this.props.clearRegs();
        const recintos = this.filterRecintos(data.parroquia);
        this.props.fetchRegsFromLocal();
        this.setState({
            recintos,
            canton: data.canton,
            parroquia: data.parroquias[0].value,
            recinto: recintos.length ? recintos[0].value : "Unico Recinto",
            sexo: "Mujeres",
        });
    };

    render = () => {
        return (
            <Container style={{ backgroundColor: 'black' }}>
                <Header
                    style={{
                        marginTop: 25
                    }}
                >
                    <Left style={{ alignSelf: 'center', flex: 1 }}>
                        <Button
                            transparent
                            onPress={() =>
                                this.props.navigation.openDrawer()
                            }
                        >
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body style={{ alignSelf: 'center', flex: 4 }}>
                        <Title
                            style={{
                                fontSize: 20,
                                alignSelf: 'center'
                            }}
                        >
                            Registro
                            </Title>
                        <Subtitle
                            style={{
                                fontSize: 14,
                                alignSelf: 'center'
                            }}
                        >
                            de votos
                            </Subtitle>
                    </Body>
                    <Right style={{ alignSelf: 'center', flex: 1 }}>
                        <Badge info>
                            <Text>{this.props.logged.username[0]}</Text>
                        </Badge>
                    </Right>
                </Header>

                <Content style={{ backgroundColor: '#F0F0F0' }}>
                    {!this.props.loading ? (
                        <Form style={{ paddingHorizontal: 20 }}>
                            <InputDataForm
                                parroquia={this.state.parroquia}
                                recinto={this.state.recinto || "Seleccione"}
                                onSelect={this.onSelect}
                                parroquias={data.parroquias}
                                recintos={this.state.recintos ? this.state.recintos : []}
                                sexos={data.sexos}
                                sexo={this.state.sexo}
                                registerDataHandler={
                                    this.registerDataHandler
                                }
                                onChangeInput={this.onChangeInput}
                            />
                        </Form>
                    ) : (
                        <Spinner
                            visible={this.props.loading}
                            animation="fade"
                            cancelable={false}
                            textContent={this.state.msg}
                            textStyle={{ color: 'blue' }}
                        />
                    )}
                </Content>
            </Container>
        );
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputDataScreen);
