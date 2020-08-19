import React from "react";
import {Link} from "react-router-dom";
import "../componentCss/header.css";

export default function Headers(){
    return (
        <header>
            <div className="wrapper">
                <ul>
                    <li className="header-logo"><Link to="/"><img src="https://st.tivision.ru/images/_main/ivi-top/logo.svg" alt="фотография"></img></Link></li>
                    <li><Link to="/">Мой ivi</Link></li>
                    <li><Link to="/movies">Фильмы</Link></li>
                    <li><Link to="/cartoon">Мультфильм</Link></li>
                    <li><Link to="/series">Сериалы</Link></li>
                    <li><Link to="/sport">Спорт</Link></li>
                    <li><Link to="/TVchannel">ТВ-каналы</Link></li>
                    <li><Link to="/collections">Подборки</Link></li>
                    <li className="on-subs"><Link to="/subscribe">Подключить подписку</Link></li>
                    <li><input className="header-search" type="text" placeholder="Поиск"/></li>
                    <li className="notifications"><img src="/img/bell.png" width="32px" height="32px" alt="фотография"></img></li>
                    <li className="user"><Link to="/series"><img width="32px" height="32px" src="/img/user.png" alt="фотография"></img></Link></li>
                </ul>
            </div>
        </header>
    )
}