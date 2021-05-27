import {IonAlert, IonModal} from "@ionic/react";
import React, {useCallback, useEffect, useState} from "react";
import "./SheepObservationsContainer.css"
import SheepObservationsButtons from "./SheepObservationsButtons";
import ObservationNote from "../observationNote/ObservationNote";
import RegisterStage from "./RegisterStage";
import {deleteMap} from "../../../../../resources/StorageResources";

const registerStage = {
    TOTAL: 0,
    LIGHT_DARK: 1,
    TIES: 2,
    EAR_TAGS: 3
}

const SheepObservationsContainer = (props) => {
    const [closeRegisterStage, setCloseRegisterStage] = useState(registerStage.TOTAL)

    const [totalSheep, setTotalSheep] = useState(0);

    const [darkSheep, setDarkSheep] = useState(0);
    const [lightSheep, setLightSheep] = useState(0);

    const [blueTie, setBlueTie] = useState(0);
    const [greenTie, setGreenTie] = useState(0);
    const [yellowTie, setYellowTie] = useState(0);
    const [redTie, setRedTie] = useState(0);

    const [observedFarms, setObservedFarms] = useState([]);

    const [showObservationNote, setShowObservationNote] = useState();
    const [observationNote, setObservationNote] = useState("");

    const [showInstructions, setShowInstructions] = useState(false);
    const [showSheepCountAlert, setShowSheepCountAlert] = useState(false);
    const [countAlertData, setCountAlertData] = useState({text: "", continue: null});

    //Sets state to match observation to be modified (If it is a correction operation)
    useEffect(() => {
        if(!props.correctionObservation.observation) {
            return;
        }
        if (props.correctionObservation.observation.distance === "close") {
            setTotalSheep(props.correctionObservation.observation.totalSheep);
            setLightSheep(props.correctionObservation.observation.lightSheep);
            setDarkSheep(props.correctionObservation.observation.darkSheep);
            setBlueTie(props.correctionObservation.observation.blueTie);
            setGreenTie(props.correctionObservation.observation.greenTie);
            setYellowTie(props.correctionObservation.observation.yellowTie);
            setRedTie(props.correctionObservation.observation.redTie);
            setObservedFarms(props.correctionObservation.observation.observedFarms);

            props.setCloseObservation(true);
        }
        else if(props.correctionObservation.observation.distance === "far") {
            setLightSheep(props.correctionObservation.observation.lightSheep);
            setDarkSheep(props.correctionObservation.observation.darkSheep);

            props.setCloseObservation(false);
        }
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

    //Preloads soundfiles
    useEffect(() => {
        //NativeAudio.preloadSimple("bleet_high", "assets/bleet_high_pitch.mp3");
        //NativeAudio.preloadSimple("bleet_low", "assets/bleet_low_pitch.mp3");
    }, [])

    const closeModalCleanup = () => {
        setTotalSheep(0);
        setLightSheep(0);
        setDarkSheep(0);
        setBlueTie(0);
        setGreenTie(0);
        setYellowTie(0);
        setRedTie(0);
        setObservedFarms([]);
        setObservationNote("");
        setCloseRegisterStage(registerStage.TOTAL);

        props.setIsOpen(false);
    }

    const registerObservation = () => {
        if(props.closeObservation) {
            props.registerObservation({
                observationType: props.observationType.SHEEP,
                distance: "close",

                totalSheep: totalSheep,

                darkSheep: darkSheep,
                lightSheep: lightSheep,

                blueTie: blueTie,
                greenTie: greenTie,
                yellowTie: yellowTie,
                redTie: redTie,

                observedFarms: observedFarms,

                observationNote: observationNote
            })
        }
        else {
            props.registerObservation({
                observationType: props.observationType.SHEEP,
                distance: "far",

                darkSheep: darkSheep,
                lightSheep: lightSheep,

                observationNote: observationNote
            })
        }
        closeModalCleanup();
    }

    //Ensures the count of previous stages is consistent, else loads alert with appropriate message
    const nextStageIfCountConsistent = (endOfRegistration) => {
        let warning = "Sauer totalt = <b>" + totalSheep + "</b><br/>Mørke + lyse = <b>" + (darkSheep + lightSheep) + "</b>";

        if(closeRegisterStage === registerStage.TOTAL) {
            endOfRegistration ? registerObservation() : setCloseRegisterStage(closeRegisterStage +1);
        }
        else if(closeRegisterStage === registerStage.LIGHT_DARK) {
            if(totalSheep !== lightSheep + darkSheep) {
                setCountAlertData({
                    text: warning,
                    continue: endOfRegistration ? registerObservation : setCloseRegisterStage
                });
                setShowSheepCountAlert(true);
            } else {
                endOfRegistration ? registerObservation() : setCloseRegisterStage(closeRegisterStage +1);
            }
        }
        else if (closeRegisterStage === registerStage.TIES || closeRegisterStage === registerStage.EAR_TAGS) {
            if(totalSheep !== blueTie + greenTie * 2 + yellowTie * 3 + redTie * 4 ||
                lightSheep + darkSheep !== blueTie + greenTie * 2 + yellowTie * 3 + redTie * 4 ||
                totalSheep !== darkSheep + lightSheep) {

                warning += "<br/>Slips (inkl. lam) = <b>" + (blueTie + greenTie * 2 + yellowTie * 3 + redTie * 4) + "</b>";
                setCountAlertData({
                    text: warning,
                    continue: endOfRegistration ? registerObservation : setCloseRegisterStage
                });
                setShowSheepCountAlert(true);
            } else {
                endOfRegistration ? registerObservation() : setCloseRegisterStage(closeRegisterStage +1);
            }
        }
    }

    //TODO: Make a popover for how to register things in own component
    return(
        <IonModal isOpen={props.isOpen} onDidDismiss={() => closeModalCleanup()}>
            <div className="modal-content-container">
                <SheepObservationsButtons
                    closeObservation={props.closeObservation}
                    setCloseObservation={props.setCloseObservation}
                    closeModalCleanup={closeModalCleanup}
                    setShowInstructions={setShowInstructions}
                    nextStageIfCountConsistent={() => nextStageIfCountConsistent(true)}
                    setShowObservationNote={setShowObservationNote}
                />

                <RegisterStage
                    totalSheep={totalSheep}
                    setTotalSheep={setTotalSheep}

                    lightSheep={lightSheep}
                    setLightSheep={setLightSheep}
                    darkSheep={darkSheep}
                    setDarkSheep={setDarkSheep}

                    greenTie={greenTie}
                    setGreenTie={setGreenTie}
                    blueTie={blueTie}
                    setBlueTie={setBlueTie}
                    yellowTie={yellowTie}
                    setYellowTie={setYellowTie}
                    redTie={redTie}
                    setRedTie={setRedTie}

                    observedFarms={observedFarms}
                    setObservedFarms={setObservedFarms}

                    registerStage={registerStage}
                    closeRegisterStage={closeRegisterStage}
                    setCloseRegisterStage={setCloseRegisterStage}
                    nextStageIfCountConsistent={() => nextStageIfCountConsistent(false)}
                    closeObservation={props.closeObservation}
                />
            </div>

            <ObservationNote
                isOpen={showObservationNote}
                setShowObservationNote={setShowObservationNote}
                setObservationNote={setObservationNote}
                observationNote={observationNote}
            />

            <IonAlert
                isOpen={showInstructions}
                onDidDismiss={() => setShowInstructions(false)}
                header={'Registering av sau'}
                message={'Hvordan man registrerer sau her...'}
                buttons={[
                    {
                        text: 'Ok'
                    }
                ]}
            />

            <IonAlert
                isOpen={showSheepCountAlert}
                onDidDismiss={() => setShowSheepCountAlert(false)}
                header={"Ulik sautoal registrert"}
                message={countAlertData.text}
                buttons={[
                    {
                        text: 'Tilbake'
                    },
                    {
                        text: 'Fortsett',
                        handler: () => countAlertData.continue(closeRegisterStage +1)
                    }
                ]}
            />
        </IonModal>
    )
}

export default SheepObservationsContainer;
