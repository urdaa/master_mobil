import {
    IonAlert,
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
import { deleteMap, getMapsFromStorage } from "../../resources/StorageResources";
import {useHistory} from "react-router-dom";

const MyMapsPage =() => {
    const [maps, setMaps] = useState([]);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [pendingDeleteMap, setPendingDeleteMap] = useState(null);

    const history = useHistory();

    useIonViewWillEnter( () => {
        getMapsFromStorage()
            .then( newMaps => setMaps(newMaps))
            .catch(e => console.log(e));
    });


    const deleteStoredMap = async (name) => {
        await deleteMap(name)
        setMaps(maps.filter( map => map.name !== name))
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Mine Kart</IonTitle>
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
                                <IonButton onClick={() => history.push("/offlineMap/" + mapInfo.name + "/viewMap")} fill="outline" slot="start">Se
                                    kart</IonButton>
                                <IonButton fill="outline" color="danger" slot="end" onClick={() => {
                                    setPendingDeleteMap(mapInfo.name)
                                    setShowDeleteAlert(true);
                                }}>Slett kart </IonButton>
                            </IonItem>
                        </IonCard>
                    )}
                    <IonAlert
                        isOpen={showDeleteAlert}
                        onDidDismiss={() => setShowDeleteAlert(false)}
                        header={'Slette kart: ' + pendingDeleteMap + "?"}
                        buttons={[
                            {
                                text: 'Ja',
                                handler: () => { deleteStoredMap(pendingDeleteMap) }
                            },
                            {
                                text: 'Nei'
                            }
                        ]}
                    />
                </div>
            </IonContent>
        </IonPage>
    )
}

export default MyMapsPage;
