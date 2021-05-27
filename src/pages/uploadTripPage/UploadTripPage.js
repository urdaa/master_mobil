import React, {useEffect, useState} from "react";
import {
    IonButtons,
    IonContent, IonFooter,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import AwsCustomAuthentication from "./AwsCustomAuthentication";
import UploadTrips from "./UploadTrips";
import {IonButton} from "@ionic/react";
import {Auth} from "@aws-amplify/auth";
import "./UploadTripPage.css"
import {createTrip} from "../../graphql/mutations";
import {API, Storage} from "aws-amplify";
import {getFinshedTrip} from "../../resources/StorageResources";
import {Plugins} from "@capacitor/core";
import awsExports from "../../aws-exports";

const uploadStatus = {
    ALREADY_UPLOADED: "uploaded",
}

const { Filesystem } = Plugins;

const UploadTripPage = () => {
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();
    const [localTrips, setLocalTrips] = useState({});

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    const upload = async (trips, beitelagID = "NOT_SHARED") => {
        const credentials = await Auth.currentCredentials();
        const { identityId } = credentials;

        let apiInput = {
            id: user.username,
            observations: [],
            userPath: [],
            name: "",
            started: "",
            shared: false, //TODO: shared stuf here !!!!!!!
            observationImages: [],
        }
        let localUserPath = {};
        let localObservations = {};
        let tripMetadata = [];
        let updatedLocalTrips = Object.assign({}, localTrips);



        for (let tripName in trips) {
            if (trips[tripName] === true) { // If trip has been checked by user
                localUserPath = await getFinshedTrip(tripName);
                apiInput.userPath = JSON.stringify(localUserPath.data);

                localObservations = await getFinshedTrip(tripName + '_observations');
                localObservations = localObservations.data.replace(/[\uFEFF]/g, '');
                localObservations = JSON.parse(localObservations);
                // Check if there are any images included, if so they need to be uploaded to S3
                apiInput.observationImages = await uploadImages(localObservations);
                apiInput.observations = JSON.stringify(localObservations);
                console.log(apiInput)
                apiInput.name = tripName;

                tripMetadata =  tripName.split("_")
                apiInput.started = tripMetadata[1] + "T" + tripMetadata[2] + "Z";
                console.log(apiInput)
                try {
                    await API.graphql({query: createTrip, variables: {input: apiInput}});
                    updatedLocalTrips[tripName] = uploadStatus.ALREADY_UPLOADED;
                } catch (e) {
                    console.log(e);
                    alert("Kunne ikke laste opp tur, prøv igjen senere.");
                }
            }
        }
        setLocalTrips(updatedLocalTrips);
    }

    const uploadImages = async (localObservations) => {
        //Locate possible images in observations and read from storage
        let imgs = {}
        await Promise.all(localObservations.map( async obs => {
            if(obs.observationData.observationType === "dead") {
                await Promise.all(obs.observationData.imageUris.map( async imgUri => {
                    let imgFromStorage = await Filesystem.readFile({path: imgUri});
                    let imgName = imgUri.split('/');
                    imgName = imgName[imgName.length - 1];
                    let imgKey = imgName;
                    imgs[imgKey] = imgFromStorage.data;
                    delete obs.observationData.imageUris;
                }));
            }
        }));

        // Upload images to s3
        let observationImages = [];
        let image = {};
        let result;
        await Promise.all(Object.keys(imgs).map( async key => {
            let result = await Storage.put(key, Buffer.from(imgs[key], 'base64'), {
                level: 'protected',
                contentType: 'image/jpeg'
            });
            image = {
                name: result.key,
                image: {
                    bucket: awsExports.aws_user_files_s3_bucket,
                    region: awsExports.aws_user_files_s3_bucket_region,
                    key: result.key,
                }
            }
            observationImages.push(image);
        }));
        return observationImages;
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Last opp turer </IonTitle>
                    {authState === AuthState.SignedIn && user ?
                        <IonButton
                            className="log-out-button"
                            fill="outline"
                            color="danger"
                            slot="end"
                            onClick={() => Auth.signOut()}
                        >
                            Logg ut
                        </IonButton>
                        :
                        null
                    }
                </IonToolbar>
            </IonHeader>
            {authState === AuthState.SignedIn && user ?
                <React.Fragment>
                    <IonContent>
                        <UploadTrips
                            localTrips={localTrips}
                            setLocalTrips={setLocalTrips}
                            uploadStatus ={uploadStatus}
                        />
                    </IonContent>
                    <IonFooter>
                        <IonToolbar>
                            <div className="upload-centering">
                                <IonButton
                                    className="upload-button"
                                    fill="outline"
                                    size="large"
                                    onClick={() => upload(localTrips)}
                                >
                                    Last opp
                                </IonButton>
                            </div>
                        </IonToolbar>
                    </IonFooter>
                </React.Fragment>
                :
                <AwsCustomAuthentication/>
            }
        </IonPage>
    );
}

export default UploadTripPage;
