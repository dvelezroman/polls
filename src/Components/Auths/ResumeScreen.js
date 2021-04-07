import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { firebaseDataBase } from '../../Store/Services/Firebase';

const mapStateToProps = state => ({
    logged: state.userReducer,
    regs: state.registerReducer,
    loading: state.loadingReducer,
    user: state.userReducer,
});

const mapDispatchToProps = dispatch => ({
    fetchRegs: () => dispatch(storage.getFromStorage()),
    upload: () => dispatch(firebase.upload()),
    working: () => dispatch(loading.working()),
    rest: () => dispatch(loading.rest()),
    removeRegister: (reg) => dispatch(storage.removeFromStorage(reg)),
});

class ResumeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registers: [],
        }
    }

    removeItemHandler = register => {
        this.props.removeRegister(register);
    }

    getRegistersFromFirebase = () => {
        const ref = firebaseDataBase.ref('actas/Tosagua');
        ref.on('value', (snapshot) => {
            const registers = snapshot.val();
            this.setState({ registers });
        });
    }

    async upload() {
        await this.props.upload();
    }

    componentDidMount() {
        this.getRegistersFromFirebase();
    }

    render = () => {
        const { regs, user } = this.props;
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
                            Registro
                            </Title>
                        <Subtitle
                            style={{ fontSize: 14, alignSelf: 'center' }}
                        >
                            de Juntas Ingresadas
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
                        <RegisterList regs={regs} removeItem={this.removeItemHandler} />
                    ) : (
                        <Spinner
                            visible={this.props.loading}
                            animation="fade"
                            cancelable={false}
                            textStyle={{ color: 'blue' }}
                        />
                    )
                    }
                </View>
                <Footer style={{ paddingTop: 20, paddingBottom: 20 }}>
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
                        {regs.length > 0 && <Button
                            style={{ alignSelf: 'center', backgroundColor: 'blue' }}
                            transparent
                            onPress={() => this.upload()}
                        >
                            <Text style={{ color: 'white' }}>Subir Registros al Sistema</Text>
                        </Button>
                        }
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
