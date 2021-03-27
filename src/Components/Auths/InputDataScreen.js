import React, { Component, Fragment } from 'react';
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
            register: {},
            msg: 'Cargando...'
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

    onSelect = item => {
        let recintos = this.state.recintos;
        console.log(item);
        if (item.name === 'parroquia') {
            recintos = this.filterRecintos(item.value);
        }
        this.setState({ [item.name]: item.value, recintos });
    };

    registerDataHandler = async values => {
        const { mesa, favor, blancos, nulos } = values;
        const { provincia, canton, parroquia, recinto } = this.state;
        if (!mesa || !favor || !blancos || !nulos) {
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
                favor,
                blancos,
                nulos
            };

            await this.props.saveRegs(register);
            this.props.rest();
        }
    };

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font
        });
        this.setState({ fontLoaded: true });
    }

    componentDidMount = () => {
        //this.props.clearRegs();
        const recintos = this.filterRecintos(data.parroquia);
        this.props.fetchRegsFromLocal();
        this.setState({
            recintos,
            canton: data.canton,
            parroquia: data.parroquia,
            recinto: data.recinto ? data.recinto : null
        });
    };

    render = () => {
        console.log('Loading: ', this.props.loading);
        if (this.state.fontLoaded) {
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
                                    recinto={this.state.recinto}
                                    onSelect={this.onSelect}
                                    parroquias={data.parroquias}
                                    recintos={this.state.recintos}
                                    registerDataHandler={
                                        this.registerDataHandler
                                    }
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
        } else {
            return null;
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputDataScreen);
