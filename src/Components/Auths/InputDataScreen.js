import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

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
    Footer,
    Right,
    Text,
    Title,
    Left,
    Form,
    Item,
    Picker
} from 'native-base';

import InputDataForm from './Forms/InputDataForm';

const mapStateToProps = state => ({
    logged: state.userReducer
});

class InputDataScreen extends Component {
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

    registerDataHandler = values => {
        console.log(values);
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
                    <Header style={{ paddingTop: 20 }}>
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
                            <Title>Ingreso de Votos</Title>
                        </Body>
                        <Right>
                            <Badge info>
                                <Text>{this.props.logged.username[0]}</Text>
                            </Badge>
                        </Right>
                    </Header>
                    <Content>
                        <Form style={{ paddingHorizontal: 20 }}>
                            <InputDataForm
                                registerDataHandler={this.registerDataHandler}
                            />
                        </Form>
                    </Content>
                </Container>
            );
        } else {
            return null;
        }
    };
}

export default connect(mapStateToProps)(InputDataScreen);
