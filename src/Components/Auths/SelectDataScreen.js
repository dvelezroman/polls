import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
    Container,
    Header,
    Body,
    Content,
    Button,
    Icon,
    Label,
    Input,
    Footer,
    Right,
    Text,
    Title,
    Left,
    Form,
    Item,
    Picker
} from 'native-base';

const mapStateToProps = state => ({
    logged: state.userReducer
});

class SelectDataScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            provincia: 'Manabí',
            canton: 'Tosagua',
            parroquia: 'Tosagua',
            distrito: 'Distrito 1'
        };
        this.onValueChange = this.onValueChange.bind(this);
    }

    onValueChange = name => value => {
        console.log(value);
        this.setState({
            [name]: value
        });
    };

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => <Icon name="home" />
    };

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font
        });
        this.setState({ fontLoaded: true });
    }

    componentDidMount = () => {};

    render = () => {
        console.log(this.state);
        if (this.state.fontLoaded) {
            return (
                <Container>
                    <Header>
                        <Left>
                            <Button
                                transparent
                                onPress={() =>
                                    this.props.navigation.openDrawer()
                                }
                            >
                                <Icon name="menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Ingreso</Title>
                        </Body>
                        <Right>
                            <Text>{this.props.logged.username[0]}</Text>
                        </Right>
                    </Header>
                    <Content>
                        <Form>
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Parroquia"
                                    placeholderStyle={{ color: '#bfc6ea' }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.parroquia}
                                    onValueChange={this.onValueChange(
                                        'parroquia'
                                    )}
                                >
                                    <Picker.Item
                                        label="Tosagua"
                                        value="Tosagua"
                                    />
                                    <Picker.Item
                                        label="Bachillero"
                                        value="Bachillero"
                                    />
                                    <Picker.Item
                                        label="Angel Pedro Giler, (La Estancilla)"
                                        value="Estancilla"
                                    />
                                </Picker>
                            </Item>
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Distrito"
                                    placeholderStyle={{ color: '#bfc6ea' }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.distrito}
                                    onValueChange={this.onValueChange(
                                        'distrito'
                                    )}
                                >
                                    <Picker.Item
                                        label="Distrito 1"
                                        value="Distrito 1"
                                    />
                                </Picker>
                            </Item>
                            <Item floatingLabel>
                                <Label>A Favor</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>Blancos</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>Nulos</Label>
                                <Input />
                            </Item>
                        </Form>
                    </Content>
                    <Footer>
                        <Body>
                            <Button
                                style={{ alignSelf: 'center' }}
                                full
                                transparent
                                onPress={() => console.log('Registrar')}
                            >
                                <Text>Registrar</Text>
                            </Button>
                        </Body>
                    </Footer>
                </Container>
            );
        } else {
            return null;
        }
    };
}

export default connect(mapStateToProps)(SelectDataScreen);
