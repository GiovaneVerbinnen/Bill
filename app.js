const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    carrinho: [],
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
        this.carrinho.forEach(item => {
          total += item.preco;
        })
      }
      return total;
    },
    money(){
      let valor = 10000000000;
      return valor;
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
    comprar(produto) {
      produto.quantidade++;
      const {id, nome, preco, quantidade} = produto;
      this.carrinho.push({id, nome, preco, quantidade});
    },
    vender(index){
      this.carrinho.splice(index, 1);
    }
  },
 
  created(){
    this.fetchProdutos();
  }
})