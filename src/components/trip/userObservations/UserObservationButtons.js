import {IonButton, IonFab, IonFabButton, IonFabList, IonIcon} from "@ionic/react";
import {add} from "ionicons/icons";
import React, { useState} from "react";
import "./UserObservationButtons.css"


const UserObservationButtons = (props) => {
    const [registeringObservation, setRegisteringObservation] = useState(false);
    const [activeRegistrationType, setActiveRegistrationType] = useState();

    const setActiveRegistration = (typeSetter) => {
        setRegisteringObservation(true);
        typeSetter();
    }

    const openActiveRegistration = () => {
        if (activeRegistrationType === props.observationType.SHEEP) {
            props.openSheepObservations();
        }
        else if (activeRegistrationType === props.observationType.MISC) {
            props.setShowMiscObservations(true);
        }
        else if (activeRegistrationType === props.observationType.DEAD) {
            props.setShowDeadObservations(true);
        }
        else if (activeRegistrationType === props.observationType.PREDATOR) {
            props.setShowPredatorObservations(true);
        }
        else if (activeRegistrationType === props.observationType.WOUNDED) {
            props.setShowWoundedObservations(true);
        }
        setRegisteringObservation(false);
    }

    const getUserObservationButtons = () => {
        if(!props.tripIsActive) {
            return null;
        }

        if (registeringObservation) {
            return(
                <div>
                    <img src="./assets/target.png" className="observation-cross"/>

                    <IonButton
                        onClick={() => openActiveRegistration()}
                        id="confirm-button"
                        color="light"
                    >
                        Bekreft posisjon
                    </IonButton>

                    <IonButton
                        onClick={() => setRegisteringObservation(false)}
                        id="cancel-button"
                        color="dark"
                    >
                        Avbryt
                    </IonButton>
                </div>
            )
        }
        else {
            return(
                <div>
                    <IonButton
                        onClick={() => setActiveRegistration(() => setActiveRegistrationType(props.observationType.SHEEP))}
                        id="register-button"
                        slot="icon-only"
                        disabled={!props.position}
                    >
                        <img src="./assets/white_sheep_flipped.png" className="register-sheep"/>
                    </IonButton>

                    <IonFab className="observation-buttons-fab" >
                        <IonFabButton disabled={!props.position}>
                            <IonIcon icon={add} />
                        </IonFabButton>

                        <IonFabList side="top">
                            <IonFabButton
                                className="bigger-fab-button"
                                onClick={() => setActiveRegistration(() => setActiveRegistrationType(props.observationType.DEAD))}
                            >
                                <img src="./assets/death.png" />
                            </IonFabButton>

                            <IonFabButton
                                className="bigger-fab-button"
                                onClick={() => setActiveRegistration(() => setActiveRegistrationType(props.observationType.WOUNDED))}
                            >
                                <img src="./assets/wounded.png" />
                            </IonFabButton>

                            <IonFabButton
                                className="bigger-fab-button"
                                onClick={() => setActiveRegistration(() => setActiveRegistrationType(props.observationType.PREDATOR))}
                            >
                                <img src="./assets/predator_footprint.png" />
                            </IonFabButton>

                            <IonFabButton
                                className="bigger-fab-button"
                                onClick={() => setActiveRegistration(() => setActiveRegistrationType(props.observationType.MISC))}
                            >
                                <img src="./assets/questionmark.png" />
                            </IonFabButton>
                        </IonFabList>

                        <IonFabList side="end" >
                            <IonFabButton
                                className="bigger-fab-button"
                                onClick={() => console.log("ball")}
                            >
                                <img src="./assets/options.png" />
                            </IonFabButton>
                        </IonFabList>
                    </IonFab>
                </div>
            )
        }
    }

    return getUserObservationButtons();
}

export default UserObservationButtons;
