import {View, Text, StyleSheet} from 'react-native'

const Info = (props) => {
    const UserInfo = props.UserInfo

    return(
        <View style={styles.Info}>
            <Text style={styles.Title}>Information du Compte</Text>
            <View style={styles.Line}>
                <Text style={styles.PreText}>Prénom : </Text>
                <Text style={styles.Text}>{UserInfo.prenom}</Text>
            </View>
            <View style={styles.Line}>
                <Text style={styles.PreText}>Nom : </Text>
                <Text style={styles.Text}>{UserInfo.nom}</Text>
            </View>
            <View style={styles.Line}>
                <Text style={styles.PreText}>Mail : </Text>
                <Text style={styles.Text}>{UserInfo.mail}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
})

export default Info