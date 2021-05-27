import "./SheepSwiper.css"
import {IonIcon, IonSlide, IonSlides} from "@ionic/react";
import React from "react";
import {add, chevronDown, chevronUp, remove} from "ionicons/icons";

const slideOptions = {
    direction: 'vertical',
    loop: true,
    speed: 150,
};

const SheepSwiper = (props) => {

    return(
        <div className="sheep-swiper-div" style={props.swiperStyle}>
            <IonSlides
                options={slideOptions}
                onIonSlidesDidLoad={ event => props.initializeSlide(event)}
                onIonSlideNextStart={() => props.updateSheepCount()}
                onIonSlidePrevStart={ () => props.updateSheepCount()}
            >
                <IonSlide>
                    <img src={props.sheepImageSrc} className="sheep-icon"/>
                </IonSlide>
                <IonSlide>
                    <img src={props.sheepImageSrc} className="sheep-icon"/>
                </IonSlide>
                <IonSlide>
                    <img src={props.sheepImageSrc} className="sheep-icon"/>
                </IonSlide>
            </IonSlides>

            <IonIcon icon={add} className="swiper-icon plus"/>
            <IonIcon icon={remove} className="swiper-icon minus"/>

            <IonIcon icon={chevronUp} className="swiper-icon chevron-up"/>
            <IonIcon icon={chevronDown} className="swiper-icon chevron-down"/>
        </div>
    )

}

export default SheepSwiper;
