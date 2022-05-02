import {View, Text, StyleSheet, TouchableOpacity, TextInput, Switch} from 'react-native'
import {useEffect, useState} from 'react'

const Edit = (props) => {
        const task = props.data
        const [name, setName]= useState('')
        const [track, setTrack] = useState('')
        const [transport, setTransport] = useState('')
        const [postal, setPostal] = useState('')
        const [SwitchEnabled, setSwitchEnabled] = useState(false);

        

        const submitForm = async () => {
            var newTask = {
                name: name,
                track: track,
                transport: transport,
                postal: postal,
                etat: '',
                _id: task._id
            }
            if (newTask.name === '') {
                newTask.name = task.name
            }
            if (newTask.track === '') {
                newTask.track = task.track
            }
            if (newTask.transport === '') {
                newTask.transport = task.transport
            }
            if (newTask.postal === '') {
                newTask.postal = task.postal
            }
            if (SwitchEnabled) {
                newTask.etat = 'livré'
            } else {
                newTask.etat = 'en cours'
            }
            props.updateTask(newTask)
        }

        const postalView = () => {
            if(transport == 'Mondial Relay' || task.transport == 'Mondial Relay'){
                return(
                    <View style={styles.input}>
                        <TextInput 
                            placeholder={`   ${task.postal}`}
                            placeholderTextColor={'black'}
                            onChangeText={newPostal => setPostal(newPostal)}
                        />
                    </View>
                )
            }
        }

        const toggleSwitch = () => {
            if(SwitchEnabled== true){
              setSwitchEnabled(false)
            } else {
              setSwitchEnabled(true)
            }
          }

        const cancelUpdate= () => {
            props.updateTask(false)
        }

        const lookEtat = () => {
            if(task.etat == 'livré'){
                setSwitchEnabled(true)
            }else{
                setSwitchEnabled(false)
            }
        }

        useEffect(()=>{
            lookEtat()
        },[])

        return (
            <View style={styles.popup}>
                <Text style={styles.text}>Modifier un Colis</Text>
                <TextInput 
                    placeholder={`   ${task.name}`}
                    placeholderTextColor={'black'}
                    style={styles.input}  
                    onChangeText={newName => setName(newName)}
                />
                <TextInput 
                    placeholder={`   ${task.track}`}
                    placeholderTextColor={'black'}
                    style={styles.input}
                    onChangeText={newTrack => setTrack(newTrack)}
                />
                <TextInput 
                    placeholder={`   ${task.transport}`}
                    placeholderTextColor={'black'}
                    editable={false}
                    style={styles.input}
                    onChangeText={newTransport => setTransport(newTransport)}
                />
                {postalView()}
                <View style={styles.isShip}>
                    <Text style={styles.isShipText}>Livré </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8BC34A' }}
                        thumbColor={'#f4f3f4'}
                        ios_backgroundColor='#3e3e3e'
                        onValueChange={toggleSwitch}
                        value={SwitchEnabled}
                    />
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.annuler} onPress={cancelUpdate}><Text style={styles.textButton}>Annuler</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.add} onPress={submitForm}><Text style={styles.textButton}>Valider</Text></TouchableOpacity>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    popup: {
        backgroundColor: 'white',
        width: '75%',
        borderWidth: 3,
        borderRadius: 45,
        top: '30%',
        left: '12.5%',
        alignItems: 'center',
    },
    text:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input:{
        borderWidth: 1,
        borderColor: 'black',
        width: '80%',
        marginBottom: 10
    },
    button:{
        flexDirection: 'row',
        width:'100%',
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'space-around'
    },
    annuler:{
        backgroundColor: '#FFB74D',
        borderRadius: 45,
        padding: 10,
    },
    add:{
        backgroundColor: '#8BC34A',
        borderRadius: 45,
        padding: 10,
    },
    textButton:{
        textAlign: 'center',
        fontSize: 20
    },
    isShip:{
        flexDirection: 'row',
        width: '80%'
    },
    isShipText:{
        fontSize: 20,
        paddingTop: 5,
        marginRight: 10
    }
})

export default Edit