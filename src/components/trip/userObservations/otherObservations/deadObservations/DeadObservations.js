import {
    IonAlert,
    IonModal,
    IonFab,
    IonFabButton,
    IonIcon,
    IonButton,
    IonItemDivider,
    IonLabel,
    IonInput, IonItem, IonSelect, IonSelectOption, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCheckbox, IonCard, IonPopover
} from "@ionic/react";
import React, {useCallback, useEffect, useState} from "react";
import "./DeadObservations.css"
import OtherObservationButtons from "../sharedComponents/OtherObservationButtons";
import {Capacitor, Plugins, CameraResultType, FilesystemDirectory} from '@capacitor/core';
import {camera} from "ionicons/icons";
import EarTagDisplay from "../../../../farmRegistration/EarTagDisplay";
import TagPopover from "../predatorObservations/TagPopover";

const { Camera, Filesystem } = Plugins;

const DeadObservations = (props) => {
    const [showInstructions, setShowInstructions] = useState(false);
    const [showTagPopover, setShowTagPopover] = useState(false);

    const [imageUris, setImageUris] = useState([]);
    const [earTag, setEarTag] = useState({});
    const [earTagNumber, setEarTagNumber] = useState("");
    const [note, setNote] = useState("");

    //Sets state to match observation to be modified (If it is a correction operation)
    useEffect(() => {
        if(!props.correctionObservation.observation || props.correctionObservation.observation.observationType !== props.observationType.DEAD) {
            return;
        }
        setImageUris(props.correctionObservation.observation.imageUris);
        setEarTag(props.correctionObservation.observation.earTag);
        setEarTagNumber(props.correctionObservation.observation.earTagNumber);
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
            observationType: props.observationType.DEAD,
            earTag: earTag,
            earTagNumber: earTagNumber,
            imageUris: imageUris,
            note: note,
        })
        closeModalCleanup();
    }

    const closeModalCleanup = () => {
        setImageUris([]);
        setEarTag({});
        setEarTagNumber("");
        setNote("");
        props.setIsOpen(false);
    }

    const takePicture = async() => {
        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri
        });

        const imageTempStorage = await Filesystem.readFile({ path: image.path });

        let date = new Date(),
            time = date.getTime(),
            fileName = time + ".jpeg";

        await Filesystem.writeFile({
            data: imageTempStorage.data,
            path: fileName,
            directory: FilesystemDirectory.Data
        });

        const finalImageUri = await Filesystem.getUri({
            directory: FilesystemDirectory.Data,
            path: fileName
        });

        setImageUris(prevState => [...prevState, finalImageUri.uri])
    }


    return(
        <div>
            <IonModal isOpen={props.isOpen} onDidDismiss={() => closeModalCleanup()}>
                <div className="dead-obs-div">
                    <OtherObservationButtons
                        closeModalCleanup={closeModalCleanup}
                        setShowInstructions={setShowInstructions}
                        registerObservation={registerObservation}
                    />

                    <div className="dead-obs-div-content">
                        <h2 className="dead-head">Registrer Død Sau</h2>

                        <TagPopover
                            isOpen={showTagPopover}
                            setIsOpen={setShowTagPopover}
                            setEartag={setEarTag}
                        />

                        <IonCard className="ion-margin-bottom">
                            <IonItem>
                                <IonCardHeader>
                                    <IonCardTitle>Gård: {earTag.farmName}</IonCardTitle>
                                    <IonCardSubtitle className="tag-reg-card-sub">
                                        Øremerke:
                                        <span className="tag-reg-span">
                                            {earTag.earTagColors === "1" ?
                                                <EarTagDisplay
                                                    earTagColors={earTag.earTagColors}
                                                    color1={earTag.color1}
                                                />
                                                :
                                                <EarTagDisplay
                                                    earTagColors={earTag.earTagColors}
                                                    color1={earTag.color1}
                                                    color2={earTag.color2}
                                                />
                                            }
                                        </span>
                                    </IonCardSubtitle>
                                    <IonButton
                                        size="small"
                                        onClick={() => {
                                            setShowTagPopover(true);
                                        }}
                                        fill="outline"
                                    >
                                        Velg
                                    </IonButton>
                                </IonCardHeader>
                            </IonItem>
                        </IonCard>

                        <IonItem className="ion-margin-bottom">
                            <IonLabel position="stacked">Øremerke-nummer</IonLabel>
                            <IonInput
                                value={earTagNumber}
                                onIonChange={e => setEarTagNumber(e.detail.value)}
                                placeholder="Skriv her"/>
                        </IonItem>

                        <IonItem className="ion-margin-bottom">
                            <IonLabel position="stacked">Notat</IonLabel>
                            <IonInput
                                value={note}
                                onIonChange={e => setNote(e.detail.value)}
                                placeholder="Skriv her"/>
                        </IonItem>

                        <div className="dead-grid-wrapper">
                            {imageUris.map( imageUri => {
                                return <img src={Capacitor.convertFileSrc(imageUri)}/>
                            })}

                        </div>

                    </div>

                </div>

                <IonButton
                    onClick={() => takePicture()}
                    className="camera-button"
                    slot="icon-only"
                >
                    <IonIcon icon={camera} className="camera-icon"/>
                </IonButton>

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

export default DeadObservations;
