import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Alert, Button } from 'react-native'
import { registerUser } from "../components/api";

var width = Dimensions.get('window').width;

const registerScreen = ({ navigation, route }) => {
    const [newUser, onChangeNewUser] = React.useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const alertPassword = () => {
        Alert.alert('Passwords dont match')
        window.alert('Passwords dont match')
    }
    const handleChange = (name, value) => onChangeNewUser({ ...newUser, [name]: value });
    const handleSubmit = async () => {
        if (newUser.password != newUser.confirmPassword) {
            console.log('error');
            return alertPassword()
        }
        try {
            await registerUser(newUser);
            console.log('Fetching c:');
            navigation.navigate("Tasky", { succes: 'You account was created succesfully!!'});
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.formContainer} >
            <View style={styles.form}>
                <Text style={styles.label}>Register Username</Text>
                <TextInput
                    placeholderTextColor="#eee"
                    style={styles.input}
                    value={newUser.username}
                    onChangeText={(text) => handleChange('username', text)}
                    placeholder="Username"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholderTextColor="#eee"
                    secureTextEntry={true}
                    style={styles.input}
                    value={newUser.password}
                    onChangeText={(text) => handleChange('password', text)}
                    placeholder="Password"
                />
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    placeholderTextColor="#eee"
                    secureTextEntry={true}
                    style={styles.input}
                    value={newUser.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                    placeholder="Confirm Password"
                />
            </View>
            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.formButton}
            >
                <Text style={{ color: '#fff' }}>Crear Cuenta</Text>
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
        borderColor: '#ffffff82',
        color: '#fff',
    },
    formContainer: {
        flex: 1,
        marginTop: -80,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: width,
        margin: 'auto',
        backgroundColor: '#D54C4C',
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
        backgroundColor: '#30475E',
        color: '#fff',
        borderRadius: 50,
        width: 150,
    },
    label: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 5,
        marginTop: 5,
    }
});
export default registerScreen
