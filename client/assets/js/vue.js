var app = new Vue({
  el: '#bnx',
  data: {
    products: '',
    temp: '',
    cart: [],
    counterCart: 0
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
        console.log('baru');
        this.temp.amount = 1
        this.temp.subtotal = this.temp.amount * this.temp.price
        this.cart.push(this.temp);
        this.counterCart++
      }else{
        this.temp.amount = objectFound.amount + 1
        this.temp.subtotal = this.temp.amount * this.temp.price
        this.cart.splice(elementPos, 1, this.temp)
        console.log('lama');
        this.counterCart++
      }
      this.cart.forEach(c => {
        console.log(c);
      })
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
