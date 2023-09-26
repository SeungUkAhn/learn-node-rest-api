const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', [
        body('email')
            .isEmail()
            .withMessage('유효한 이메일 주소를 입력해주세요.')
            .custom((value, {req}) => {
                return User.findOne({email: value}).then(userDoc => {
                    if(userDoc){
                        return Promise.reject('사용 중인 이메일 주소입니다.');
                    }
                })
            })
            .normalizeEmail(),
        body('password').trim().isLength({min: 5}),
        body('name').trim().not().isEmpty()
    ], authController.signup);

router.post('/login', authController.login);

module.exports = router;