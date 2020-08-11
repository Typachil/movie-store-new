import React, {useState, useEffect} from "react";
import '../componentCss/sliderMin.css';

export default function SliderMin(props){
    let [positionSlider, setPositionSlider] = useState(0);
    let nextPosition = () => {
        setPositionSlider(positionSlider - 1230);
    };
    let prevPosition = () => {
        setPositionSlider(positionSlider + 1230);
    };

    let transformStyle = {transform : `translateX(${positionSlider}px)`}
    
    let sliderItems = props.filmArr.map((item,key) => {
        let {title,link} = item;
        return (
            <a href="#" key={key} className="main-recomended-slider__item">
                {link ? <>
                            <img src={link} width="172px" height="264px"></img>
                            <p className="main-recomended-slider__item-name">{title}</p>
                            <p className="main-recomended-slider__item-access">Бесплатно</p>
                        </>
                        : <div className="main-recomended-slider__lastitem">
                            <p>{title}</p>
                        </div>}
            </a>
        )
    });
    return (
        <div className="main-recomended-slider-wrapper">
            {positionSlider ? <div className="arrow-left" onClick={prevPosition}>
                                <div className="arrow">
                                    <div className="arrow-top"></div>
                                    <div className="arrow-bottom"></div>
                                </div>
                            </div> : null}
            <div className="main-recomended-slider" style={transformStyle}>
                {sliderItems}   
            </div>
            {-positionSlider !== 2460 ? 
                <div className="arrow-right" onClick={nextPosition}>
                    <div className="arrow">
                        <div className="arrow-top"></div>
                        <div className="arrow-bottom"></div>
                    </div>
                </div> : null} 
        </div>
    )
}