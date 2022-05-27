import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../index';
import '../componentCss/profile.css';
import { useHistory } from 'react-router-dom';
import { ADMIN_ROUTE, MOVIE_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { getHistoryUser } from '../http/filmAPI';
import Arrow from '../components/Arrow';

const Profile = observer(() => {
    const { user } = useContext(Context);
    const history = useHistory();
    const [role, setRole] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        setRole(user.user.role);
        setName(user.user.name);
        getHistoryUser(user.user.id).then(data => user.setUserHistory(data));
    }, [user])

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    }

    let [positionSlider, setPositionSlider] = useState(0);
    let transformStyle = { transform: `translateX(${positionSlider}px)` }
    let nextPosition = () => {
        setPositionSlider(positionSlider - 1230);
    };
    let prevPosition = () => {
        setPositionSlider(positionSlider + 1230);
    };
    return (
        <div className="pages-content container">
            <h1>Профиль</h1>
            <div className="d-flex justify-content-start mt-5">
                <h3 className="mr-4">Добро пожаловать: {name}</h3>
                <Button className="mr-4" variant="danger" onClick={() => logOut()}>Выйти</Button>
                {role == "ADMIN" && <Button variant="primary" onClick={() => history.push(ADMIN_ROUTE)}>Админ панель</Button>}
            </div>
            {!user.userHistory.length ||
                <div className="main-recomended-slider-wrapper">
                    <h2>Ваша история просмотра:</h2>
                    <Arrow position={positionSlider} actions={prevPosition} direction={"left"} />
                    <div className="main-recomended-slider" style={transformStyle}>
                        {user.userHistory.map((item, key) => {
                            let { id, name, img, rating } = item.film;
                            return (
                                <div onClick={() => history.push(MOVIE_ROUTE + '/' + id)} key={key} className="main-recomended-slider__item">
                                    {img ? <>
                                        <img src={process.env.REACT_APP_API_URL + "img/" + img} width="172px" height="264px"></img>
                                        <p className="main-recomended-slider__item-name">{name}</p>
                                        <div>Рэйтинг {rating}/10</div>
                                    </>
                                        : <div className="main-recomended-slider__lastitem">
                                            <p>{name}</p>
                                        </div>}
                                </div>
                            )
                        })}
                    </div>
                    <Arrow position={positionSlider} actions={nextPosition} direction={"right"} />
                </div>
            }
        </div>
    )
});

export default Profile;