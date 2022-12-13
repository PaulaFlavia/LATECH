const { validationResult } = require("express-validator");

const { User } = require("../database/models/");
const bcrypt = require("bcrypt");
const { JSON } = require("sequelize");

const UserController = {
  userLogin: (req, res) => {
    let erro = req.query.erro ? 1 : 0
    res.render("userLogin", {erro});
  },

  doingLogin: async (req, res) => {
    const userToLogin = await User.findOne({
      raw: true,
      where: {
        Email: req.body.email,
      },
    });

    if (userToLogin && bcrypt.compareSync(
      req.body.password,
      userToLogin.Senha
    )) {
      return res.render("index");
    } else {
      return res.render("userLogin", {
        errors: "Este email não está cadastrado",
      }
      );
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
    signUpValidation: (req, res, next) => {
      const resultValidations = validationResult(req);
      if (resultValidations.errors.length > 0) {
        return res.render("userSignUp", {
          errors: resultValidations.mapped(),
          oldData: req.body,
        });
      }
    }
  },

  // createUser: async (req, res) => {
  //   await User.create({
  //     Nome: req.body.name,
  //     Email: req.body.email,
  //     Senha: bcrypt.hashSync(req.body.password, 10),
  //   });
  //   return res.redirect("/users/login");
  // },


    createUser: async (req, res) => {
      let userExists =  await User.findOne ({
        raw: true,
        where: {
          Email: req.body.email,
        },
      });
    if(userExists){
      return res.redirect("/users/login?erro=1");
     }  else {
      await User.create({
        Nome: req.body.name,
        Email: req.body.email,
        Senha: bcrypt.hashSync(req.body.password, 10),
      });
      return res.redirect("/users/login");
    }
  },
  // getUsers: (req, res) => {
  //   const usersList = User.findAll().then(function (allUsersList) {
  //     return cosole.log(allUserList);
  //   const usersList = User.findAll().then(function (allUsersList) {
  //     return cosole.log(allUserList);
  //   });
  // },
};

module.exports = UserController;
