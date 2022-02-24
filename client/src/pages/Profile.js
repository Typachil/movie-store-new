import React, { useState, useContext, useEffect } from 'react';
import useHttp from "../hooks/http.hook";
import { AuthContext } from '../context/AuthContext';
import '../componentCss/profile.css';

export default function Profile() {
    const { loading, request, error, clearError } = useHttp();
    const auth = useContext(AuthContext);
    const [storageData, setStorageData] = useState({name: "", surname: ""})
    const [formStateSignUp, setFormStateSignUp] = useState(false);
    const [checkboxState, setCheckboxState] = useState(false);
    const [messageForm, setMessageForm] = useState('')
    const [form, setForm] = useState({
        name: "", surname: "", email: "", password: "", date: null
    })

    useEffect(async() => {
        try {
            let storage = JSON.parse(localStorage.getItem("userData"));
            if(storage.token){
                let data = await request(`/api/userdata/${storage.userId}`, 'GET', null, {
                    Authorization: `Bearer ${storage.token}`
                });
                setStorageData({...storageData, name : data.name, surname: data.surname});
            }
            console.log(storageData)
        } catch (e) {
            console.log(e)
        }
    } , [auth.token])

    function setFormValue(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function formStateSignUpChange() {
        setFormStateSignUp(!formStateSignUp);
    }

    function checkboxStateChange(event) {
        setCheckboxState(!checkboxState);
        event.stopPropagation();
    }

    async function signUp() {
        try {
            let message = await request('/api/auth/register', 'POST', { ...form, date: new Date().toString() });
            setMessageForm(message);
            setFormStateSignUp(!formStateSignUp);
        } catch (e) {
            setMessageForm(e)
        }
    }

    async function signIn() {
        try {
            let message = await request('/api/auth/login', 'POST', { email: form.email, password: form.password });
            auth.login(message.token, message.userId)
            setMessageForm(message);
        } catch (e) {
            setMessageForm(e)
        }
    }

return (
    <div className="pages-content wrapper">
        <h1>Мой профиль</h1>
        {auth.isAuthenticated || 
            <div>
                <div>{storageData.name}</div>
                <div>{storageData.surname}</div>
            </div>}
        <div className="profile-registration">
            <form onSubmit={(event) => event.preventDefault()}>
                <div>
                    <h2>{formStateSignUp ? "Зарегестрироваться" : "Войти"}</h2>
                    <button className="profile-user__register" onClick={formStateSignUpChange}>{formStateSignUp ? "Войти" : "Зарегестрироваться"}</button>
                </div>
                {!formStateSignUp ? null :
                    <>
                        <div className="profile-user__name">
                            <label>
                                <img src="/img/profile/user.png"></img>
                                <input type="text" value={form.name} onChange={setFormValue}
                                    name="name" className="user_name" placeholder="Ваше имя"></input>
                            </label>
                        </div>
                        <div className="profile-user__name">
                            <label>
                                <img src="/img/profile/user.png"></img>
                                <input type="text" value={form.surname} onChange={setFormValue}
                                    name="surname" className="user_name" placeholder="Ваша фамилия"></input>
                            </label>
                        </div>
                    </>}
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
                <div>
                    <div className='profile-user__message'>{messageForm}</div>
                    {formStateSignUp ?
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
}