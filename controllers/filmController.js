const path = require("path");
const uuid = require('uuid');
const { Film } = require("../models/models");
const ApiError = require('../error/ApiError');

class FilmController{
    async create(req, res, next){
        try{
            const {name, description, categoryId, typeId} = req.body;
            const {img, video} = req.files;
            let imgName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static/img', imgName));
            let videoName;
            if(video){
                videoName = uuid.v4() + ".mp4";
                video.mv(path.resolve(__dirname, '..', 'static/video', videoName));
            }else{
                videoName = "cac8c922-f8bd-4164-8919-600107f6c650.mp4";
            }

            const film = await Film.create({name, description, categoryId, typeId, img: imgName, video: videoName})

            return res.json(film);
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {categoryId, typeId, limit} = req.query;
        limit = limit || 18;
        let films;
        if(!categoryId && !typeId){
            films = await Film.findAll({limit});
        }
        if(categoryId && !typeId){
            films = await Film.findAll({where: {categoryId}, limit});
        }
        if(!categoryId && typeId){
            films = await Film.findAll({where: {typeId}, limit});
        }
        if(categoryId && typeId){
            films = await Film.findAll({where: {categoryId, typeId}, limit});
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