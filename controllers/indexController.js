const { Op } = require("sequelize");
const { Product, Image } = require("../database/models");
const idProdutosComDesconto = [1, 2, 4, 5, 8, 29]
const IndexController = {
  index: async (req, res) => {
    let products = await Product.findAll({
      raw: true,
      include: [{
          model: Image, as: 'images',
      }],
      where: {
        idProdutos: idProdutosComDesconto
      }
  });    
    products = products.map((product) => {
      product.PrecoComDesconto = product.Preco * 0.7
      return product
    })
    console.log(products[0])
    res.render("index", { title: "Latech", products });
  index: async (req, res) => {
    let products = await Product.findAll({
      raw: true,
      include: [{
          model: Image, as: 'images',
      }],
      where: {
        idProdutos: idProdutosComDesconto
      }
  });    
    products = products.map((product) => {
      product.PrecoComDesconto = product.Preco * 0.7
      return product
    })
    console.log(products[0])
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
        Nome: {
          [Op.like]: `%${q}%`
        }
      }
    })
    products = products.map(
      (product) => {
        if (idProdutosComDesconto.includes(product.id)) {
          product.PrecoComDesconto = product.Preco * 0.7
        }else{
          product.PrecoComDesconto = product.Preco * 1     
        }        
        return product
      })
    res.render("indexx", { title: "Latech", products });
  },

  showProduct: (req, res) => {
    let id = req.params.id;
    // verificar nome da tabela produtos
    let product = products.find((p) => p.id === id);
    // verificar sequelize
    res.render("produto.ejs", { product });
  },
  showCart: (req, res) => {
    let userLoggedIn = req.session.user !== undefined;
    if (!req.session.products) {
      productsInTheCart = [];
      res.render("cart.ejs");
    } else {
      let productsInTheCart = req.session.products.map((id) =>
        products.find((p) => p.id == id)
      );
      res.render("cart", { productsInTheCart, userLoggedIn });
    }
  },
  addCart: (req, res) => {
    if (req.session.products) {
      req.session.products.push(req.body.productChosen);
    } else {
      req.session.products = [req.body.productChosen];
    }
    res.redirect("/products");
    console.log(req.session);
  },

};

module.exports = IndexController;
