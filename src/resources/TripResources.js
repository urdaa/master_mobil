import {IonCardSubtitle, IonCardTitle} from "@ionic/react";
import React from "react";

export const buildTripCard = (tripString) => {
    let tripArray = tripString.split("_");
    return(
        <div>
            <IonCardTitle>Kart: {tripArray[0]}</IonCardTitle>
            <IonCardSubtitle>Dato: {tripArray[1]}</IonCardSubtitle>
            <IonCardSubtitle>Klokka: {tripArray[2]}</IonCardSubtitle>
        </div>
    )
}

export const tripSorter = (tripString1, tripString2) => {
    let tripArray1 = tripString1.split("_");
    let tripArray2 = tripString2.split("_");
    //Checks Date
    let dateArray1 = tripArray1[1].split("-");
    let dateArray2 = tripArray2[1].split("-");

    for (let i = 0; i < dateArray1.length; i++) {
        if (parseInt(dateArray2[i]) - parseInt(dateArray1[i]) !== 0) {
            return parseInt(dateArray2[i]) - parseInt(dateArray1[i]);
        }
    }
    //Checks time
    let timeArray1 = tripArray1[2].split(":");
    let timeArray2 = tripArray2[2].split(":");
    for (let i = 0; i < timeArray1.length; i++) {
        if (parseInt(timeArray2[i]) - parseInt(timeArray1[i]) !== 0) {
            return  parseInt(timeArray2[i]) - parseInt(timeArray1[i]);
        }
    }
    return 0;
}
