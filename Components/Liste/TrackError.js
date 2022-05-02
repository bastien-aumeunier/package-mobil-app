import {View, Text, StyleSheet} from "react-native"


const Error = ({data}) => {

    return (
        <View style={styles.global}>
            <Text style={styles.text}>{data}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    global: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems:'center'
    },
    text:{
        marginTop: '-30%',
        fontSize: 25,
        textAlign: 'center',
    }
})

export default Error