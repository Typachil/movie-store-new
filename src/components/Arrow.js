import React from "react";
import '../componentCss/sliderMin.css';

export default function Arrow(props){
    let {position,actions,direction} = props;
    let shutdownButton = direction === "left" ? position : -position !== 2460;
    return (
        shutdownButton ? <div className={`arrow-${direction}`} onClick={actions}>
                                    <div className="arrow">
                                        <div className="arrow-top"></div>
                                        <div className="arrow-bottom"></div>
                                    </div>
                                </div> : null
    )
}