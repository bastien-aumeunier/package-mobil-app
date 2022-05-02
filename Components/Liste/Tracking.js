import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import StepShip from './StepShip'
import Error from './TrackError'
import Loading from './Loading'
import {API_IP} from '../../utils/Constante'

const Track = ({task}) => {
    const [Data, setData] = useState({})
    const [Erreur, setErreur] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const getTrack = async () => {
        try {
            let req = await axios.get(`${API_IP}/api/track/${task._id}`)
            return req.data
        } catch (error) {
            console.log(error)
        }
    }

    const openBrowser = async () => {
        await WebBrowser.openBrowserAsync(`https://www.laposte.fr/outils/suivre-vos-envois?code=${task.track}`)
    }

    useEffect(async() => {
        let req = await getTrack()
        if(typeof req === 'string'){
            setErreur(req)
        } else {
            setData(req)
        }
        setIsLoading(false)
    },[])

    if(isLoading) {
        return (
            <Loading />
        )
    }
    if (Erreur) {
        return (
            <Error data={Erreur}/>
        )            
    } else {
        return (
            <View style={styles.global}>
                <View>
                    <View style={styles.headerText}>
                        <Text style={styles.name}>{task.name}</Text>
                        <TouchableOpacity style={styles.trackButton} onPress={openBrowser}>   
                            <Text style={styles.track}>{task.track}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.body}>
                    {Data.step.map((step, index) => {
                        return(
                            <View key={index}>
                                <StepShip data={step}/>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    name:{
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 25,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    }, 
    headerText:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        borderBottomWidth: 2,
        paddingBottom: 10,
    },
    track: {
        paddingTop: 8,
        color: '#BDBDBD',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    body:{
        marginTop: 10,
    },
})

export default Track