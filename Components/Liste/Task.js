import {View, Text, StyleSheet} from 'react-native'

const Task = ({data}) => {

    const setEtat = (task) => {
        if (task.etat == 'livré') {
            return(
                <View style={styles('#8BC34A').etat}>
                    <Text style={styles().etatText}>{task.etat}</Text>
                </View>
            )
        } else {
            return(
                <View style={styles('#FFB74D').etat}>
                    <Text >{task.etat}</Text>
                </View>
            )
        }
    }

    return (
        <View style={styles().task}>
            <View>   
                <Text style={styles().name}>{data.name}</Text>
                <Text>{data.track}</Text>
            </View>
            {setEtat(data)}
        </View>
    )
}

const styles = (color) => StyleSheet.create({
    task:{
        borderBottomWidth: 1,
        height: 60,
        width:'100%',
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    etat:{
        backgroundColor: color ,
        width: '18%',
        alignItems: 'center',
        marginRight: 5,
        height: 20,
        borderRadius: 90,
    },
    etatText:{
        paddingTop:1.5,
    }
})

export default Task