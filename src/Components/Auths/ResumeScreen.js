import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
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
    List,
    ListItem,
    Right,
    Text,
    Subtitle,
    Title,
    Left,
    Footer
} from 'native-base';

import { loading, storage, firebase } from '../../ActionCreators';

const mapStateToProps = state => ({
    logged: state.userReducer,
    regs: state.registerReducer,
    loading: state.loadingReducer
});

const mapDispatchToProps = dispatch => ({
    fetchRegs: () => dispatch(storage.getFromStorage()),
    upload: () => dispatch(firebase.upload()),
    working: () => dispatch(loading.working()),
    rest: () => dispatch(loading.rest())
});

class ResumeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async upload() {
        await this.props.working();
        await this.props.upload();
        await this.props.rest();
    }

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
        const regs = this.props.regs;
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
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Icon name="arrow-back" />
                            </Button>
                        </Left>
                        <Body style={{ alignSelf: 'center', flex: 4 }}>
                            <Title
                                style={{ fontSize: 20, alignSelf: 'center' }}
                            >
                                Resumen
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
                    <Content
                        style={{
                            backgroundColor: '#F0F0F0',
                            paddingHorizontal: 0
                        }}
                    >
                        {!this.props.loading ? (
                            <List>
                                {regs.map((reg, i) => (
                                    <ListItem key={i + 1}>
                                        <Text
                                            style={{ fontSize: 14, width: 20 }}
                                        >
                                            {i + 1}
                                        </Text>
                                        <Left
                                            style={{
                                                flex: 2,
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    flex: 3
                                                }}
                                            >
                                                {reg.parroquia}
                                            </Text>
                                            <Text
                                                style={{ fontSize: 12 }}
                                            >{`Mesa: ${reg.mesa}`}</Text>
                                        </Left>
                                        <Body style={{ flex: 5 }}>
                                            <Text
                                                style={{ fontSize: 12 }}
                                            >{`Votos: ${
                                                reg.favor
                                            } -- Blancos: ${
                                                reg.blancos
                                            } -- Nulos: ${reg.nulos}`}</Text>
                                        </Body>
                                        <Right style={{ flex: 1 }}>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Spinner
                                visible={this.props.loading}
                                animation="fade"
                                cancelable={false}
                                textContent={'Subiendo...'}
                                textStyle={{ color: 'blue' }}
                            />
                        )}
                    </Content>
                    <Footer>
                        <Left style={{ flex: 2, marginLeft: 5 }}>
                            <Text style={{ color: 'white' }}>Total</Text>
                            <Text style={{ color: 'white' }}>
                                {_.sumBy(regs, reg => parseInt(reg.favor))}
                            </Text>
                        </Left>
                        <Body style={{ flex: 2 }}>
                            <Button
                                style={{ alignSelf: 'center' }}
                                transparent
                                onPress={() => this.upload()}
                            >
                                <Text style={{ color: 'white' }}>Subir</Text>
                            </Button>
                        </Body>

                        <Right style={{ flex: 1 }} />
                    </Footer>
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
)(ResumeScreen);
