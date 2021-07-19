import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, } from 'react-native'

import moment from 'moment';
import DatePicker from '../components/datePicker'
import TimePicker from '../components/timePicker'
import ImagePicker from '../components/imagePicker'
import { registerTask, deleteTask, updateTask, getTask, searchImage } from '../components/api'
import Tag from '../components/tag';
import * as Notifications from 'expo-notifications';

const taskPage = ({ navigation, route }) => {


    const editing = route.params.editing
    const [confirmTime, setconfirmTime] = useState()
    const [expireDateShow, setExpireDateShow] = useState(false)
    const [reminderShow, setReminderShow] = useState(false)
    const [imageShow, setimageShow] = useState(false)
    const [task, setTask] = useState({
        title: "",
        description: "",
        id: '',
        owner: route.params.owner,
        exptime: moment().format('x'),
        createtime: moment().format('x'),
        tag: '',
        pinned: 0,
        notifytime: moment().format('LT'),
        notifid: null,
        imagename:null,
        imageBase64:null
    });

    const getNotifyId = async (hours, minutes) => {
        const trigger = await Notifications.getNextTriggerDateAsync({
            hour: hours,
            minute: minutes,
            repeats: true,
        })
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: "A little reminder!",
                body: `Your task ${task.title} is will end soon`,
            },
            trigger
        });

        return id
    }


    const handleSubmit = async () => {
        //Quieres un Reminder?
        if (!reminderShow) {
            //Quieres un Reminder? -----> NO
            if (task.notifid != null) {
                /// Si hay una notificacion borrala
                console.log('cancel negation sub')
                await Notifications.cancelScheduledNotificationAsync(task.notifid)
            }
            sendData(null)
        } else {
            ///Quieres un Reminder? -------> SI
            let aux = task.notifytime.split(' ')
            let fixing = aux[0].split(':')
            let hours = parseInt(fixing[0])
            const minutes = parseInt(fixing[1])
            const type = aux[1]
            if (type == 'PM' && hours != 12) {
                hours = hours + 12
            }
            //Create Notification Id variable
            let id

            if (task.notifid != null) {
                /// Si hay una notificacion antigua ------>
                if (task.notifytime != confirmTime) {
                    /// Si la notificacion no es igual a la anterior borrala y crea una nueva ID
                    id = await getNotifyId(hours, minutes)
                    await Notifications.cancelScheduledNotificationAsync(task.notifid)
                } else { /////Si la notificacion es igual a la anterior ---->
                    id = task.notifid
                }
            } else {////Si no hay una notificacion antigua ----->
                id = await getNotifyId(hours, minutes)
            }
            /// Finally send data with id
            sendData(id)
        }
    }
    const sendData = async (id) => {
        if (editing) {
            await updateTask(task, expireDateShow, reminderShow, id)
        } else {
            await registerTask(task, expireDateShow, reminderShow, id)
        }
        navigation.goBack()
    }



    const pressDelete = async () => {
        if (task.notifid != null) await Notifications.cancelScheduledNotificationAsync(task.notifid)
        deleteTask(task.id, navigation)
    }
    const handleChange = async (name, value) => setTask({ ...task, [name]: value });

    useEffect(() => {
        if (editing) {
            navigation.setOptions({ headerTitle: 'Updating a task' });
            (async () => {
                const item = await getTask(route.params.id);
                setTask(item[0])
                if (item[0].exptime != null) {
                    setExpireDateShow(true)
                }
                if (item[0].notifid != null) {
                    setconfirmTime(item[0].notifytime)
                    setReminderShow(true)
                }
            })();
        } else {
            navigation.setOptions({ headerTitle: 'Creating a task' })
        }
    }, [])

    const changeBool = async (item, func) => {
        if (item) {
            func(false)
        } else {
            func(true)
        }
    }

    return (
        <ScrollView
            scrollEnabled={true}
            style={styles.userScreenContainer}>
            <Text
                style={styles.Text}
            >Title</Text>
            <TextInput
                onChangeText={(text) => handleChange('title', text)}
                value={task.title}
                style={styles.input}
            />
            <Text
                style={styles.Text}
            >Description</Text>
            <TextInput
                onChangeText={(text) => handleChange('description', text)}
                value={task.description}
                style={[styles.input, styles.inputDescription]}
                multiline={true}
                numberOfLines={4}
                />
            <Text style={[styles.Text, styles.textExpireDate]}>Tags</Text>
            <View style={styles.tagsContainer}>
                <Tag setTag={setTask} task={task} name={'Family'} />
                <Tag setTag={setTask} task={task} name={'Personal'} />
                <Tag setTag={setTask} task={task} name={'Friends'} />
                <Tag setTag={setTask} task={task} name={'Job'} />
            </View>
            {/* ///////////////////////////////////// EXPIRE DATE SHOW */}
            <TouchableOpacity onPress={() => { changeBool(expireDateShow, setExpireDateShow) }} style={styles.subtitleSelect}>
                <Text style={[styles.Text, styles.textExpireDate]}>
                    Expire date
                </Text>
                <View style={expireDateShow ? styles.selectedCircle : styles.circle}></View>
            </TouchableOpacity>
            {expireDateShow ?
                <View style={styles.textInputYMDContainer}>
                    <DatePicker mode={'datetime'} task={task} setTask={setTask} ></DatePicker>
                </View> : null}
            {/* ///////////////////////////////////// REMINDER SHOW */}
            <TouchableOpacity onPress={() => { changeBool(reminderShow, setReminderShow) }} style={styles.subtitleSelect}>
                <Text style={[styles.Text, styles.textExpireDate]}>
                    Reminder
                </Text>
                <View style={reminderShow ? styles.selectedCircle : styles.circle}></View>
            </TouchableOpacity>
            {reminderShow ?
                <View style={styles.textInputYMDContainer}>
                    <TimePicker task={task} setTask={setTask}></TimePicker>
                </View> : null}
            {/* ///////////////////////////////////// IMAGE UPLOAD SHOW */}
            {/* <TouchableOpacity onPress={() => { changeBool(imageShow, setimageShow) }} style={styles.subtitleSelect}>
                <Text style={[styles.Text, styles.textExpireDate]}>
                    Image Upload
                </Text>
                <View style={imageShow ? styles.selectedCircle : styles.circle}></View>
            </TouchableOpacity>
            {imageShow ?
                <View style={styles.textInputYMDContainer}>
                    <ImagePicker editing={editing} task={task} setTask={setTask}  ></ImagePicker>
                </View> : null} */}
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.createTaskBtn}>
                    <Text
                        style={{ color: '#eee' }}
                    >{editing ? 'Edit task' : 'Create Task'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={editing ? false : true}
                    onPress={pressDelete}
                    style={editing ? [styles.createTaskBtn, styles.btnDelete] : { display: 'none' }}>
                    <Text
                        style={{ color: '#eee' }}
                    >Delete Task</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    userScreenContainer: {
        flex: 1,
        backgroundColor: '#D54C4C',
        padding: '5%',
    },
    Text: {
        color: '#fff',
        marginTop: 5,
        marginLeft: 5,
        fontSize: 16,
    },
    addBtn: {
        width: 150,
        backgroundColor: "#91C788",
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 50,
    }, input: {
        // flex:1,
        height: 40,
        width: '100%',
        marginVertical: 12,
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        borderColor: '#fff',
        color: '#fff',
        alignSelf: 'flex-start',
    }, inputDescription: {
        padding: 10,
        textAlignVertical: 'top',
        height: 80,
    }, createTaskBtn: {
        width: '40%',
        marginTop: 20,
        borderRadius: 50,
        // backgroundColor: '#52734D',
        borderWidth: 1,
        borderColor: '#eee',
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center'
    },
    textExpireDate: {
        marginBottom: 15,
        marginTop: 15,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    textInputYMDContainer: {
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInutHMContainer: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textInputDate: {
        textAlign: 'center',
        paddingVertical: 10,
        width: '28%',
        borderColor: '#ffffff82',
        borderRadius: 5,
        borderWidth: 1,
        color: '#fff',
    }, modalStyle: {
        width: 200,
        height: 200,
    }, tagsContainer: {
        // backgroundColor:'red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 40,
    }, circle: {
        width: 10,
        height: 10,
        // backgroundColor:'#eee',
        borderRadius: 50,
        borderColor: '#eee',
        borderWidth: 1,
        // alignSelf:'center',
        marginHorizontal: 15,
    }, selectedCircle: {
        width: 10,
        height: 10,
        backgroundColor: '#eee',
        borderRadius: 50,
        borderColor: '#eee',
        borderWidth: 1,
        marginHorizontal: 15,
    }, subtitleSelect: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor:'blue',
        alignItems: 'center',
    }, btnContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        // backgroundColor:'red',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 50,
    }, btnDelete: {
        // backgroundColor:'#663F3F',
    }
})

export default taskPage
