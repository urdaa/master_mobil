import {
    IonAlert,
    IonButton,
    IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader, IonItem,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from "@ionic/react";
import {getTripsFromStorage} from "../../resources/StorageResources";
import React, {useState} from "react";
import {FilesystemDirectory, Plugins} from "@capacitor/core";
import {useHistory} from "react-router-dom";
import {buildTripCard, tripSorter} from "../../resources/TripResources";

const { Filesystem } = Plugins;

const UnfinishedTripsPage = () => {
    const [trips, setTrips] = useState([]);
    const [pendingDeleteTrip, setPendingDeleteTrip] = useState();
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const history = useHistory();

    useIonViewWillEnter( () => {
        getTripsFromStorage("unfinished")
            .then( newTrips => setTrips(newTrips.files))
            .catch(e => console.log(e));
    });

    const deleteTrip = async(tripName) => {
        await Filesystem.deleteFile({
            directory: FilesystemDirectory.Data,
            path: "trips/unfinished/" + tripName
        })
        await Filesystem.deleteFile({
            directory: FilesystemDirectory.Data,
            path: "trips/unfinished/" + tripName + "_observations"
        })
        setTrips(trips.filter( trip => trip !== tripName))
    }

    const continueTrip = (tripName) => {
        let mapName = tripName.split("_")[0];
        history.push("/offlineMap/" + mapName + "/unfinishedTrip/" + tripName)
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Uferdige Oppsynsturer</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {trips.filter(tripName => !tripName.includes("_observations")).sort(tripSorter).map(trip =>
                    <IonCard key={trip}>
                        <IonCardHeader>
                            {buildTripCard(trip)}
                        </IonCardHeader>

                        <IonItem>
                            <IonButton onClick={() => continueTrip(trip)} fill="outline" slot="start">Se/Fortsett tur</IonButton>
                            <IonButton fill="outline" color="danger" slot="end" onClick={() => {
                                setPendingDeleteTrip(trip);
                                setShowDeleteAlert(true);
                            }}>Slett tur</IonButton>
                        </IonItem>
                    </IonCard>
                )}

                <IonAlert
                    isOpen={showDeleteAlert}
                    onDidDismiss={() => setShowDeleteAlert(false)}
                    header={'Slette oppsynstur: ' + pendingDeleteTrip + "?"}
                    buttons={[
                        {
                            text: 'Ja',
                            handler: () => { deleteTrip(pendingDeleteTrip) }
                        },
                        {
                            text: 'Nei'
                        }
                    ]}
                />
            </IonContent>
        </IonPage>
    );
}

export default UnfinishedTripsPage;
