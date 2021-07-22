import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Tag = (props) => {

    const handleChange = (name, value) => props.setTag({ ...props.task, [name]: value });
    const selectTag = () => {
        if (props.name == props.task.tag) {
            handleChange('tag', '')
        } else {
            handleChange('tag', props.name)
        }
    }

    return (
        <TouchableOpacity
            onPress={selectTag}
            style={styles.container}>
            <View style={
                props.task.tag === props.name ? styles.selectedCircle : styles.circle
            }></View>
            <Text style={styles.tagText}>{props.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '23%',
        justifyContent: 'space-evenly',
    }, circle: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#eee',
        width: 10,
        height: 10,
        alignSelf: 'center',
    }, selectedCircle: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff',
        width: 10,
        height: 10,
        alignSelf: 'center',
    }
    , tagText: {
        alignSelf: 'center',
        color: '#fff',
    },
})

export default Tag

