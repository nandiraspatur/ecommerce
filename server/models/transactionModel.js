const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce', { useMongoClient: true });

var transactionSchema = mongoose.Schema({
    customer_id: Number,
    list_products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    qty: [],
    total_price: Number,
});

var transactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = transactionModel;
