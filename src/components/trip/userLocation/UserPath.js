import React, {useEffect, useState} from "react";
import {FilesystemDirectory, FilesystemEncoding, Plugins} from "@capacitor/core";
import {Polyline} from "react-leaflet";
import {appendTripFile} from "../../../resources/StorageResources";
import StartAndFinishIcons from "./StartAndFinishIcons";

const { Filesystem } = Plugins;

const UserPath = props => {
    const [positions, setPositions] = useState([]);

    //Loads existing trip, sets up new one or clears old data
    useEffect( () => {
        if (props.tripType === "newTrip" && !props.tripName) {
            setPositions([]);
        }
        else if (props.tripType === "newTrip" && props.tripName !== undefined) {
            saveFile(props.tripName);
            setPositions([]);
        }
        else if ( (props.tripType === "unfinishedTrip" || props.tripType === "finishedTrip")) {
            setPositions(props.previousPositions)
        }
    },[props.tripName, props.previousPositions, props.tripType]);

    //Updates polyline with new position
    useEffect( () => {
        if (props.position !== undefined && (props.tripType === "newTrip" || props.tripType === "unfinishedTrip")) {
            let locationObject = buildPositionObject(props.position);
            if (positions.length === 0) {
                appendTripFile(props.tripName, JSON.stringify(locationObject));
            } else {
                appendTripFile(props.tripName, "," + JSON.stringify(locationObject));
            }
            setPositions([...positions, locationObject]);
        }
    },[props.position]);

    const saveFile = async (tripName) => {
        await Filesystem.writeFile({
            path: 'trips/unfinished/'+ tripName,
            directory: FilesystemDirectory.Data,
            data: "[",
            encoding: FilesystemEncoding.UTF16
        }).catch(e => console.log(e));
    }

    const buildPositionObject = locationData => {
        let data = {
            accuracy: locationData.accuracy,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            timeStamp: locationData.timeStamp,
            id: locationData.id
        }
        if (positions.length === 0) {
            data["prevLatitude"] = locationData.latitude;
            data["prevLongitude"] = locationData.longitude;
        } else {
            data["prevLatitude"] = positions[positions.length - 1].latitude;
            data["prevLongitude"] = positions[positions.length - 1].longitude;
        }
        return data
    }

    return(
        <div>
            {positions.map(({id, prevLatitude, prevLongitude, latitude, longitude}) => {
                    return <Polyline key={id} positions={[
                        [prevLatitude, prevLongitude], [latitude, longitude],
                    ]} color={'red'} />
                })}

            <StartAndFinishIcons
                tripType={props.tripType}
                positions={positions}
            />
        </div>
    );
}

export default UserPath;
