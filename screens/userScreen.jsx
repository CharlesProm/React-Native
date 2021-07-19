import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, TextInput } from 'react-native'
import { getAllTasks , searchingTask} from '../components/api';
import TaskItem from '../components/taskItem';
import { useIsFocused } from '@react-navigation/core';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

const userScreen = ({ navigation, route }) => {

    const [tasks, setTasks] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [searchTitle, setsearchTitle] = useState('')

    const userId = route.params.id
    const loadTasks = async () => {
        const data = await getAllTasks(userId)
        pinnedFilter(data)
    }
    const pinnedFilter = (data) => {

        const normal = []
        const pin = []

        data.forEach(element => {
            if (element.pinned == 1) {
                pin.push(element)
            } else {
                normal.push(element)
            }
        });
        normal.forEach(element => {
            pin.push(element)
        })
        setTasks(pin)
    }
    const focused = useIsFocused()

    useEffect(() => {
        // window.alert(route.params.id)
        navigation.setOptions({ headerTitle: route.params.user, });
        loadTasks()
    }, [focused])

    useEffect(()=>{
        handleSearching()
    },[searchTitle])

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        await loadTasks()
        setRefreshing(false)
    })

    const handleSearching = async()=>{
        if(searchTitle == ''){
            loadTasks()
        }else{
            const res = await searchingTask(userId,searchTitle)
            setTasks(res)
        }
    }
    const clearInput=()=>{
        setsearchTitle('')
    }   



    return (
        <View style={styles.userScreenContainer}>
            <View style={styles.searchBarContainer}>
                <Entypo name="squared-cross" size={24} color="#D54C4C" onPress={clearInput}  />
                <TextInput
                onChangeText={(text) =>{setsearchTitle(text)}}
                value={searchTitle}
                placeholder={'Search Task...'}
                style={styles.searchBar}
                />
                <FontAwesome name="search" size={24} color="#D54C4C" onPress={handleSearching} />
            </View>
            <FlatList
                style={{ padding: 20 }}
                data={tasks}
                renderItem={({ item }) => {
                    return <TaskItem loadTask={loadTasks} task={item} id={item.id} />
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                }
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('TaskPage', { owner: userId })}
                    style={styles.addBtn}>
                    <Text style={{ color: '#000' }}>Add Task</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('StadisticsPage', { userId })}
                    style={[styles.addBtn, { backgroundColor: '#ECD662', }]}>
                    <Text style={{ color: '#000' }}>Stadistics</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userScreenContainer: {
        flex: 1,
        backgroundColor: '#ddd',
    },
    welcomeText: {
        color: '#fff',
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 20,
    },
    addBtn: {
        width: 150,
        backgroundColor: "#91C788",
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 50,
    }, btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 20,
    },
    searchBarContainer:{
        display:'flex',
        flexDirection:'row',
        // backgroundColor:'red',
        height:'10%',
        justifyContent:'space-around',
        paddingHorizontal:'7%',
        alignContent:'center',
        alignItems:'center',
    },
    searchBar:{
        backgroundColor:'#eee',
        width:'70%',
        height:'50%',
        borderRadius:10,
        paddingHorizontal:10,
        borderColor:'#616161',
        borderWidth:1,
    }
})

export default userScreen
