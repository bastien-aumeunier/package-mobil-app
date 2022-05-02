import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {useState} from 'react'

const Create = (props) => {

    const [name, setName]= useState("")
    const [track, setTrack] = useState("")
    const [transport, setTransport] = useState("Colissimo")
    const [postal, setPostal] = useState("33000")
    const [Erreur, setErreur] = useState("")


    const submitForm = async () => {
        if (!(name === "" || track === "" || transport === "")) {
            var task = {
                name: name,
                track: track,
                transport: transport,
                postal: postal,
                etat:'en cours',
            }
            props.createTask(task)
        } else {
            setErreur("Veuillez remplir tous les champs")
        }
    }


    const postalView = () => {
        if(transport == 'Mondial Relay'){
            return(
                <View style={styles.input}>
                    <TextInput placeholder='Code Postal'
                        onChangeText={newPostal => setPostal(newPostal)}
                        placeholderTextColor={'black'}
                    />
                </View>
            )
        }
    }

    const cancelCreate = () => {
        props.createTask(false)
    }


    return (
            <View style={styles.popup}>
                <Text style={styles.text}>Ajouter un Colis</Text>
                <Text style={styles.Erreur}>{Erreur}</Text>
                <TextInput placeholder='  Nom' 
                        placeholderTextColor={'black'}
                        style={styles.input}  
                        onChangeText={newName => setName(newName)}
                        />
                <TextInput placeholder='  TrackId' 
                        placeholderTextColor={'black'}
                        style={styles.input}
                        onChangeText={newTrack => setTrack(newTrack)}
                        />
                <TextInput placeholder='  Colissimo'
                        placeholderTextColor={'black'}
                        editable={false}
                    style={styles.input}
                    onChangeText={newTransport => setTransport(newTransport)}
                    />
                {postalView()}
                <View style={styles.button}>
                    <TouchableOpacity style={styles.annuler} onPress={cancelCreate}><Text style={styles.textButton}>Annuler</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.add} onPress={submitForm}><Text style={styles.textButton}>Ajouter</Text></TouchableOpacity>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    Erreur: {
        color: 'red',
        fontSize: 15,
    },
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
    }


})

export default Create