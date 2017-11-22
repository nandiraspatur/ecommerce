const Transaction = require('../models/transactionModel')

let findAll = (req, res) => {
  Transaction.find()
  .populate('list_products')
  .then(trans => res.send(trans))
  .catch(err => res.status(500).send(err))
}

let create = (req, res) => {
  let transaction = new Transaction({
    customer_id : req.body.customer_id,
    list_products : req.body.list_products,
    qty : req.body.qty,
    total_price : req.body.total_price
  })

  transaction.save()
  .then(transaction => {
    res.send(transaction)
  })
  .catch(err => res.status(500).send(err))
}

let update = (req, res) => {
  // update days, in_date, booklist
  Transaction.findById(req.params.id)
  .then(transaction => {
    transaction.customer_id = req.body.customer_id
    transaction.products = req.body.products
    transaction.total = req.body.total

    // save update data
    transaction.save()
    .then(updateCustomer => res.send(updateCustomer))
    .catch(err => res.status(500).send(err))
  })
}

let remove = (req, res) => {
  Transaction.findByIdAndRemove(req.params.id)
  .then(removeProduct => res.send(removeProduct))
  .catch(err => res.status(500).send(err))
}

module.exports = {
  findAll,
  create,
  update,
  remove
}
