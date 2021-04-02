import React, { Component } from 'react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import Spinner from 'react-native-loading-spinner-overlay';
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
    loading: state.loadingReducer,
    form: state.formReducer,
});

const mapDispatchToProps = dispatch => ({
    saveRegs: values => dispatch(storage.saveToStorage(values)),
    fetchRegsFromLocal: () => dispatch(storage.getFromStorage()),
    clearRegs: () => dispatch(storage.clearStorage()),
    working: () => dispatch(loading.working()),
    rest: () => dispatch(loading.rest())
});
class InputDataScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            provincia: 'Manabi',
            canton: null,
            parroquia: null,
            recinto: null,
            recintos: [],
            msg: 'Cargando...',
            sexo: "Mujeres",
        };
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
        let votos = {};
        if (this.props.form.InputDataForm.values) {
            votos = {
                ...this.props.form.InputDataForm.values
            };
        }

        const {
            provincia,
            canton,
            parroquia,
            recinto,
            sexo,
        } = this.state
        if (
            !votos.mesa ||
            !votos.lasso ||
            !votos.lelo ||
            !votos.blancos ||
            !votos.nulos
        ) {
            Toast.show({
                text: 'Debe completar los datos!',
                type: 'warning',
                duration: 2000
            });
        } else {
            const register = {
                provincia,
                canton,
                parroquia,
                recinto,
                sexo,
                ...votos,
                responsable: {
                    nombre: this.props.logged.username,
                    email: this.props.logged.email,
                }
            };
            this.props.saveRegs(register);
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
        });
    };

    render = () => {
        return (
            <Container style={{ backgroundColor: 'white' }}>
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
                {!this.props.loading ? (
                    <Content
                    >
                        <Form style={{ paddingHorizontal: 10 }}>
                            <InputDataForm
                                parroquia={this.state.parroquia}
                                recinto={this.state.recinto || "Seleccione"}
                                onSelect={this.onSelect}
                                parroquias={data.parroquias}
                                recintos={this.state.recintos ? this.state.recintos : []}
                                sexos={data.sexos}
                                sexo={this.state.sexo}
                                onSubmit={this.registerDataHandler}
                            />
                        </Form>
                    </Content>
                ) : (
                    <Spinner
                        visible={this.props.loading}
                        animation="fade"
                        cancelable={false}
                        textContent={this.state.msg}
                        textStyle={{ color: 'blue' }}
                    />
                )}
            </Container>
        );
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputDataScreen);
