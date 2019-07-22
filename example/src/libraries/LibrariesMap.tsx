import React from 'react';
import MapView from 'react-native-maps';
import { ActivityIndicator, View } from 'react-native'

const Marker = MapView.Marker;

export const LibrariesMap = (props) => {
    if(props.libraries !== null) {
        return (
            <MapView style={{flex: 1}} >
                { renderMarkers(props.libraries) }
            </MapView>
        );
    } else {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <ActivityIndicator size="small" color="#666c70" />
            </View>
        )  
    }   
}

const renderMarkers = (libraries) => {
    return libraries.map((place, i) => (
      <Marker key={i} title={place.nombre_de_la_biblioteca} coordinate={coords(place.georeferencia)} />
    ))
}

const coords = (coords) => {
    const coordsArray = coords.split(",")
    const latitude = parseFloat(coordsArray[0].slice(1,10))
    const longitude = parseFloat(coordsArray[1].slice(0, 10))
    const coord = {latitude:latitude, longitude:longitude}
    return coord
}