const { localsName } = require('ejs')
const db = require('../database/models')


const ordersController = {
    index: (req, res) => {

        db.Product.findAll()
            .then(function (productsReturned) {
                return res.render('index.ejs', { products: productsReturned })
            })
            .catch((error) => console.log(error))

    },

    addCart: (req, res) => {
        if (req.session.cart) {
            req.session.cart.push(req.body.selectedProduct)
        } else {

            req.session.cart = [req.body.selectedProduct]
        }


        res.redirect('/orders')
    },


    showCart: async (req, res) => {
        let idsIntoCart = req.session.cart
       
        let getProductById = async (id) => {
            let productFound = await db.Product.findByPk(
                id, {
                raw: true,
                include: [
                    { association: 'images' },
                ]
            })
            console.log("🚀 ~ file: OrdersController.js:51 ~ getProductById ~ id", id)
            console.log("🚀 ~ file: OrdersController.js:51 ~ getProductById ~ id", id)
            return productFound
        }

        let productsIntoCart = await Promise.all(idsIntoCart.map(getProductById))

        productsIntoCart.forEach((p) => {
        productsIntoCart.forEach((p) => {
            p.quantidade = 1;
            p.totalProduto = p.Preco * p.quantidade;
        });

        req.session.order = productsIntoCart;
        res.render('cart.ejs', { productsIntoCart })
    })
},


    updateCart: (req, res) => {
        let idProductToChange = req.body.productId;
        let productQtyChanged = req.body.productQty;

        productsIntoCart = req.session.order;
        productsIntoCart = req.session.order;

        let index = productsIntoCart.findIndex((p) => p.idProdutos == idProductToChange);

        productsIntoCart[index].quantidade = productQtyChanged;
        productsIntoCart[index].totalProduto = productsIntoCart[index].Preco * productsIntoCart[index].quantidade;

        req.session.order = productsIntoCart;

        res.render('cart.ejs', { productsIntoCart });
        res.render('cart.ejs', { productsIntoCart });


    },

    releaseOrder: (req, res) => {
        let pedidos = req.session.order
        res.send(pedidos);
        /*let total = 0
        for (let i = 0; i < productsReturned.length; i++) {
            sum += productsReturned[i].preco
            return total
        }
        db.Purchase.create({
            Data_Pedido:,
            Total:
            Forma_de_Pagamento:
            Endereço_de_Entrega:
                    })*/
    }
}

module.exports = ordersController 