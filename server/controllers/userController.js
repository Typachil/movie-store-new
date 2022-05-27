const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const {User, History} = require('../models/models');
const config = require('config');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        config.get("jwtSecret"),
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req, res, next){
        //Сделать нормальную валидацию
        let {email, password, name, role} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const candidate = await User.findOne({where: {email}});
        if (candidate){
            return next(ApiError.badRequest("Пользователь с таким email уже существует"));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({name, email, role, password: hashPassword});
        const history = await History.create({userId: user.id});
        const token = generateJwt(user.id, user.email, user.role);

        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user){
            return next(ApiError.internal("Пользователь не найден"));
        };
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
            return next(ApiError.internal("Указан неверный пароль"));
        };
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }

    async check(req, res){
        const {id, email, role} = req.user;
        const token = generateJwt(id, email, role);
        return res.json({token})
    }
}

module.exports = new UserController();