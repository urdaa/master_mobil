import {Popup} from "react-leaflet";
import React from "react";
import "./FarPopup.css"
import {IonButton, IonIcon} from "@ionic/react";
import {trashOutline} from "ionicons/icons";
import PopupButtonRow from "../PopupButtonRow";

const FarPopup = (props) => {

    return(
        <Popup className="far-obs-popup">
            <div className="row-top">
                <div className="sheep-and-number">
                    <span className="background-circle">
                        <img src="./assets/white_sheep.png" className="sheep"/>
                    </span>
                    <b>{props.observation.lightSheep}</b>
                </div>
                <div className="sheep-and-number">
                    <span className="background-circle">
                        <img src="./assets/black_sheep_flipped.png" className="sheep"/>
                    </span>
                    <b>{props.observation.darkSheep}</b>
                </div>
            </div>
            <PopupButtonRow timeStamp={props.timeStamp} observation={props.observation} tripIsActive={props.tripIsActive}
                            deleteObservation={props.deleteObservation} openCorrectionModal={props.openCorrectionModal}
            />

        </Popup>
    )
}

export default FarPopup;
