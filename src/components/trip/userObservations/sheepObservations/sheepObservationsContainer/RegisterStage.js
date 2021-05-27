import DarkLightRegistration from "../darkLightRegistration/DarkLightRegistration";
import TotalRegistration from "../totalRegistration/TotalRegistration";
import TieRegistration from "../tieRegistration/TieRegistration";
import EarTagRegistration from "../earTagRegistration/EarTagRegistration";
import React from "react";


const ObservationStage = (props) => {

    //Fills modal with appropriate content
    const getRegistrationStage = () => {
        if(!props.closeObservation) {
            return(
                <DarkLightRegistration
                    lightSheep={props.lightSheep}
                    darkSheep={props.darkSheep}
                    setLightSheep={props.setLightSheep}
                    setDarkSheep={props.setDarkSheep}
                    closeModalCleanup={props.closeModalCleanup}
                    closeObservation={props.closeObservation}
                />
            )
        }
        else if (props.closeRegisterStage === props.registerStage.TOTAL) {
            return(
                <TotalRegistration
                    closeModalCleanup={props.closeModalCleanup}
                    next={props.nextStageIfCountConsistent}
                    totalSheep={props.totalSheep}
                    setTotalSheep={props.setTotalSheep}
                />
            )
        }
        else if(props.closeRegisterStage === props.registerStage.LIGHT_DARK) {
            return(
                <DarkLightRegistration
                    lightSheep={props.lightSheep}
                    setLightSheep={props.setLightSheep}
                    darkSheep={props.darkSheep}
                    setDarkSheep={props.setDarkSheep}
                    closeModalCleanup={props.closeModalCleanup}
                    closeObservation={props.closeObservation}
                    previous={() => {props.setCloseRegisterStage(props.registerStage.TOTAL);}}
                    next={props.nextStageIfCountConsistent}
                />
            )
        }
        else if (props.closeRegisterStage === props.registerStage.TIES) {
            return(
                <TieRegistration
                    blueTie={props.blueTie}
                    setBlueTie={props.setBlueTie}
                    greenTie={props.greenTie}
                    setGreenTie={props.setGreenTie}
                    yellowTie={props.yellowTie}
                    setYellowTie={props.setYellowTie}
                    redTie={props.redTie}
                    setRedTie={props.setRedTie}
                    closeModalCleanup={props.closeModalCleanup}
                    closeObervation={props.closeObservation}
                    previous={() => {props.setCloseRegisterStage(props.registerStage.LIGHT_DARK);}}
                    next={props.nextStageIfCountConsistent}

                />
            )
        }
        else if (props.closeRegisterStage === props.registerStage.EAR_TAGS) {
            //TODO: What to do with ear-tag correction..?
            return(
                <EarTagRegistration
                    observedFarms={props.observedFarms}
                    setObservedFarms={props.setObservedFarms}
                    closeModalCleanup={props.closeModalCleanup}
                    closeObervation={props.closeObservation}
                    previous={() => {props.setCloseRegisterStage(props.registerStage.TIES);}}
                    setEarTags={props.setEarTags}
                />
            )
        }
    }

    return(
        <div>
            {getRegistrationStage()}
        </div>
    )
}

export default ObservationStage;
