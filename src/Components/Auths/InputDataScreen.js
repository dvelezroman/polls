import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Font } from 'expo';
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

import { storage } from '../../ActionCreators';
import InputDataForm from './Forms/InputDataForm';

const mapStateToProps = state => ({
    logged: state.userReducer,
    loading: state.loadingReducer
});

const mapDispatchToProps = dispatch => ({
    saveRegs: values => dispatch(storage.saveToStorage(values)),
    fetchRegsFromLocal: () => dispatch(storage.getFromStorage())
});

class InputDataScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            provincia: 'Manabi',
            canton: 'Tosagua',
            distrito: 'Distrito 1',
            register: {},
            msg: 'Cargando...'
        };
    }

    registerDataHandler = async values => {
        const { parroquia, mesa, favor, blancos, nulos } = values;
        const { provincia, canton, distrito } = this.state;
        if (!mesa || !favor || !blancos || !nulos) {
            Toast.show({
                text: 'Debe completar los datos!',
                type: 'warning',
                duration: 2000
            });
        } else {
            const register = {
                provincia,
                canton,
                distrito,
                parroquia: parroquia ? parroquia : 'Tosagua',
                mesa,
                favor,
                blancos,
                nulos
            };
            await this.props.saveRegs(register);
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
        this.props.fetchRegsFromLocal();
    };

    render = () => {
        console.log(this.props.loading);
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
                                style={{ fontSize: 20, alignSelf: 'center' }}
                            >
                                Registro
                            </Title>
                            <Subtitle
                                style={{ fontSize: 14, alignSelf: 'center' }}
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
