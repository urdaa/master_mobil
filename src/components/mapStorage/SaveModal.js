import {
    IonAlert,
    IonButton, IonInput, IonItem,
    IonModal, IonProgressBar, IonTitle, IonToolbar,
} from "@ionic/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {FilesystemDirectory, FilesystemEncoding, Plugins} from "@capacitor/core";
import {
    allLetter,
    createDir,
    deleteMap,
    dirExists,
    downloadBase64FromPath,
    saveTile
} from "../../resources/StorageResources";
import "./SaveModal.css";

const { Filesystem, Keyboard } = Plugins;

const dlStatus = {
    NOT_STARTED: "Ikke startet",
    ONGOING: "Pågående",
    ERROR: "Avbrutt av feil",
    DONE: "Ferdig",
    RETRYING: "Prøver på nytt"
}

const SaveModal = (props) => {
    const [mapName, setMapName] = useState("");
    const [progress, setProgress] = useState(0);
    const [downloadStatus, setDownloadStatus] = useState(dlStatus.NOT_STARTED);
    const [downloadedTiles, setDownloadedTiles] = useState([]);

    const [showNameAlert, setShowNameAlert] = useState(false);
    const [showDownloadAlert, setShowDownloadAlert] = useState(false);
    const [showQuitAlert, setShowQuitAlert] = useState(false);
    const [showAbortAlert, setShowAbortAlert] = useState(false);

    const downloadAborted = useRef(false);

    //Spawns warning on hardware back-button click when dl in progress
    useEffect( () => {
        if (downloadStatus === dlStatus.ONGOING) {
            document.addEventListener('ionBackButton', closeModalWithBackButton);
        } else {
            document.removeEventListener('ionBackButton', closeModalWithBackButton);
        }
    }, [downloadStatus])

    const closeModalWithBackButton = useCallback((event) => {
        event.detail.register(1002, () => {
            setShowQuitAlert(true);
        });
    }, []);

    const validateAndSave = async (name) => {
        if (await validate(name)) {
            await createDir('maps/' + name);

            setDownloadStatus(dlStatus.ONGOING);
            //Create and save a json file with map info inside the map folder
            let mapInfo = props.mapInfo;
            mapInfo['name'] = name;
            let objectString = JSON.stringify(mapInfo);
            await Filesystem.writeFile({
                path: 'maps/' + name + '/' + name,
                directory: FilesystemDirectory.Data,
                data: objectString,
                encoding: FilesystemEncoding.UTF16
            }).catch(e => console.log(e));

            await downloadAndSaveTiles(props.tiles, name, []);
        } else {
            setShowNameAlert(true);
        }
    }

    /** Helper function for validating map name and uniqueness */
    const validate = async (name) => {
        if (name.length === 0 || !allLetter(name)) {
            return false;
        } else {
            return !await dirExists('maps/' + name);
        }
    }

    /** Helper function for downloading and saving tiles as well as controlling the progress bar */
    const downloadAndSaveTiles = async (tiles, mapName, savedTiles, totalTiles = props.tiles.length, retries = 0) => {
        let errorCaught = false;

        //Split into 'sub-tasks' so that not all tiles are attempted downloaded at once
        let subArraySize = 300;
        let nestedTilesArray = [];
        for (let i = 0; i < tiles.length; i += subArraySize) {
            nestedTilesArray.push(tiles.slice(i, i + subArraySize));
        }

        //Map does not wait for 'await' so 'for ... of' is used
        for(const nestedTiles of nestedTilesArray) {
            await Promise.all(nestedTiles.map(async (tile) => {
                await downloadBase64FromPath(tile.url).then( async (base64String) =>{
                    await saveTile(tile.x + "_" + tile.y + "_" + tile.z, base64String, mapName);
                    savedTiles.push(tile);
                    setProgress((savedTiles.length/totalTiles).toFixed(2))
                }).catch( (e) => {
                    console.log(e);
                    errorCaught = true;
                });
            }));
            //Escape hatch for aborting download
            if (downloadAborted.current === true) {
                deleteMap(mapName);
                return;
            }
        }

        //Try to re-download requests that timed out or similar
        if (errorCaught && retries >= 5) {
            setDownloadedTiles(savedTiles);
            setShowDownloadAlert(true);
            setDownloadStatus(dlStatus.ERROR);
            return;
        } else if (errorCaught) {
            let remainingTiles = props.tiles.filter( tile => {
                return !savedTiles.some( savedTile =>  tile.key === savedTile.key );
            });
            downloadAndSaveTiles(remainingTiles, mapName, savedTiles, props.tiles.length, retries + 1).
                catch( e => console.log(e));
        } else {
            setDownloadStatus(dlStatus.DONE);
        }
    };

    const retryDownload = () => {
        //Filter out already downloaded tiles
        let remainingTiles = props.tiles.filter( tile => {
            return !downloadedTiles.some( savedTile =>  tile.key === savedTile.key );
        });
        setDownloadStatus(dlStatus.RETRYING);
        downloadAndSaveTiles(remainingTiles, mapName, [], remainingTiles.length).catch( e => console.log(e))
    }

    const abortDownload = () => {
        downloadAborted.current = true;
        closeModalCleanup();
    }

    const closeModal = () => {
        if (downloadStatus === dlStatus.ONGOING) {
            setShowQuitAlert(true);
        } else {
            props.closeSaveModal();
        }
    }

    const closeModalCleanup = () => {
        setProgress(0);
        setDownloadStatus(dlStatus.NOT_STARTED);
        props.closeSaveModal();
    }

    const hideKeyBoard = (event) => {
        event.preventDefault();
        Keyboard.hide();
    }

    return(
        <div>
            <IonModal
                isOpen={props.isOpen}
                onDidDismiss={() => closeModalCleanup()}
                cssClass="save-modal"
                backdropDismiss={false}>

                <div className="content-save">
                    <h1 className="title">Last Ned Kart</h1>
                    <div className="info-div">
                        <p>Antall kart-biter: {props.tiles.length}</p>
                        <p>Størrelse: ~{(props.tiles.length * 0.03).toFixed(1)}MB</p>
                    </div>
                    <form onSubmit={hideKeyBoard}>
                        <IonItem className="name-input">
                            <IonInput
                                placeholder="Oppgi unikt kartnavn"
                                onIonChange={e => setMapName(e.detail.value)}
                                disabled={downloadStatus !== dlStatus.NOT_STARTED}/>
                        </IonItem>
                    </form>
                    <p className="save-p">Nedlastning: <b>{downloadStatus}</b></p>
                    <IonProgressBar className="progress-bar" value={progress}/>

                    { downloadStatus === dlStatus.NOT_STARTED ?
                        <IonButton
                            className="save-buttons"
                            fill="outline"
                            onClick={() => validateAndSave(mapName)}
                        >
                            Start Nedlastning
                        </IonButton>
                        :
                        <IonButton
                            className="save-buttons"
                            fill="outline"
                            color="warning"
                            onClick={() => setShowAbortAlert(true)}
                        >
                            Avbryt
                        </IonButton>
                    }
                    <IonButton
                        className="save-buttons"
                        fill="outline"
                        color="danger"
                        onClick={() => closeModal()}
                    >
                        Lukk
                    </IonButton>
                </div>
            </IonModal>

            <IonAlert
                isOpen={showNameAlert}
                onDidDismiss={() => setShowNameAlert(false)}
                header={'Error'}
                message={'Kartnavn må være unikt og bare bestå av store og små bokstaver.'}
                buttons={['OK']}
            />

            <IonAlert
                isOpen={showDownloadAlert}
                onDidDismiss={() => setShowDownloadAlert(false)}
                header={'Nedlastningsfeil'}
                message={'Det skjedde en feil under nedlastningen og ikke alle kart-biter kunne lastes ned. '}
                buttons={[
                    {
                        text: 'Last ned resterende biter',
                        handler: () => retryDownload()
                    },
                    {
                        text: 'Slett kart',
                        handler: () => deleteMap(mapName).catch( e => console.log(e))
                    },
                    {
                        text: 'Behold uferdig kart'
                    }
                ]}
            />

            <IonAlert
                isOpen={showQuitAlert}
                onDidDismiss={() => setShowQuitAlert(false)}
                header={'Forlate nedlastnings-siden?'}
                message={'Nedlastningen vil fortsette, men kan føre til uforutsett oppførsel'}
                buttons={[
                    {
                        text: 'Ja',
                        handler: () => props.closeSaveModal()
                    },
                    {
                        text: 'Nei'

                    }
                ]}
            />

            <IonAlert
                isOpen={showAbortAlert}
                onDidDismiss={() => setShowAbortAlert(false)}
                header={'Avbryte nedlastning?'}
                message={'Nedlasted materiale vil bli slettet og siden lukket.'}
                buttons={[
                    {
                        text: 'Ja',
                        handler: () => abortDownload()
                    },
                    {
                        text: 'Nei',
                    }
                ]}
            />
        </div>
    );
}

export default SaveModal;
