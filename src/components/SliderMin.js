import React, {useState} from "react";
import '../componentCss/sliderMin.css';
import Arrow from "./Arrow";

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
            <Arrow position={positionSlider} actions={prevPosition} direction={"left"}/>
            <div className="main-recomended-slider" style={transformStyle}>
                {sliderItems}   
            </div>
            <Arrow position={positionSlider} actions={nextPosition} direction={"right"}/>
        </div>
    )
}