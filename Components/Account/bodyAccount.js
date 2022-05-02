import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import {API_IP} from '../../utils/Constante'
import { useEffect, useState } from 'react';
import AskRemove from'./askRemove'
import AskLogout from './askLogout';
import Info from './infoAccount'

const Body = () => {
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
            <Info UserInfo={UserInfo}/>
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

export default Body