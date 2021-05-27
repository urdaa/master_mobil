import L from "leaflet";
import {Capacitor, FilesystemDirectory, FilesystemEncoding, Plugins} from "@capacitor/core";
import { HTTP } from '@ionic-native/http';

const { Filesystem } = Plugins;

export const downloadBase64FromPath = path => {
    HTTP.setRequestTimeout(10);
    return new Promise(async (resolve, reject) => {
        try{
            let options = { method: 'get', responseType: 'blob' };
            let res = await HTTP.sendRequest(path, options);
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject('method did not return a string')
                }
            };
            reader.readAsDataURL(res.data);
        }catch (e) {
            reject(e);
        }
    });
}

export const saveTile = async (tileKey, base64String, mapName) => {
    try {
        return await Filesystem.writeFile({
            path: 'maps/' + mapName + '/' + tileKey,
            data: base64String,
            directory: FilesystemDirectory.Data,
        })
    } catch(e) {
        console.error('Unable to write file', e);
    }
}

export const getTileUrls = (layer, bounds, zoom) => {
    const tiles = [];
    const tileBounds = L.bounds(
        bounds.min.divideBy(layer.getTileSize().x).floor(),
        bounds.max.divideBy(layer.getTileSize().x).floor(),
    );
    for (let j = tileBounds.min.y; j <= tileBounds.max.y; j += 1) {
        for (let i = tileBounds.min.x; i <= tileBounds.max.x; i += 1) {
            const data = {
                ...layer.options, x: i, y: j, z: zoom,
            };
            tiles.push({
                url: L.Util.template(layer._url, { ...data }),
                z: zoom,
                x: i,
                y: j,
                key: i + "_" + j + "_" + zoom
            });
        }
    }
    return tiles;
}

export const getTilesInBounds = (mapElement, layerElement, zoomLevels) => {
    let bounds;
    let tiles = [];
    const latlngBounds = mapElement.getBounds();
    for (let i = 0; i < zoomLevels.length; i += 1) {
        bounds = L.bounds(
            mapElement.project(latlngBounds.getNorthWest(), zoomLevels[i]),
            mapElement.project(latlngBounds.getSouthEast(), zoomLevels[i]),
        );
        tiles = tiles.concat(getTileUrls(layerElement, bounds, zoomLevels[i]));
    }
    return tiles
}

/** Returns contents of a dir, returns [] and creates it if it does not already exist */
export const readDirOrCreate = dirName => {
    return new Promise( async(resolve, reject) => {
        try {
            let dirFiles = await Filesystem.readdir({
                path: dirName,
                directory: FilesystemDirectory.Data
            })
            resolve(dirFiles.files)
        } catch(e) {
            try {
                await Filesystem.mkdir({
                    path: dirName,
                    directory: FilesystemDirectory.Data,
                    recursive: false
                });
                resolve([])
            } catch(e) {
                reject('Unable to make directory', e);
            }
        }
    });
}

export const dirExists = dirName => {
    return new Promise( async(resolve) => {
        await Filesystem.stat({
            path: dirName,
            directory: FilesystemDirectory.Data
        }).catch( () => resolve(false) )
        resolve(true)
    })
}

export const fileExists = fileName => {
    return new Promise( async(resolve) => {
        await Filesystem.stat({
            path: fileName,
            directory: FilesystemDirectory.Data
        }).catch( () => resolve(false) )
        resolve(true)
    })
}

export const createDir =  dirName => {
    return new Promise( async(resolve, reject) => {
        await Filesystem.mkdir({
            path: dirName,
            directory: FilesystemDirectory.Data,
            recursive: false
        }).catch( e => reject("Could not create directory", e));
        resolve(true);
    })
}

export const getTile = tileKey => {
    return new Promise( async (resolve, reject) => {
        let fullPath = await Filesystem.getUri({
            path: "map_tiles/" + tileKey,
            directory: FilesystemDirectory.Data
        }).catch( e =>
            reject(e)
        )
        resolve(Capacitor.convertFileSrc(fullPath.uri))
    });
}

