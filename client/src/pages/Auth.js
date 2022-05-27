import React, { useContext, useState } from 'react';
import '../componentCss/profile.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from "mobx-react-lite";
import { Context } from '../index';
import { Alert } from 'react-bootstrap';

const Auth = observer( () => {
    const {user} = useContext(Context)
    const [checkboxState, setCheckboxState] = useState(false);
    const [messageForm, setMessageForm] = useState("")
    const history = useHistory();
    const [form, setForm] = useState({
        name: "", email: "", password: ""
    })
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    function setFormValue(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function checkboxStateChange(event) {
        setCheckboxState(!checkboxState);
        event.stopPropagation();
    }

    async function signUp() {
        try {
            let message = await registration({ ...form });
            user.setUser(user);
            user.setIsAuth(true);
            history.push(HOME_ROUTE);
        } catch (e) {
            const error = e.response.data;
            if(error.errors){
                setMessageForm(error.errors[0].msg)
            }else{
                setMessageForm(error.message)
            }
        }
    }

    async function signIn() {
        try {
            let message = await login({ email: form.email, password: form.password });
            user.setUser(user);
            user.setIsAuth(true);
            history.push(HOME_ROUTE);
        } catch (e) {
            const error = e.response.data;
            setMessageForm(error.message)
        }
    }

    return (
        <div className="pages-content container">
            <h1>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
            <div className="profile-registration">
                <form onSubmit={(event) => event.preventDefault()}>
                    <div>
                        <h2>{!isLogin ? "Зарегестрироваться" : "Войти"}</h2>
                        <button className="profile-user__register">{!isLogin ? <Link to={LOGIN_ROUTE}>Войти</Link>: <Link to={REGISTRATION_ROUTE}>Зарегестрироваться</Link>}</button>
                    </div>
                    {isLogin ? null :
                        <div className="profile-user__name">
                            <label>
                                <img src="/img/profile/user.png"></img>
                                <input type="text" value={form.name} onChange={setFormValue}
                                    name="name" className="user_name" placeholder="Ваш логин"></input>
                            </label>
                        </div>
                    }
                    <div className="profile-user__email">
                        <label>
                            <img src="/img/profile/email.png"></img>
                            <input type="text" value={form.email} onChange={setFormValue}
                                name="email" className="user_email" placeholder="Почта"></input>
                        </label>
                    </div>
                    <div className="profile-user__password">
                        <label>
                            <img src="/img/profile/padlock.png"></img>
                            <input type="password" value={form.password} onChange={setFormValue}
                                name="password" className="user_password" placeholder="Пароль"></input>
                        </label>
                    </div>
                    {!messageForm || 
                        <Alert variant={'danger'}>
                            {messageForm}
                        </Alert>}
                    <div>
                        {!isLogin ?
                            <button className="profile-user__signUp" onClick={signUp}>Зарегестрироваться</button> :
                            <button className="profile-user__signUp" onClick={signIn}>Войти</button>}
                    </div>
                    <div>
                        <div>
                            <div onClick={checkboxStateChange} className="profile-user-remember">
                                <input type="checkbox" value={`${checkboxState}`} className="profile-user-remember__checkbox" name="user_remember" />
                                <div className="profile-user-remember__checkboxAnimate">
                                    <img src="/img/profile/cross.png"></img>
                                    <img src="/img/profile/check.png"></img>
                                    <div className="profile-user-remember__switch" style={{ left: checkboxState ? 5 + "%" : 55 + "%" }}></div>
                                </div>
                                Запомнить меня
                            </div>
                        </div>
                        <div><p className="profile-user__lostPass">Забыли пароль?</p></div>
                    </div>
                </form>
            </div>
        </div>
    )
});

export default Auth;