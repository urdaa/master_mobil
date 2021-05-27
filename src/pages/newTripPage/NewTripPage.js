import {
    IonButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader, IonItem,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar, useIonViewDidLeave, useIonViewWillEnter,
} from "@ionic/react";
import React, { useState} from "react";
import {getMapsFromStorage} from "../../resources/StorageResources";
import {useHistory} from "react-router-dom";

const NewTripPage =() => {
    const [maps, setMaps] = useState([]);
    const [currentMap, setCurrentMap] = useState(null);

    const history = useHistory();

    useIonViewWillEnter( () => {
        getMapsFromStorage()
            .then( newMaps => setMaps(newMaps))
            .catch(e => console.log(e));
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Oppsynstur</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div>
                    {maps.map(mapInfo =>
                        <IonCard key={mapInfo.name}>
                            <IonCardHeader>
                                <IonCardTitle>{mapInfo.name}</IonCardTitle>
                                <IonCardSubtitle>Kart-biter: {mapInfo.nTiles}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonItem>
                                <IonButton onClick={() => history.push("/offlineMap/" + mapInfo.name + "/newTrip")} fill="outline" slot="start">Bruk kart</IonButton>
                            </IonItem>
                        </IonCard>
                    )}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default NewTripPage;
