import {View, StyleSheet,Image} from "react-native"

const Loading = () => {

    return (
        <View style={styles.global}>
            <Image source={require('../../assets/loading.gif')} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    global: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        marginTop: -150,
        width: 150,
        height: 150,
    }
})

export default Loading