export const getStoredTilesAsJson = (map, layer, tiles) => {
    const featureCollection = {
        type: 'FeatureCollection',
        features: [],
    };

    for (let i = 0; i < tiles.length; i += 1) {
        const tileData = tiles[i].split("_") // tileData = [x, y, z]

        let coords = new L.Point(tileData[0], tileData[1]);
        let tileSize = layer.getTileSize()

        let nwPoint = coords.scaleBy(tileSize)
        let sePoint = nwPoint.add(tileSize)

        let nw = map.unproject(nwPoint, tileData[2])
        let se = map.unproject(sePoint, tileData[2]);

        featureCollection.features.push({
            type: 'Feature',
            //properties: tiles[i],
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [nw.lng, nw.lat],
                        [se.lng, nw.lat],
                        [se.lng, se.lat],
                        [nw.lng, se.lat],
                        [nw.lng, nw.lat],
                    ],
                ],
            },
        });
    }
    return featureCollection;
}

export const getMapsFromStorage = async () => {
    let mapFolders = await Filesystem.readdir({
        path: "maps/",
        directory: FilesystemDirectory.Data
    }).catch( e => console.log(e));
    let newMaps = []
    for (let i in mapFolders.files) {
        let mapInfo = await Filesystem.readFile({
            path: "maps/" + mapFolders.files[i] + "/" + mapFolders.files[i],
            directory: FilesystemDirectory.Data,
            encoding: FilesystemEncoding.UTF16
        })
        newMaps.push(JSON.parse(mapInfo.data));
    }
    return newMaps;
}

export const getMapFromStorage = async (mapName) => {
    let mapInfo = await Filesystem.readFile({
        path: "maps/" + mapName + "/" + mapName,
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF16
    })
    return JSON.parse(mapInfo.data);
}

export const deleteMap = async (name) => {
    if (name.length !== 0) {
        await Filesystem.rmdir({
            path:'maps/' + name,
            directory: FilesystemDirectory.Data,
            recursive: true,
        }).catch(e => console.log(e));
    }
}

export const getFarmsFromStorage = async () => {
    let farmFiles = await Filesystem.readdir({
        path: "farms/",
        directory: FilesystemDirectory.Data
    }).catch( e => console.log(e));
    let newFarms = []
    for (let i in farmFiles.files) {
        let farmInfo = await Filesystem.readFile({
            path: "farms/" + farmFiles.files[i],
            directory: FilesystemDirectory.Data,
            encoding: FilesystemEncoding.UTF16
        })
        newFarms.push(JSON.parse(farmInfo.data));
    }
    return newFarms;
}

export const deleteFarm = async (name) => {
    if (name.length !== 0) {
        await Filesystem.deleteFile({
            path:'farms/' + name,
            directory: FilesystemDirectory.Data,
        }).catch(e => console.log(e));
    }
}

export const saveFarm = async (farmName, json) => {
    await Filesystem.writeFile({
        path: 'farms/'+ farmName,
        directory: FilesystemDirectory.Data,
        data: json,
        encoding: FilesystemEncoding.UTF16
    }).catch(e => console.log(e));
}

export const getTripsFromStorage = async (subFolder) => {
    return await Filesystem.readdir({
        path: "trips/" + subFolder + "/",
        directory: FilesystemDirectory.Data
    }).catch( e => console.log(e));
}

export const appendTripFile = async (fileName, data) => {
    await Filesystem.appendFile({
        path: 'trips/unfinished/'+ fileName,
        directory: FilesystemDirectory.Data,
        data: data,
        encoding: FilesystemEncoding.UTF16
    }).catch(e => console.log(e));
}

export const getFinshedTrip = async (tripName) => {
    return Filesystem.readFile({
        path: 'trips/finished/' + tripName,
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF16
    }).catch(e => console.log(e));
}

/** Helper function for checking that file names only includes letters */
export const allLetter = (name) => {
    let letters = /^[A-Za-zæøåÆØÅ]+$/;
    return name.match(letters);
}
