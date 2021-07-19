import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform, TouchableHighlight } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const DatePicker = (props) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleChange = (name, value) => props.setTask({ ...props.task, [name]: value });
    const handleConfirm = (date) => {
        const fixDate = moment.utc(date).format('x')
        handleChange('exptime', fixDate)
        hideDatePicker();
    };

    return (
        <View style={styles.viewContainer}>
            <Text style={styles.dateText}>{
                props.task.exptime == null ? '00:00' : `${moment.utc(parseInt(props.task.exptime)).format(`YYYY / MM / DD - HH:mm a`)}`}</Text>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={'datetime'}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                timeZoneOffsetInMinutes={0}
                is24Hour={false}
            />
            <TouchableOpacity
                style={styles.timeBtn}
                onPress={showDatePicker}
            >
                <Text>Select Date</Text>
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

export default DatePicker
