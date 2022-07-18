import React, { useState, useRef, useEffect } from 'react';
import '../../componentCss/player.css';
import VideoProgress from './VideoProgress';
import ControllerVolume from './ControllerVolume';
import { setHistoryFilm } from '../../http/filmAPI';

function round(value, decimals) {
    let dec = Math.pow(10, decimals);
    return Math.round(value * dec) / dec;
}

export default function VideoPlayer({ videoSrc, userId, filmId }) {
    const [timeVideo, setTimeVideo] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [pauseVideo, setPauseVideo] = useState(true);
    const [qualityVideo, setQualityVideo] = useState("720")
    const [fullScreen, setFullScreen] = useState(false);
    const [focusPlayer, setfocusPlayer] = useState(false);
    const [volumePlayer, setVolumePlayer] = useState(0.1);
    const [loadingPlayer, setLoadingPlayer] = useState(false);
    const videoPlayer = useRef(null);
    const videoPlayerWithInterface = useRef(null);

    useEffect(() => {
        videoPlayer.current.volume = volumePlayer;
        document.addEventListener("keydown", keyboardAction);
        return () => {
            document.removeEventListener("keydown", keyboardAction)
        }
    });

    function canPlayVideo() {
        const videoDuration = Math.round(videoPlayer.current.duration);
        setVideoDuration(videoDuration)
    };

    function progressUpdate() {
        setTimeVideo(Math.round(videoPlayer.current.currentTime));
        if (videoDuration == timeVideo) stopVideo();
    };

    function pausedVideo() {
        setPauseVideo(!pauseVideo);
        pauseVideo ? videoPlayer.current.play() : videoPlayer.current.pause();
        userId && setHistoryFilm(userId, filmId).then(data => console.log(data))
    };

    function stopVideo() {
        setPauseVideo(true)
        videoPlayer.current.pause();
        videoPlayer.current.currentTime = 0;
    };

    function mutedVideo() {
        videoPlayer.current.muted = !videoPlayer.current.muted;
    }

    function rewindVideo(time) {
        videoPlayer.current.currentTime = time;
    }

    function changeVolumeVideo(volume) {
        setVolumePlayer(volume);
    }

    function rewindPlayerLeft() {
        videoPlayer.current.currentTime -= 10;
        setTimeVideo(timeVideo - 10);
    }

    function rewindPlayerRight() {
        videoPlayer.current.currentTime += 10;
        setTimeVideo(timeVideo + 10)
    }

    function louderVolumePlayer() {
        if (!(volumePlayer == 1.0) && !(round(volumePlayer + 0.1, 1) > 1.0)) {
            setVolumePlayer(round(volumePlayer + 0.1, 1));
        } else {
            setVolumePlayer(1)
        }
    }

    function quieterVolumePlayer() {
        if (!(volumePlayer == 0) && !(round(volumePlayer - 0.1, 1) < 0)) {
            setVolumePlayer(round(volumePlayer - 0.1, 1));
        } else {
            setVolumePlayer(0)
        }
    }

    function realizeTime(time) {
        let hour = time < 3600 ? 0 : time % 3600;
        let minutes = time < 60 ? 0 : Math.floor(time / 60);
        let seconds = time < 60 ? time : time - (minutes * 60);
        return `${hour}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }

    function realzieFullTime() {
        let hour = Math.floor(videoDuration / 3600);
        let minutes = Math.floor(videoDuration / 60);
        let seconds = videoDuration - (minutes * 60);
        return `${hour}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }

    function changeFullScreen() {
        setFullScreen(!fullScreen);
        !fullScreen ? videoPlayerWithInterface.current.requestFullscreen() : document.exitFullscreen();
    }

    function changeFocusPlayer(e) {
        setfocusPlayer(!focusPlayer);
    }

    function changeQualityVideo(e) {
        let quality = e.target.innerHTML.match(/\d/g).join("");
        videoPlayer.current.load();
        setQualityVideo(quality);
        rewindVideo(timeVideo)
    }

    function keyboardAction(event) {
        event.preventDefault()
        switch (event.code) {
            case "ArrowLeft":
                rewindPlayerLeft();
                break;
            case "ArrowRight":
                rewindPlayerRight();
                break;
            case "Space":
                pausedVideo();
                break;
            case "ArrowUp":
                louderVolumePlayer();
                break;
            case "ArrowDown":
                quieterVolumePlayer();
                break;
            default:
                console.log("Sorry, we are out of " + event.code + ".");
        }

    }
    return (
        <div onKeyDown={keyboardAction}
            onFocus={changeFocusPlayer}
            onBlur={changeFocusPlayer}
            tabIndex="1" className="player"
            ref={videoPlayerWithInterface}>
            <video className="player-video" onLoadedMetadata={canPlayVideo}
                onClick={pausedVideo} onTimeUpdate={progressUpdate}
                onWaiting={() => setLoadingPlayer(!loadingPlayer)}
                onPlay={() => setLoadingPlayer(!loadingPlayer)} ref={videoPlayer}
                src={process.env.REACT_APP_API_URL + "video/" + videoSrc}>
            </video>
            {/* <div className={`player-playButton player-playButton__${loadingPlayer ? "loading" : "play"}`} 
                    style={{opacity : pauseVideo ? 1 : 0}} onClick={pausedVideo}>
                    <div></div>
                </div> */}
            <div className="player-control">
                <div onClick={pausedVideo} className="player-control__button">
                    <div className={`player-control-button__${pauseVideo ? 'play' : 'pause'}`}></div>
                </div>
                {/* <div onClick={rewindPlayerLeft}
                    className='player-control__button player-control-button__rewindLeft'>
                    <div></div>
                    <div></div>
                </div>
                <div onClick={rewindPlayerRight}
                    className='player-control__button player-control-button__rewindRight'>
                    <div></div>
                    <div></div>
                </div> */}
                <div onClick={stopVideo}
                    className='player-control__button player-control-button__stop'>
                    <div></div>
                </div>
                <div className='player-control__time'>
                    {realizeTime(timeVideo)}
                </div>
                <VideoProgress rewindVideo={rewindVideo} timeVideo={timeVideo}
                    videoDuration={videoDuration} realizeTime={realizeTime} />
                <div className='player-control__time'>
                    {realzieFullTime()}
                </div>
                <ControllerVolume round={round} changeVolumeVideo={changeVolumeVideo} volumePlayer={volumePlayer} mutedVideo={mutedVideo} />
                <div className="player-control__button player-control-button__videoQuality">
                    <div className="player-control-button__videoQuality__popup"
                        onClick={changeQualityVideo}>
                        <div>720p</div>
                        <div>480p</div>
                        <div>360p</div>
                    </div>
                    <div>{qualityVideo + "p"}</div>
                </div>
                <div onClick={changeFullScreen} className="player-control__button player-control-button__fullScreen">
                    <div className="player-control-button__fullScreen-componentFirst"></div>
                    <div className="player-control-button__fullScreen-componentSecond"></div>
                    <div className="player-control-button__fullScreen-componentThird"></div>
                    <div className="player-control-button__fullScreen-componentFourth"></div>
                </div>
            </div>
        </div>
    )
}