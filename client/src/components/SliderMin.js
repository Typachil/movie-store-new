import React, {useEffect, useRef, useState} from "react";
import '../componentCss/sliderMin.css';
import Arrow from "./Arrow";
import { useHistory } from "react-router-dom";
import { MOVIE_ROUTE } from "../utils/consts";
import { fetchFilms } from "../http/filmAPI";
import { observer } from "mobx-react-lite";

const SliderMin = observer(({categoryId}) => {
    const history = useHistory();
    const slider = useRef(null);
    const [displayButton, setDisplayButton] = useState(false)
    const [arrayFilms, setArrayFilms] = useState([]);

    useEffect(() => {
        fetchFilms(categoryId).then((data) => {
            setArrayFilms(data); 
            setDisplayButton(data.length > 6);
        });
    }, []);

    let [positionSlider, setPositionSlider] = useState(0);
    let transformStyle = {transform : `translateX(${positionSlider}px)`}
    const calculateWidthSlider = () => {
        let items = slider.current.querySelectorAll('main-recomended-slider__item');
        let widthAllItems = (items[0].offsetWidth + 33) * items.length;
        return widthAllItems;
    }
    let nextPosition = (e) => {
        setPositionSlider(positionSlider - calculateWidthSlider());
    };
    let prevPosition = (e) => {
        setPositionSlider(positionSlider + calculateWidthSlider());
    };

    return (
        <div className="main-recomended-slider-wrapper">
            {displayButton && <Arrow position={positionSlider} actions={prevPosition} direction={"left"} display={displayButton}/>}
            <div ref={slider} className="main-recomended-slider" style={transformStyle}>
                {arrayFilms.map((item,key) => {
                    let {id,name,img,rating} = item;
                    return (
                        <div onClick={() => history.push(MOVIE_ROUTE + '/' + id)} key={key} className="main-recomended-slider__item">
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
            {displayButton && <Arrow position={positionSlider} actions={nextPosition} direction={"right"}/>}
        </div>
    )
})

export default SliderMin;