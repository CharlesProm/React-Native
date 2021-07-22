import React, {useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const TimePicker = (props) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleChange = (name, value) => props.setTask({ ...props.task, [name]: value });
    const handleConfirm = (date) => {
        const fixDate = moment.utc(date).format('LT')
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
