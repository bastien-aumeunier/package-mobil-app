import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home'
import Colis from './Package'
import Account from './Account'

const Stack = createNativeStackNavigator();



const NavSettings = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Home" 
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Colis" component={Colis}/>
            <Stack.Screen name="Account" component={Account}/>
        </Stack.Navigator>
    )
}



export default NavSettings