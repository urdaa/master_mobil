import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle
} from '@ionic/react';

import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {walk, map, document, settings, trailSign, download, alertCircle, home, cloudUpload} from 'ionicons/icons';
import './Menu.css';
import { menuController } from "@ionic/core";
import {getTripsFromStorage} from "../resources/StorageResources";
import UnfinishedTripsPage from "../pages/unFinishedTripsPage/UnfinishedTripsPage";
import { IonItemDivider } from "@ionic/react";

interface AppPage {
  title: string;
  url: string;
  icon: string;
}

const conditionalAppPages: AppPage[] = [
  {
    title: 'Uferdige Oppsynsturer',
    url: '/unfinishedTrips',
    icon: alertCircle
  }
]

const appPages: AppPage[] = [
  {
    title: 'Ny Oppsynstur',
    url: '/newTrip',
    icon: walk
  },
  {
    title: 'Fullførte Oppsynsturer',
    url: '/finishedTrips',
    icon: trailSign
  },
  {
    title: 'Last Ned Kart',
    url: '/onlineMap',
    icon: download
  },
  {
    title: 'Mine Kart',
    url: '/myMaps',
    icon: map
  },
  {
    title: 'Gårder / Øremerker',
    url: '/farms',
    icon: home
  },
  {
    title: 'Instillinger',
    url: '/page/Instillinger',
    icon: settings
  },
];

const bottomAppPages: AppPage[] = [
  {
    title: "Last opp turer",
    url: '/uploadTrips',
    icon: cloudUpload
  }
]

const Menu: React.FC = () => {
  const location = useLocation();
  const [unfinishedTrips, setUnfinishedTrips] = useState(false);

  const checkActiveTrips = () => {
    getTripsFromStorage("unfinished")
        .then( newTrips => {
          // @ts-ignore
          newTrips.files.length !== 0 ? setUnfinishedTrips(true) : setUnfinishedTrips(false)})
        .catch(e => console.log(e));
  }

  return (
    <IonMenu contentId="main" type="overlay" onIonWillOpen={checkActiveTrips}>
      <IonContent>
        <IonList id="menu-list">
          <IonListHeader id="menu-header">
            <Link to="/startup" onClick={async () => await menuController.toggle()} className="menu-link">
              <IonLabel className="header-label" >MasterSau</IonLabel>
            </Link>
            <IonItem lines="none">
              <Link to="/startup" className="menu-link" slot="end">
                <img onClick={async () => await menuController.toggle()} id="menu-logo" src="./assets/sheep_cropped.png"/>
              </Link>
            </IonItem>
          </IonListHeader>
          {unfinishedTrips ?
              <IonMenuToggle autoHide={false}>
                <IonItem className={location.pathname === conditionalAppPages[0].url ? 'selected' : ''} routerLink={conditionalAppPages[0].url} routerDirection="none" detail={false}>
                  <IonIcon slot="start" icon={conditionalAppPages[0].icon} />
                  <IonLabel>{conditionalAppPages[0].title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
              : null
          }
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

          <IonMenuToggle autoHide={false}>
            <IonItem className={location.pathname === bottomAppPages[0].url ? 'selected menu-top-border' : 'menu-top-border'} routerLink={bottomAppPages[0].url} routerDirection="none" detail={false}>
              <IonIcon slot="start" icon={bottomAppPages[0].icon} />
              <IonLabel>{bottomAppPages[0].title}</IonLabel>
            </IonItem>
          </IonMenuToggle>

        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
