import React, {useState, useRef} from 'react';
import '../componentCss/player.css';

export default function VideoPlayer(props){
    let [timeVideo, setTimeVideo] = useState(0)
    let [pauseVideo, setPauseVideo] = useState(true)
    const videoPlayer = useRef(null);

    function progressUpdate(){
        console.log(timeVideo);
        setTimeVideo(videoPlayer.current.currentTime);
    };

    function pausedVideo(){
        setPauseVideo(!pauseVideo);
        pauseVideo ? videoPlayer.current.play() : videoPlayer.current.pause();
    };

    function stopVideo(){
        setPauseVideo(true)
        videoPlayer.current.pause();
        videoPlayer.current.currentTime = 0;
    };

    function rewindPlayerLeft(){
        videoPlayer.current.currentTime -= 10.0;
    }

    function rewindPlayerRight(){
        videoPlayer.current.currentTime += 10.0;
    }

    return (
        <div>
            <div className="player">
                <video onTimeUpdate={progressUpdate} ref={videoPlayer}>
                    <source src="/video/videoNM.mp4" type="video/mp4"></source>
                </video>
                <div onClick={pausedVideo} 
                    className={`player-button player-button__${pauseVideo ? 'play' : 'pause'}`}>
                </div>
                <div onClick={rewindPlayerLeft} 
                    className='player-button player-button__rewindLeft'>
                </div>
                <div onClick={rewindPlayerRight} 
                    className='player-button player-button__rewindRight'>
                </div>
                <div onClick={stopVideo} 
                    className='player-button player-button__stop'>
                </div>
            </div>
        </div>
    )
}