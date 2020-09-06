const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    money: 100000000000,
    carrinho: [],
    carrinhoTotal: 0,
  },
 /* filters: {
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
  },*/
  methods: {
    fetchProdutos() {
      fetch("./api/produtos.json")
      .then(r => r.json())
      .then(r => {
        this.produtos = r;
      })
    },
  
    Buy() {
      this.produto.estoque++;
      const { id, nome, preco } = this.produto;
      console.log(id, nome, preco);
      this.carrinho.push({id, nome, preco});
    },
    Sell(index){
      this.carrinho.slice(index, 1);
    }
  },
  created(){
    this.fetchProdutos();
  }
})