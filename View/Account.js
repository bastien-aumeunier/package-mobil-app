import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import {API_IP} from '../utils/Constante'
import { useEffect, useState } from 'react';
import AskRemove from'../Components/Account/askRemove'
import AskLogout from '../Components/Account/askLogout';

const Account = () => {

    const navigation = useNavigation()

    const [UserInfo, setUserInfo] = useState({})
    const [RemoveModalVisible, setRemoveModalVisible] = useState(false)
    const [LogoutModalVisible, setLogoutModalVisible] = useState(false)
    

    const deleteAccount = async () => {
        try {
            await axios.delete(`${API_IP}/api/account/${UserInfo.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const getUserInfo = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('InfoLogin')
            if (jsonValue !== null) {
                return JSON.parse(jsonValue)
            } else {
                return null
            }
        } catch(e) {
            console.log(e)
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('InfoLogin')
            navigation.navigate('Login')
        } catch(e) {
            console.log(e)
        }
    }

    const removeAccount = async (res) => {
        if(res){
            await deleteAccount()
            await logout()
        }
        setRemoveModalVisible(false)
    }
    const logoutAccount = async (res) => {
        if(res){
            await logout()
        }
        setLogoutModalVisible(false)
    }

    const askRemove = () => {
        setRemoveModalVisible(true)
    }

    const askLogout = () => {
        setLogoutModalVisible(true)
    }

    useEffect(async() => {
        setUserInfo(await getUserInfo())
    }, [])

    return (
        <View>
            <Modal 
                animationType="slide"
                transparent={true}
                visible={RemoveModalVisible}
                onRequestClose={() => {
                    setRemoveModalVisible(!RemoveModalVisible);
                }}> 
                    <AskRemove removeAccount={removeAccount}/>
            </Modal>
            <Modal 
                animationType="slide"
                transparent={true}
                visible={LogoutModalVisible}
                onRequestClose={() => {
                    setLogoutModalVisible(!LogoutModalVisible);
                }}> 
                    <AskLogout logoutAccount={logoutAccount}/>
            </Modal>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles().global}>
                <Ionicons name="chevron-back-outline" size={30} color="black" />
                <Text style={styles().RetourText}>Retour</Text>
            </TouchableOpacity>
            <View style={styles().Info}>
                <Text style={styles().Title}>Information du Compte</Text>
                <View style={styles().Line}>
                    <Text style={styles().PreText}>Prénom : </Text>
                    <Text style={styles().Text}>{UserInfo.prenom}</Text>
                </View>
                <View style={styles().Line}>
                    <Text style={styles().PreText}>Nom : </Text>
                    <Text style={styles().Text}>{UserInfo.nom}</Text>
                </View>
                <View style={styles().Line}>
                    <Text style={styles().PreText}>Mail : </Text>
                    <Text style={styles().Text}>{UserInfo.mail}</Text>
                </View>
            </View>
            <View style={styles().buttons}>
                <TouchableOpacity onPress={askLogout} style={styles('#8BC34A').button}>
                    <Text style={styles().buttonText}>Se déconnecter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={askRemove} style={styles('#FFB74D').button}>
                    <Text style={styles().buttonText}>Supprimer le compte</Text>
                </TouchableOpacity>
            </View>
         </View>
    )
}

const styles = (color) => StyleSheet.create({
    global: {
        paddingTop:45,
        paddingLeft: 10,
        flexDirection: 'row',
    },
    RetourText: {
        paddingTop:4,
        fontSize: 20, 
    },
    Info: {
        paddingTop:20,
        paddingLeft: 20,
    },
    Title:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    Line:{
        flexDirection: 'row',
        paddingVertical: 10,
    },
    PreText:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    Text:{
        fontSize: 15,
    },
    buttons:{
        width: '100%',
        alignItems: 'center',
    },
    button:{
        marginTop: 40,
        height: 50,
        width: '80%',
        backgroundColor: color,
        borderRadius: 90,
        justifyContent: 'center',
    },
    buttonText:{
        textAlignVertical: 'center',
        fontSize: 20,
        textAlign: 'center',
    },
})

export default Account