
const { Admin } = require('../database/models')

const loggedAdminDataMiddleware = async (req, res, next) => {

    res.locals.isAdminLogged = false;

    if (req.session.adminLogged) {

        let adminFromCookie = await Admin.findOne({
            raw: true,
            where: {
                Email: req.cookies.adminEmail,
            },
        });

        if (adminFromCookie) {
            req.session.adminLogged = adminFromCookie;
        }
        res.locals.isAdminLogged = true;

    }
    next()
}
module.exports = loggedAdminDataMiddleware;