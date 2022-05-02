import {View} from 'react-native';
import Return from '../Components/Liste/ReturnTrack'
import Track from '../Components/Liste/Tracking'


const Colis = ({route}) => {
    return(
        <View>
            <Return />
            <Track task={route.params.data}/>
        </View>
    )
}

export default Colis;