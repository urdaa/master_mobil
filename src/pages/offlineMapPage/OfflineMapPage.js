import React, {useCallback, useEffect, useRef, useState} from "react";
import {Capacitor, FilesystemDirectory, FilesystemEncoding, Plugins} from "@capacitor/core";
import {Map, ScaleControl, TileLayer} from "react-leaflet";
import TripContainer from "../../components/trip/TripContainer";
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import {getMapFromStorage} from "../../resources/StorageResources";
import UserPath from "../../components/trip/userLocation/UserPath";
import UserObservations from "../../components/trip/userObservations/UserObservations";

const { Filesystem } = Plugins;

const OfflineMapPage = () => {
    const [tileUrl, setTileUrl] = useState("")
    const [mapInfo, setMapInfo] = useState(false);
    const [tripData, setTripData] = useState([]);
    const [observationData, setObservationData] = useState([]);
    const [mapRef, setMapRef] = useState(null);
    const [tripName, setTripName] = useState();

    const {mapNameParam, tripNameParam, tripTypeParam} = useParams();

    useEffect(() => {
        setTripName(tripNameParam)
    },[tripNameParam])


    //Get tile url and map info (bounds, zoom lvls, etc)
    useEffect( () => {
        let getAndSetTilesUrl = async () => {
            let path = await Filesystem.getUri({
                path: 'maps/' + mapNameParam + '/',
                directory: FilesystemDirectory.Data
            })
            setTileUrl(Capacitor.convertFileSrc(path.uri + "/{x}_{y}_{z}"));
        }
        getAndSetTilesUrl().catch( e => console.log(e));
        getMapFromStorage(mapNameParam).then( mapData => {
            setMapInfo(mapData)
        });

        // Ensures Leaflet is aware of the actual size of the map as the map is rendered before style (size) is applied
        setTimeout( () => {
            if(mapRef) {
                mapRef.invalidateSize();
            }
        }, 400);
    }, [mapNameParam, tripTypeParam, tripName])

    //Get tripdata - only for loading unfinished/finished trips
    useEffect( () => {
        if (tripName === undefined || !(tripTypeParam === "finishedTrip" ||  tripTypeParam === "unfinishedTrip")) {
            return;
        }

        let tripPath;
        if (tripTypeParam === "finishedTrip"){
            tripPath = 'trips/finished/' + tripName;
        } else if (tripTypeParam === "unfinishedTrip") {
            tripPath = 'trips/unfinished/' + tripName;
        }

        let getAndSetTripData = async () => {
            return Filesystem.readFile({
                path: tripPath,
                directory: FilesystemDirectory.Data,
                encoding: FilesystemEncoding.UTF16
            }).catch(e => console.log(e));
        }
        getAndSetTripData().then( data => {
            let fixedData = data.data;
            if (tripTypeParam === "unfinishedTrip") {
                fixedData += "]";
            }
            //Removes invisible 'EOF' chars that gets added by capacitor filesystem, and parses JSON afterwards
            fixedData = JSON.parse(fixedData.replace(/[\uFEFF]/g, ''));
            setTripData(fixedData);
        })

        let getAndSetObservationData = async () => {
            return Filesystem.readFile({
                path: tripPath + "_observations",
                directory: FilesystemDirectory.Data,
                encoding: FilesystemEncoding.UTF16
            }).catch(e => console.log(e));
        }
        getAndSetObservationData().then( data => {
            let fixedData = data.data;
            if (tripTypeParam === "unfinishedTrip") {
                fixedData += "]";
            }
            //Removes invisible 'EOF' chars that gets added by capacitor filesystem, and parses JSON afterwards
            fixedData = JSON.parse(fixedData.replace(/[\uFEFF]/g, ''));
            setObservationData(fixedData);
        })
    },[tripName, tripTypeParam]);

    //Provides mapRef for children
    const onMapChange = useCallback(mapRef => {
        if (mapRef) {
            setMapRef(mapRef.leafletElement)
        }
    },[]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Nedlasted kart</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {mapInfo ?
                    <Map
                        ref={onMapChange}
                        maxBounds={[[mapInfo.bounds._northEast.lat, mapInfo.bounds._northEast.lng], [mapInfo.bounds._southWest.lat, mapInfo.bounds._southWest.lng]]}
                        center={mapInfo.center}
                        zoom={mapInfo.minZoom}
                        maxZoom={mapInfo.maxZoom + 1}
                        minZoom={mapInfo.minZoom}>
                        <TileLayer
                            maxNativeZoom={mapInfo.maxZoom}
                            attribution='&copy; <a href=&qout;http://www.kartverket.no/&qout;>Kartverket</a>'
                            url={tileUrl}/>
                        <ScaleControl imperial={false} metric={true}/>

                        {tripTypeParam === "viewMap" ?
                            null
                            :
                            tripTypeParam === "finishedTrip" ?
                                <div>
                                    <UserPath
                                        previousPositions={tripData}
                                        tripType={tripTypeParam}
                                        tripName={tripName}/>
                                    <UserObservations
                                        tripType={tripTypeParam}
                                        tripName={tripName}
                                        previousObservations={observationData}/>
                                </div>
                                :
                                <TripContainer
                                    mapRef={mapRef}
                                    mapName={mapInfo.name}
                                    tripName={tripName}
                                    tripType={tripTypeParam}
                                    previousPositions={tripData}
                                    previousObservations={observationData}
                                    setTripName={setTripName}/>
                        }
                    </Map>
                    : null
                }
            </IonContent>
        </IonPage>
    )
}

export default OfflineMapPage;
