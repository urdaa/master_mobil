import {Popup} from "react-leaflet";
import React from "react";
import "./WoundedPopup.css"
import PopupButtonRow from "../PopupButtonRow";


const WoundedPopup = (props) => {

    return(

        <Popup className="other-obs-popup">
            <div className="wounded-text-background">
                <p className="p-no-margin">
                    <b>Alder:</b> {props.observation.lifeStage}<br/>
                    <b>Farge:</b> {props.observation.color}<br/>
                    <b>Skade:</b> {props.observation.injury}
                </p>
            </div>

            <PopupButtonRow timeStamp={props.timeStamp} observation={props.observation} tripIsActive={props.tripIsActive}
                            deleteObservation={props.deleteObservation} openCorrectionModal={props.openCorrectionModal}
            />

        </Popup>
    )
}

export default WoundedPopup;
