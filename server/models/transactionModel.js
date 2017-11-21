const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce', { useMongoClient: true });

var transactionSchema = mongoose.Schema({
    customer_id: Number,
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    total: Number,
});

var transactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = transactionModel;
