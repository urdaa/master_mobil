import "./EarTagRegistration.css"
import CloseObsButtonAndTitle from "../sharedComponents/CloseObsButtonAndTItle";
import React, {useEffect, useState} from "react";
import {
    IonAlert,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonCheckbox,
    IonItem,
    IonLabel
} from "@ionic/react";
import EarTagDisplay from "../../../../farmRegistration/EarTagDisplay";
import {deleteFarm, getFarmsFromStorage} from "../../../../../resources/StorageResources";

const EarTagRegistration = (props) => {
    const [farms, setFarms] = useState([]);

    //Updates farms
    useEffect(() => {
        getFarmsFromStorage()
            .then( newFarms => setFarms(newFarms))
            .catch(e => console.log(e));
    }, [])

    const toggleObservedFarm = (farmName) => {
        if (props.observedFarms.includes(farmName)) {
            props.setObservedFarms(props.observedFarms.filter(farm => farm !== farmName));
        } else {
            props.setObservedFarms([...props.observedFarms, farmName])
        }
    }

    return (
        <div>
            <CloseObsButtonAndTitle
                title={"Øremerker"}
                closeObservation={props.closeObservation}
                next={null}
                nextIsDisabled={true}
                previous={props.previous}
                previousIsDisabled={false}
            />

            {farms.map(farmInfo =>
                <IonCard key={farmInfo.farmName}>
                    <IonItem>
                        <IonCardHeader>
                            <IonCardTitle>Gård: {farmInfo.farmName}</IonCardTitle>
                            <IonCardSubtitle className="tag-reg-card-sub">
                                Øremerke:
                                <span className="tag-reg-span">
                                    {farmInfo.earTagColors === "1" ?
                                        <EarTagDisplay
                                            earTagColors={farmInfo.earTagColors}
                                            color1={farmInfo.color1}
                                        />
                                        :
                                        <EarTagDisplay
                                            earTagColors={farmInfo.earTagColors}
                                            color1={farmInfo.color1}
                                            color2={farmInfo.color2}
                                        />
                                    }
                                </span>
                            </IonCardSubtitle>
                        </IonCardHeader>

                        <IonLabel className="tag-reg-label"><b>Observert: </b></IonLabel>
                        <IonCheckbox
                            checked={props.observedFarms.includes(farmInfo.farmName)}
                            onIonChange={() => toggleObservedFarm(farmInfo.farmName)}
                        />
                    </IonItem>
                </IonCard>
            )}
        </div>

    )
}

export default EarTagRegistration;
