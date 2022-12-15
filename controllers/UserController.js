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
      Senha: bcrypt.hashSync(req.body.password, 10),
    });
    return res.redirect("/users/login");
  }
},
  
}
    // essa fução vem da model User e verifica se o email já está cadastrado
//     const userExists = User.findUserByField('email', req.body.email)
//        if(userExists){
//        return res.render('userSingUp', {
//        errors: {
//            email: {
//             msg: 'Este email já está registrado'
//            }
//         },
//          oldData: req.body
//      });
//     }
    
//     const createUser = {
//         ...req.body,
//         password: bcrypt.hashSync(req.body.password, 10)
//       }
  
//       let userCreated = User.create(createUser);
//       //return res.redirect('/user/userLogin');
//       return res.send('usuario criado foi, véia padawan')
//       //returm res.redirect(/user/login); depois que salvou o usuário redireciona para o login
    

//   // logout: (req,res) => {

//   // }

  


module.exports = UserController;