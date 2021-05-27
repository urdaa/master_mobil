import React, {useEffect, useRef} from "react";


const EarTagDisplay = (props) => {
    const earTagCanvasRef = useRef();

    useEffect(() => {
        let canvas = earTagCanvasRef.current;
        let context = canvas.getContext('2d');
        if (props.earTagColors === "1") {
            //Draw the whole 1-color ear tag
            context.beginPath();
            context.fillStyle = props.color1;
            context.fillRect(0,0,100,25);

        } else if (props.earTagColors === "2") {
            //Draw 1st half
            context.beginPath();
            context.fillStyle = props.color1;
            context.fillRect(0,0,50,25);
            //Draw 2nd half
            context.beginPath();
            context.fillStyle = props.color2;
            context.fillRect(50,0,50,25);
        }
    });

    return(
        <canvas ref={earTagCanvasRef}  width="100" height="25"/>
    )
}

export default EarTagDisplay;
