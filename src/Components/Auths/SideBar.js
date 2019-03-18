import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Image, StatusBar } from 'react-native';
import { Text, List, Left, Body, ListItem, Icon, View } from 'native-base';
import { user } from '../../ActionCreators';

const pesebrePic = require('../../../assets/pesebre.jpg');

const routes = [{ to: 'Home', icon: 'home' }];

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(user.signOut())
});

class SideBar extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2 }}>
                    <Image
                        source={pesebrePic}
                        style={{
                            height: 120,
                            width: '100%',
                            alignSelf: 'stretch',
                            position: 'absolute'
                        }}
                    />
                </View>
                <View style={{ flex: 5 }}>
                    <List
                        dataArray={routes}
                        contentContainerStyle={{}}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() =>
                                        this.props.navigation.navigate(data.to)
                                    }
                                >
                                    <Left>
                                        <Icon name={data.icon} />
                                    </Left>
                                    <Body>
                                        <Text>{data.to}</Text>
                                    </Body>
                                </ListItem>
                            );
                        }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <ListItem button onPress={this.props.logOut}>
                        <Left>
                            <Icon name="md-log-out" />
                        </Left>
                        <Body>
                            <Text>Log Out</Text>
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
