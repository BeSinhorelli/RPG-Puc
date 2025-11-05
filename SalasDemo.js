const { Sala } = require("./Basicas.js");
const { Martelo, Chave } = require("./FerramentasDemo.js");
const { Armario, Bilhete, PoteDeAcucar, PoteDeArroz } = require("./ObjetosDemo.js");

class HallEntrada extends Sala {
    constructor(engine) {
        super("Hall", engine);
        let martelo = new Martelo();
        this.ferramentas.set(martelo.nome, martelo);
    }

    usa(ferramenta, objeto) {
        return false;
    }
}

class SalaDeEstar extends Sala {
    constructor(engine) {
        super("Sala", engine);
        let armario = new Armario();
        this.objetos.set(armario.nome, armario);
    }

    usa(ferramenta, objeto) {
        if (!this.engine.mochila.tem(ferramenta)) {
            return false;
        }
        if (!this.objetos.has(objeto)) {
            return false;
        }
        let obj = this.objetos.get(objeto);
        return obj.usar(this.engine.mochila.pega(ferramenta));
    }
}

class Quarto extends Sala {
    constructor(engine) {
        super("Quarto", engine);
        let chave = new Chave();
        this.ferramentas.set(chave.nome, chave);
        let bilhete = new Bilhete();
        this.objetos.set(bilhete.nome, bilhete);
    }

    usa(ferramenta, objeto) {
        return false;
    }
}

class Cozinha extends Sala {
    constructor(engine) {
        super("Cozinha", engine);
        let poteAcucar = new PoteDeAcucar();
        this.objetos.set(poteAcucar.nome, poteAcucar);
        let poteArroz = new PoteDeArroz();
        this.objetos.set(poteArroz.nome, poteArroz);
    }

    usa(ferramenta, objeto) {
        if (!this.engine.mochila.tem(ferramenta)) {
            return false;
        }
        if (!this.objetos.has(objeto)) {
            return false;
        }
        let pote = this.objetos.get(objeto);
        let usou = pote.usar(this.engine.mochila.pega(ferramenta));
        if (pote instanceof PoteDeAcucar && usou) {
            this.engine.indicaFimDeJogo();
        }
        return usou;
    }
}

module.exports = { HallEntrada, SalaDeEstar, Quarto, Cozinha };