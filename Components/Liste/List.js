import {View, Text, StyleSheet, TouchableOpacity, Modal, Switch} from 'react-native'
import {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import Loading from './Loading'
import Create from './Create'
import Swiper from './Swiper'
import Edit from './Edit'
import {API_IP} from '../../utils/Constante'

const List = () => {

    const [CreateModalVisible, setCreateModalVisible] = useState(false)
    const [UpdateModalVisible, setUpdateModalVisible] = useState(false)
    const [EditTask, setEditTask] = useState()
    const [verifChange, setVerifChange] = useState(false)
    const [Data, setData] = useState([{}])
    const [isLoading, setIsLoading] = useState(true)
    const [Erreur, setErreur] = useState('')
    const [UserInfo, setUserInfo] = useState({})
    const [getUserInfo, setGetUserInfo] = useState(false)
    const [filtreEnabled, setFiltreEnabled] = useState(false)
    const [filtreCoursEnable, setFiltreCoursEnable] = useState(false)
    const [filtreLivreEnable, setFiltreLivreEnable] = useState(false)



    const getTask = async () => {
        try {
            let req = await axios.get(`${API_IP}/api/colis/user/${UserInfo.id}`)
            return filtreTask(req.data)
        } catch (error) {
            console.log(error)
        }
    }

    const removeTask = async (task) => {
        try {
            await axios.delete(`${API_IP}/api/colis/${task._id}`)
            setVerifChange(false)
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async (task) => {
        if (typeof task === 'object') {
            var payload = {
                name: task.name,
                track: task.track,
                transport: task.transport,
                postal: task.postal,
                etat:'en cours',
                idUser: UserInfo.id
            }
            try { 
                await axios.post(`${API_IP}/api/colis`,payload) 
                setVerifChange(false)
            } catch (e) {
                console.log(e)
            }
        }    
        setCreateModalVisible(false)
    }

    const updateTask = async (task) => {
        if (typeof task === 'object') {
            var payload = {
                name: task.name,
                track: task.track,
                transport: task.transport,
                postal: task.postal,
                etat:task.etat,
                idUser: UserInfo.id
            }
            try { 
                await axios.patch(`${API_IP}/api/colis/${task._id}`,payload) 
                setVerifChange(false)
            } catch (e) {
                console.log(e)
            }
        }    
        setUpdateModalVisible(false)
    }

    const getUserData = async () => {
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

    const filtreTask = async (tasks) => {
        if(filtreLivreEnable){
            return tasks.filter(task => task.etat === 'livré') 
        } else if (filtreCoursEnable) {
            return tasks.filter(task => task.etat === 'en cours')
        }else {
            return tasks
        }
    }

    const viewUpdate = (task) => {
        setEditTask(task)
        setUpdateModalVisible(true)
    }

    const refreshList = async () => {
        setVerifChange(false)
    }

    const toggleFiltre = () => {
        if(filtreEnabled== true){
            setFiltreEnabled(false)
            setFiltreLivreEnable(false)
            setFiltreCoursEnable(false)
            setVerifChange(false)
        } else {
            setFiltreEnabled(true)
            setVerifChange(false)
        }
      }

      const toggleLivre = () => {
        if(filtreLivreEnable== true){
            setVerifChange(false)
            setFiltreLivreEnable(false)
        } else {
            setFiltreCoursEnable(false)
            setFiltreLivreEnable(true)
            setVerifChange(false)
        }
      }

      const toggleCours = () => {
        if(filtreCoursEnable== true){
            setVerifChange(false)
            setFiltreCoursEnable(false)
        } else {
            setFiltreCoursEnable(true)
            setFiltreLivreEnable(false)
            setVerifChange(false)
        }
      }

      const viewFilter = () => {
          if(filtreEnabled){
              return(
                <View style={styles.globalFilter}>
                    <View style={styles.Filter}>
                        <Text style={styles.text}>Livré : </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#8BC34A' }}
                            thumbColor={'#f4f3f4'}
                            ios_backgroundColor='#3e3e3e'
                            onValueChange={toggleLivre}
                            value={filtreLivreEnable}
                        />
                    </View>
                    <View style={styles.Filter}>
                        <Text style={styles.text}>En Cours : </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#8BC34A' }}
                            thumbColor={'#f4f3f4'}
                            ios_backgroundColor='#3e3e3e'
                            onValueChange={toggleCours}
                            value={filtreCoursEnable}
                        />
                    </View>
                </View>
              )
          }
      }

    
    useEffect(async()=> {
        if(getUserInfo === false) {
            setUserInfo(await getUserData())
            setGetUserInfo(true)
        }
        if(!verifChange){
            let req = await getTask()
            if(typeof req === 'string'){
                setErreur(req)
            } else {
                setData(req)
            }
            setIsLoading(false)
            setVerifChange(true)
        }
    })



    if(isLoading) {
        return (
            <Loading />
        )
    }
    if (!Data) {
        return (
            <Error data={Erreur}/>
        )            
    } else {
        return (
            <View style={styles.global}>
                <Modal 
                animationType="slide"
                transparent={true}
                visible={CreateModalVisible}
                onRequestClose={() => {
                    setCreateModalVisible(!CreateModalVisible);
                }}> 
                    <Create createTask={createTask}/>
                </Modal>
                <Modal 
                animationType="slide"
                transparent={true}
                visible={UpdateModalVisible}
                onRequestClose={() => {
                    setUpdateModalVisible(!UpdateModalVisible);
                }}> 
                    <Edit updateTask={updateTask} data={EditTask}/>
                </Modal> 
                <View style={styles.header}>
                    <View style={styles.FirstHeader}>
                        <Text style={styles.text}>Livraisons :</Text>
                        <TouchableOpacity onPress={() => setCreateModalVisible(!CreateModalVisible)}>
                            <Ionicons name="add-circle-outline" size={35} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.SecondHeader}>
                        <Text style={styles.text}>Filtre :</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#8BC34A' }}
                            thumbColor={'#f4f3f4'}
                            ios_backgroundColor='#3e3e3e'
                            onValueChange={toggleFiltre}
                            value={filtreEnabled}
                        />
                    </View>   
                </View>
                {viewFilter()}
                <Swiper data={Data} removeTask={removeTask} viewUpdate={viewUpdate} refreshList={refreshList}/>
            </View>
        )
    }

}  


const styles = StyleSheet.create({
    global: {
        height: '100%',
    },
    header:{
        paddingVertical: 10,
        borderBottomWidth: 2,
    },
    text:{
        fontSize: 25,
        paddingRight: 15,
        justifyContent: 'center',
        paddingLeft: 25,
    },
    Filter:{
        flexDirection: 'row',
        paddingVertical: 10,
    },
    FirstHeader:{
        flexDirection: 'row',
    },
    SecondHeader:{
        paddingTop: 10,
        flexDirection: 'row',
    },
    globalFilter:{
        borderBottomWidth: 1,
    }
})

export default List
