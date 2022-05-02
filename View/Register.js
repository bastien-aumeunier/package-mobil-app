import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native';
import {API_IP} from '../utils/Constante'

const Register = () => {

    const navigation = useNavigation()

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [erreur, setErreur] = useState("")

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

    const passwordConfirmCheck = () => {
        if (password !== passwordConfirm) {
            setErreur("Les mots de passes ne correspondent pas")
            return false
        } else {
            return true
        }
    }

    const mailCheck = () => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(re.test(mail)) {
            return true
        } else { 
            setErreur("Votre adresse mail n'est pas valide")
            return false
        }
    }

    const allCheck = () => {
        if (mail === "" || password === "" || passwordConfirm === "" || nom === "" || prenom === "") {
            setErreur("Veuillez renseigner tous les champs")
            return false
        } else {
            return true
        }
    }


    const Register = async () => {
        if (allCheck()) {
            if (mailCheck()) {
                if (passwordConfirmCheck) {
                    const payload = {
                        nom: nom,
                        prenom: prenom,
                        mail: mail,
                        password: password
                    }
                    try {
                        await axios.post(`${API_IP}/auth/register`, payload)
                        navigation.navigate('Login')
                    } catch (error) {
                        if(error.response.status === 409) {
                            setErreur("Cette adresse mail est déjà utilisée")
                        } else {
                            setErreur("Une erreur est survenue")
                        }
                    }
                }
            }
            
        }        
    }

       return (
        <View style={styles.global}>
            <Text style={styles.title}>Package</Text>
            <View style={styles.form}>
                <Text style={styles.subTitle}>Register</Text>
                    {isErreur()}
                <TextInput placeholder='   Prénom'
                    placeholderTextColor={'black'}
                    style={styles.input}
                    onChangeText={newprenom => setPrenom(newprenom)}
                />
                <TextInput placeholder='   Nom'
                    placeholderTextColor={'black'}
                    style={styles.input}
                    onChangeText={nowNom => setNom(nowNom)}
                />
                <TextInput placeholder='   Email'
                    placeholderTextColor={'black'}
                    style={styles.input}
                    onChangeText={newMail => setMail(newMail)}
                />
                <TextInput placeholder='   Password'
                    placeholderTextColor={'black'}
                    style={styles.input}
                    onChangeText={newPassword => setPassword(newPassword)}
                />
                <TextInput placeholder='   Confirm Password'
                    placeholderTextColor={'black'}
                    style={styles.input}
                    onChangeText={newPasswordConfirm => setPasswordConfirm(newPasswordConfirm)}
                />
                <View style={styles.button}>
                    <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')}><Text style={styles.textButton}>Login</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.register} onPress={Register}><Text style={styles.textButton}>Register</Text></TouchableOpacity>
                </View>
            </View>
        </View>
       )
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
    login:{
        backgroundColor: '#FFB74D',
        borderRadius: 45,
        padding: 10,
    },
    register:{
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

export default Register