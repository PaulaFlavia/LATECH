const { Op } = require("sequelize");
const { Product, Image } = require("../database/models");
const IndexController = {
  index: async (req, res) => {
    let products = await Product.findAll({
      limit: 4,
      raw: true,
      include: [{
        model: Image, as: 'images',
      }],
      where: {
        Status: 1,
        Oferta: true,
      },
    });

    res.render("index", { title: "Latech", products });
  },

  aboutUs: (req, res) => {

    res.render("aboutUs");
  },

  search: async (req, res) => {
    let q = req.query.q;

    let products = await Product.findAll({
      raw: true,
      include: [{
        model: Image, as: 'images',
      }],
      where: {
        Status: 1,
        Nome: {
          [Op.like]: `%${q}%`
        }
      }
    })

    res.render("search", { products });
  },

  police: (req, res) => {
    res.render("privacyPolice")
  },

};
module.exports = IndexController;
