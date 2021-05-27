import {
    IonAlert,
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonListHeader,
    IonModal,
    IonRadio,
    IonRadioGroup
} from "@ionic/react";
import React, {useEffect, useRef, useState} from "react";
import "./FarmRegistrationModal.css"
import {checkmark, close, home} from "ionicons/icons";
import EarTagDisplay from "./EarTagDisplay";
import {GithubPicker} from "react-color";
import {allLetter, fileExists, saveFarm} from "../../resources/StorageResources"

const FarmRegistrationModal = (props) => {
    const [farmName, setFarmName] = useState("");
    const [earTagColors, setEarTagColors] = useState("1");
    const [color1, setColor1] = useState("#000000");
    const [color2, setColor2] = useState("#000000");
    const [showColorPicker1, setShowColorPicker1] = useState(false);
    const [showColorPicker2, setShowColorPicker2] = useState(false);

    const [showNameAlert, setShowNameAlert] = useState(false);

    const closeModalCleanup = () => {
        setFarmName("");
        setEarTagColors("1");
        setColor1("#000000");
        setColor2("#000000");
        setShowColorPicker1(false);
        setShowColorPicker2(false);
    }

    const finishFarmRegistration = () => {
        if(_nameIsValid(farmName)) {
            let farmObject = {
                farmName: farmName,
                earTagColors: earTagColors,
                color1: color1
            }
            if (earTagColors === "2") {
                farmObject["color2"] = color2;
            }
            saveFarm(farmName, JSON.stringify(farmObject));
            props.addFarm(farmObject);
            props.setShowFarmRegistrationModal(false);
        } else {
            setShowNameAlert(true)
        }
    }

    //Helper function for validating farm names
    const _nameIsValid = async (name) => {
        if (name.length === 0 || !allLetter(name)) {
            return false;
        } else {
            return !await fileExists('farms/' + name)
        }
    }

    return(
        <IonModal
            isOpen={props.isOpen}
            onDidDismiss={() => closeModalCleanup()}
            cssClass="farm-modal"
            backdropDismiss={false}
        >
            <div className="farm-content">
                <h1 className="farm-title">
                    Registrer gård
                </h1>
                <IonItem>
                    <IonInput
                        value={farmName}
                        placeholder="Fyll inn gårdsnavn"
                        onIonChange={e => setFarmName(e.detail.value)}
                    />
                </IonItem>

                <IonRadioGroup
                    value={earTagColors}
                    onIonChange={e => setEarTagColors(e.detail.value)}
                >
                    <IonListHeader className="farm-reg-list-head">
                        <IonLabel className="farm-reg-label">Øremerke</IonLabel>
                    </IonListHeader>

                    <IonItem>
                        <IonLabel>1 Farge</IonLabel>
                        <IonRadio slot="start" value="1" />
                    </IonItem>

                    <IonItem>
                        <IonLabel>2 Farger</IonLabel>
                        <IonRadio slot="start" value="2" />
                    </IonItem>
                </IonRadioGroup>

                <div className="farm-reg-ear-tag">
                    <EarTagDisplay
                        earTagColors={earTagColors}
                        color1={color1}
                        color2={color2}
                    />
                </div>

                {earTagColors === "1" ?
                    <div className="farm-reg-color-button-div">
                        <IonButton
                            onClick={() => setShowColorPicker1(!showColorPicker1)}
                            fill="outline"
                            color="dark"
                        >
                            Farge 1
                        </IonButton>
                    </div>
                    :
                    <div className="farm-reg-color-button-div">
                        <IonButton
                            onClick={() => setShowColorPicker1(!showColorPicker1)}
                            fill="outline"
                            color="dark"
                        >
                            Farge 1
                        </IonButton>

                        <IonButton
                            onClick={() => setShowColorPicker2(!showColorPicker2)}
                            fill="outline"
                            color="dark"
                        >
                            Farge 2
                        </IonButton>
                    </div>
                }

                {showColorPicker1 ?
                    <GithubPicker
                        color={color1}
                        onChange={(color) => setColor1(color.hex)}
                        onChangeComplete={() => setShowColorPicker1(false)}
                        colors={['#e60000', '#ff6900', '#FCCB00', '#22ae25', '#0019e7', '#7d00ff']}
                        width="225px"
                    />
                    :
                    null
                }

                {showColorPicker2 ?
                    <GithubPicker
                        color={color2}
                        onChange={(color) => setColor2(color.hex)}
                        onChangeComplete={() => setShowColorPicker2(false)}
                        colors={['#e60000', '#ff6900', '#FCCB00', '#22ae25', '#0019e7', '#7d00ff']}
                        width="225px"
                        triangle="top-right"
                    />
                    :
                    null
                }

                <div className="farm-reg-action-button-div">
                    <IonButton
                        onClick={() => props.setShowFarmRegistrationModal(false)}
                        fill="outline"
                        color="danger"
                        size="large"
                    >
                        <IonIcon icon={close} slot="icon-only"/>
                    </IonButton>

                    <IonButton
                        onClick={() => finishFarmRegistration()}
                        fill="outline"
                        size="large"
                    >
                        <IonIcon icon={checkmark} slot="icon-only"/>
                    </IonButton>
                </div>
            </div>

            <IonAlert
                isOpen={showNameAlert}
                onDidDismiss={() => setShowNameAlert(false)}
                header={'Error'}
                message={'Gårdsnavn må være unikt og bare bestå av store og små bokstaver.'}
                buttons={['OK']}
            />
        </IonModal>
    )
}

export default FarmRegistrationModal;
