import {Popup} from "react-leaflet";
import React from "react";
import "./PopupButtonRow.css"
import {IonButton, IonIcon} from "@ionic/react";
import {trashOutline} from "ionicons/icons";

const PopupButtonRow = (props) => {

    return(
        <div>
            {props.tripIsActive ?
                <div className="popup-obs-button-row">
                    <IonIcon className="trash-icon" onClick={() => props.deleteObservation(props.timeStamp)} icon={trashOutline}/>
                    <IonButton onClick={() => props.openCorrectionModal(props.timeStamp, props.observation)}>Endre</IonButton>
                </div>
                :
                null
            }
        </div>
    )
}

export default PopupButtonRow;
