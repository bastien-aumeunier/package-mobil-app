import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'


const AskLogout = (props) => {

    return (
        <View style={styles().popup}>
            <Text style={styles().Title}>Déconnection</Text>
            <Text style={styles().Text}>Voulez-vous vraiment vous deconnecter ?</Text>
            <View style={styles().modalButtons}>
                <TouchableOpacity style={styles('#FFB74D').modalButton} onPress={() => props.logoutAccount(false)}>
                    <Text style={styles().buttonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles('#8BC34A').modalButton} onPress={() => props.logoutAccount(true)}>
                    <Text style={styles().buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = (color) => StyleSheet.create({
    popup: {
        backgroundColor: 'white',
        width: '75%',
        borderWidth: 3,
        borderRadius: 45,
        top: '30%',
        left: '12.5%',
        alignItems: 'center',
    },
    modalButtons:
    {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        height: 40,
        backgroundColor: color,
        borderRadius: 90,
        width:'35%',
    },
    Title:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    Text:{
        fontSize: 15,
    },
    buttonText:{
        paddingTop: 7,
        textAlignVertical: 'center',
        fontSize: 16,
        textAlign: 'center',
    },
})


export default AskLogout