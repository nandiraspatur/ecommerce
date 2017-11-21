const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce', { useMongoClient: true });

var productSchema = mongoose.Schema({
    name: String,
    price: Number,
    dec: String,
    category: String,
    picture: String,
    stock: Number
});

var productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
