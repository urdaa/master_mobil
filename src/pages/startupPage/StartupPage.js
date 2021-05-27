import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {readDirOrCreate} from "../../resources/StorageResources";
import "./StartupPage.css"
import {menuController} from "@ionic/core";
import {Link} from "react-router-dom";
import Instructions from "./Instructions";


const StartupPage =() => {
    const [showInstructionsModal, setShowInstructionsModal] = useState(false);

    /** Creating/checking for necessary folders etc should be done here */
    useEffect( () => {
        readDirOrCreate("maps");
        readDirOrCreate("trips");
        readDirOrCreate("trips/unfinished");
        readDirOrCreate("trips/finished");
        readDirOrCreate("farms");
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>MasterSau</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div className="content">
                    <div className="top-content">
                        <h1>MasterSau</h1>
                        <p>Forenkler oppsynsturer <br/> av sau  på beite</p>
                        <img id="main-logo" src="./assets/sheep_cropped.png"/>
                        <IonButton className="startup-button" fill="outline" routerLink="/newTrip">Ny Oppsynstur</IonButton>
                        <IonButton className="startup-button" fill="outline" routerLink="/onlineMap">Last Ned Kart</IonButton>
                        <IonButton className="startup-button" fill="outline" onClick={async () => await menuController.toggle()}>Meny</IonButton>
                    </div>
                    <div className="bottom-content">
                        <IonButton
                            className="instructions-button"
                            fill="outline"
                            onclick={() => setShowInstructionsModal(true)}
                        >
                            Instrukser
                        </IonButton>
                    </div>
                </div>
                <Instructions
                    show={showInstructionsModal}
                    setShow={setShowInstructionsModal}
                />
            </IonContent>
        </IonPage>
    )
}

export default StartupPage;
