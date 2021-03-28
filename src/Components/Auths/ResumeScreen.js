import React, { Component } from 'react';
import { connect } from 'react-redux';
import sumBy from 'lodash/sumBy';
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
    Subtitle,
    Title,
    Left,
    Footer
} from 'native-base';

import { loading, storage, firebase } from '../../ActionCreators';
import RegisterList from './RegisterList';
import { View } from 'react-native';

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
    async upload() {
        await this.props.upload();
    }

    render = () => {
        const { regs } = this.props;
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
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {!this.props.loading ? (
                        <RegisterList regs={regs} />
                    ) : (
                        <Spinner
                            visible={this.props.loading}
                            animation="fade"
                            cancelable={false}
                            textContent={'Subiendo...'}
                            textStyle={{ color: 'blue' }}
                        />
                    )
                    }
                </View>
                <Footer style={{ paddingTop: 20 }}>
                    {/* <Left style={{ flex: 1 }}>
                        <Text style={{ color: 'white' }}>Totales</Text>
                        <Text style={{ color: 'white' }}>
                            Lasso {sumBy(regs, reg => parseInt(reg.lasso))}
                        </Text>
                        <Text style={{ color: 'white' }}>
                            Lelo Arauz{sumBy(regs, reg => parseInt(reg.lelo))}
                        </Text>
                    </Left> */}
                    <Body style={{ flex: 2, justifyContent: 'center' }}>
                        <Button
                            style={{ alignSelf: 'center', backgroundColor: 'blue' }}
                            transparent
                            onPress={() => this.upload()}
                        >
                            <Text style={{ color: 'white' }}>Subir Registros al Sistema</Text>
                        </Button>
                    </Body>

                    {/* <Right style={{ flex: 1 }} /> */}
                </Footer>
            </Container>
        );
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResumeScreen);
