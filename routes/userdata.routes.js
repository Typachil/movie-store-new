const {Router} = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();
const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;

router.get('/:id', auth, async (req, res) => {
  try {
    console.log("Сработал Get запрос определенного id");
    const answer = await User.findOne({ _id : new ObjectId(req.params.id) });
    if(!answer) {
      console.log("Пользователь не найден");
    }
    cosole.log("Ответ с базы данных " + answer)
    res.json(answer);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router