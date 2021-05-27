import "./Instructions.css"
import React from 'react';
import { IonSlides, IonSlide, IonModal, IonButton } from '@ionic/react';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
    initialSlide: 0,
    speed: 400
};

const Instructions = (props) => {

    return (
        <IonModal
            isOpen={props.show}
            onDidDismiss={() => props.setShow(false)}
            cssClass="instructions-modal"
        >
            <IonSlides
                className="instructions-slides"
                pager={true}
                options={slideOpts}
            >
                <IonSlide>
                    <div className="slide-content">
                        <h2>Velkommen</h2>
                        <p>Du skal nå lære hvordan man: <br/><br/>
                        Laster ned kart <br/>
                        Registrerer gårder <br/>
                        Starter en oppsynstur <br/><br/>
                        Som er alt du trenger for å starte å bruke appen.</p>
                    </div>
                </IonSlide>
                <IonSlide>
                    <div className="slide-content">
                        <img src="./assets/instructions/meny.png" className="instructions-img"/>
                        <h2>Meny</h2>
                        <p>Start ved å åpne menyen. Trykk på "Meny"-knappen,
                            de 3 strekene i det høyre hjørnet,
                            eller dra ut fra venstre side på skjermen
                        </p>
                    </div>
                </IonSlide>
                <IonSlide>
                    <div className="slide-content">
                        <img src="./assets/instructions/last_ned.png" className="instructions-img"/>
                        <h2>Last ned kart</h2>
                        <p>Gå til "Last ned kart", naviger deg til området du ønsker å laste ned og trykk "last ned".
                        Gi deretter kartet et unikt beskrivende navn, trykk "START NEDLASTNING"
                            og vent til det står at kartet er lastet ned som vist over
                        </p>
                    </div>
                </IonSlide>
                <IonSlide>
                    <div className="slide-content">
                        <img src="./assets/instructions/oremerker.png" className="instructions-img"/>
                        <h2>Registrere øremerke </h2>
                        <p>Naviger deretter til "Gårder / Øremerker" fra menyen". Her kan du registere Gårdsnavn og øremerke på dyr fra andre gårder du vet kan være i samme utmark.
                        </p>
                    </div>
                </IonSlide>
                <IonSlide>
                    <div className="slide-content">
                        <img src="./assets/instructions/start_oppsyn.png" className="instructions-img"/>
                        <h2>Starte oppsynstur</h2>
                        <p>Trykk "Ny Oppsynstur" i menyen og velg kartet du har lastet ned. Når du har startet turen kan den gjenopptas hvis noe skulle gå galt underveis."
                        </p>
                    </div>
                </IonSlide>
                <IonSlide>
                    <div className="slide-content">
                        <img src="./assets/instructions/oppsynstur_topp.png" className="instructions-img"/>
                        <h2>Oppsynstur-skjermen 1</h2>
                        <p>Øverst til venstre i kartet er knapper for å zoome inn og ut, og under disse en knapp som tar deg til egen posisjon.
                            Det røde krysset kan trykkes for å avslutte eller pause turen, og under er det et kompass.
                        </p>
                    </div>
                </IonSlide>
                <IonSlide>
                    <div className="slide-content">
                        <img src="./assets/instructions/oppsynstur_bot.png" className="instructions-img"/>
                        <h2>Oppsynstur-skjermen 2</h2>
                        <p>Nederst til høyre har man knapp for å registere observasjoner av sauer,
                            mens nederst til venstre er det en knapp for å få opp mindre vanlige observasjoner, som døde eller skadde dyr og råvillt.
                        </p>
                    </div>
                </IonSlide>
                <IonSlide>
                    <div className="slide-content">
                        <img src="./assets/instructions/gult_spm.png" className="instructions-img"/>
                        <h2>Observasjoner</h2>
                        <p> Etter å ha valgt en observasjon, f.eks. av sau, må man velge hvor på kartet man ser sauen.
                            Derretter får man opp en skjerm for å gjennomføre observasjonen, og det finnes et gult spørsmålstegn man kan trykke på for å få mer info om hver av disse.
                        </p>
                    </div>
                </IonSlide>
                <IonSlide>
                    <div className="slide-content">
                        <img src="./assets/instructions/last_opp.png" className="instructions-img"/>
                        <h2>Opplasting av oppsynsturer</h2>
                        <p> Etter å ha fullført en oppsynstur kan man laste opp disse til webpoertalen. For å gjøre dette må man lage en konto.
                            Her kan man også bli medlem av beitelag, som gjør delingen av turer enklere.
                        </p>
                    </div>
                </IonSlide>
            </IonSlides>
        </IonModal>
    )
};

export default Instructions;
