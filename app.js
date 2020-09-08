const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    carrinho: [],
    saldoinicial: 100000000000,
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
          total += item.preco * item.quantidade;
        })
      }
      return total;
    },
    saldo() {
      soma = this.saldoinicial - this.carrinhoTotal;
      return soma;
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
      if (produto.quantidade < 1){
        produto.quantidade += 1;
      } else if (typeof(produto.quantidade) === "string") {
        produto.quantidade = parseInt(produto.quantidade);
       } else{
          produto.quantidade++;
      }
      const {id, nome, preco, quantidade} = produto;
      this.carrinho.push({id, nome, preco, quantidade});
    },
    vender(produto,index){
      console.log(produto, index);
      this.carrinho.splice(index, 1);
    }
  },
 
  created(){
    this.fetchProdutos();
  }
})