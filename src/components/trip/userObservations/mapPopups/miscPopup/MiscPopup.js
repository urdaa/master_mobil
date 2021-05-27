import {Popup} from "react-leaflet";
import React from "react";
import "./MiscPopup.css"
import PopupButtonRow from "../PopupButtonRow";


const MiscPopup = (props) => {

    return(
        <Popup className="misc-obs-popup">
            <div className="misc-text-background">
                {props.observation.note}
            </div>
            <PopupButtonRow timeStamp={props.timeStamp} observation={props.observation} tripIsActive={props.tripIsActive}
                            deleteObservation={props.deleteObservation} openCorrectionModal={props.openCorrectionModal}
            />
        </Popup>
    )
}

export default MiscPopup;
