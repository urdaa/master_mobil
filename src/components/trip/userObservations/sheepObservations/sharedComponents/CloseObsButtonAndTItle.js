import "./CloseObsButtonAndTitle.css"
import {IonButton, IonIcon} from "@ionic/react";
import React from "react";
import {arrowBack, arrowForward} from "ionicons/icons";

const CloseObsButtonAndTitle = (props) => {
    return (
        <div className="close-button-title">
            <h2 className="close-title">{props.title}</h2>

            <div className="close-buttons">
                <IonButton
                    onClick={() => props.previous()}
                    color="dark" fill="outline"
                    disabled={props.previousIsDisabled}
                >
                    <IonIcon icon={arrowBack} slot="icon-only"/>
                </IonButton>

                <IonButton
                    onClick={() => props.next()}
                    color="dark" fill="outline"
                    disabled={props.nextIsDisabled}
                    className="close-next-button"
                >
                    <IonIcon icon={arrowForward} slot="icon-only"/>
                </IonButton>
            </div>
        </div>
    )
}

export default CloseObsButtonAndTitle;
