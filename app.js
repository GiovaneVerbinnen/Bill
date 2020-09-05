const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    money: 100000000000,
    carrinho: [],
    qtdProduto: 0,
    carrinhoTotal: 0,
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
    }
  },
  computed: {
    carrinhoTotal() {
      let total = 0;
      if(this.carrinho.length) {
        this.carrinho.forEach(produto => {
          total += produto.preco;
        })
      }
      return total;
    }
  },
  methods: {
    fetchProdutos() {
      fetch("./api/produtos.json")
      .then(r => r.json())
      .then(r => {
        this.produtos = r;
      })
    },
    Buy(event) {
      console.log(event)
    }
  },
  created(){
    this.fetchProdutos();
  }
})