const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const {
  Admin,
  User,
  Product,
  Image,
  Brand,
  Category,
  Purchase
} = require("../database/models");
const bcrypt = require("bcrypt");
const { raw } = require("express");

let onlyNumber = (s) => {
  let numStr = s.replace(/[^\d\.\,]+/g, '');
  numStr = numStr.replace(/,/g, '.');
  return numStr;
};

const AdminController = {
  admin: (req, res) => {

    res.render("adminMain");
  },

  showAdminPanel: (req, res) => {
    res.render("adminPanel");
  },

  adminSignUp: (req, res) => {
    res.render("adminSignUp");
  },

  createAdmin: async (req, res) => {
    const resultValidations = validationResult(req);
    if (resultValidations.errors.length > 0) {
      return res.render("adminSignUp", {
        errors: resultValidations.mapped(),
        oldAdminData: req.body,
      });
    }

    let adminExists = await Admin.findOne({
      raw: true,
      where: {
        Email: req.body.emailAdmin,
      },
    });
    if (adminExists) {
      res.redirect("/admin/login");
    } else {
      const adminCreated = await Admin.create({
        Name: req.body.nameAdmin,
        Email: req.body.emailAdmin,
        WorkerId: req.body.workerAdmin,
        Password: bcrypt.hashSync(req.body.passwordAdmin, 10),
      });
      return res.redirect("/admin/login");
    }
  },

  adminLogin: (req, res) => {
    //   let error = "";
    //   if (req.query.error == 1) {
    //     error = "Senha ou email não conferem.";
    //   } else if (req.query.error == 2) {
    //     error = "Já existe um cadastro para esse email. Deseja fazer login?";
    //   }
    res.render("adminLogin");
  },

  adminLoginProcess: async (req, res) => {
    try {
      const adminToLogin = await Admin.findOne({
        raw: true,
        where: {
          Email: req.body.emailAdmin,
        },
      });

      let isPasswordVerified = bcrypt.compareSync(
        req.body.passwordAdmin,
        adminToLogin.Password
      );

      if (!adminToLogin) {
        return res.redirect("/admin/create");
      } else {
        if (!isPasswordVerified) {
          return res.redirect("/admin/login");
        } else {
          if (adminToLogin && isPasswordVerified) {
            delete adminToLogin.Password;
            req.session.adminLogged = adminToLogin;
          }

          if (req.body.remember_admin) {
            res.cookie("adminEmail", req.body.emailAdmin, {
              maxAge: (1000 * 60) * 30000
            });
            console.log(req.session.adminLogged);
          }
          if (!req.body.remember_admin) {
            res.cookie("adminEmail", req.body.email, {
              maxAge: (1000 * 60) * 5000

            });
          }

          res.redirect("/admin/panel");
        }
      }
    } catch (error) {
      return res.render("adminSignUp", {
        error:
          "Não existe cadastro para esse email, deseja realizar um cadastro?.",
      });
    }
  },

  getUsers: async (req, res) => {
    const usersList = await User.findAll({ raw: true });
    return res.render("adminUsersList", { usersList });
  },

  adminUserToEdit: async (req, res) => {
    let userId = req.params.id;
    console.log(req.body);

    let user = await User.findByPk(userId);

    console.log(user);
    res.render("adminUserToEdit", { user });
  },

  updateUserData: async (req, res) => {
    await User.findByPk(req.params.id);
    console.log(req.body);

    let userUpdated = await User.update(
      {
        Nome: req.body.name,
        Sobrenome: req.body.lastName,
        Telefone: req.body.phone,
        Avatar: req.body.avatar,
      },
      {
        where: {
          idUser: req.params.id
        }
      }
    )
    console.log(userUpdated)
    res.redirect("/admin/adminUsersList");
  },

  adminDeleteUser: async (req, res) => {
    await User.destroy({
      where: {
        idUser: req.params.id,
      },
    });
    return res.redirect("/admin/adminUsersList");
  },

  adminShowProduct: async (req, res) => {
    let products = await Product.findAll({
      raw: true,
      include: [
        {
          model: Image,
          as: "images",
        },
      ],
    });
    res.render("adminProduct", { products });
  },

  adminSearchProduct: async (req, res) => {
    let s = req.query.search;
    let products = await Product.findAll({
      raw: true,
      include: [
        {
          model: Image,
          as: "images",
        },
      ],
      where: {
        Nome: {
          [Op.like]: `%${s}%`,
        },
      },
    });

    res.render("adminProduct", { products });
  },

  adminShowOneProduct: async (req, res) => {
    let id = req.params.id;
    let product = await Product.findByPk(id, {
      raw: true,
      include: [
        { model: Image, as: "images" },
        { model: Brand, as: "brands" },
        { model: Category, as: "categories" },
      ],
    });

    let brands = await Brand.findAll({ raw: true });

    res.render("adminEditProduct", { product, brands });
  },

  adminEditProduct: async (req, res) => {
    let id = req.params.id;

    console.log(req.body);

    let product = await Product.findByPk(id);
    product.set({
      Nome: req.body.Nome,
      Preco: onlyNumber(req.body.Preco),
      PrecoComDesconto: onlyNumber(req.body.PrecoComDesconto),
      Marcas_id: req.body.idMarcas,
      Oferta: req.body.Oferta,
      Status: req.body.Status,
      Informacoes: req.body.Informacoes,
    });

    await product.save();

    res.redirect("/admin/adminProduct");
  },

  adminShowCreateProduct: async (req, res) => {
    let brands = await Brand.findAll({ raw: true });
    let category = await Category.findAll({ raw: true });
    res.render("adminCreateProduct", { brands, category });
  },

  adminCreateProduct: async (req, res) => {
    if (req.body.Nome !== '' || req.body.Preco !== '') {
      const newProduct = await Product.create({
        Nome: req.body.Nome,
        Codigo: req.body.Codigo,
        Preco: onlyNumber(req.body.Preco),
        PrecoComDesconto: onlyNumber(req.body.PrecoComDesconto),
        Oferta: req.body.Oferta,
        Status: req.body.Status,
        Marcas_id: req.body.idMarcas,
        Categorias_id: req.body.Categoria,
        Informacao: req.body.Informacoes,
      });

      const newImage = await Image.create({
        Nome: "Default Image",
        Data_Upload: "07/12/2022",
        Imagem: "/img/default-img.jpg",
        Produtos_idProdutos: newProduct.idProdutos,
        Marcas_idMarcas: newProduct.Marcas_id,
      });

      return res.redirect("/admin/adminProduct");
    } else {
      return res.redirect("/admin/adminProductCreate");
    };
  },

  adminDeleteProduct: async (req, res) => {
    let id = req.params.id;

    let product = await Product.findByPk(id);
    if (product.Status == 1) {
      product.set({
        Status: 0,
      });
    } else {
      product.set({
        Status: 1,
      });
    }
    await product.save();

    res.redirect("/admin/adminProduct");
  },

  logoutAdmin: (req, res) => {
    req.session.destroy();
    res.clearCookie("AdminEmail");
    return res.redirect("/");
  },

  listOrders: async (req, res) => {
    const ordersList = await Purchase.findAll({
      raw: true,
      include: [
        { model: User, as: "users" },
        // { model: Product, as: "product" }

      ]

    });

    return res.render("adminOrdersList", { ordersList });
  }
};
module.exports = AdminController;