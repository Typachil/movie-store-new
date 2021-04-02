import React, {useState} from 'react';
import '../componentCss/profile.css';

export default function Profile(){
    const [checkboxState, setCheckboxState] = useState(false);

    function checkboxStateChange(event){
        setCheckboxState(!checkboxState);
        event.stopPropagation();
        console.log(event.target);
    }

    return (
        <div className="pages-content wrapper">
            <h1>Мой профиль</h1>
            <div className="profile-registration">
                <form method="post">
                    <div>
                        <h2>Sign in</h2>
                        <button className="profile-user__register">Register</button>
                    </div>
                    <div className="profile-user__name">
                        <label>
                            <img src="/img/profile/user.png"></img>
                            <input type="text" name="user_name" className="user_name" placeholder="My name is"></input>
                        </label>
                    </div>
                    <div className="profile-user__password">
                        <label>
                            <img src="/img/profile/padlock.png"></img>
                            <input type="text" name="user_password" className="user_password" placeholder="Password"></input>
                        </label>
                    </div>
                    <div>
                        <button className="profile-user__signIn" type="submit">Sign in</button>
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