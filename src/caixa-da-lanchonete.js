class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
        };

        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        // verifica se método de pagamento é válido
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }
        // verificando itens do carrinho
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
        // criando variaveis
        let total = 0;
        const quantidadeItens = {};
        // para cada item da pegar código e quantidade
        for (const dado of itens) {
            const [codigo, quantidade] = dado.split(',');
            const item = this.cardapio[codigo];
            // verificando item
            if (!item) {
                return "Item inválido!";
            }
            // verificando se quantidade eh valida
            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }
            // verifica se são itens extras 
            if (codigo === 'chantily' || codigo === 'queijo') {
                // verifica qual o item principal 
                const itemPrincipal = codigo === 'chantily' ? 'cafe' : 'sanduiche';
                // verificando se existe no pedido ou se a quantidade do item principal é menor do que a quantidade do item extra.
                if (!quantidadeItens[itemPrincipal] || quantidadeItens[itemPrincipal] < quantidade) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
            // veririfica se item já está na lista com uma expressão ternária
            quantidadeItens[codigo] = (quantidadeItens[codigo] || 0) + parseInt(quantidade);
            total += item.valor * quantidade;
        }
        // verifica o método de pagamento para aplicar o desconto ou acrescimo no total
        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95; // Aplicando desconto de 5% para pagamento em dinheiro
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03; // Aplicando acréscimo de 3% para pagamento a crédito
        }
        // retornando o valor da compra com a formatação
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
