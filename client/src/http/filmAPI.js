import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createCategory = async (category) =>{
    const {data} = await $authHost.post('api/category', category);
    return data;
}

export const fetchCategory = async () =>{
    const {data} = await $host.get('api/category');
    return data;
}

export const createFilm = async (film) =>{
    const {data} = await $authHost.post('api/film', film);
    return data;
}

export const fetchFilms = async (categoryId, typeId, limit = 18) =>{
    const {data} = await $host.get('api/film', {params : {categoryId, typeId, limit}});
    return data;
}

export const fetchOneFilm = async (id) =>{
    const {data} = await $host.get('api/film/' + id);
    return data;
}

export const rateFilm = async(rate, filmId, userId) => {
    const {data} = await $authHost.post('api/rating', {rate, filmId, userId});
    return data;
}

export const getRateFilm = async(filmId, userId) => {
    const {data} = await $authHost.get('api/rating', {params : {filmId, userId}});
    return data;
}

export const setHistoryFilm = async(userId, filmId) => {
    const {data} = await $authHost.post('api/history', {userId, filmId});
    return data;
}

export const getHistoryUser = async(userId) => {
    const {data} = await $authHost.get('api/history', {params : {userId}});
    return data;
}
