import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Text, List, Left, Body, ListItem, Icon, View } from 'native-base';
import { user } from '../../ActionCreators';

import { tosagua } from './Mock';
const data = tosagua;

const mapStateToProps = state => ({
    regs: state.registerReducer,
    loading: state.loadingReducer,
    user: state.userReducer,
});

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(user.signOut())
});

class SideBar extends React.Component {
    getRoutes = () => {
        const { user } = this.props;

        if (user.admin) {
            return [
                { to: 'Registrar', icon: 'home' },
                { to: 'Resumen', icon: 'calculator' },
                { to: 'Todo', icon: 'calculator' },
            ]
        } else {
            return [
                { to: 'Registrar', icon: 'home' },
                { to: 'Resumen', icon: 'calculator' },
            ]
        }
    }

    componentDidMount() {
        if (this.props.user.admin) {
            this.props.navigation.navigate('Todo');
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ flex: 3, marginTop: 0 }}>
                    <Image
                        source={data.profilePic}
                        style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 10,
                            alignSelf: 'stretch',
                            position: 'absolute'
                        }}
                    />
                </View>
                <View style={{ flex: 5, backgroundColor: '#F0F0F0' }}>
                    <List
                        dataArray={this.getRoutes()}
                        contentContainerStyle={{}}
                        keyExtractor={(data, index) => index.toString()}
                        renderRow={(data) => {
                            return (
                                <ListItem
                                    button
                                    onPress={() =>
                                        this.props.navigation.navigate(data.to)
                                    }
                                >
                                    <Left style={{ flex: 1 }}>
                                        <Icon small name={data.icon} />
                                    </Left>
                                    <Body
                                        style={{
                                            flex: 5
                                        }}
                                    >
                                        <Text>{data.to}</Text>
                                    </Body>
                                </ListItem>
                            );
                        }}
                    />
                </View>
                <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
                    <ListItem button onPress={this.props.logOut}>
                        <Left style={{ flex: 1 }}>
                            <Icon name="md-log-out" />
                        </Left>
                        <Body style={{ flex: 5 }}>
                            <Text>Salir</Text>
                        </Body>
                    </ListItem>
                </View>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar);
