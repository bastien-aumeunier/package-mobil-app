import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
import {API_IP} from '../utils/Constante'
import Loading from '../Components/Liste/Loading'


const Login = () => {
    const navigation = useNavigation()

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [erreur, setErreur] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()


    const setData = async (value) => {
        try {
          await AsyncStorage.setItem('UserInfo', JSON.stringify(value))
        } catch (e) {
          console.log(e)
        }
    }

    
    const getData = async () => {
        try {
            const req = await AsyncStorage.getItem('UserInfo')
            if (req !== null) {
                setUser(JSON.parse(req))
                return true
            } else {
                return false
            }
        } catch(e) {
            console.log(e)
        }
    }
  

    const isErreur = () => {
        if (erreur !== "") {
            return (
                <Text style={styles.erreur}>{erreur}</Text>
            )
        } else {
            return(
                <Text></Text>
            )
        }
    }


    const login = async () => {
        const payload = {
            mail: mail,
            password: password
        }
        try {
            setLoading(true)
        let tata = await axios.post(`${API_IP}/auth/login`, payload)
            await setData(tata.data)
            setLoading(false)
            navigation.navigate('Nav')
        } catch (error) {
            if(error.response.status === 403) {
                setErreur("Identifiants incorrects")
            } else {
                setErreur("Une erreur est survenue")
            }
            setLoading(false)

        }
    }


    useEffect(async() => {
        setLoading(true)
        if(await getData() !== false) {
            navigation.navigate('Nav')
        }
        setLoading(false)
    },[])


    if(loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <View style={styles.global}>
                <Text style={styles.title}>Package</Text>
                <View style={styles.form}>
                    <Text style={styles.subTitle}>Login</Text>
                    {isErreur()}
                    <TextInput placeholder='   Email'
                        placeholderTextColor={'black'}
                        style={styles.input}
                        onChangeText={newMail => setMail(newMail)}
                    />
                    <TextInput placeholder='   Password'
                        secureTextEntry={true}
                        placeholderTextColor={'black'}
                        style={styles.input}
                        onChangeText={newPassword => setPassword(newPassword)}
                    />
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('Register')}><Text style={styles.textButton}>Register</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.login} onPress={login}><Text style={styles.textButton}>Login</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    global:{
        alignItems: 'center',
    },
    title:{
        fontSize: 36,
        textAlign: 'center',
        marginTop: '30%'
    },
    form:{
        marginTop: '7%',
        width: '80%',
        borderColor: 'black',
        borderWidth: 3,
        alignItems: 'center',
    },
    subTitle:{
        fontSize: 25,
    },
    input:{
        borderWidth: 1,
        borderColor: 'black',
        width: '80%',
        marginVertical: 10,
        fontSize: 15
    },
    button:{
        flexDirection: 'row',
        width:'100%',
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'space-around'
    },
    register:{
        backgroundColor: '#FFB74D',
        borderRadius: 45,
        padding: 10,
    },
    login:{
        backgroundColor: '#8BC34A',
        borderRadius: 45,
        padding: 10,
    },
    textButton:{
        textAlign: 'center',
        fontSize: 20
    },
    erreur:{
        backgroundColor: 'red',
        color: 'white',
        fontSize: 15,
        padding: 5,
    }
})

export default Login