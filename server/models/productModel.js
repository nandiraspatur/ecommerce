const mongoose = require('mongoose');
var uri = "mongodb://vinnixdb:ShadowFax5@cluster0-shard-00-00-b8rmh.mongodb.net:27017,cluster0-shard-00-01-b8rmh.mongodb.net:27017,cluster0-shard-00-02-b8rmh.mongodb.net:27017/ecommerce?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
mongoose.connect(uri, { useMongoClient: true });

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
