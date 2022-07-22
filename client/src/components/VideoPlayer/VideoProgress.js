import React, {useState, useRef, useEffect} from 'react';

export default function VideoProgress({timeVideo, videoDuration, rewindVideo, realizeTime}){
    const [rewindVideoState, setRewindVideoState] = useState(0)
    const [secondOnPreview, setSecondOnPreview] = useState(0)
    const [onFocus,setOnFocus] = useState(false);
    const [widthProgressBar, setWidthProgressBar] = useState(0);
    const progressionBar = useRef(null);

    function handleSubscribe(){
        const newWidth = progressionBar.current.getBoundingClientRect().width;
        if(widthProgressBar !== newWidth){
            setWidthProgressBar(newWidth)
        }
    }

    useEffect(() => {
        setWidthProgressBar(progressionBar.current.getBoundingClientRect().width)
        window.addEventListener('resize', handleSubscribe)
        return () => {
            window.removeEventListener('resize', handleSubscribe)
        }
    },[widthProgressBar]);

    function rewindPreview(e){
        let popupPreview = e.currentTarget.firstChild.getBoundingClientRect();
        let indentPreview = (e.clientX - e.currentTarget.getBoundingClientRect().left);
        setSecondOnPreview(Math.round((indentPreview / widthProgressBar) * videoDuration))
        setRewindVideoState(indentPreview - popupPreview.width / 2);
    }


    function progressionVideo(){
        return Math.floor((timeVideo / videoDuration) * widthProgressBar);
    };

    return (
        <div className='player-control-progress'
            ref={progressionBar}
            onClick={() => rewindVideo(secondOnPreview)}
            onMouseMove={rewindPreview} 
            onMouseOver={() => setOnFocus(!onFocus)} 
            onMouseOut={() => setOnFocus(!onFocus)}>
            <div style={{left: rewindVideoState + "px", display : onFocus ? 'block' : 'none'}} className='player-control-progress__preview'>{realizeTime(secondOnPreview)}</div>
            <div style={{width : progressionVideo() + "px"}} className='player-control-progress__videotime'></div>
        </div>
    )
}