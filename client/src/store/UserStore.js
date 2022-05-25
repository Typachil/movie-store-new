import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor(){
        this._isAuth = false;
        this._user = {};
        this._userHistory = [];
        makeAutoObservable(this);
    }

    setIsAuth(bool){
        this._isAuth = bool;
    }

    setUser(user){
        this._user = user;
    }

    setUserHistory(history){
        this._userHistory = history;
    }

    get user(){
        return this._user;
    }

    get userHistory(){
        return this._userHistory;
    }

    get isAuth(){
        return this._isAuth;
    }
}