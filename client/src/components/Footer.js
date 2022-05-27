import React from 'react';
import '../componentCss/footer.css';

export default function Footer(){
    return (
        <footer>
            <div className="footer-nav-wrapper">
                <div className="footer-nav container">
                    <div>
                        <p>Разделы</p>
                        <ul>
                            <li>Фильмы</li>
                            <li>Сериалы</li>
                            <li>Подборки</li>
                            <li>Титр</li>
                            <li>Трейлеры</li>
                        </ul>
                    </div>
                    <div>
                        <p>Устройства</p>
                        <ul>
                            <li>Android</li>
                            <li>iPhone/iPad/iPod</li>
                            <li>LG Smart TV</li>
                            <li>Samsung Smart TV</li>
                            <li>Sony Smart TV</li>
                            <li>Philips Smart TV</li>
                            <li>Toshiba Smart TV</li>
                            <li>Apple TV</li>
                        </ul>
                    </div>
                    <div>
                        <p>О нас</p>
                        <ul>
                            <li>О компании</li>
                            <li>Размещение рекламы</li>
                            <li>Активация сертификата</li>
                            <li>Вакансии</li>
                            <li>Партнерам</li>
                            <li>Партнёрская программа</li>
                            <li>Пользовательское соглашение</li>
                            <li>Политика конфиденциальности</li>
                            <li>Программа бета-тестирования</li>
                        </ul>  
                    </div>
                    <div>
                        <p>Поддержка</p>
                        <ul>
                            <li>support@voir.ru</li>
                            <li>8 800 234-49-23</li>
                            <li>Вопросы и ответы — ask.voir.ru</li>
                            <li>Telegram</li>
                            <li>Viber</li>
                            <li>Messenger</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-media-wrapper">
                <div className="footer-media container">
                    <div className="footer-media-icons">
                        <p>Присоединяйтесь:</p>
                        <div className="footer-media-icon footer-media__vk"></div>
                        <div className="footer-media-icon footer-media__fb"></div>
                        <div className="footer-media-icon footer-media__tw"></div>
                        <div className="footer-media-icon footer-media__gp"></div>
                        <div className="footer-media-icon footer-media__in"></div>
                    </div>
                    <div>
                        © 2020 ООО «Voir.ру»
                    </div>
                </div>
            </div>
        </footer>
    )
}