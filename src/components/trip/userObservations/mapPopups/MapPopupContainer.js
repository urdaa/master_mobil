import {Marker, Polyline} from "react-leaflet";
import FarPopup from "./sheepPopups/FarPopup";
import ClosePopup from "./sheepPopups/ClosePopup";
import React, {useState} from "react";
import L from "leaflet";
import {IonAlert} from "@ionic/react";
import "./MapPopupContainer.css"
import MiscPopup from "./miscPopup/MiscPopup";
import PredatorPopup from "./predatorPopup/PredatorPopup";
import DeadPopup from "./deadPopup/DeadPopup";
import WoundedPopup from "./woundedPopup/WoundedPopup";

const eyeIcon = new L.Icon({
    iconUrl: "./assets/eye.png",
    iconAnchor: [11,11],
    popupAnchor: [0,0],
    iconSize: [22, 22],
    className: "observation-icon icon-bgcolor-green"
});

const sheepIcon = new L.Icon({
    iconUrl: "./assets/white_sheep_padding.png",
    iconAnchor: [15,15],
    popupAnchor: [0,-25],
    iconSize: [30, 30],
    className: "observation-icon icon-bgcolor-green"
});

const predatorIcon = new L.Icon({
    iconUrl: "./assets/predator_footprint.png",
    iconAnchor: [15,15],
    popupAnchor: [0,-25],
    iconSize: [30, 30],
    className: "observation-icon icon-bgcolor-light"
});

const miscIcon = new L.Icon({
    iconUrl: "./assets/questionmark.png",
    iconAnchor: [15,15],
    popupAnchor: [0,-25],
    iconSize: [30, 30],
    className: "observation-icon icon-bgcolor-light"
});

const deathIcon = new L.Icon({
    iconUrl: "./assets/death.png",
    iconAnchor: [15,15],
    popupAnchor: [0,-25],
    iconSize: [30, 30],
    className: "observation-icon icon-bgcolor-light"
});

const woundedIcon = new L.Icon({
    iconUrl: "./assets/wounded.png",
    iconAnchor: [15,15],
    popupAnchor: [0,-25],
    iconSize: [30, 30],
    className: "observation-icon icon-bgcolor-light"
});

