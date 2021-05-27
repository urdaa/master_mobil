import "./PredatorObservations.css"
import {IonAlert, IonModal, IonItem, IonLabel, IonSelect, IonSelectOption, IonRadio, IonListHeader, IonRadioGroup, IonInput} from "@ionic/react";
import React, {useCallback, useEffect, useState} from "react";
import OtherObservationButtons from "../sharedComponents/OtherObservationButtons";

const predator_t = {
    WOLF: "Ulv",
    EAGLE: "Ørn",
    LYNX: "Gaupe",
    BEAR: "Bjørn",
    WOLVERINE: "Jerv",
    NOT_SELECTED: "Ikke valgt",
}

const direction_t = {
    UNKNOWN: "Ukjent",
    NORTH: "Nord",
    EAST: "Øst",
    SOUTH: "Sør",
    WEST: "Vest",
}

const pack_size = {
    ALONE: "Alene",
    PACK: "Flokk",
}

const PredatorObservations = (props) => {
    const [showInstructions, setShowInstructions] = useState(false);
    const [showNoTypeAlert, setShowNoTypeAlert] = useState(false);

    const [predator, setPredator] = useState(predator_t.NOT_SELECTED);
    const [direction, setDirection] = useState(direction_t.UNKNOWN);
    const [n_predators, set_n_predators] = useState(pack_size.ALONE);
    const [note, setNote] = useState("");

    //Sets state to match observation to be modified (If it is a correction operation)
    useEffect(() => {
        if(!props.correctionObservation.observation || props.correctionObservation.observation.observationType !== props.observationType.PREDATOR) {
            return;
        }
        setPredator(props.correctionObservation.observation.predator);
        setDirection(props.correctionObservation.observation.direction);
        set_n_predators(props.correctionObservation.observation.number);
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

    const registerObservation = () => {
        if (predator === predator_t.NOT_SELECTED) {
            setShowNoTypeAlert(true);
            return;
        }
        props.registerObservation({
            observationType: props.observationType.PREDATOR,
            predator: predator,
            direction: direction,
            number: n_predators,
            note: note,
        });
        closeModalCleanup();
    }

    const closeModalCleanup = () => {
        setPredator(predator_t.NOT_SELECTED);
        setDirection(direction_t.UNKNOWN);
        set_n_predators(pack_size.ALONE);
        setNote("");
        props.setIsOpen(false);
    }

    return(
        <div>
            <IonModal isOpen={props.isOpen} onDidDismiss={() => closeModalCleanup()}>
                <div className="predator-obs-div">
                    <OtherObservationButtons
                        closeModalCleanup={closeModalCleanup}
                        setShowInstructions={setShowInstructions}
                        registerObservation={registerObservation}
                    />

                    <div className="predator-obs-div-content">

                        <h2 className="predator-head ion-padding-bottom">Rovdyr-registrering</h2>

                        <IonItem>
                            <IonLabel>Type</IonLabel>
                            <IonSelect
                                interface={"popover"}
                                value={predator}
                                onIonChange={e => setPredator(e.detail.value)}
                            >
                                <IonSelectOption value={predator_t.WOLVERINE}>{predator_t.WOLVERINE}</IonSelectOption>
                                <IonSelectOption value={predator_t.LYNX}>{predator_t.LYNX}</IonSelectOption>
                                <IonSelectOption value={predator_t.BEAR}>{predator_t.BEAR}</IonSelectOption>
                                <IonSelectOption value={predator_t.WOLF}>{predator_t.WOLF}</IonSelectOption>
                                <IonSelectOption value={predator_t.EAGLE}>{predator_t.EAGLE}</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonItem className="ion-padding-bottom">
                            <IonLabel>Retning</IonLabel>
                            <IonSelect
                                interface={"popover"}
                                value={direction}
                                onIonChange={e => setDirection(e.detail.value)}
                            >
                                <IonSelectOption value={direction_t.NORTH}>{direction_t.NORTH}</IonSelectOption>
                                <IonSelectOption value={direction_t.EAST}>{direction_t.EAST}</IonSelectOption>
                                <IonSelectOption value={direction_t.SOUTH}>{direction_t.SOUTH}</IonSelectOption>
                                <IonSelectOption value={direction_t.WEST}>{direction_t.WEST}</IonSelectOption>
                                <IonSelectOption value={direction_t.UNKNOWN}>{direction_t.UNKNOWN}</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonRadioGroup
                            value={n_predators}
                            onIonChange={e => set_n_predators(e.detail.value)}

                        >
                            <IonListHeader>
                                <IonLabel>Antall</IonLabel>
                            </IonListHeader>

                            <IonItem>
                                <IonLabel>{pack_size.ALONE}</IonLabel>
                                <IonRadio slot="start" value={pack_size.ALONE} />
                            </IonItem>

                            <IonItem className="ion-padding-bottom">
                                <IonLabel>{pack_size.PACK}</IonLabel>
                                <IonRadio slot="start" value={pack_size.PACK} />
                            </IonItem>
                        </IonRadioGroup>

                        <IonItem>
                            <IonLabel position="stacked">Notat</IonLabel>
                            <IonInput
                                value={note}
                                onIonChange={e => setNote(e.detail.value)}
                                placeholder="Skriv her"/>
                        </IonItem>
                    </div>
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
            <IonAlert
                isOpen={showNoTypeAlert}
                onDidDismiss={() => setShowNoTypeAlert(false)}
                header={'Ingen Rovdyrtype'}
                message={'Det er ikke registrert noen rovdyrtype'}
                buttons={[
                    {
                        text: 'Ok'
                    }
                ]}
            />
        </div>

    )
}

export default PredatorObservations;
