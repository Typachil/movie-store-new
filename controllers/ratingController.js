const { Rating, Film } = require("../models/models");
const ApiError = require('../error/ApiError');

class RatingContoller{
    async getRatingUser(req, res, next){
        try{
            let {userId, filmId} = req.query;
            const rating = await Rating.findOne({where: {userId, filmId}});
            return res.json(rating);
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async ratingFilm(req, res, next){
        try{
            const {rate, filmId, userId} = req.body;
            let rating = await Rating.findOne({where:{filmId, userId}});
            if(rating){
                rating.update({rate})
            }else{
                rating = await Rating.create({rate, filmId, userId});
            }

            let sumRating4Film = 0;
            const rateFilm = await Rating.findAndCountAll({where: {filmId}}).then(item => {
                item.rows.map(item => sumRating4Film += item.rate)
                sumRating4Film = Math.round(sumRating4Film / item.count);
            });
            let film = await Film.findOne({where: {id : filmId}});
            film.update({rating: sumRating4Film});
            
            return res.json(rating);
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RatingContoller();