import "./MiscObservations.css"
import {
    IonAlert, IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonItemDivider,
    IonTextarea,
} from "@ionic/react";
import React, {useCallback, useEffect, useState} from "react";
import OtherObservationButtons from "../sharedComponents/OtherObservationButtons";

const MiscObservations = (props) => {
    const [showInstructions, setShowInstructions] = useState(false);
    const [note, setNote] = useState()

    //Sets state to match observation to be modified (If it is a correction operation)
    useEffect(() => {
        if(!props.correctionObservation.observation || props.correctionObservation.observation.observationType !== props.observationType.MISC) {
            return;
        }
        setNote(props.correctionObservation.observation.note);
    },[props.correctionObservation])

    //Causes hardware back-button to close modal
    useEffect( () => {
        if (props.isOpen) {
            document.addEventListener('ionBackButton', closeModalWithBackButton);
        } else {
            document.removeEventListener('ionBackButton', closeModalWithBackButton);
        }
    }, [props.isOpen])
    const closeModalWithBackButton = useCallback((event) => {
        event.detail.register(1001, () => {
            closeModalCleanup();
        });
    }, []);

    const closeModalCleanup = () => {
        setNote("");
        props.setIsOpen(false);
    }

    const registerObservation = () => {
        props.registerObservation({
            observationType: props.observationType.MISC,
            note: note,
        })
        closeModalCleanup();
    }

    return(
        <div>
            <IonModal isOpen={props.isOpen} onDidDismiss={() => closeModalCleanup()}>
                <div className="misc-obs-div-content">
                    <OtherObservationButtons
                        closeModalCleanup={closeModalCleanup}
                        setShowInstructions={showInstructions}
                        registerObservation={registerObservation}
                    />

                    <h2 className="misc-head ion-padding-bottom">Observasjon Annet</h2>

                    <IonItem>
                        <IonLabel position="stacked">Notat</IonLabel>
                        <IonTextarea
                            value={note}
                            onIonChange={e => setNote(e.detail.value)}
                            placeholder="Skriv her"
                            rows={10}/>
                    </IonItem>

                </div>
            </IonModal>

            <IonAlert
                isOpen={showInstructions}
                onDidDismiss={() => setShowInstructions(false)}
                header={'Registering av ikke-sau'}
                message={'Hvordan man registrerer ikke-sau her...'}
                buttons={[
                    {
                        text: 'Ok'
                    }
                ]}
            />
        </div>

    )
}

export default MiscObservations;
