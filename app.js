const vm = new Vue({
  el: '#app',
  data: {
    saldoinicial: 10000,

    produtos: [],
    carrinho: [],
    inputProdutoQuantidade: {}
  },

 filters: {
    numeroPreco(valor) {
      return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
    }
  },

  computed: {
    carrinhoTotal() {
      return this.carrinho.reduce((acm, produto) => 
          acm + produto.preco, 0);
    },

    saldo() { 
      return this.saldoinicial - this.carrinhoTotal;
    }
  },

  methods: {
    async fetchProdutos() {
      const dataApi = await fetch("./api/produtos.json");

      this.produtos = await dataApi.json();

      this.inputProdutoQuantidade = this.produtos.reduce((acm, p) => (
        {...acm, [p.nome]: p.quantidade}), {});
    },
  
    comprar(produto) {
      if (this.saldo < produto.preco)
        return;
      
      this.carrinho.push(produto);
      this.inputProdutoQuantidade[produto.nome]++;
    },
  
    vender(produto){
      if (!this.inputProdutoQuantidade[produto.nome])
        return;
      
      const index = this.carrinho.findIndex(prod => prod.nome === produto.nome);

      this.carrinho.splice(index, 1);
      this.inputProdutoQuantidade[produto.nome]--;
    }
  },
 
  created(){
    this.fetchProdutos();
  }
})