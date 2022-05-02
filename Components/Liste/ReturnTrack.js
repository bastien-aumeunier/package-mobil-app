import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Return = () => {

    const navigation = useNavigation()
    
    return(
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.global}>
            <Ionicons name="chevron-back-outline" size={30} color="black" />
            <Text style={styles.Text}>Retour</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    global: {
        paddingTop:45,
        paddingLeft: 10,
        flexDirection: 'row',
    },
    Text: {
        paddingTop:4,
        fontSize: 20, 
    }
})

export default Return