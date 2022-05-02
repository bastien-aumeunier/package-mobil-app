import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavSettings from './View/NavSettings'
import Login from './View/Login'
import Register from './View/Register'

const navTheme = {
  colors: {
    background: 'white',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
        <Stack.Navigator
                initialRouteName="Login" 
                screenOptions={{ headerShown: false, gestureEnabled: false}}
            >
                <Stack.Screen name="Nav" component={NavSettings} />
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>

            </Stack.Navigator>
    </NavigationContainer>
  )
  
}
const Stack = createNativeStackNavigator();

