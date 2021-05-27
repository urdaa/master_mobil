import React, {useCallback, useState} from 'react'
import 'leaflet/dist/leaflet.css'
import {Map, ScaleControl, TileLayer} from 'react-leaflet'
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import "./DownloadMapPage.css"
import SaveContainer from "../../components/mapStorage/SaveContainer";

const DownloadMapPage =() => {
    const [map, setMap] = useState(null);
    const [layer, setLayer] = useState(null);

    const onMapChange = useCallback( mapRef => {
        if (mapRef) {
            setMap(mapRef.leafletElement)
            // Ensures Leaflet is aware of the actual size of the map as the map is rendered before style (size) is applied
            setTimeout( () => {
                mapRef.leafletElement.invalidateSize();
            }, 400);
        }
    }, []);

    const onLayerChange = useCallback( layerRef => {
        if (layerRef) {
            setLayer(layerRef.leafletElement);
        }
    }, []);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Online-kart</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <Map ref={onMapChange} center={[63.4193000, 10.4021237]} zoom={13} maxZoom={17}>
                    <TileLayer ref={onLayerChange}
                        url="https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}"
                        attribution="&copy; <a href=&qout;http://www.kartverket.no/&qout;>Kartverket</a>"
                    />
                    <ScaleControl imperial={false} metric={true}/>
                    <SaveContainer map={map} layer={layer}/>
                </Map>
            </IonContent>
        </IonPage>
    )
}

export default DownloadMapPage;
