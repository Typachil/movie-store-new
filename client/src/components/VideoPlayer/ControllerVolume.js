import React, {useState, useEffect, useRef} from "react";

export default function ControllerVolume({volumePlayer, round, changeVolumeVideo, mutedVideo}){

    const [defaultControllerVolumeHeight, setDefaultControllerVolumeHeight] = useState(0);
    const [controllerVolumeHeight, setControllerVolumeHeight] = useState(0);
    const controllerVolume = useRef();

    useEffect(() => {
        setDefaultControllerVolumeHeight(controllerVolume.current.getBoundingClientRect().height);
        setControllerVolumeHeight(Math.round(defaultControllerVolumeHeight * volumePlayer))
    },[volumePlayer]);

    function changeWidthController(e){
        changeVolumeVideo(round(Math.round(controllerVolume.current.getBoundingClientRect().bottom - e.clientY) / 100 , 2));
    }

    return (
        <div className='player-control__button player-control-button__controllerVolume'>
            <div ref={controllerVolume} onClick={changeWidthController} className="player-control-button__popupControllerVolume" >
                <div style={{height : controllerVolumeHeight + "px"}} className="player-control-button__popupControllerVolume__change"></div>
            </div>
            <div onClick={mutedVideo} className="player-control-button__muteSound">
                <div className="player-control-button__muteSound-componentFirst"></div>
                <div className="player-control-button__muteSound-componentSecond"></div>
            </div>
        </div> 
    )
}