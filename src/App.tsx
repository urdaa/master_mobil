import Menu from './components/Menu';
import Page from './pages/Page';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import DownloadMapPage from "./pages/downloadMapPage/DownloadMapPage";
import MyMapsPage from "./pages/myMapsPage/MyMapsPage";
import StartupPage from "./pages/startupPage/StartupPage";
import NewTripPage from "./pages/newTripPage/NewTripPage";
import UnfinishedTripsPage from "./pages/unFinishedTripsPage/UnfinishedTripsPage";
import FinishedTripsPage from "./pages/finishedTripsPage/FinishedTripsPage";
import OfflineMapPage from "./pages/offlineMapPage/OfflineMapPage";
import FarmPage from "./pages/farmPage/FarmPage";
import UploadTripPage from "./pages/uploadTripPage/UploadTripPage";

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/newTrip" component={NewTripPage} exact />
            <Route path="/onlineMap" component={DownloadMapPage} exact />
            <Route path="/myMaps" component={MyMapsPage} exact />
            <Route path="/unfinishedTrips" component={UnfinishedTripsPage} exact />
            <Route path="/finishedTrips" component={FinishedTripsPage} exact />
            <Route path="/startup" component={StartupPage} exact />
            <Route path="/offlineMap/:mapNameParam/:tripTypeParam?/:tripNameParam?" component={OfflineMapPage} exact />
            <Route path="/farms" component={FarmPage} exact />
            <Route path="/uploadTrips" component={UploadTripPage} exact />
            <Redirect from="/" to="/startup" exact />
            <Route path="/page/:name" component={Page} exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
