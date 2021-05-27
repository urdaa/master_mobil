import {IonButton, IonIcon} from "@ionic/react";
import {close, pause, stop} from "ionicons/icons";
import React from "react";
import "./TripStatusButtons.css"
import {walk} from "ionicons/icons";


const TripStatusButtons = (props) => {
    return(
        <div>
            { props.tripIsActive ?
                <div>
                    <IonButton
                        onClick={() => props.setShowQuitAlert(true)}
                        color="danger"
                        id="stop-button"
                    >
                        <IonIcon icon={close} slot="icon-only" className="stop-trip-icon"/>

                    </IonButton>
                </div>
                :
                props.tripType !== "unfinishedTrip" ?

                    <IonButton
                        onClick={() => props.startTrip()}
                        id="start-button"
                        color="light"
                        size="large"
                    >
                        <IonIcon icon={walk} slot="start"/>
                        Start Oppsynstur
                    </IonButton>
                    :
                    <div>
                        <IonButton
                            onClick={() => props.continueTrip()}
                            id="continue-button"
                            color="light"
                        >
                            Fortsett Oppsynstur
                        </IonButton>

                        <IonButton
                            onClick={() => props.setShowQuitAlert(true)}
                            id="finish-button"
                            color="dark"
                        >
                            Avslutt tur
                        </IonButton>
                    </div>
            }
        </div>
    )
}

export default TripStatusButtons;
