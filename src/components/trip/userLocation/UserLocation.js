import {useEffect, useRef} from "react";
import L from 'leaflet';


const UserLocation =(props) => {
    const positionMarkerRef = useRef({positionPoint: null, accuracyCircle: null})

    useEffect( () => {
        // Creates marker and accuracy circle and adds to map
        if(props.position && positionMarkerRef.current.positionPoint === null) {
            let positionIcon = L.icon({
                iconUrl: './assets/user_icon.png',
                iconSize: [15, 15],
                iconAnchor: [7, 7]
            })
            positionMarkerRef.current.positionPoint = L.marker([props.position.latitude, props.position.longitude], {icon: positionIcon})
                .addTo(props.mapRef);
            positionMarkerRef.current.accuracyCircle = L.circle([props.position.latitude, props.position.longitude], props.position.accuracy / 2)
                .addTo(props.mapRef);
        }// Updates marker and accuracy circle
        else if (props.position) {
            positionMarkerRef.current.positionPoint.setLatLng([props.position.latitude, props.position.longitude]);
            positionMarkerRef.current.accuracyCircle.setLatLng([props.position.latitude, props.position.longitude]);
            positionMarkerRef.current.accuracyCircle.setRadius(props.position.accuracy / 2)
        }//Remove stuff if trip is paused or stopped
        else if (props.position === undefined && positionMarkerRef.current.positionPoint !== null) {
            positionMarkerRef.current.positionPoint.removeFrom(props.mapRef);
            positionMarkerRef.current.accuracyCircle.removeFrom(props.mapRef);
            positionMarkerRef.current.positionPoint = null;
            positionMarkerRef.current.accuracyCircle = null;
        }
    },[props.position, props.mapRef])

    return null;
}

export default UserLocation;
