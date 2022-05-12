const path = require("path");
const uuid = require('uuid');
const { Film } = require("../models/models");
const ApiError = require('../error/ApiError');

class FilmController{
    async create(req, res, next){
        try{
            const {name, description, categoryId} = req.body;
            const {img, video} = req.files;
            let imgName = uuid.v4() + ".jpg";
            let videoName = uuid.v4() + ".mp4"
            img.mv(path.resolve(__dirname, '..', 'static/img', imgName));
            video.mv(path.resolve(__dirname, '..', 'static/video', videoName));

            const film = await Film.create({name, description, categoryId, img: imgName, video: videoName})

            return res.json(film);
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        const {categoryId, limit} = req.query;
        limit = limit || 18;
        let films;
        if(!categoryId){
            films = await Film.findAndCountAll({limit});
        }
        if(categoryId){
            films = await Film.findAndCountAll({where: {categoryId}, limit});
        }

        return res.json(films);
    }

    async getOne(req, res){
        const {id} = req.params;
        const film = await Film.findOne(
            {
               where: {id} 
            }
        )
        return res.json(film);
    }
}

module.exports = new FilmController();