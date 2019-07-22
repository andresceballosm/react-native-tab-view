import React from 'react'
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native'

const LibrariesList = (props) => {
    if(props.libraries !== null){
        return (
            <FlatList
            data={props.libraries}
            keyExtractor={(_, i) => String(i)}
            renderItem={({item, index}) => renderItem(item, index)}
            />
        )
    } else {
        return  <ActivityIndicator size="small" color="#00ff00" />
    }
}

const renderItem = (item, index) => {
    return (
        <View style={styles.item}>
            <View style={styles.avatar}>
                <Text style={styles.letter}>
                { item.departamento.slice(0, 1).toUpperCase() }
                </Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.name}>{item.nombre_de_la_biblioteca}</Text>
                <Text style={styles.number}>{item.tel_fonos_de_contacto}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
    },
    avatar: {
      height: 36,
      width: 36,
      borderRadius: 18,
      backgroundColor: '#e91e63',
      alignItems: 'center',
      justifyContent: 'center',
    },
    letter: {
        color: 'white',
        fontWeight: 'bold',
    },
    details: {
        margin: 8,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
        alignSelf:'center', 
        marginRight:18,
    },
    number: {
        fontSize: 12,
        color: '#999',
    },
})

export { LibrariesList };
