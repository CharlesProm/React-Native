import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { searchImage } from './api'

const imagePicker = (props) => {
    const [imageUri, setimageUri] = useState('null')

    useEffect(() => {
        (async () => {
            if (props.editing) {
                if (props.task.imagename != null) {
                    const res = await searchImage(props.task.imagename)
                    setimageUri(res.uri)
                }
            }
        })();
    }, [])

    // console.log(props.task)
    const url = 'http://192.168.1.108:3000/'
    // console.log(props.task)
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    // const press = async () => {
    //     const res = await searchImage(props.task.createtime)
    //     setstate(res.uri)
    // }
    const handleChange = async (name, value) => props.setTask({ ...props.task, [name]: value });

    const imageSelect = async () => {
        // launch the camera with the following settings
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
            base64: true,
        }).then(res=>{
            console.log(res.uri)
            handleChange('imageBase64',res.base64)
        })
        // console.log(image)
        // make sure a image was taken:
        // if (!image.cancelled) {
        //     console.log('q')
        //     // await handleChange('imagename', `${props.task.createtime}`)
        //     // await handleChange('imageBase64', image.base64)
        // }
    }
    return (
        <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.touchableStyle} onPress={imageSelect}>
                {props.task.imageBase64 !== null ? <Image source={{
                    uri: props.task.imageBase64
                }} style={styles.imageStyle}></Image> : <Text style={styles.uploadText}>Upload Image</Text>}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        // backgroundColor:'blue',
        width: '100%',
        height: 200,
        // alignSelf:'center',
    }, touchableStyle: {
        alignSelf: 'center',
        // backgroundColor:'green',
        height: '100%',
        width: 200,
        justifyContent: 'center'
    }, imageStyle: {
        width: 150,
        height: 150,
    }, uploadText: {
        alignSelf: 'center',
        backgroundColor: '#eeeeee20',
        // height:'100%',
        // width:'100%'
        padding: 20,
        paddingVertical: 55,
        borderRadius: 80,
        borderColor: '#eee',
        borderWidth: 1,
        borderStyle: 'dashed',
        color: '#fff',
        opacity: .8
        // elevation:2,
        // border
    }
})

export default imagePicker
