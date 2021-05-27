import { IonButton, IonIcon } from "@ionic/react";
import React from "react";
import { locateOutline } from 'ionicons/icons';
import "./UserLocateButton.css"


const UserLocationButton =(props) => {

    const setMapLocation = () => {
        if (props.position) {
            props.mapRef.setView([props.position.latitude, props.position.longitude], 18);
        }
    }

    return(
        <IonButton id="locate-button" color="light" onClick={setMapLocation}>
            <IonIcon id="locate-icon" icon={locateOutline} />
        </IonButton>
    )
}

export default UserLocationButton;
