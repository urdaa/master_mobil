import {
    IonAlert, IonInput,
    IonItem,
    IonLabel,
    IonListHeader,
    IonModal,
    IonRadio,
    IonRadioGroup,
    IonSelect,
    IonSelectOption,
    IonItemDivider
} from "@ionic/react";
import React, {useCallback, useEffect, useState} from "react";
import "./WoundedObservations.css"
import OtherObservationButtons from "../sharedComponents/OtherObservationButtons";

const lifeStageType = {
    SHEEP: "Sau",
    LAMB: "Lam",
}

const colorType = {
    LIGHT: "Lys",
    DARK: "Mørk",
    MIX: "Blanding",
}

const injuryType = {
    BROKEN_BONE: "Brukket bein",
    HEMORRHAGE: "Bloduttredelse",
    OPEN_WOUND: "Åpent sår",
    VISIBLE_INTESTINES: "Synlige innvoller",
    OTHER: "Annet",
}

const WoundedObservations = (props) => {
    const [showInstructions, setShowInstructions] = useState(false);
    const [lifeStage, setLifeStage] = useState(lifeStageType.SHEEP);
    const [color, setColor] = useState(colorType.LIGHT);
    const [injury, setInjury] = useState(injuryType.BROKEN_BONE);
    const [note, setNote] = useState("");

    //Sets state to match observation to be modified (If it is a correction operation)
    useEffect(() => {
        if(!props.correctionObservation.observation || props.correctionObservation.observation.observationType !== props.observationType.WOUNDED) {
            return;
        }
        setLifeStage(props.correctionObservation.observation.lifeStage);
        setColor(props.correctionObservation.observation.color);
        setInjury(props.correctionObservation.observation.injury);
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
        props.registerObservation({
            observationType: props.observationType.WOUNDED,
            injury: injury,
            lifeStage: lifeStage,
            color: color,
            note: note,
        })
        closeModalCleanup();
    }

    const closeModalCleanup = () => {
        setLifeStage(lifeStageType.SHEEP);
        setColor(colorType.LIGHT);
        setInjury(injuryType.BROKEN_BONE);
        setNote("");
        props.setIsOpen(false);
    }

    return(
        <div>
            <IonModal isOpen={props.isOpen} onDidDismiss={() => closeModalCleanup()}>
                <div className="wounded-obs-div">
                    <OtherObservationButtons
                        closeModalCleanup={closeModalCleanup}
                        setShowInstructions={setShowInstructions}
                        registerObservation={registerObservation}
                    />

                    <div className="wounded-obs-div-content">

                        <h2 className="wounded-head ion-padding-bottom">Registrer skade</h2>

                        <IonRadioGroup
                            value={lifeStage}
                            onIonChange={e => setLifeStage(e.detail.value)}
                        >
                            <IonItem>
                                <IonLabel>{lifeStageType.SHEEP}</IonLabel>
                                <IonRadio slot="start" value={lifeStageType.SHEEP} />
                            </IonItem>

                            <IonItem className="ion-padding-bottom">
                                <IonLabel>{lifeStageType.LAMB}</IonLabel>
                                <IonRadio slot="start" value={lifeStageType.LAMB} />
                            </IonItem>
                        </IonRadioGroup>

                        <IonItem className="extra-padding-bottom">
                            <IonLabel>Farge</IonLabel>
                            <IonSelect
                                interface={"popover"}
                                value={color}
                                onIonChange={e => setColor(e.detail.value)}
                            >
                                <IonSelectOption value={colorType.LIGHT}>{colorType.LIGHT}</IonSelectOption>
                                <IonSelectOption value={colorType.DARK}>{colorType.DARK}</IonSelectOption>
                                <IonSelectOption value={colorType.MIX}>{colorType.MIX}</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonItem className="extra-padding-bottom">
                            <IonLabel>Skade</IonLabel>
                            <IonSelect
                                interface={"popover"}
                                value={injury}
                                onIonChange={e => setInjury(e.detail.value)}
                            >
                                <IonSelectOption value={injuryType.BROKEN_BONE}>{injuryType.BROKEN_BONE}</IonSelectOption>
                                <IonSelectOption value={injuryType.HEMORRHAGE}>{injuryType.HEMORRHAGE}</IonSelectOption>
                                <IonSelectOption value={injuryType.OPEN_WOUND}>{injuryType.OPEN_WOUND}</IonSelectOption>
                                <IonSelectOption value={injuryType.VISIBLE_INTESTINES}>{injuryType.VISIBLE_INTESTINES}</IonSelectOption>
                                <IonSelectOption value={injuryType.OTHER}>{injuryType.OTHER}</IonSelectOption>
                            </IonSelect>
                        </IonItem>

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
        </div>

    )
}

export default WoundedObservations;
