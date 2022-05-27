import {makeAutoObservable} from "mobx";

export default class FilmStore {
    constructor(){
        this._categories = [];
        this._films = [];
        this._types = [
            {id: 1, name: "Фильм"},
            {id: 2, name: "Мультфильм"},
            {id: 3, name: "Сериал"},
            {id: 4, name: "Аниме"},
        ];
        this._rateUser = 0;

        makeAutoObservable(this);
    }

    setСategories(categories){
        this._categories = categories;
    }

    setFilms(films){
        this._films = films;
    }

    setRateUser(rate){
        this._rateUser = rate || 0;
    }

    get categories(){
        return this._categories;
    }

    get films(){
        return this._films;
    }

    get types(){
        return this._types;
    }

    get rateUser(){
        return this._rateUser;
    }
}