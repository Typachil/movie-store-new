import React, {useEffect, useRef, useState} from "react";
import '../componentCss/sliderMin.css';
import Arrow from "./Arrow";
import { useHistory } from "react-router-dom";
import { MOVIE_ROUTE } from "../utils/consts";
import { fetchFilms } from "../http/filmAPI";
import { observer } from "mobx-react-lite";

const SliderMin = observer(({categoryId}) => {
    const history = useHistory();
    const sliderItem = useRef(null);
    const [displayButton, setDisplayButton] = useState(false);
    const [arrayFilms, setArrayFilms] = useState([]);
    const [offsetSlider, setOffsetSlider] = useState(0);
    const [positionSlider, setPositionSlider] = useState(0);

    useEffect(() => {
        fetchFilms(categoryId).
        then((data) => {
            setArrayFilms(data); 
            setDisplayButton(data.length > 6); 
        }).then(() => {
            let width = sliderItem.current.firstChild.offsetWidth;
            setOffsetSlider((width + 16) * (arrayFilms.length - 6))
        });
    }, []);

    let transformStyle = {transform : `translateX(${positionSlider}px)`}
    let nextPosition = (e) => {
        setPositionSlider(positionSlider - offsetSlider);
    };
    let prevPosition = (e) => {
        setPositionSlider(positionSlider + offsetSlider);
    };

    return (
        <div className="main-recomended-slider-wrapper">
            {displayButton && <Arrow position={positionSlider} actions={prevPosition} direction={"left"} display={displayButton} offsetSlider={offsetSlider}/>}
            <div ref={sliderItem} className="main-recomended-slider" style={transformStyle}>
                {arrayFilms.map((item,key) => {
                    let {id,name,img,rating} = item;
                    return (
                        <div onClick={() => history.push(MOVIE_ROUTE + '/' + id)} key={key} className="main-recomended-slider__item mr-3">
                            {img ? <>
                                        <img src={process.env.REACT_APP_API_URL + "img/" + img} width="172px" height="264px"></img>
                                        <p className="main-recomended-slider__item-name">{name}</p>
                                        <p className="main-recomended-slider__item-access">Бесплатно</p>
                                        <div>Рэйтинг {rating}/10</div>
                                    </>
                                    : <div className="main-recomended-slider__lastitem">
                                        <p>{name}</p>
                                    </div>}
                        </div>
                    )
                })}   
            </div>
            {displayButton && <Arrow position={positionSlider} actions={nextPosition} direction={"right"} offsetSlider={offsetSlider}/>}
        </div>
    )
})

export default SliderMin;