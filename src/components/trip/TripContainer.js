import {IonAlert} from "@ionic/react";
import React, {useCallback, useEffect, useState} from "react";
import UserLocation from "./userLocation/UserLocation";
import UserLocationButton from "./userLocation/UserLocateButton";
import {BackgroundGeolocation, BackgroundGeolocationEvents} from "@ionic-native/background-geolocation";
import UserPath from "./userLocation/UserPath";
import {FilesystemDirectory, Plugins} from "@capacitor/core";
import {appendTripFile} from "../../resources/StorageResources";
import {useHistory} from "react-router";
import UserObservations from "./userObservations/UserObservations";
import { menuController } from "@ionic/core";
import TripStatusButtons from "./TripStatusButtons";
import TripCompass from "./tripCompass/TripCompass";

const { Filesystem } = Plugins;
const backgroundGeolocation = BackgroundGeolocation;
const config = {
    locationProvider: backgroundGeolocation.ACTIVITY_PROVIDER,
    desiredAccuracy: backgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 20,
    distanceFilter: 20,
    notificationTitle: 'Background tracking',
    notificationText: 'enabled',
    debug: false,
    interval: 5000,
    fastestInterval: 5000,
    activitiesInterval: 5000,
}


const TripContainer =(props) => {
    const [position, setPosition] = useState();
    const [showQuitAlert, setShowQuitAlert] = useState(false);
    const [tripIsActive, setTripIsActive] = useState(false);

    const history = useHistory();

    //Hides menu and gives alert on hardware back-button when trip is active
    useEffect( () => {
        if(tripIsActive) {
            document.addEventListener('ionBackButton', quitAlertOnBack);
            menuController.enable(false);
        } else {
            document.removeEventListener('ionBackButton', quitAlertOnBack);
            menuController.enable(true);
        }
    },[tripIsActive])

    const quitAlertOnBack = useCallback((event) => {
        event.detail.register(1000, () => {
            setShowQuitAlert(true);
        });
    }, []);

    //Initializes geolocation service
    useEffect( () => {
        backgroundGeolocation.configure(config)
            .then(() => {
                backgroundGeolocation.on(BackgroundGeolocationEvents['location']).subscribe((location) => {
                    setPosition(location)
                    console.log(location);
                    //backgroundGeolocation.finish(); // FOR IOS ONLY
                });
                backgroundGeolocation.on(BackgroundGeolocationEvents['stationary']).subscribe((location) => {
                    setPosition(location)
                    console.log(location);
                    //backgroundGeolocation.finish(); // FOR IOS ONLY
                })
                backgroundGeolocation.on(BackgroundGeolocationEvents['background']).subscribe( location => {
                    console.log('[INFO] App is in background');
                    backgroundGeolocation.configure({
                        interval: 10000,
                        activitiesInterval: 10000,
                        stationaryRadius: 40,
                        distanceFilter: 40,
                    })
                });
                backgroundGeolocation.on(BackgroundGeolocationEvents['foreground']).subscribe( location => {
                    console.log('[INFO] App is in foreground');
                    backgroundGeolocation.configure({
                        interval: 5000,
                        activitiesInterval: 5000,
                        stationaryRadius: 20,
                        distanceFilter: 20,
                    })
                });
            });
    },[])

    const startTrip = () => {
        let today = new Date();
        let mapName = props.mapName + "_";
        let date = today.getFullYear() + '-'
            + addLeadingZero(today.getMonth() + 1) + '-'
            + addLeadingZero(today.getDate()) + "_";
        let time = addLeadingZero(today.getHours()) + ":"
            + addLeadingZero(today.getMinutes()) + ":"
            + addLeadingZero(today.getSeconds());
        props.setTripName(mapName +  date + time);

        backgroundGeolocation.start();
        setTripIsActive(true);
    }

    // Aws appsync wants leading zero in time and month, so this is required
    const addLeadingZero = (int) => {
        if (int <= 9) {
            return "0" + int;
        }
        return "" + int;
    }

    const continueTrip = () => {
        setTripIsActive(true);
        backgroundGeolocation.start();
    }

    const stopTrip = async () => {
        backgroundGeolocation.stop();
        let tripId = props.tripName;
        if (props.tripType === "unfinishedTrip" ) {
            tripId = props.tripName;
        }

        //Finalize userPath file
        await appendTripFile(tripId, "]");
        await Filesystem.copy({
            directory: FilesystemDirectory.Data,
            from: "trips/unfinished/" + tripId,
            to: "trips/finished/" + tripId,
        });
        await Filesystem.deleteFile({
            directory: FilesystemDirectory.Data,
            path: "trips/unfinished/" + tripId,
        })

        //Finalize userObservations file
        await appendTripFile(tripId + "_observations", "]");
        await Filesystem.copy({
            directory: FilesystemDirectory.Data,
            from: "trips/unfinished/" + tripId + "_observations",
            to: "trips/finished/" + tripId + "_observations",
        });
        await Filesystem.deleteFile({
            directory: FilesystemDirectory.Data,
            path: "trips/unfinished/" + tripId  + "_observations",
        })

        //Clean up and navigate to finsihedTrips
        setPosition(undefined);
        setTripIsActive(false);
        history.push("/finishedTrips");
    }

    const pauseTrip = () => {
        menuController.enable(true);
        document.removeEventListener('ionBackButton', quitAlertOnBack);
        setPosition(undefined);
        setTripIsActive(false);
        backgroundGeolocation.stop();
        history.push("/unfinishedTrips");
    }

    return(
        <div>
            <UserLocation
                mapRef={props.mapRef}
                position={position}/>
            <UserLocationButton
                mapRef={props.mapRef}
                position={position}/>

            <UserPath
                tripName={props.tripName}
                position={position}
                previousPositions={props.previousPositions}
                tripType={props.tripType}/>
            <UserObservations
                mapRef={props.mapRef}
                position={position}
                tripName={props.tripName}
                tripType={props.tripType}
                tripIsActive={tripIsActive}
                previousObservations={props.previousObservations}/>

            <TripCompass tripIsActive={tripIsActive}/>

            <TripStatusButtons
                setShowQuitAlert={setShowQuitAlert}
                tripIsActive={tripIsActive}
                tripType={props.tripType}
                startTrip={startTrip}
                continueTrip={continueTrip}
            />

            <IonAlert
                isOpen={showQuitAlert}
                onDidDismiss={() => setShowQuitAlert(false)}
                header={'Avslutte/Pause oppsynsturen?'}
                message={'Hvis den pauses kan turen fortsettes på et senere tidspunkt'}
                buttons={[
                    {
                        text: 'Avslutt tur',
                        handler: () => stopTrip()
                    },
                    {
                        text: 'Pause tur',
                        handler: () => pauseTrip()
                    },
                    {
                        text: "Fortsett tur"
                    }
                ]}
            />
        </div>
    );
}

export default TripContainer;
