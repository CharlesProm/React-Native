import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getUserData } from '../components/api'
import moment from 'moment'

const StadisticsPage = ({ route }) => {
    const [userData, setUserData] = useState([])
    const [printData, setPrintData] = useState({
        day: '',
        month: '',
        common: '',
    })
    const loadUserData = async () => {
        const res = await getUserData(route.params.userId)
        setUserData(res)
    }
    const loadLogic = () => {
        const day = dailyTask()
        const month = monthTask()
        const common = commonTask()
        setPrintData({
            day,
            month,
            common
        })
    }
    const dailyTask = () => {
        const now = moment().format('x')
        const a = moment(parseInt(now))
        const b = moment(parseInt(userData.createtime))
        const c = a.diff(b, 'days') + 1
        const result = parseInt(userData.taskcomplete) / c
        return result
    }
    const monthTask = () => {
        const now = moment().format('x')
        const a = moment(parseInt(now))
        const b = moment(parseInt(userData.createtime))
        const c = a.diff(b, 'month') + 1
        const result = parseInt(userData.taskcomplete) / c
        return result
    }
    const name = ['family', 'friends', 'job', 'personal']
    const commonTask = () => {
        let result = []
        const amount = [userData.family, userData.friends, userData.job, userData.personal]
        let aux = 0
        amount.forEach(item => {
            if (item > aux) {
                aux = item
            }
        });
        for (let i = 0; i <= 3; i++) {
            if (aux == amount[i]) { result.push(name[i]) }
        }
        for (let i = 0; i < result.length; i++) {
            result[i] = result[i].charAt(0).toUpperCase() + result[i].substr(1);;
        }
        return result.join(' / ')

    }
    useEffect(() => {
        loadUserData()
    }, [])

    useEffect(() => {
        loadLogic()
    }, [userData])

    return (
        <View style={styles.generalContainer}>
            <Text style={styles.title}>Stadistics</Text>
            <Text style={styles.subTitle}>Tareas completadas diariamente</Text>
            <Text style={styles.text}>{
                printData.day == '' ? '0' : printData.day
            }</Text>
            <Text style={styles.subTitle}>Tareas completadas mensualmente</Text>
            <Text style={styles.text}>{
                printData.month == '' ? '0' : printData.month
            }</Text>
            <Text style={styles.subTitle}>Tarea mas comun</Text>
            <Text style={styles.text}>{
                printData.common == '' ? '0' : printData.common
            }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    generalContainer: {
        backgroundColor: '#D54C4C',
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    }, text: {
        color: '#eee',
        fontSize:18,
        marginVertical: 20,
        marginLeft:20,
    }, title: {
        fontSize: 30,
        color: '#eee',
        marginBottom: 40,
    }, subTitle: {
        fontSize: 20,
        color: '#eee',
    },
})
export default StadisticsPage
