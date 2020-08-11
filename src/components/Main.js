import React , {useState} from 'react';
import SliderMin from "../components/SliderMin";
import "../componentCss/main.css";
import dataMovie from '../dataMovie.json';

let textContent = (<p>
    отделяет буквально один клик. Мы не просто освобождаем от необходимости идти в кинотеатр или изучать программу телепередач – у посетителей нашего ресурса гораздо больше возможностей.<br></br>
    Видеотека ivi – это постоянно пополняющаяся коллекция в рунете, которая насчитывает более 60 тысяч отечественного и зарубежного контента, доступного для просмотра онлайн. 
    Мы первыми в России подписали контракты с крупнейшими голливудскими студиями (Walt Disney, Warner Bros., Sony, 20th Century Fox, Universal, Paramount, MGM и другими) и на постоянной основе сотрудничаем с крупнейшими российскими компаниями и телеканалами.
    <br></br>Онлайн-кинотеатр ivi.ru – это:
    <ul className="pl-5">
        <li>уникальная рекомендательная система, учитывающая ваши предпочтения и предлагающая посмотреть именно то, что точно придется вам по душе;</li>
        <li>просмотр в одно касание на любом из устройств, подключенном к вашему ivi-аккаунту – от смартфонов до телевизоров с технологией Smart TV;</li>
        <li>возможность скачивать в память мобильного устройства лицензионный контент и смотреть его без доступа к Интернету;</li>
        <li>уникальные условия и преимущества для обладателей подписки ivi, делающей кинопросмотр комфортным и приятным;</li>
        <li> удобная и продвинутая система уведомлений, вы не пропустите выход крутого обсуждаемого блокбастера – мы известим о появлении подходящим для вас способом;</li>
        <li>возможность добавлять фильмы в «смотреть позже», чтобы вернуться к ним в свободное время;</li>
        <li>контент, для просмотра которого не требуется устанавливать видеоплееры или искать кодеки;</li>
        <li>просмотр онлайн контента хорошего разрешения без регистрации и смс.</li>
    </ul>
    Откройте для себя возможность смотреть фильмы онлайн бесплатно в отличном качестве с кинотеатром ivi!
</p>);

let sliceMovieArr = order => {
    let orderNew = order * 18;
    let spliceArr = dataMovie.slice(orderNew, orderNew + 18);
    spliceArr.push({title : "Посмотреть все" , link : ""})
    return spliceArr;
}

export default function Main(){
    let [contentBoolean, setContentBoolean] = useState(false);
    return(
        <main>
            <div className="wrapper">
                <div className="main-bonus">
                    <button className="main-button main-gift__button">
                        <img width="70px" height="40px" src="/img/present.png" />
                        Подарите подписку близким
                    </button>
                    <button className="main-button main-bonus__button">
                        <img src="https://ds.tivision.ru/20.06.03/picture/_src/spasibo.svg" />
                        Смотрите ivi за бонусы СПАСИБО
                    </button>
                </div>
                <div className="main-recommended">
                    <h2>Рекомендуем вам посмотреть</h2>
                    <SliderMin filmArr={sliceMovieArr(0)}/>
                </div>
                <div className="main-recommended">
                    <h2>Фантастические боевики</h2>
                    <SliderMin filmArr={sliceMovieArr(1)}/>
                </div>
                <div className="main-description">
                    <h3>Онлайн-кинотеатр ivi: фильмы в хорошем качестве всегда приносят настоящее удовольствие</h3>
                    <div className="main-description_contentDiv">
                        <div>
                            Каждый день миллионы людей ищут фильмы онлайн, и никто не хочет усложнять себе жизнь – и вы наверняка один из них! 
                            А раз так, то ivi – это именно тот ресурс, который вам нужен. 
                            От лучших кинолент в HD-качестве вас {contentBoolean? textContent : "..."}
                        </div>
                    </div>
                    <p onClick={() => setContentBoolean(!contentBoolean)}>Развернуть</p>
                </div>
                <div className="main-recommended">
                    <h2>Фильмы на языке оригинала</h2>
                    <SliderMin filmArr={sliceMovieArr(2)}/>
                </div>
            </div>  
        </main>
    )
}