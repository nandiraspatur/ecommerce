var app = new Vue({
  el: '#bnx',
  data: {
    products: '',
    temp: '',
    cart: [],
    counterCart: 0,
    totalCart: '',
    history: [],
    detailTrans: '',
  },
  methods: {
    modalproduct: function (input) {
      $('.ui.basic.modal')
        .modal('show')
      ;
      this.temp = input
    },
    modalCart: function () {
      $('.modal.cart')
        .modal('show')
      ;
    },
    modalLogin: function () {
      $('.tiny.modal')
        .modal('show')
      ;
    },
    closeModalCart: function () {
      $('.modal.cart')
        .modal('hide')
      ;
    },
    showCat: function() {

    },
    modalHistory: function() {
      $('.ui.modal.history')
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
    getIdTrans: function() {
      var num = '1234567890'
      var abj = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var id = ''
      for (var i = 0; i < 8; i++) {
        if(i < 4){
          var r = Math.floor(Math.random()*num.length)
          id += num[r]
        }else{
          var r = Math.floor(Math.random()*abj.length)
          id += abj[r]
        }
      }
      return id
    },
    checkout: function() {
      var trans_detail = {
        id_trans: this.getIdTrans(),
        customer_id : '',
        list_products : Object.entries(this.cart).map(([key, value]) => {
          return value._id
        }),
        qty : Object.entries(this.cart).map(([key, value]) => {
          return {productId : value._id, qty : value.qty}
        }),
        total_price : this.totalCart,
        createdAt : Date.now
      }
      this.history.push(trans_detail)
      if(trans_detail.total_price > 0){
        axios.post('http://store.api.bhinfinix.com/transactions', trans_detail)
        .then(response => {
          $('.modal.cart')
          .modal('hide')
          ;
          this.cart = []
          this.counterCart = 0
          this.totalCart = ''
          console.log(response);
        })
        .catch(err => {
          console.error(err);
        })
      }

      $('.modal.cart')
      .modal('hide')
      ;
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
    },
    detailProduct: function(input) {
      $('.small.modal.detail')
        .modal('show')
      ;

      this.detailTrans = input
    }
  },
  created: function () {
    axios.get('http://store.api.bhinfinix.com/products')
    .then(response => {
      this.products = response.data
    })
    .catch(function (error) {
      console.err(error);
    })

    axios.get('http://store.api.bhinfinix.com/transactions')
    .then(response => {
      this.history = response.data
    })
    .catch(function (error) {
      console.err(error);
    })
  },
})
