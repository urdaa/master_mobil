import React from "react";
import { IonCard, IonCardHeader, IonItem, useIonViewWillEnter, IonLabel, IonCheckbox } from "@ionic/react";
import {getTripsFromStorage} from "../../resources/StorageResources";
import { API } from 'aws-amplify';
import {listBeitelagMembers, listTrips} from '../../graphql/queries';
import {buildTripCard, tripSorter} from "../../resources/TripResources";
import "./UploadTrips.css";

const UploadTrips = (props) => {

    // Fetches trips from disk and server and flags them if already uploaded
    useIonViewWillEnter(async () => {
        let tripObject = {}
        await getTripsFromStorage("finished")
            .then(trips => {
                trips.files.forEach(trip => {
                    if (!trip.includes("_observations")) {
                        tripObject[trip] = false;
                    }
                })
            })
            .catch(e => console.log(e));

        let cloudTrips = await API.graphql({query: listTrips});
        cloudTrips = cloudTrips.data.listTrips.items;
        Object.keys(tripObject).forEach(trip => {
            cloudTrips.forEach( cloudTrip => {
                if ( cloudTrip.name === trip) {
                    tripObject[trip] = props.uploadStatus.ALREADY_UPLOADED;
                }
            })
        })
        props.setLocalTrips(tripObject);
    });

    //Checks if user is member of beitelag
    useIonViewWillEnter( async () => {
        let beitelagInfo = await API.graphql({query: listBeitelagMembers});
        //TODO: get this data and use it to create a ref in parent which informs if user should be asked about sharing with beitelag
    })

    return (
        <React.Fragment>
            {Object.keys(props.localTrips).sort(tripSorter).map(trip =>
                <IonCard key={trip}>
                    <IonCardHeader className="no-bot-pad">
                        {buildTripCard(trip)}
                    </IonCardHeader>
                    <IonItem>
                    {props.localTrips[trip] === undefined ?
                        null
                        :
                        props.localTrips[trip] === props.uploadStatus.ALREADY_UPLOADED ?
                            <div slot="end" className="upload-item-div">
                                <IonLabel className="upload-padding-right">
                                    Allerede opplastet:
                                </IonLabel>
                                <IonCheckbox disabled={true} checked={true}/>
                            </div>
                            :
                            <div slot="start" className="upload-item-div">
                                <IonLabel className="upload-padding-right">
                                    Velg:
                                </IonLabel>
                                <IonCheckbox
                                    checked={props.localTrips[trip]}
                                    onIonChange={e => {
                                        let updatedTrips = props.localTrips;
                                        updatedTrips[trip] = e.detail.checked
                                        props.setLocalTrips(updatedTrips);
                                    }}/>
                            </div>
                    }
                    </IonItem>
                </IonCard>
            )}
        </React.Fragment>
    );
}

export default UploadTrips;

