
const { User } = require('../database/models')

const loggedUserDataMiddleware = async (req, res, next) => {

    res.locals.isLogged = false;

    if (req.session.userLogged) {

        let userFromCookie = await User.findOne({
            raw: true,
            where: {
                Email: req.cookies.userEmail,
            },
        });

        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }
        res.locals.isLogged = true;

    }
    next()
}
module.exports = loggedUserDataMiddleware;