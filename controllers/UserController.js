const { validationResult } = require("express-validator");

const { User } = require("../database/models/");
const bcrypt = require("bcrypt");
const { JSON } = require("sequelize");

const UserController = {

  userLogin: (req, res) => {
    res.render("userLogin");
  },

  loginProcess: async (req, res) => {
    const userToLogin = await User.findOne({
      raw: true,
      where: {
        Email: req.body.email,
      },
    });

    if (userToLogin){
      let isPasswordVerified = bcrypt.compareSync(
      req.body.password,
      userToLogin.Senha
    ) }
    if(isPasswordVerified){
      return res.redirect();
    } else {
      return res.render("userLogin", {errors});
    }
  },
  

  forgotPassword: (req, res) => {
    res.render("forgotPassword");
  },

  showUserAccount: (req, res) => {
    res.render("userAccount");
  },
  signUp: (req, res) => {
    let erro = req.query.erro ? 1 : 0
    res.render("userSignUp", { erro });
  },

    signUpValidation: (req, res, next) => {
      const resultValidations = validationResult(req);
      if (resultValidations.errors.length > 0) {
        return res.render("userSignUp", {
          errors: resultValidations.mapped(),
          oldData: req.body,
        });
      }
    },

  createUser: async (req, res) => {
    let userExists =  await User.findOne ({
      raw: true,
      where: {
        Email: req.body.email,
      },
    });
    if(userExists){
      res.render('userLogin')
      } else {
    await User.create({
      Nome: req.body.name,
      Email: req.body.email,
      Senha: bcrypt.hashSync(req.body.password, 10)
    });
    return res.redirect("/users/login");
  }
},
  
}

module.exports = UserController;