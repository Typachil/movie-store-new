import React, {useState, useEffect, useRef} from "react";

export default function ControllerVolume(props){

    const [defaultControllerVolumeHeight, setDefaultControllerVolumeHeight] = useState(0);
    const [controllerVolumeHeight, setControllerVolumeHeight] = useState(0)
    const controllerVolume = useRef();

    useEffect(() => {
        setDefaultControllerVolumeHeight(controllerVolume.current.getBoundingClientRect().height);
    },[]);

    function changeWidthController(e){
        // console.log(props.volumePlayer)
        // console.log(Math.round(controllerVolume.current.getBoundingClientRect().bottom - e.clientY))
        // console.log((props.volumePlayer / controllerVolumeHeight) * defaultControllerVolumeHeight)
        setControllerVolumeHeight(Math.round(controllerVolume.current.getBoundingClientRect().bottom - e.clientY))
    }

    return (
        <div className='player-control__button player-control-button__controllerVolume'>
            <div ref={controllerVolume} onClick={changeWidthController} className="player-control-button__popupControllerVolume" >
                <div style={{height : controllerVolumeHeight + "px"}} className="player-control-button__popupControllerVolume__change"></div>
            </div>
            <div onClick={props.mutedVideo} className="player-control-button__muteSound">
                <div className="player-control-button__muteSound-componentFirst"></div>
                <div className="player-control-button__muteSound-componentSecond"></div>
                <div className="player-control-button__muteSound-componentThird"></div>
            </div>
        </div> 
    )
}