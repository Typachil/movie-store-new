import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { fetchFilms } from '../http/filmAPI';
import { Context } from '../index';
import { MOVIE_ROUTE } from '../utils/consts';

export default function Collections(){
    const history = useHistory();
    const {film} = useContext(Context);
    const [films, setFilms] = useState([]);
    useEffect(() => {
        fetchFilms(null, null, 36).then(data => setFilms(data));
    }, [])
    return (
        <div className="pages-content container">
            <h1 className='mb-3'>Поборки специально для вас</h1>
            <Row>
                {films.map(el => {
                    return (
                        <Col sm={2} onClick={() => history.push(MOVIE_ROUTE + '/' + el.id)} key={el.id} className="main-recomended-slider__item mb-3">
                            <img src={process.env.REACT_APP_API_URL + "img/" + el.img} width="172px" height="264px"></img>
                            <p className="main-recomended-slider__item-name">{el.name}</p>
                            <p className="main-recomended-slider__item-access">Бесплатно</p>
                            <div>Рэйтинг {el.rating}/10</div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}