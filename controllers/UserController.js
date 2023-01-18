const { validationResult } = require("express-validator");
const { User, Purchase, Product, Address } = require("../database/models/");
const bcrypt = require("bcrypt");

const UserController = {

  signUp: (req, res) => {
    let error = req.query.error ? 1 : 0;
    res.render("userSignUp", { error });
  },

  createUser: async (req, res) => {
    const resultValidations = validationResult(req);
    if (resultValidations.errors.length > 0) {
      return res.render("userSignUp", {
        error: undefined,
        errors: resultValidations.mapped(),
        oldData: req.body,
      });
    }

    let userExists = await User.findOne({
      raw: true,
      where: {
        Email: req.body.email,
      },
    });
    if (userExists) {
      res.redirect("/users/login?error=2");
    } else {
      let avatarFileName = req.file.filename;
      const userCreated = await User.create({
        Nome: req.body.name,
        Sobrenome: req.body.last_name,
        Email: req.body.email,
        Telefone: req.body.phone_number,
        Avatar: `/img/avatars/${avatarFileName}`,
        Cpf: req.body.personal_id,
        Senha: bcrypt.hashSync(req.body.password, 10),
      });
      return res.redirect("/users/login");
    }
  },

  userLogin: (req, res) => {
    let error = "";
    if (req.query.error == 1) {
      error = "Senha ou email não conferem.";
    } else if (req.query.error == 2) {
      error = "Já existe um cadastro para esse email. Deseja fazer login?";
    }
    res.render("userLogin", { error });
  },

  loginProcess: async (req, res) => {
    try {
      const userToLogin = await User.findOne({
        raw: true,
        where: {
          Email: req.body.email,
        },
      });

      let isPasswordVerified = bcrypt.compareSync(
        req.body.password,
        userToLogin.Senha
      );

      if (!userToLogin) {
        return res.redirect("/users/signup?error=2");
      } else {
        if (!isPasswordVerified) {
          return res.redirect("/users/login?error=1");
        } else {
          if (userToLogin && isPasswordVerified) {

            delete userToLogin.Senha;
            req.session.userLogged = userToLogin;
          }

          if (req.body.remember_user) {
            res.cookie("userEmail", req.body.email, {
              maxAge: (1000 * 60) * 60
            });
          }
          if (!req.body.remember_user) {
            res.cookie("userEmail", req.body.email, {
              maxAge: (1000 * 60) * 30

            });
          }
          let url = req.session.cart ? "/orders/payment" : "/"
          res.redirect(url);
        }
      }
    } catch (error) {
      return res.render("userSignUp", {
        error:
          "Não existe cadastro para esse email, deseja realizar um cadastro?.",
      });
    }
  },


  forgotPassword: (req, res) => {
    res.render("forgetPassword", {})
  },

  recoverPassword: (req, res) => {
    res.send("Um email foi enviado para sua caixa Postal para recuperar sua senha.");
  },


  showUserAccount: async (req, res) => {
    const userLogged = req.session.userLogged;
    let { idUser } = userLogged;
    let userPurchases = await Purchase.findAll(
      {
        raw: true,
        include: [{
          association: 'users'
        }],
        where: {
          Users_idUser: idUser
        },
      })

    res.render('userAccount', { userLogged, userPurchases })
  },

  userToUpdate: async (req, res) => {
    let userId = req.params.id;
    let userLogged = await User.findByPk(userId);

    if (userLogged) {
      res.render('updateUser', { userLogged })
    }

  },

  updateUserData: async (req, res) => {
    let userLogged = await User.update(
      {
        Nome: req.body.name,
        Sobrenome: req.body.lastName,
        Telefone: req.body.phone,
      },

      {
        where: {
          idUser: req.params.id
        }
      }
    )

    return res.redirect('/users/account')
  },

  updateUserAvatar: async (req, res) => {
    let newAvatarFileName = req.file.filename;

    let userLogged = await User.update(
      {
        Avatar: `/img/avatars/${newAvatarFileName}`,
      },
      {
        where: {
          idUser: req.params.id
        }
      }
    )

    return res.redirect('/users/account')
  },


  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("userEmail");
    return res.redirect("/");
  },

  deleteUser: async (req, res) => {
    await User.destroy(
      {
        where: {
          idUser: req.params.id
        }
      }
    )
    req.session.destroy();
    return res.redirect('/')
  }
};

module.exports = UserController;
