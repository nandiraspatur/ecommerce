const Product = require('../models/productModel')

let findAll = (req, res) => {
  Product.find()
  .then(products => res.send(products))
  .catch(err => res.status(500).send(err))
}

let create = (req, res) => {
  product = new Product({
    name: req.body.name,
    price: req.body.price,
    dec: req.body.dec,
    category: req.body.category,
    picture: req.body.picture,
    stock: req.body.stock
  })

  product.save()
  .then(product => {
    res.send(product)
  })
  .catch(err => res.status(500).send(err))
}

let update = (req, res) => {
  Product.findById(req.params.id)
  .then(product => {
    // replace data product with new data product
    product.isbn = req.body.isbn || product.isbn;
    product.title = req.body.title || product.title;
    product.author = req.body.author || product.author;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    // save update data
    product.save()
    .then(updateProduct => res.send(updateProduct))
    .catch(err => res.status(500).send(err))
  })
}

let remove = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
  .then(removeProduct => res.send(removeProduct))
  .catch(err => res.status(500).send(err))
}

module.exports = {
  findAll,
  create,
  update,
  remove
}
