import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonItem,
    IonLabel,
    IonPopover,
    IonButton
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {getFarmsFromStorage} from "../../../../../resources/StorageResources";
import EarTagDisplay from "../../../../farmRegistration/EarTagDisplay";


const TagPopover = (props) => {
    const [farms, setFarms] = useState([]);

    //Updates farms
    useEffect(() => {
        getFarmsFromStorage()
            .then( newFarms => setFarms(newFarms))
            .catch(e => console.log(e));
    }, [])

    return(
        <IonPopover
            isOpen={props.isOpen}
            onDidDismiss={() => props.setIsOpen(false)}
            cssClass="tag-popover"
        >
            <div className="tag-popover-div">

                {farms.map(farmInfo =>
                    <IonCard key={farmInfo.farmName} >
                        <IonItem
                            onClick={() => {
                                props.setEartag(farmInfo);
                                props.setIsOpen(false);
                            }}
                        >
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
                        </IonItem>
                    </IonCard>
                )}

            </div>
        </IonPopover>
    )
}

export default TagPopover;
