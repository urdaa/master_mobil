import {Popup} from "react-leaflet";
import React from "react";
import "./PredatorPopup.css"
import PopupButtonRow from "../PopupButtonRow";


const PredatorPopup = (props) => {

    return(
        <Popup className="other-obs-popup">
            <div className="predator-text-background">
                <p className="p-no-margin">
                    <b>Type:</b> {props.observation.predator}<br/>
                    <b>Antall:</b> {props.observation.number}<br/>
                    <b>Retning:</b> {props.observation.direction}
                </p>
            </div>

            <PopupButtonRow timeStamp={props.timeStamp} observation={props.observation} tripIsActive={props.tripIsActive}
                            deleteObservation={props.deleteObservation} openCorrectionModal={props.openCorrectionModal}
            />

        </Popup>
    )
}

export default PredatorPopup;
