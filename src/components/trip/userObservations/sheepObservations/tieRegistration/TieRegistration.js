import "./TieRegistration.css"
import CloseObsButtonAndTitle from "../sharedComponents/CloseObsButtonAndTItle";
import React from "react";
import TieUnit from "./TieUnit";

const TieRegistration = (props) => {

    return(
        <div>
            <CloseObsButtonAndTitle
                title={"Slips-farger"}
                closeObservation={props.closeObservation}
                next={props.next}
                previous={props.previous}
                nextIsDisabled={false}
                previousIsDisabled={false}
            />
            <div className="tie-registration-div">
                <div className="tie-registration-row">
                    <TieUnit
                        tieCount={props.blueTie}
                        setTieCount={props.setBlueTie}
                        imageSrc="./assets/ties/noun_tie_blue.png"
                    />
                    <TieUnit
                        tieCount={props.greenTie}
                        setTieCount={props.setGreenTie}
                        imageSrc="./assets/ties/noun_tie_green.png"
                    />
                </div>

                <div className="tie-registration-row">
                    <TieUnit
                        tieCount={props.yellowTie}
                        setTieCount={props.setYellowTie}
                        imageSrc="./assets/ties/noun_tie_yellow.png"
                    />
                    <TieUnit
                        tieCount={props.redTie}
                        setTieCount={props.setRedTie}
                        imageSrc="./assets/ties/noun_tie_red.png"
                    />
                </div>
            </div>
        </div>
    )

}

export default TieRegistration;
