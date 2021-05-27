import "./TotalRegistration.css"
import SheepSwiper from "../sharedComponents/SheepSwiper";
import React, {useEffect, useState} from "react";
import {updateSheepCount} from "../../../../../resources/ObservationResources";
import CloseObsButtonAndTitle from "../sharedComponents/CloseObsButtonAndTItle";

const greySwiperStyle = {
    backgroundColor: "#0d0d0d",
    color: '#999594'
}



const TotalRegistration = (props) => {
    const [totalSwiper, setTotalSwiper] = useState(0);


    const initializeTotalSwiper = async (event) => {
        let swiper = await event.srcElement.getSwiper();
        if (props.totalSheep === 0) {
            swiper.allowSlidePrev = false;
        }
        setTotalSwiper(swiper);
        swiper.update();
    }

    return(
        <div>
            <CloseObsButtonAndTitle
                title={"Sauer totalt"}
                closeObservation={props.closeObservation}
                next={props.next}
                nextIsDisabled={false}
                previous={null}
                previousIsDisabled={true}
            />

            <div className="text-div-total">
                <h1 className="sheep-number-total"><b>{props.totalSheep}</b></h1>
            </div>

            <div className="total-swiper">
                <SheepSwiper
                    initializeSlide={initializeTotalSwiper}
                    updateSheepCount={() => {updateSheepCount(totalSwiper, props.totalSheep, props.setTotalSheep);}}
                    sheepImageSrc="./assets/noun_sheep_gray.png"
                    swiperStyle={greySwiperStyle}
                />
            </div>
        </div>
    )
}

export default TotalRegistration;
