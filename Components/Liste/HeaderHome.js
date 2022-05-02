import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';


const Header = () => {

    const navigation = useNavigation()

    return(
        <View style={styles.Global}>
            <Text style={styles.Text}>Packages</Text>
            <TouchableOpacity style={styles.Touchable} onPress={() => navigation.navigate('Account') }>
                <MaterialIcons name="account-circle" size={40} color="black" />
            </TouchableOpacity>
            <View style={{flex: 1}}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    Global: {
        paddingTop:40,
        width:'100%',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        flexDirection: 'row',
        padding: 0,
        paddingBottom: 5
    },
    Text : {
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',
        flex:8,
        paddingLeft:10,
    },
    Touchable: {
        flex:1,
        justifyContent: 'center'
    }
})

export default Header