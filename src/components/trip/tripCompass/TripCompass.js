import "./TripCompass.css"
import React, {useEffect, useRef, useState} from "react";


const TripCompass = (props) => {
    const watchID = useRef(undefined);
    const compassRose = useRef(undefined);

    useEffect(() => {
        if(props.tripIsActive) {
            watchID.current = navigator.compass.watchHeading(onSuccess, onError, {frequency: 200});
        } else if (watchID.current !== undefined) {
            navigator.compass.clearWatch(watchID.current)
        }
    },[props.tripIsActive])

    const onSuccess = (compassData) => {
        if(compassRose.current) {
            compassRose.current.style.transform = "rotate(" + -compassData.trueHeading + "deg)";
        }
    }

    const onError = (compassError) => {
        console.log(compassError);
    }

    return(
        <div>
            {props.tripIsActive ?
                <span className="compass-background" >
                    <img
                        className="trip-compass"
                        src="./assets/compass.png"
                        ref={compassRose}
                    />
                </span>
                :
                null
            }
        </div>
    )
}

export default TripCompass;
