import React, {useState} from 'react';

export default function VideoProgress(props){
    let [rewindVideoState, setRewindVideoState] = useState(0)
    let [onFocus,setOnFocus] = useState(false);
    function rewindVideo(e){
        console.log('горизонтально' + (e.clientX - e.target.offsetLeft))
        setRewindVideoState(e.clientX - e.target.offsetLeft - 155)
    }

    return (
        <div className='player-control-progress' 
            onMouseMove={rewindVideo} 
            onMouseOver={() => setOnFocus(!onFocus)} 
            onMouseOut={() => setOnFocus(!onFocus)}>
            <div style={{left: rewindVideoState + "px", display : onFocus ? 'block' : 'none'}} className='player-control-progress__preview'>gdssgd</div>
            <div style={{width : props.progressionVideo() + "px"}} className='player-control-progress__videotime'></div>
        </div>
    )
}