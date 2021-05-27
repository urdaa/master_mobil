import L from "leaflet";
import {Marker} from "react-leaflet";
import React from "react";
import "./StartAndFinishIcons.css"

const startIcon = new L.Icon({
    iconUrl: "./assets/start.png",
    iconAnchor: [14, 14],
    popupAnchor: [0, 0],
    iconSize: [28, 28],
    className: "start-and-finish-icon"
});

const finishIcon = new L.Icon({
    iconUrl: "./assets/finish.png",
    iconAnchor: [14, 14],
    popupAnchor: [0, 0],
    iconSize: [28, 28],
    className: "start-and-finish-icon"
});

const StartAndFinishIcons = (props) => {

    const getIcons = () => {
        if (props.positions.length >= 2 && props.tripType === "finishedTrip") {
            return(
                <div>
                    <Marker
                        icon={startIcon}
                        position={[props.positions[0].latitude, props.positions[0].longitude]}/>
                    <Marker
                        icon={finishIcon}
                        position={[props.positions[props.positions.length - 1].latitude, props.positions[props.positions.length - 1].longitude]}/>
                </div>
            )
        } else if (props.positions.length >= 1) {
            return(
                <Marker
                    icon={startIcon}
                    position={[props.positions[0].latitude, props.positions[0].longitude]}/>
            )
        }
    }

    return(
        <div>
            {getIcons()}
        </div>
    )
}

export default StartAndFinishIcons;
