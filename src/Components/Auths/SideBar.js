import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Image, StatusBar } from 'react-native';
import { Text, List, Left, Body, ListItem, Icon, View } from 'native-base';
import { user } from '../../ActionCreators';

import { tosagua } from './Mock';
const data = tosagua;

const routes = [
    { to: 'Registrar', icon: 'home' },
    { to: 'Resumen', icon: 'calculator' }
];

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(user.signOut())
});

class SideBar extends React.Component {
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
                        dataArray={routes}
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
    null,
    mapDispatchToProps
)(SideBar);
