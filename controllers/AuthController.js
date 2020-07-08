const passport = require('passport');
const { passwordMatch } = require('../validations/authValidations');
const { requireField } = require('../validations/commonValidations');
const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');

const registerUser = (req, res) => {
    let userDetails = req.body;
    let pValidate = passwordMatch(userDetails.password, userDetails.cPassword);
    let emailValidate = requireField(userDetails.email, "Email");
    if (!pValidate.status) {
        res.status(400).json({ error: pValidate.error });
    }
    if (!emailValidate.status) {
        res.status(400).json({ error: emailValidate.error });
    }
    userSchema.create(userDetails)
        .then((user) => {
            res.status(200).json(user);
        }).catch(err => {
            res.status(400).json(err);
        })
};

const loginUser = (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
        if (err) return res.status(401).json(err);
        if (!user) return res.status(401).json({ message: "unautherized" })
        let accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.SECRET_KEY
        )
        return res.status(200).json({ accessToken });
    })(req, res, next);
}

module.exports = {
    registerUser,
    loginUser
};
