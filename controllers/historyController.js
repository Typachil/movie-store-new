const { History, HistoryFilms, Film } = require("../models/models");
const ApiError = require('../error/ApiError');

class HistoryContoller{
    async setHistoryFilm(req, res, next){
        try{
            const {userId, filmId} = req.body;
            await History.findOne({where: {userId}}).then(async(history) => {
                if(!history) console.log("История пользователя не найдена");
                const historyFilm = await HistoryFilms.findOrCreate({historyId : history.id, filmId, where :{historyId: history.id, filmId}});
                return res.json(historyFilm);
            })
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getHistoryUser(req, res, next){
        try{
            const {userId} = req.query;

            await History.findOne({where: {userId}, include: HistoryFilms}).then((history) => {
                if(!history) console.log("История пользователя не найдена");
                history.getHistoryfilms({include: Film}).
                then(films => {
                    return res.json(films);
                })
            })
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new HistoryContoller();