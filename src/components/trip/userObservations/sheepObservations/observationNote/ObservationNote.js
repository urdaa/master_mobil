import React, {useCallback, useEffect} from "react";
import {IonButton, IonItem, IonLabel, IonPopover, IonTextarea} from "@ionic/react";
import "./ObservationNote.css"


const ObservationNote = (props) => {

    useEffect( () => {
        if (props.isOpen) {
            document.addEventListener('ionBackButton', closePopoverWithBackButton);
        } else {
            document.removeEventListener('ionBackButton', closePopoverWithBackButton)
        }
    }, [props.isOpen])

    const closePopoverWithBackButton = useCallback((event) => {
        event.detail.register(1001, () => {
            props.setShowObservationNote(false);
        });
    }, []);

    return(
        <IonPopover
        isOpen={props.isOpen}
        onDidDismiss={() => props.setShowObservationNote(false)}
        backdropDismiss={false}
        cssClass="note-popover"
        >
            <div className="note-content">
                <div>
                    <IonItem className="obs-note-item">
                        <IonLabel position="stacked">Notat</IonLabel>
                        <IonTextarea
                            placeholder="Skriv notat her..."
                            onIonChange={e => props.setObservationNote(e.detail.value)}
                            value={props.observationNote}
                            rows="10"
                        />
                    </IonItem>
                </div>


                <div className="obs-note-buttons">
                    <IonButton
                        onClick={() => props.setShowObservationNote(false)}
                        fill="outline"
                        size="large"
                    >
                        Ok
                    </IonButton>
                </div>
            </div>
        </IonPopover>
    )
}

export default ObservationNote;
