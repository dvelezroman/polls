import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, AsyncStorage } from 'react-native';
import { user } from '../ActionCreators';
import AuthsStack from './Auths/AuthsStack';
import NoAuthsStack from './NoAuths/NoAuthsStack';

class VerifyIfSession extends Component {
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userLogged@polls');
            if (value !== null) {
                return value;
            }
            return null;
        } catch (error) {
            console.log('No hay usuario guardado');
        }
    };

    componentDidMount = async () => {
        let response = await this._retrieveData();
        response = JSON.parse(response);
        this.props.loadUser(response);
    };

    render = () => {
        return (
            <Fragment>
                {this.props.logged ? <AuthsStack /> : <NoAuthsStack />}
            </Fragment>
        );
    };
}

const mapStateToProps = state => ({
    logged: state.userReducer
});

const mapDispatchToProps = dispatch => ({
    loadUser: dataUser => dispatch(user.loadUser(dataUser))
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerifyIfSession);
