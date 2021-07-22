import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { completeTask, pinTask,deleteTask } from './api';
import * as Notifications from 'expo-notifications';
import moment from 'moment';

const taskItem = (props) => {
    useEffect(() => {
        const aux1 = moment.utc(parseInt(props.task.exptime)).format('YYYY-MM-DD')
        const aux2 = moment.utc().format('YYYY-MM-DD')
        console.log(aux1)
        console.log(aux2)
        console.log(moment(aux1).isBefore(aux2))
        if(moment(aux1).isBefore(aux2)){
            deleteTask(props.task.id,null)
        }
    }, [])

    const navigation = useNavigation()
    const taskOnPress = () => {
        navigation.navigate('TaskPage', {
            id: props.task.id,
            owner: props.task.owner,
            editing: true
        })
    }
    const completeOnPress = async () => {
        if(props.task.notifid != null )await Notifications.cancelScheduledNotificationAsync(props.task.notifid)
        await completeTask(props.task)
        props.loadTask()
    }
    const setPin = async () => {
        await pinTask(props.task.id, props.task.pinned)
        props.loadTask()
    }

    return (
        <View style={styles.viewContainer}>
            <TouchableOpacity style={styles.dataContainer} onPress={() => taskOnPress()} >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#eee', }}>{props.task.title}</Text>
                <Text style={{ color: '#eee', overflow: 'hidden', height: '60%', }} >{props.task.description}</Text>
            </TouchableOpacity>
            <View style={styles.doneBtnContainer}>
                <TouchableOpacity onPress={setPin} >
                    {props.task.pinned === 1 ? <AntDesign name="pushpin" size={24} color="#eee" style={
                        { transform: [{ rotateY: '180deg' }] }
                    } /> : <AntDesign name="pushpino" size={24} color="#eee" style={
                        { transform: [{ rotateY: '180deg' }] }
                    } />}
                </TouchableOpacity>
                <TouchableOpacity onPress={completeOnPress}>
                    <AntDesign name="check" size={24} color="#91C788" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: '#30475E',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 75,
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    dataContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        width: '70%',
    },
    doneBtnContainer: {
        alignSelf: 'center',
        width: '30%',
        height: '70%',
        paddingHorizontal: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    }
})

export default taskItem

