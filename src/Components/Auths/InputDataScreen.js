import React, { Component } from 'react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
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
    Title,
    Subtitle,
    Left,
    Form,
    Toast
} from 'native-base';

import { storage, loading } from '../../ActionCreators';
import InputDataForm from './Forms/InputDataForm';

import { tosagua } from './Mock';
import { Alert, Image, Platform } from 'react-native';

const data = tosagua;

const mapStateToProps = state => ({
    logged: state.userReducer,
    loading: state.loadingReducer,
    form: state.formReducer,
});

const mapDispatchToProps = dispatch => ({
    saveRegs: values => dispatch(storage.saveToStorage(values)),
    fetchRegsFromLocal: () => dispatch(storage.getFromStorage()),
    clearRegs: () => dispatch(storage.clearStorage()),
    working: () => dispatch(loading.working()),
    rest: () => dispatch(loading.rest())
});
class InputDataScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            provincia: 'Manabi',
            canton: null,
            parroquia: null,
            recinto: null,
            recintos: [],
            msg: 'Cargando...',
            sexo: "Mujeres",
            cameraPermission: false,
            foto: null,
            uploaded: false,
        };
    }

    filterRecintos = parroquia => {
        const recintos = data.recintos;
        const recintosFiltered = filter(
            recintos,
            recinto => recinto.from === parroquia
        );
        return recintosFiltered;
    };

    onChangeInput = (name, value) => {
        this.setState({ [name]: value })
    }

    onSelect = item => {
        let recintos = this.state.recintos;
        let recinto = this.state.recinto;
        if (item.name === 'parroquia') {
            recintos = this.filterRecintos(item.value);
            recinto = recintos[0].value;
        }
        this.setState({ [item.name]: item.value, recintos, recinto });
    };

    registerDataHandler = () => {
        let votos = {};
        if (this.props.form.InputDataForm.values) {
            votos = {
                ...this.props.form.InputDataForm.values
            };
        }

        const {
            provincia,
            canton,
            parroquia,
            recinto,
            sexo,
            foto
        } = this.state
        if (
            !votos.mesa ||
            !votos.lasso ||
            !votos.lelo ||
            !votos.blancos ||
            !votos.nulos ||
            foto === null
        ) {
            Toast.show({
                text: 'Debe completar los datos!',
                type: 'warning',
                duration: 2000
            });
        } else {
            const uploadUri = Platform.OS === 'ios' ? foto.uri.replace('file://', '') : foto.uri;
            const register = {
                provincia,
                canton,
                parroquia,
                recinto,
                sexo,
                ...votos,
                responsable: {
                    nombre: this.props.logged.username,
                    email: this.props.logged.email,
                    admin: this.props.logged.admin,
                    uid: this.props.logged.uid,
                },
                uploadUri: foto ? uploadUri : null,
            };
            this.setState({ uploaded: true })
            this.props.saveRegs(register);
        }
    };

    requestCameraPermissions = async () => {
        const cameraRoll = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        const camera = await Permissions.getAsync(Permissions.CAMERA);
        if (cameraRoll.status === 'granted' && camera.status === 'granted') {
            this.setState({ cameraPermission: true });
        } else {
            const cameraRollPermission = await Permissions.askAsync(
                Permissions.MEDIA_LIBRARY
            );
            const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
            this.setState({
                cameraPermission:
                    cameraPermission.status === 'granted' &&
                    cameraRollPermission === 'granted'
            });
        }
    }

    pickImage = async () => {
        Alert.alert('Camara o Galería', 'Seleccione origen', [
            { text: 'Cámara', onPress: this.camera },
            { text: 'Galería', onPress: this.galeria }
        ]);
    };

    camera = async () => {
        if (this.state.cameraPermission) {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: false,
                quality: 0.5,
                base64: true
            });
            if (!result.cancelled) {
                const image = await ImageManipulator.manipulateAsync(
                    result.uri,
                    [{ resize: { width: 1000, height: 1000 } }],
                    { compress: 0.5 }
                );
                this.setState({ foto: image });
            }
        }
    };

    galeria = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            quality: 0.5,
            base64: true
        });
        if (!result.cancelled) {
            const image = await ImageManipulator.manipulateAsync(
                result.uri,
                [{ resize: { width: 1000, height: 1000 } }],
                { compress: 0.5 }
            );
            // console.log(image);
            this.setState({ foto: image });
        }
    };

    componentDidMount = () => {
        // this.props.clearRegs();
        this.requestCameraPermissions();
        const recintos = this.filterRecintos(data.parroquia);
        this.props.fetchRegsFromLocal();
        this.setState({
            recintos,
            canton: data.canton,
            parroquia: data.parroquias[0].value,
            recinto: recintos.length ? recintos[0].value : "Unico Recinto",
            uploaded: this.props.logged.uploaded,
        });
    };

    renderImageOrCameraIcon = () => {
        const { foto } = this.state;
        return foto ? (
            <Image
                source={{ uri: foto.uri }}
                fadeDuration={0}
                style={{ marginVertical: 20, alignSelf: 'center', width: 100, height: 100 }}
            />
        ) :
            <Button
                onPress={this.pickImage}
                rounded
                style={{ marginVertical: 20, alignSelf: 'center', backgroundColor: 'blue' }}
            >
                <Icon name="camera-outline" style={{ fontSize: 18, color: 'white' }} />
            </Button>
    }

    render = () => {
        const accessToCamera = this.state.cameraPermission;
        console.log(this.props.logged)
        
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Header
                    style={{
                        marginTop: 25
                    }}
                >
                    <Left style={{ alignSelf: 'center', flex: 1 }}>
                        <Button
                            transparent
                            onPress={() =>
                                this.props.navigation.openDrawer()
                            }
                        >
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body style={{ alignSelf: 'center', flex: 4 }}>
                        <Title
                            style={{
                                fontSize: 20,
                                alignSelf: 'center'
                            }}
                        >
                            Registro
                            </Title>
                        <Subtitle
                            style={{
                                fontSize: 14,
                                alignSelf: 'center'
                            }}
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
                {!this.props.loading ? (
                    <Content
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                marginTop: 10,
                                alignSelf: 'center',
                                color: '#c0c0c0'
                            }}
                        >
                            {accessToCamera ? 'Tomar foto del acta' : 'No tienes acceso a la cámara.'}
                        </Text>
                        {accessToCamera && this.renderImageOrCameraIcon()}

                        <Form style={{ paddingHorizontal: 10 }}>
                            <InputDataForm
                                parroquia={this.state.parroquia}
                                recinto={this.state.recinto || "Seleccione"}
                                onSelect={this.onSelect}
                                parroquias={data.parroquias}
                                recintos={this.state.recintos ? this.state.recintos : []}
                                sexos={data.sexos}
                                sexo={this.state.sexo}
                                onSubmit={this.registerDataHandler}
                                uploaded={this.state.uploaded}
                                admin={this.props.logged.admin}
                            />
                        </Form>
                    </Content>
                ) : (
                    <Spinner
                        visible={this.props.loading}
                        animation="fade"
                        cancelable={false}
                        textStyle={{ color: 'blue' }}
                    />
                )}
            </Container>
        );
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputDataScreen);
