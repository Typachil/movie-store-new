import React from "react";
import "../componentCss/header.css";

export default function Headers(){
    return (
        <header>
            <div className="wrapper">
                <ul>
                    <li className="header-logo"><a href="/"><img src="https://st.tivision.ru/images/_main/ivi-top/logo.svg" alt="фотография"></img></a></li>
                    <li><a href="/">Мой ivi</a></li>
                    <li><a href="#">Фильмы</a></li>
                    <li><a href="#">Мультфильм</a></li>
                    <li><a href="#">Сериалы</a></li>
                    <li><a href="#">Спорт</a></li>
                    <li><a href="#">ТВ-каналы</a></li>
                    <li><a href="#">Подборки</a></li>
                    <li className="on-subs"><a href="#">Подключить подписку</a></li>
                    <li><input className="header-search" type="text" placeholder="Поиск"/></li>
                    <li className="notifications"><img src="/img/bell.png" width="32px" height="32px" alt="фотография"></img></li>
                    <li className="user"><img width="32px" height="32px" src="/img/user.png" alt="фотография"></img></li>
                </ul>
            </div>
        </header>
    )
}