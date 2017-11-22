var app = new Vue({
  el: '#bnx',
  data: {
    products: '',
    temp: '',
    cart: [],
    counterCart: 0,
    totalCart: '',
    history: []
  },
  methods: {
    modalproduct: function (input) {
      $('.ui.basic.modal')
        .modal('show')
      ;
      this.temp = input
    },
    modalCart: function (input) {
      $('.modal.cart')
        .modal('show')
      ;
    },
    saveToCart: function () {
      var elementPos = this.cart.map(function(x) {return x._id; }).indexOf(this.temp._id);
      var objectFound = this.cart[elementPos];
      if(elementPos == -1){
        this.temp.qty = 1
        this.temp.subtotal = this.temp.qty * this.temp.price
        this.cart.push(this.temp);
        this.counterCart++
      }else{
        objectFound.qty += 1
        objectFound.subtotal = objectFound.qty * objectFound.price
        // this.cart.splice(elementPos, 1, this.temp)
        this.counterCart++
      }
      var total = 0;
      this.cart.forEach(p => {
        total += p.subtotal
      })
      this.totalCart = total
    },
    checkout: function() {
      var trans_detail = {
        customer_id : '',
        list_products : Object.entries(this.cart).map(([key, value]) => {
          return value._id
        }),
        qty : Object.entries(this.cart).map(([key, value]) => {
          return {productId : value._id, qty : value.qty}
        }),
        total_price : this.totalCart
      }
      axios.post('http://localhost:3000/api/transactions', trans_detail)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      })
    },
    deleteCart: function(input) {
      var elementPos = this.cart.map(function(x) {return x._id; }).indexOf(input);
      if(this.cart[elementPos].qty > 1){
        this.cart[elementPos].qty -=1
        this.totalCart -= this.cart[elementPos].price
        this.counterCart--
      }else{
        this.totalCart -= this.cart[elementPos].price
        this.cart.splice(elementPos, 1)
        this.counterCart--
      }
    }
  },
  created: function () {
    var self = this
    axios.get('http://localhost:3000/api/products')
    .then(function (response) {
      self.products = response.data
    })
    .catch(function (error) {
      console.err(error);
    })
  },
})
