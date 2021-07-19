import React from 'react'
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native'
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import HomeScreen from './screens/homeScreen'
import RegisterScreen from './screens/registerScreen'
import UserScreen from './screens/userScreen'
import TaskPage from "./screens/taskPage";
import StadisticsPage from './screens/stadisticsPage';
import LogoUrl from './assets/Logo.png'
import LogoUrlInvert from './assets/LogoInvert.png'

const Stack = createStackNavigator()

const App = () => {

  const optionStyle = { headerStyle: { backgroundColor: '#DDDDDD', }, headerTitleStyle: { color: '#171717', }, headerTintColor: '#171717',}
  const optionStyleHome = {  headerStyle: { backgroundColor: '#DDDDDD' }, headerTitleStyle: { color: '#171717', }, headerTintColor: '#171717', headerLeft: () => (<LogoHome />) }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tasky" component={HomeScreen} options={optionStyleHome} ></Stack.Screen>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={optionStyle} ></Stack.Screen>
        <Stack.Screen name="UserScreen" component={UserScreen} options={{headerTintColor:'#eee',
          headerStyle: { backgroundColor: '#D54C4C' }, headerTitleStyle: { color: '#eee', }, marginLeft: 20, headerRight: () => (<UserExit />),
        }} ></Stack.Screen>
        <Stack.Screen name="TaskPage" component={TaskPage} options={optionStyle} ></Stack.Screen>
        <Stack.Screen name="StadisticsPage" component={StadisticsPage} options={optionStyle} ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const UserExit = () => {
  const navigation = useNavigation()
  const press = () => {
    navigation.popToTop()
  }
  return (
    <TouchableOpacity onPress={press}>
      <MaterialCommunityIcons style={styles.exitBtn} name="exit-to-app" size={24} color="#eee" />
    </TouchableOpacity>
  );
}
const LogoHome = () => {
  return (
    <Image
      style={{
        width: 40,
        height: 40,
        marginLeft: 20
      }}
      source={LogoUrl}
    />
  )
}
const styles = StyleSheet.create({
  exitBtn: {
    color: '#eee',
    marginRight: 20,
    // backgroundColor:'red',
  },headerViewLeft:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
  },arrowStyle:{
    alignSelf:'center',
    backgroundColor:'blue'
  }
})

export default App
