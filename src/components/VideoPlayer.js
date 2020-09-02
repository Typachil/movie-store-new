import React, {useState} from 'react';
import '../componentCss/player.css';

export default function VideoPlayer(props){
    let [timeVideo, setTimeVideo] = useState(0)

    function progressUpdate(event){
        setTimeVideo(event.target.currentTime)
        console.log(timeVideo);
    }

    function pauseVideo(event){
        setTimeVideo(timeVideo)
    }

    return (
        <div>
            <div className="player">
                <video onTimeUpdate={progressUpdate}>
                    <source src="/video/videoNM.mp4" type="video/mp4"></source>
                </video>
                <div onClick={pauseVideo} className="player-button player-button__pause"></div>
            </div>
        </div>
    )
}