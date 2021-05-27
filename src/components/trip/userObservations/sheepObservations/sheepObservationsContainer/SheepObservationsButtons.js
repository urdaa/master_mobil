import "./SheepObservationsButtons.css"
import {IonButton, IonIcon, IonItem, IonLabel, IonToggle} from "@ionic/react";
import {checkmark, close, help, pencil} from "ionicons/icons";
import React from "react";

const SheepObservationsButtons = (props) => {



    return(
        <div>
            <div className="buttons-div">
                <IonButton onClick={() => props.closeModalCleanup()} color="danger" size="large" fill="outline">
                    <IonIcon icon={close} slot="icon-only"/>
                </IonButton>
                <IonButton onClick={() => props.setShowInstructions(true)} color="warning" fill="outline">
                    <IonIcon icon={help} slot="icon-only"/>
                </IonButton>
                <IonButton
                    onClick={() => props.nextStageIfCountConsistent()}
                    size="large"
                    fill="outline">
                    <IonIcon icon={checkmark} slot="icon-only"/>
                </IonButton>
            </div>

            <div className="distance-toggle-div">
                <IonItem lines="none" className="distance-toggle-item">
                    <IonLabel>Nær observasjon: </IonLabel>
                    <IonToggle
                        checked={props.closeObservation}
                        onIonChange={e => props.setCloseObservation(e.detail.checked)}
                        color="dark"
                        disabled={false}/>
                </IonItem>

                <IonButton
                    onClick={() => props.setShowObservationNote(true)}
                    color="dark"
                    className="note-button"
                >
                    <IonIcon icon={pencil} slot="start"/>
                    Notat
                </IonButton>
            </div>
        </div>
    )
}

export default SheepObservationsButtons;
