import React, { useContext, useEffect, useState } from 'react';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import { useParams } from 'react-router-dom';
import { fetchOneFilm, rateFilm, getRateFilm } from '../http/filmAPI';
import { Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const MoviePage = observer(() => {
    const {id} = useParams();
    const [filmOne, setFilmOne] = useState({});
    const {user, film} = useContext(Context);
    useEffect(()=>{
        fetchOneFilm(id).then(data => setFilmOne(data));
        getRateFilm(Number(id), user.user.id).then(data => film.setRateUser(data.rate))
    }, [film.rateUser]);

    function ratingFilm(rate){
        rateFilm(rate, Number(id), user.user.id).then(data => film.setRateUser(data.rate))
    }

    const getRatingBar = () => {
        const array = [10,9,8,7,6,5,4,3,2,1];
        let rateUser = film.rateUser;
        const rating = array.map((item, key) =>{
            return(
                <label key={key} className={rateUser >= item ? "active" : null} onClick={() => ratingFilm(item)}><input type="radio" id={`star-${item}`} name="rating" value={item}/></label>
            )
        })
        return rating;
    }
    
    return (
        <div className="pages-content container">
            <Row className='my-3'>
                <Col sm>
                    <img src={process.env.REACT_APP_API_URL + "img/" + filmOne.img} height="360px" width="280px"></img>
                </Col>
                <Col sm>
                    <h2>{filmOne.name}</h2>
                    <div>Рейтинг: {filmOne.rating}/10</div>
                    <p>Краткое описание: <br/> {filmOne.description}</p>
                    <div className='rating-area'>
                        <span>Ваш рейтинг: </span>
                        {getRatingBar()}
                    </div>
                </Col>
            </Row>
            <VideoPlayer videoSrc={filmOne.video} userId={user.user.id} filmId={id}/>
        </div>
    )
});

export default MoviePage;