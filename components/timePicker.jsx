import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform, TouchableHighlight } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const TimePicker = (props) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        if(props.task.notifytime != null){
            let aux = props.task.notifytime.split(' ')
            let fixing = aux[0].split(':')
            const hours = fixing[0]
            const minutes = fixing[1]
            const type = aux[1]
            // console.log(hours + ":" + minutes + " " + type)
        }
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleChange = (name, value) => props.setTask({ ...props.task, [name]: value });
    const handleConfirm = (date) => {
        const fixDate = moment.utc(date).format('LT')
        // console.log(fixDate)
        handleChange('notifytime', fixDate)
        hideDatePicker();
    };

    return (
        <View style={styles.viewContainer}>
            <Text style={styles.dateText}>{
                props.task.notifytime == null ? '00:00' : `${props.task.notifytime}`
            }</Text>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={'time'}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                timeZoneOffsetInMinutes={0}
                is24Hour={false}
            />
            <TouchableOpacity
                style={styles.timeBtn}
                onPress={showDatePicker}
            >
                <Text>Select Hour</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        // backgroundColor:'red',
        width: '100%',
        marginBottom: 20,
    },
    dateText: {
        color: '#eee',
        marginBottom: 15,
        textAlign: 'center',
    },
    timeBtn: {
        backgroundColor: '#eee',
        width: 150,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
    }
})

export default TimePicker
