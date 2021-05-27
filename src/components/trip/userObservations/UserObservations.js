import React, {useEffect, useState} from "react";
import L from 'leaflet';

import {FilesystemDirectory, FilesystemEncoding, Plugins} from "@capacitor/core";
import {appendTripFile} from "../../../resources/StorageResources";
import SheepObservationsContainer from "./sheepObservations/sheepObservationsContainer/SheepObservationsContainer";
import MapPopUpContainer from "./mapPopups/MapPopupContainer";
import UserObservationButtons from "./UserObservationButtons";
import MiscObservations from "./otherObservations/miscObservations/MiscObservations";
import DeadObservations from "./otherObservations/deadObservations/DeadObservations";
import PredatorObservations from "./otherObservations/predatorObservations/PredatorObservations";
import WoundedObservations from "./otherObservations/woundedObservations/WoundedObservations";

const { Filesystem } = Plugins;

const observationType = {
    SHEEP: 'sheep',
    PREDATOR: 'predator',
    MISC: 'misc',
    WOUNDED: 'wounded',
    DEAD: 'dead'
}

const UserObservations = (props) => {
    const [observations, setObservations] = useState([]);

    const [showSheepObservations, setShowSheepObservations] = useState(false);
    const [closeObservation, setCloseObservation] = useState(false);

    const [showMiscObservations, setShowMiscObservations] = useState(false);
    const [showDeadObservations, setShowDeadObservations] = useState(false);
    const [showWoundedObservations, setShowWoundedObservations] = useState(false);
    const [showPredatorObservations, setShowPredatorObservations] = useState(false);

    const [correctionObservation, setCorrectionObservation] = useState({timeStamp: null, observation: null});

    const [showCorrectionModal, setShowCorrectionModal] = useState(false);
    const [showMiscCorrection, setShowMiscCorrection] = useState(false);
    const [showDeadCorrection, setShowDeadCorrection] = useState(false);
    const [showPredatorCorrection, setShowPredatorCorrection] = useState(false);
    const [showWoundedCorrection, setShowWoundedCorrection] = useState(false);

    //Loads existing observations or sets up for new ones
    useEffect( () => {
        if (props.tripType === "newTrip" && !props.tripName) {
            setObservations([]);
        }
        else if (props.tripType === "newTrip" && props.tripName !== undefined) {
            _saveFile(props.tripName);
            setObservations([]);
        }
        else if ( props.tripType === "unfinishedTrip" || props.tripType === "finishedTrip") {
            setObservations(props.previousObservations)
        }
    },[props.tripName, props.previousObservations]);

    const _saveFile = async (tripName) => {
        await Filesystem.writeFile({
            path: 'trips/unfinished/'+ tripName + "_observations",
            directory: FilesystemDirectory.Data,
            data: "[",
            encoding: FilesystemEncoding.UTF16
        }).catch(e => console.log(e));
    }

    const registerObservation = (observationData) => {
        let mapCenter = props.mapRef.getCenter();
        let observation = {
            timeStamp: Date.now(),
            userPosition: {
                lat: props.position.latitude,
                lng: props.position.longitude,
            },
            observationPosition: {
                lat: mapCenter.lat,
                lng: mapCenter.lng,
            },
            observationData: {
                ...observationData
            }
        };

        if (observations.length === 0) {
            appendTripFile(props.tripName + "_observations", JSON.stringify(observation));
        } else {
            appendTripFile(props.tripName + "_observations", "," + JSON.stringify(observation));
        }

        setObservations([...observations, observation]);
        setShowSheepObservations(false);
    }

    const deleteObservation = async (timeStamp) => {
        let updatedObservationData = observations.filter( obs => obs.timeStamp !== timeStamp)
        reWriteObservationFile(updatedObservationData);
        setObservations(updatedObservationData);
    }

    const modifyObservation = (timeStamp, observationData) => {
        let updatedObservationData = observations.map(obs => {
            if(obs.timeStamp === timeStamp) {
                obs.observationData = {
                    ...observationData
                }
            }
            return obs;
        });
        reWriteObservationFile(updatedObservationData);
        setObservations(updatedObservationData);
    }

    const reWriteObservationFile = async (updatedObservationData) => {
        let updatedJson = "[";
        updatedObservationData.forEach( obs => {
            if (updatedJson === "[") {
                updatedJson += JSON.stringify(obs);
            }else {
                updatedJson += "," + JSON.stringify(obs)
            }
        })
        await Filesystem.writeFile({
            path: 'trips/unfinished/' + props.tripName + "_observations",
            directory: FilesystemDirectory.Data,
            data: updatedJson,
            encoding: FilesystemEncoding.UTF16
        }).catch(e => console.log(e));
    }

    const openCorrectionModal = (timeStamp, observation) => {
        setCorrectionObservation({timeStamp: timeStamp, observation: observation});
        if (observation.observationType === observationType.SHEEP) {
            setShowCorrectionModal(true);
        } else if (observation.observationType === observationType.DEAD) {
            setShowDeadCorrection(true);
        }
        else if (observation.observationType === observationType.PREDATOR) {
            setShowPredatorCorrection(true);
        }
        else if (observation.observationType === observationType.WOUNDED) {
            setShowWoundedCorrection(true);
        }
        else if (observation.observationType === observationType.MISC) {
            setShowMiscCorrection(true);
        }
        else {
            console.log("Unkown observation type....");
        }
    }

    const openSheepObservations = () => {
        let mapCenter = props.mapRef.getCenter();
        let metersToObsPoint = L.latLng([mapCenter.lat, mapCenter.lng]).distanceTo([props.position.latitude, props.position.longitude]);
        if (metersToObsPoint < 40) {
            setCloseObservation(true);
        } else {
            setCloseObservation(false);
        }
        setShowSheepObservations(true);
    }

    return(
        <div>
            <UserObservationButtons
                position={props.position}
                tripIsActive={props.tripIsActive}
                observationType={observationType}
                openSheepObservations={openSheepObservations}
                setShowDeadObservations={setShowDeadObservations}
                setShowMiscObservations={setShowMiscObservations}
                setShowPredatorObservations={setShowPredatorObservations}
                setShowWoundedObservations={setShowWoundedObservations}
            />

            <MapPopUpContainer
                observations={observations}
                openCorrectionModal={openCorrectionModal}
                deleteObservation={deleteObservation}
                tripIsActive={props.tripIsActive}
                registeringObservation={registerObservation}
                observationType={observationType}
            />

            <SheepObservationsContainer
                isOpen={showSheepObservations}
                setIsOpen={setShowSheepObservations}
                closeObservation={closeObservation}
                setCloseObservation={setCloseObservation}
                registerObservation={registerObservation}
                correctionObservation={correctionObservation}
                observationType={observationType}
            />{/*For modifying already completed observations*/}
            <SheepObservationsContainer
                isOpen={showCorrectionModal}
                setIsOpen={setShowCorrectionModal}
                closeObservation={closeObservation}
                setCloseObservation={setCloseObservation}
                registerObservation={(observationData) => modifyObservation(correctionObservation.timeStamp, observationData)}
                correctionObservation={correctionObservation}
                observationType={observationType}
            />

            <MiscObservations
                isOpen={showMiscObservations}
                setIsOpen={setShowMiscObservations}
                registerObservation={registerObservation}
                correctionObservation={correctionObservation}
                observationType={observationType}
            />{/*For modifying already completed observations*/}
            <MiscObservations
                isOpen={showMiscCorrection}
                setIsOpen={setShowMiscCorrection}
                registerObservation={(observationData) => modifyObservation(correctionObservation.timeStamp, observationData)}
                correctionObservation={correctionObservation}
                observationType={observationType}
            />

            <DeadObservations
                isOpen={showDeadObservations}
                setIsOpen={setShowDeadObservations}
                registerObservation={registerObservation}
                correctionObservation={correctionObservation}
                observationType={observationType}
            />{/*For modifying already completed observations*/}
            <DeadObservations
                isOpen={showDeadCorrection}
                setIsOpen={setShowDeadCorrection}
                registerObservation={(observationData) => modifyObservation(correctionObservation.timeStamp, observationData)}
                correctionObservation={correctionObservation}
                observationType={observationType}
            />

            <PredatorObservations
                isOpen={showPredatorObservations}
                setIsOpen={setShowPredatorObservations}
                registerObservation={registerObservation}
                correctionObservation={correctionObservation}
                observationType={observationType}
            />{/*For modifying already completed observations*/}
            <PredatorObservations
                isOpen={showPredatorCorrection}
                setIsOpen={setShowPredatorCorrection}
                registerObservation={(observationData) => modifyObservation(correctionObservation.timeStamp, observationData)}
                correctionObservation={correctionObservation}
                observationType={observationType}
            />

            <WoundedObservations
                isOpen={showWoundedObservations}
                setIsOpen={setShowWoundedObservations}
                registerObservation={registerObservation}
                correctionObservation={correctionObservation}
                observationType={observationType}
            />{/*For modifying already completed observations*/}
            <WoundedObservations
                isOpen={showWoundedCorrection}
                setIsOpen={setShowWoundedCorrection}
                registerObservation={(observationData) => modifyObservation(correctionObservation.timeStamp, observationData)}
                correctionObservation={correctionObservation}
                observationType={observationType}
            />
        </div>

    )
}

export default UserObservations;
