import {View, Text, StyleSheet} from 'react-native'

const StepShip = ({data}) => {
    const newDate = data.date.split('+')
    return (
        <View style={styles.global}>
        <Text style={styles.Text}>{data.label}</Text>
        <Text style={styles.Date}>{newDate[0]}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    global:{
        width:'100%',
        borderBottomWidth: 1,
        paddingLeft: 10,
    },
    Text:{
        paddingTop: 5,
        fontSize: 20,
    },
    Date:{
        color: '#BDBDBD',
        textAlign:'right',
        fontWeight: 'bold',
    }
})

export default StepShip