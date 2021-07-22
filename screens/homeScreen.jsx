import React, { useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { getUser} from "../components/api";

const HomeScreen = ({ navigation, route }) => {
    const [logUser, setLogUser] = React.useState({
        username: "",
        password: "",
    });
    useEffect(() => {
        if (route.params && route.params.goBack) {
            setLogUser({ username: '', password: '', })
        }
        if (route.params && route.params.succes) {
            Alert.alert(route.params.succes)
            route.params.succes = null
        }
    })
    const loginPress = () => {
        getUser(logUser.username, logUser.password,navigation)
        setLogUser({username:'',password:''})
    }
    const registerPress = ()=>{
        setLogUser({username:'',password:''})
        navigation.navigate('RegisterScreen')
    }
    const handleChange = (name, value) => setLogUser({ ...logUser, [name]: value });

    return (
        <View style={styles.formContainer} >
            <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => { handleChange('username', text) }}
                    value={logUser.username}
                    placeholderTextColor="#eee"
                    placeholder="Username"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    placeholderTextColor="#eee"
                    style={styles.input}
                    onChangeText={(text) => { handleChange('password', text) }}
                    value={logUser.password}
                    placeholder="Password"
                />
            </View>
            <TouchableOpacity
                onPress={()=>loginPress()}
                style={styles.formButton}
            >
                <Text style={{ color: '#eee' }}>Iniciar Sesion</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => registerPress()}
                style={styles.formButton}
            >
                <Text style={{ color: '#eee' }}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        textAlign: 'center',
        borderRadius: 5,
        borderColor: '#171717',
        color: '#eee',
    },
    formContainer: {
        flex: 1,
        marginTop: -100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 'auto',
        backgroundColor: '#F05454',
    },
    form: {
        textAlign: 'center',
        alignItems: 'center',
    },
    formButton: {
        marginTop: 30,
        padding: 5,
        paddingVertical:10,
        alignItems: 'center',
        backgroundColor: '#8D2828',
        borderColor: '#8D2828',
        borderWidth: 1,
        borderRadius: 50,
        width: 150,
    },
    label: {
        fontSize: 18,
        color: '#eee',
        marginBottom: 5,
        marginTop: 5,
    }
});
export default HomeScreen

