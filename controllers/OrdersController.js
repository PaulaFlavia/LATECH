const { Product, Address, User, Purchase } = require('../database/models')

const totalProduto = p => {
    if (p.PrecoComDesconto > 0) {
        return p.PrecoComDesconto * p.quantidade
    } else {
        return p.Preco * p.quantidade
    }
}
const totalProdutos = products => {
    let total = 0
    products.forEach(p => {
        total += totalProduto(p)
    })
    return total
}

const ordersController = {
    index: (req, res) => {
        Product.findAll()
            .then(function (productsReturned) {
            })
        return res.render('products.ejs', { products: productsReturned })
            .catch((error) => console.log(error))
    },
    addCart: (req, res) => {
        if (req.session.cart) {
            req.session.cart.push(req.body.selectedProduct)
        } else {
            req.session.cart = [req.body.selectedProduct]
        }

        res.redirect('/products')
    },
    showCart: async (req, res) => {
        let idsIntoCart = req.session.cart

        let getProductById = async (id) => {
            let productFound = await Product.findByPk(
                id, {
                raw: true,
                include: [
                    { association: 'images' },
                ]
            })
            return productFound
        }

        let productsIntoCart = req.session.cart ? await Promise.all(idsIntoCart.map(getProductById)) : [];

        productsIntoCart.forEach(p => {
            let arr = req.session.cart;
            let x = 0;
            for (i = 0; i < arr.length; i++) {
                if (p.idProdutos == arr[i]) {
                    x += 1;
                    p.quantidade = x;
                };
            };
        });

        let newProductsIntoCart = {};
        productsIntoCart = productsIntoCart.filter(function (product) {
            let exists = !newProductsIntoCart[product.idProdutos];
            newProductsIntoCart[product.idProdutos] = true;
            return exists;
        });

        let qtyUpdated = productsIntoCart.length;
        let idsFilter = [...new Set(idsIntoCart)]
        req.session.cart = idsFilter
        res.locals.qty = qtyUpdated

        productsIntoCart.forEach((p) => {
            p.totalProduto = totalProduto(p)
        });

        req.session.order = productsIntoCart;
        let total = totalProdutos(productsIntoCart);

        productsIntoCart.forEach((p) => {
            p.subTotalProduto = p.Preco * p.quantidade;
        });
        let subTotal = 0
        for (let i = 0; i < productsIntoCart.length; i++)
            subTotal += productsIntoCart[i].subTotalProduto

        let savings = subTotal - total

        req.session.savings = savings
        req.session.total = total

        res.render('cart.ejs', { productsIntoCart, total, qtyUpdated, savings })
    },
    updateCart: (req, res) => {

        let idProductToChange = req.body.productId;
        let productQtyChanged = req.body.productQty;

        productsIntoCart = req.session.order;

        let index = productsIntoCart.findIndex((p) => p.idProdutos == idProductToChange);

        productsIntoCart[index].quantidade = productQtyChanged;
        productsIntoCart[index].totalProduto = totalProduto(productsIntoCart[index])

        let total = totalProdutos(productsIntoCart)

        productsIntoCart.forEach((p) => {
            p.subTotalProduto = p.Preco * p.quantidade;
        });         
        let subTotal = 0
        for(let i=0; i< productsIntoCart.length; i++)
        subTotal += productsIntoCart[i].subTotalProduto    
        
        let savings = subTotal - total
        
        req.session.order = productsIntoCart;        
        req.session.total = total        
               
        res.render('cart.ejs', { productsIntoCart, total, savings });
    },
    removeProduct: (req, res) => {

        let idParaRemover = req.params.id
        if (req.session.cart) {
            req.session.cart = req.session.cart.filter(id => id != idParaRemover)
        }
        res.redirect('/orders/cart')
    },

    payment: async (req, res) => {

        let loggedUser = (req.session.userLogged !== undefined)

        let id = req.session.userLogged ? req.session.userLogged.idUser : 0;

        let user = await User.findByPk(id, {
            raw: true,
            include: [
                { model: Address, as: 'addresses' }
            ]
        });
        let addressesUser = await Address.findAll({ raw: true, where: { users_idUser: id } });

        productsIntoCart = req.session.order
        total = req.session.total

        res.render('cartPayment.ejs', { productsIntoCart, total, user, loggedUser, addressesUser, })

    },


    releaseOrder: async (req, res) => {
        let purchase = req.session.order

        let purchaseSummary = purchase.map(p => detail = { nome: p.Nome, preco: p.Preco, codigo: p.Codigo, quantidade: p.quantidade })

        let newAdress = await Address.create({
            Endereco: req.body.endereco,
            Cidade: req.body.cidade,
            Estado: req.body.estado,
            users_idUser: req.session.userLogged.idUser
        })
        let deliveryAddress = ''
        if (req.body.endereco) {
            deliveryAddress = req.body.endereco
        } else {
            deliveryAddress = req.body.address_id
        }
        req.session.total = total
        let newPurchase = await Purchase.create({
            Data_pedido: new Date().toISOString(),
            Total: req.session.total,
            Forma_de_Pagamento: req.body.payment,
            Endereço_de_Entrega: deliveryAddress,
            Users_idUser: req.session.userLogged.idUser,
            Detalhe_Produtos: purchaseSummary
        })
        req.session.cart = ''
        //res.send("Pedido Finalizado com sucesso");
        res.render("orderFinished", { newPurchase });
    }
}
module.exports = ordersController