const MapPopUpContainer = (props) => {
    const [showDeleteObsAlert, setShowDeleteObsAlert] = useState(false);
    const [pendingDeleteObs, setPendingDeleteObs] = useState();


    const getPopups = () => {
        return props.observations.map(({timeStamp, userPosition, observationPosition, observationData}) => {
            if (observationData.observationType === props.observationType.SHEEP) {
                return getSheepPopup(timeStamp, userPosition, observationPosition, observationData);
            }
            else if (observationData.observationType === props.observationType.PREDATOR) {
                return getPredatorPopup(timeStamp, userPosition, observationPosition, observationData);
            }
            else if (observationData.observationType === props.observationType.MISC) {
                return getMiscPopup(timeStamp, userPosition, observationPosition, observationData);
            }
            else if (observationData.observationType === props.observationType.WOUNDED) {
                return getWoundedPopup(timeStamp, userPosition, observationPosition, observationData);
            }
            else if (observationData.observationType === props.observationType.DEAD) {
                return getDeadPopup(timeStamp, userPosition, observationPosition, observationData);
            }
            else{
                console.log('%c UNKNOWN OBSERVATION TYPE ', 'background: #fff2b3; color: red');
            }

        });
    }

    const getSheepPopup = (timeStamp, userPosition, observationPosition, observation) => {
        if (observation.distance === "far") {
            return (
                <div key={timeStamp}>
                    <Marker icon={eyeIcon} position={userPosition}/>
                    <Marker icon={sheepIcon} position={observationPosition}>
                        <FarPopup
                            timeStamp={timeStamp}
                            observation={observation}
                            tripIsActive={props.tripIsActive}
                            deleteObservation={() => {
                                setPendingDeleteObs(timeStamp);
                                setShowDeleteObsAlert(true);
                            }}
                            openCorrectionModal={props.openCorrectionModal}/>
                    </Marker>
                    <Polyline positions={[
                        [userPosition.lat, userPosition.lng], [observationPosition.lat, observationPosition.lng],
                    ]} color={'black'} dashArray="10, 10"/>
                </div>
            )
        } else if (observation.distance === "close") {
            return(
                <div key={timeStamp}>
                    <Marker icon={eyeIcon} position={userPosition}/>
                    <Marker icon={sheepIcon} position={observationPosition}>
                        <ClosePopup
                            timeStamp={timeStamp}
                            observation={observation}
                            tripIsActive={props.tripIsActive}
                            deleteObservation={() => {
                                setPendingDeleteObs(timeStamp);
                                setShowDeleteObsAlert(true);
                            }}
                            openCorrectionModal={props.openCorrectionModal}/>
                    </Marker>
                    <Polyline positions={[
                        [userPosition.lat, userPosition.lng], [observationPosition.lat, observationPosition.lng],
                    ]} color={'black'} dashArray="10, 10"/>
                </div>
            )
        }
    }

    const getPredatorPopup = (timeStamp, userPosition, observationPosition, observation) => {
        return(
            <div key={timeStamp}>
                <Marker icon={eyeIcon} position={userPosition}/>
                <Marker icon={predatorIcon} position={observationPosition}>
                    <PredatorPopup
                        timeStamp={timeStamp}
                        observation={observation}
                        tripIsActive={props.tripIsActive}
                        deleteObservation={() => {
                            setPendingDeleteObs(timeStamp);
                            setShowDeleteObsAlert(true);
                        }}
                        openCorrectionModal={props.openCorrectionModal}/>
                </Marker>
                <Polyline positions={[
                    [userPosition.lat, userPosition.lng], [observationPosition.lat, observationPosition.lng],
                ]} color={'black'} dashArray="10, 10"/>
            </div>
        )
    }

    const getMiscPopup = (timeStamp, userPosition, observationPosition, observation) => {
        return(
            <div key={timeStamp}>
                <Marker icon={eyeIcon} position={userPosition}/>
                <Marker icon={miscIcon} position={observationPosition}>
                    <MiscPopup
                        timeStamp={timeStamp}
                        observation={observation}
                        tripIsActive={props.tripIsActive}
                        deleteObservation={() => {
                            setPendingDeleteObs(timeStamp);
                            setShowDeleteObsAlert(true);
                        }}
                        openCorrectionModal={props.openCorrectionModal}/>
                </Marker>
                <Polyline positions={[
                    [userPosition.lat, userPosition.lng], [observationPosition.lat, observationPosition.lng],
                ]} color={'black'} dashArray="10, 10"/>
            </div>
        )
    }

    const getDeadPopup = (timeStamp, userPosition, observationPosition, observation) => {
        return(
            <div key={timeStamp}>
                <Marker icon={eyeIcon} position={userPosition}/>
                <Marker icon={deathIcon} position={observationPosition}>
                    <DeadPopup
                        timeStamp={timeStamp}
                        observation={observation}
                        tripIsActive={props.tripIsActive}
                        deleteObservation={() => {
                            setPendingDeleteObs(timeStamp);
                            setShowDeleteObsAlert(true);
                        }}
                        openCorrectionModal={props.openCorrectionModal}/>
                </Marker>
                <Polyline positions={[
                    [userPosition.lat, userPosition.lng], [observationPosition.lat, observationPosition.lng],
                ]} color={'black'} dashArray="10, 10"/>
            </div>
        )
    }

    const getWoundedPopup = (timeStamp, userPosition, observationPosition, observation) => {
        return(
            <div key={timeStamp}>
                <Marker icon={eyeIcon} position={userPosition}/>
                <Marker icon={woundedIcon} position={observationPosition}>
                    <WoundedPopup
                        timeStamp={timeStamp}
                        observation={observation}
                        tripIsActive={props.tripIsActive}
                        deleteObservation={() => {
                            setPendingDeleteObs(timeStamp);
                            setShowDeleteObsAlert(true);
                        }}
                        openCorrectionModal={props.openCorrectionModal}/>
                </Marker>
                <Polyline positions={[
                    [userPosition.lat, userPosition.lng], [observationPosition.lat, observationPosition.lng],
                ]} color={'black'} dashArray="10, 10"/>
            </div>
        )
    }

    return(
        <div>
            {getPopups()}

            <IonAlert
                isOpen={showDeleteObsAlert}
                onDidDismiss={() => setShowDeleteObsAlert(false)}
                header={'Slette observasjon?'}
                buttons={[
                    {
                        text: 'Ja',
                        handler: () => { props.deleteObservation(pendingDeleteObs) }
                    },
                    {
                        text: 'Nei'
                    }
                ]}
            />
        </div>

    )
}

export default MapPopUpContainer;
