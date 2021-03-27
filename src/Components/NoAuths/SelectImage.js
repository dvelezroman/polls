import React, { Component } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Permissions, Camera } from 'expo';
import { ImagePicker } from 'expo';

class SelectImage extends Component {
    pickImage = async () => {
        let result;
        if (this.props.camera) {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                base64: true
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                base64: true
            });
        }
        if (!result.cancelled) {
            if (this.props.loadSignUpImage) this.props.loadSignUpImage(result);
            if (this.props.loadImageFromGallery)
                this.props.loadImageFromGallery(result);
            //this.setState({ image: result.uri });
        }
    };

    render() {
        let { image, gallery } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.pickImage}>
                    <Image
                        source={
                            image
                                ? { uri: image.uri }
                                : require('../../assets/unloadedPictureFromGallery.jpg')
                        }
                        style={
                            gallery
                                ? styles.imageToUpload
                                : styles.imageToSignUp
                        }
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageToSignUp: {
        width: 160,
        height: 160,
        borderRadius: 80
    },
    imageToUpload: {
        flex: 1,
        width: 300,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 10
    }
});

export default SelectImage;
