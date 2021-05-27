import "./OtherObservationButtons.css"
import {IonButton, IonIcon} from "@ionic/react";
import {checkmark, close, help} from "ionicons/icons";
import React from "react";

const OtherObservationButtons = (props) => {

    return(
        <div className="other-obs-buttons-div">
            <IonButton onClick={() => props.closeModalCleanup()} color="danger" size="large" fill="outline">
                <IonIcon icon={close} slot="icon-only"/>
            </IonButton>
            <IonButton onClick={() => props.setShowInstructions(true)} color="warning" fill="outline">
                <IonIcon icon={help} slot="icon-only"/>
            </IonButton>
            <IonButton
                onClick={() => props.registerObservation()}
                size="large"
                fill="outline">
                <IonIcon icon={checkmark} slot="icon-only"/>
            </IonButton>
        </div>
    )
}

export default OtherObservationButtons;
