import React, {useEffect, useState} from "react";
import "./DarkLightRegistration.css"
import SheepSwiper from "../sharedComponents/SheepSwiper";
import {updateSheepCount} from "../../../../../resources/ObservationResources"
import CloseObsButtonAndTitle from "../sharedComponents/CloseObsButtonAndTItle";

const lightSwiperStyle = {
    backgroundColor: '#1e1e1e',
    color: 'white'
}

const darkSwiperStyle = {
    backgroundColor: '#f2f2f2',
    color: 'black'
}

const DarkLightRegistration = (props) => {
    const [darkSwiper, setDarkSwiper] = useState();
    const [lightSwiper, setLightSwiper] = useState();

    const initializeLightSwiper = async (event) => {
        let swiper = await event.srcElement.getSwiper();
        if (props.lightSheep === 0) {
            swiper.allowSlidePrev = false;
        }
        setLightSwiper(swiper);
        swiper.update();
    }

    const initializeDarkSwiper = async (event) => {
        let swiper = await event.srcElement.getSwiper();
        if (props.darkSheep === 0) {
            swiper.allowSlidePrev = false;
        }
        setDarkSwiper(swiper);
        swiper.update();
    }

    return(
        <div>
            {props.closeObservation ?
                <CloseObsButtonAndTitle
                    title={"Lyse og mørke"}
                    closeObservation={props.closeObservation}
                    next={props.next}
                    nextIsDisabled={false}
                    previous={props.previous}
                    previousIsDisabled={false}
                />
                :
                null
            }

            <div className="text-div-bw">
                <h1 className="sheep-number"><b>{props.lightSheep}</b></h1>
                <h1 className="sheep-number"><b>{props.darkSheep}</b></h1>
            </div>

            <div className={props.closeObservation ? "black-white-swipers-close" : "black-white-swipers-far"}>
                <SheepSwiper
                    initializeSlide={initializeLightSwiper}
                    updateSheepCount={() => {updateSheepCount(lightSwiper, props.lightSheep, props.setLightSheep);}}
                    sheepImageSrc="./assets/white_sheep.png"
                    swiperStyle={lightSwiperStyle}
                />
                <SheepSwiper
                    initializeSlide={initializeDarkSwiper}
                    updateSheepCount={() => {updateSheepCount(darkSwiper, props.darkSheep, props.setDarkSheep);}}
                    sheepImageSrc="./assets/black_sheep_flipped.png"
                    swiperStyle={darkSwiperStyle}
                />
            </div>
        </div>
    )
}

export default DarkLightRegistration
