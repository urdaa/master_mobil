import "./FarmPage.css"
import React, {useState} from "react";
import {
    IonAlert,
    IonButton,
    IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader, IonIcon, IonItem, IonItemDivider,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from "@ionic/react";
import {deleteFarm, deleteMap, getFarmsFromStorage, getMapsFromStorage} from "../../resources/StorageResources";
import FarmRegistrationModal from "../../components/farmRegistration/FarmRegistrationModal";
import EarTagDisplay from "../../components/farmRegistration/EarTagDisplay";
import {home} from "ionicons/icons";

const FarmPage = () => {
    const [farms, setFarms] = useState([]);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [pendingDeleteFarm, setPendingDeleteFarm] = useState(null);
    const [showFarmRegistrationModal, setShowFarmRegistrationModal] = useState(false);

    useIonViewWillEnter( () => {
        getFarmsFromStorage()
            .then( newFarms => setFarms(newFarms))
            .catch(e => console.log(e));
    });

    const deleteStoredFarm = async (name) => {
        await deleteFarm(name)
        setFarms(farms.filter( farm => farm.farmName !== name))
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Gårder</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonItemDivider className="farm-divider-no-padding">
                    <div className="farm-button-div">
                        <IonButton
                            onclick={() => setShowFarmRegistrationModal(true)}
                            fill="outline"
                            color="dark"
                            className="farm-button"
                        >
                            <IonIcon icon={home} slot="start" className="farm-page-farm-icon"/>
                            Registrer gård
                        </IonButton>
                    </div>
                </IonItemDivider>

                <div>
                    {farms.map(farmInfo =>
                        <IonCard key={farmInfo.farmName}>
                            <IonCardHeader>
                                <IonCardTitle>Gård: {farmInfo.farmName}</IonCardTitle>
                                <IonCardSubtitle className="farm-page-card-sub">
                                    Øremerke:
                                    <span className="farm-page-ear-tag-span">
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

                            <IonItem>
                                <IonButton fill="outline" color="danger" slot="end" onClick={() => {
                                    setPendingDeleteFarm(farmInfo.farmName)
                                    setShowDeleteAlert(true);
                                }}>Slett gård</IonButton>
                            </IonItem>
                        </IonCard>
                    )}
                </div>
            </IonContent>

            <FarmRegistrationModal
                isOpen={showFarmRegistrationModal}
                setShowFarmRegistrationModal={setShowFarmRegistrationModal}
                addFarm={(farm => {setFarms([...farms, farm])})}
            />

            <IonAlert
                isOpen={showDeleteAlert}
                onDidDismiss={() => setShowDeleteAlert(false)}
                header={'Slette gård: ' + pendingDeleteFarm + "?"}
                buttons={[
                    {
                        text: 'Ja',
                        handler: () => deleteStoredFarm(pendingDeleteFarm)
                    },
                    {
                        text: 'Nei'
                    }
                ]}
            />
        </IonPage>
    )
}

export default FarmPage;
