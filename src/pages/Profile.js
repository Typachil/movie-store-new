import React, {useState} from 'react';
import '../componentCss/profile.css';

export default function Profile(){
    const [checkboxState, setCheckboxState] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function checkboxStateChange(event){
        setCheckboxState(!checkboxState);
        event.stopPropagation();
    }

    async function signUp(event){
        let user = {
            name: userName,
            email: userEmail,
            password: userPassword
        };
        await fetch('http://localhost:7777/signup', {
            method : 'POST',
            mode: 'no-cors',
            headers : {
                'Content-Type': 'application/json;charset=utf-8'   
            },
            body : JSON.stringify(user)
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        
      }

    return (
        <div className="pages-content wrapper">
            <h1>Мой профиль</h1>
            <div className="profile-registration">
                <form method="post" onSubmit={(event)=> event.preventDefault()}>
                    <div>
                        <h2>Sign in</h2>
                        <button className="profile-user__register">Register</button>
                    </div>
                    <div className="profile-user__name">
                        <label>
                            <img src="/img/profile/user.png"></img>
                            <input type="text" value={userName} onChange={(event) => setUserName(event.target.value)}
                                name="user_name" className="user_name" placeholder="My name is"></input>
                        </label>
                    </div>
                    <div className="profile-user__email">
                        <label>
                            <img src="/img/profile/email.png"></img>
                            <input type="text" value={userEmail} onChange={(event) => setUserEmail(event.target.value)}
                            name="user_email" className="user_email" placeholder="Email"></input>
                        </label>
                    </div>
                    <div className="profile-user__password">
                        <label>
                            <img src="/img/profile/padlock.png"></img>
                            <input type="text" value={userPassword} onChange={(event) => setUserPassword(event.target.value)}
                            name="user_password" className="user_password" placeholder="Password"></input>
                        </label>
                    </div>
                    <div>
                        <button className="profile-user__signUp" onClick={signUp}>Sign in</button>
                    </div>
                    <div>
                        <div>
                            <div onClick={checkboxStateChange} className="profile-user-remember">
                                <input type="checkbox" value={`${checkboxState}`} className="profile-user-remember__checkbox" name="user_remember" />
                                <div className="profile-user-remember__checkboxAnimate">
                                    <img src="/img/profile/cross.png"></img>
                                    <img src="/img/profile/check.png"></img>
                                    <div className="profile-user-remember__switch" style={{left : checkboxState ? 5 + "%" : 55 + "%"}}></div>
                                </div>
                                Remember me
                            </div>
                        </div>
                        <div><p className="profile-user__lostPass">Lost your password?</p></div>
                    </div>
                </form>
            </div>
        </div>
    )
}