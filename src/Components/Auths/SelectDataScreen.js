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
    Item,
    Right,
    Text,
    Title,
    Left
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
            parroquia: null,
            distrito: null
        };
    }

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
        console.log(this.props.logged);
        return (
            <Container>
                {this.state.fontLoaded ? (
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
                ) : null}
            </Container>
        );
    };
}

export default connect(mapStateToProps)(SelectDataScreen);
