import React, {useState, useRef} from 'react';
import '../componentCss/player.css';

export default function VideoPlayer(){
    let [timeVideo, setTimeVideo] = useState(0)
    let [pauseVideo, setPauseVideo] = useState(true)
    const videoPlayer = useRef(null);
    // const videoDuration = Math.round(videoPlayer.current.duration);

    function progressUpdate(){
        console.log(timeVideo);
        setTimeVideo(Math.round(videoPlayer.current.currentTime));
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
        videoPlayer.current.currentTime -= 10;
        setTimeVideo(timeVideo -= 10);
    }

    function rewindPlayerRight(){
        videoPlayer.current.currentTime += 10;
        setTimeVideo(timeVideo += 10)
    }

    function realizeTime(){
        let hour = timeVideo < 3600 ? 0 : timeVideo % 3600; 
        let minutes = timeVideo < 60 ? 0 : Math.floor(timeVideo / 60);
        let seconds = timeVideo < 60 ? timeVideo : timeVideo - (minutes * 60);
        return `${hour}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }

    function progressBar(){

    };

    return (
            <div className="player">
                <video onTimeUpdate={progressUpdate} ref={videoPlayer}>
                    <source src="/video/videoNM.mp4" type="video/mp4"></source>
                </video>
                <div className="player-control">
                    <div onClick={pausedVideo} 
                        className={`player-control__button player-control-button__${pauseVideo ? 'play' : 'pause'}`}>
                    </div>
                    <div onClick={rewindPlayerLeft} 
                        className='player-control__button player-control-button__rewindLeft'>
                    </div>
                    <div onClick={rewindPlayerRight} 
                        className='player-control__button player-control-button__rewindRight'>
                    </div>
                    <div onClick={stopVideo} 
                        className='player-control__button player-control-button__stop'>
                    </div>
                    <div className='player-control__time'>
                        {realizeTime()}
                    </div>
                    <div className='player-control__progress'></div>
                </div>
            </div>
    )
}