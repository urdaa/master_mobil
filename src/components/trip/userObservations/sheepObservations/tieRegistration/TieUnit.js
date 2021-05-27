import "./TieUnit.css"
import React from "react";
import {IonButton, IonIcon} from "@ionic/react";
import {chevronDown, chevronUp} from "ionicons/icons";
import {Vibration} from "@ionic-native/vibration";

const TieUnit = (props) => {

    const increaseCount = () => {
        Vibration.vibrate([100, 50, 100])
        props.setTieCount(props.tieCount + 1)
    }

    const decreaseCount = () => {
        Vibration.vibrate(100);
        props.setTieCount(props.tieCount - 1)
    }

    return(
        <div className="tie-unit-div">
            <div className="tie-unit-count-div">
                <h2 className="tie-unit-count">{props.tieCount}</h2>
            </div>


            <div className="tie-and-buttons">
                <img src={props.imageSrc} className="tie-image"/>

                <div className="tie-unit-buttons">
                    <IonButton
                        onClick={() => increaseCount()}
                        color="dark"
                        fill="outline"
                        size="large"
                    >
                        <IonIcon icon={chevronUp} slot="icon-only"/>
                    </IonButton>

                    <IonButton
                        onClick={() => decreaseCount()}
                        color="dark"
                        fill="outline"
                        size="large"
                        disabled={props.tieCount === 0}
                    >
                        <IonIcon icon={chevronDown} slot="icon-only"/>
                    </IonButton>
                </div>
            </div>
        </div>
    )
}

export default TieUnit;
