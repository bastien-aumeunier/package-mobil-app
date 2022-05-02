import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import { useState } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view'
import {useNavigation} from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Task from './Task'

const Swiper = (props) => {

    const navigation = useNavigation()
    
    const [isRefreshing, setIsRefreshing] = useState(false)

    const renderItem = (data) => {
        return(
            <TouchableWithoutFeedback
                key={`${data.item._id}`} 
                onPress={() => navigation.navigate('Colis', {data: data.item})} 
                >
                <View style={{backgroundColor: 'white', flex:1}}>    
                    <Task data={data.item}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    

    const renderHiddenItem = (data) => {
        return(
            <View style={styles.swiper}>
                <View></View>
                <TouchableOpacity onPress={() => removeTask(data.item)} style={[styles.buttons, styles.remove]}>
                    <Ionicons name='trash-bin-sharp' size={24} color='black' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editTask(data.item)} style={[styles.buttons, styles.edit]}>
                    <MaterialIcons name='edit' size={24} color='black' />
                </TouchableOpacity>
            </View>
        )
    }

    const removeTask = (task) => {
        props.removeTask(task)
    }

    const editTask = (task) => {
        props.viewUpdate(task)
    }

    const refresh = () => {
        props.refreshList(true)
    }

    return(
        <SwipeListView
            data={props.data}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            disableRightSwipe
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-150}
            closeOnRowBeginSwipe
            closeOnScroll
            onRefresh={refresh}
            refreshing={isRefreshing}
        />
    )

}

const styles = StyleSheet.create({
    buttons: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    edit: {
        backgroundColor: '#FFB74D',
        right: 75,
    },
    remove: {
        backgroundColor: '#F44336',
        right: 0,
    },
    swiper: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    },
    
})

export default Swiper