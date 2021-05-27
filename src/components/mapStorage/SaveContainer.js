import {IonButton, IonIcon} from "@ionic/react";
import React, {useCallback, useEffect, useState} from "react";
import "./SaveContainer.css"
import { getTilesInBounds } from "../../resources/StorageResources";
import SaveModal from "./SaveModal";
import {downloadOutline} from "ionicons/icons";

const SaveContainer = (props) =>  {
    const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
    const [pendingActionTiles, setPendingActionTiles] = useState([]);
    const [mapInfo, setMapInfo] = useState({});

    //Closes modal with hardware back-button
    useEffect( () => {
        if (saveModalIsOpen) {
            document.addEventListener('ionBackButton', closeModalWithBackButton);
        } else {
            document.removeEventListener('ionBackButton', closeModalWithBackButton);
        }
    }, [saveModalIsOpen])

    const closeModalWithBackButton = useCallback((event) => {
        event.detail.register(1001, () => {
            closeSaveModal();
        });
    }, []);

    const prepSaveTiles = () => {
        const minZoom = 12;
        const maxZoom = 17;
        const currentZoom = props.map.getZoom();
        let zoomLevels = [];

        if (currentZoom < minZoom) {
            alert("Kartet er for stort til å lastes ned.");
            return;
        }
        for (let zoom = currentZoom; zoom <= maxZoom; zoom += 1) {
            zoomLevels.push(zoom);
        }

        //Get urls for tiles in view from current zoom level down to maxZoom
        let tiles = getTilesInBounds(props.map, props.layer, zoomLevels);

        setPendingActionTiles(tiles);
        setSaveModalIsOpen(true);
        setMapInfo({
            "minZoom": currentZoom,
            "maxZoom": maxZoom,
            "bounds": props.map.getBounds(),
            "center": props.map.getCenter(),
            "nTiles": tiles.length
        });
    }

    const closeSaveModal = async () => {
        setSaveModalIsOpen(false);
        setPendingActionTiles([]);
    }


    return (
        <div>
            <IonButton onClick={ () => prepSaveTiles()} id="save-button" color="light" size="large">
                <IonIcon icon={downloadOutline} slot="start"/>
                VELG OMRÅDE
            </IonButton>
            <SaveModal
                closeSaveModal={closeSaveModal}
                isOpen={saveModalIsOpen}
                tiles={pendingActionTiles}
                mapInfo={mapInfo}
            />
        </div>
    )

}

export default SaveContainer;
