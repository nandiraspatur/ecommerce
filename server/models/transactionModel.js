const mongoose = require('mongoose');
var uri = "mongodb://vinnixdb:ShadowFax5@cluster0-shard-00-00-b8rmh.mongodb.net:27017,cluster0-shard-00-01-b8rmh.mongodb.net:27017,cluster0-shard-00-02-b8rmh.mongodb.net:27017/ecommerce?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
mongoose.connect(uri, { useMongoClient: true });

var transactionSchema = mongoose.Schema({
    id_trans: String,
    customer_id: Number,
    list_products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    qty: [],
    total_price: Number,
    createdAt: Date
});

var transactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = transactionModel;
