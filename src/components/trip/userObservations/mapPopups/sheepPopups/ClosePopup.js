import "./ClosePopup.css"
import {Popup} from "react-leaflet";
import React from "react";
import {IonButton, IonIcon} from "@ionic/react";
import {trashOutline} from "ionicons/icons";
import PopupButtonRow from "../PopupButtonRow";

const ClosePopup = (props) => {

    return(
        <Popup className="popup-close">
            <div className="row-close">

                <div className="column-close">
                    <div className="gray-background-box">
                        <div className="sheep-and-number-close">
                        <span className="background-circle-close circle-dark">
                            <img src="./assets/noun_sheep_gray.png"/>
                        </span>
                            <b>{props.observation.totalSheep}</b>
                        </div>
                    </div>

                </div>

                <div className="column-close margin-left gray-background-box">
                    <div className="sheep-and-number-close">

                        <span className="background-circle-close circle-gray">
                            <img src="./assets/white_sheep.png"/>
                        </span>
                        <b>{props.observation.lightSheep}</b>
                    </div>

                    <div className="sheep-and-number-close">

                        <span className="background-circle-close circle-gray">
                            <img src="./assets/black_sheep_flipped.png"/>
                        </span>
                        <b>{props.observation.darkSheep}</b>
                    </div>
                </div>

                <div className="column-close margin-left gray-background-box">
                    <div className="row-close">
                        <div className="sheep-and-number-close">

                            <span className="background-circle-close circle-gray">
                                <img src="./assets/ties/noun_tie_blue.png" className="tie-close"/>
                            </span>
                            <b>{props.observation.blueTie}</b>
                        </div>

                        <div className="sheep-and-number-close">

                            <span className="background-circle-close circle-gray">
                                <img src="./assets/ties/noun_tie_green.png" className="tie-close"/>
                            </span>
                            <b>{props.observation.greenTie}</b>
                        </div>
                    </div>
                    <div className="row-close">
                        <div className="sheep-and-number-close">

                            <span className="background-circle-close circle-gray">
                                <img src="./assets/ties/noun_tie_yellow.png" className="tie-close"/>
                            </span>
                            <b>{props.observation.yellowTie}</b>
                        </div>

                        <div className="sheep-and-number-close">

                            <span className="background-circle-close circle-gray">
                                <img src="./assets/ties/noun_tie_red.png" className="tie-close"/>
                            </span>
                            <b>{props.observation.redTie}</b>
                        </div>
                    </div>
                </div>

            </div>



            <PopupButtonRow timeStamp={props.timeStamp} observation={props.observation} tripIsActive={props.tripIsActive}
                            deleteObservation={props.deleteObservation} openCorrectionModal={props.openCorrectionModal}
            />
        </Popup>
    )
}

export default ClosePopup;
