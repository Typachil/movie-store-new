import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../index";
import "../componentCss/header.css";
import { CARTOON_ROUTE, COLLECTIONS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MOVIES_ROUTE, MOVIE_ROUTE, PROFILE_ROUTE, SERIES_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { fetchFilms } from "../http/filmAPI";

const Headers = observer(() => {
    const { user, film } = useContext(Context);
    const [valueSearch, setValueSearch] = useState("");
    const [changeBurger, setChangeBurger] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetchFilms(null, null).then(data => film.setFilms(data))
    }, [])

    const filteredFilms = useMemo(() => {
        if (valueSearch) {
            return film.films.filter(item => item.name.toLowerCase().includes(valueSearch.toLowerCase()));
        }
        return [];
    }, [valueSearch])

    function onChangeValue(e) {
        setValueSearch(e.target.value);
    }
    return (
        <header className="d-flex align-items-center">
            <div className="container d-flex justify-content-between">
                <div className="divHeader">
                    <div className="header-logo mr-2"><Link to={HOME_ROUTE}><img src="/img/g1480.png" alt="фотография"></img></Link></div>
                    <div className="hamburger">
                        <div id="menu-bar" className={changeBurger ? "change" : ""} onClick={() => setChangeBurger(!changeBurger)}>
                            <div id="bar1" className="bar"></div>
                            <div id="bar2" className="bar"></div>
                            <div id="bar3" className="bar"></div>
                        </div>
                        <div className={changeBurger ? "menu-links change-links" : "menu-links"}>
                            <Link to={MOVIES_ROUTE}>Фильмы</Link>
                            <Link to={CARTOON_ROUTE}>Мультфильмы</Link>
                            <Link to={SERIES_ROUTE}>Сериалы</Link>
                            <Link to={COLLECTIONS_ROUTE}>Подборки</Link>
                        </div>
                    </div>
                    <ul className="divHeader">
                        <li className="header-genre"><Link to={MOVIES_ROUTE}>Фильмы</Link></li>
                        <li className="header-genre"><Link to={CARTOON_ROUTE}>Мультфильмы</Link></li>
                        <li className="header-genre"><Link to={SERIES_ROUTE}>Сериалы</Link></li>
                        <li className="header-genre"><Link to={COLLECTIONS_ROUTE}>Подборки</Link></li>
                    </ul>
                </div>
                <div className="divHeader">
                    <div>
                        <input className="header-search mr-2" type="text" placeholder="Поиск" onChange={onChangeValue} value={valueSearch} />
                        <div className="header-search__items">
                            {filteredFilms.map((item, key) => {
                                return (<div onClick={() => { history.push(MOVIE_ROUTE + '/' + item.id); setValueSearch("") }} className="d-flex justify-content-around p-2 border-bottom border-dark" style={{ cursor: 'pointer' }} key={key}>
                                    <img src={process.env.REACT_APP_API_URL + "img/" + item.img} height="150px" width="100px"></img>
                                    <div>
                                        <p>{item.name}</p>
                                        <p>Рейтинг: {item.rating}/10</p>
                                    </div>
                                </div>)
                            })}
                        </div>
                    </div>
                    <div className="user"><Link to={user._isAuth ? PROFILE_ROUTE : LOGIN_ROUTE}><img width="32px" height="32px" src="/img/user.png" alt="фотография"></img></Link></div>
                </div>
            </div>
        </header>
    )
});

export default Headers;