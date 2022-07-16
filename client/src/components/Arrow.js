import React from "react";
import '../componentCss/sliderMin.css';

export default function Arrow({position,actions,direction, offsetSlider}){
    let shutdownButton = direction === "left" ? position : -position !== offsetSlider;
    return (
        shutdownButton ? <div className={`arrow-${direction}`} onClick={actions}>
                            <div className="arrow">
                                <div className="arrow-top"></div>
                                <div className="arrow-bottom"></div>
                            </div>
                        </div> : null
    )
}