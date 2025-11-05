const { Objeto } = require("./Basicas.js");
const { Chave, Martelo } = require("./FerramentasDemo.js");

class Armario extends Objeto {
    constructor() {
        super("armario", "O armário está fechado", "O armário está aberto. Não tem nada dentro");
    }

    usar(ferramenta) {
        if (ferramenta instanceof Chave) {
            this.acaoOk = true;
            console.log("Você usou a chave para abrir o armário!");
            return true;
        }
        return false;
    }
}

class Bilhete extends Objeto {
    constructor() {
        super("bilhete", 'Há um bilhete, nele está escrito "A vida é doce!"', "");
        this.acaoOk = true;
    }

    usar(ferramenta) {
        return false;
    }
}

class PoteDeAcucar extends Objeto {
    constructor() {
        super("pote_de_acucar", "O pote de açúcar está fechado", "O pote de açúcar está quebrado. Tinha um diamante dentro!");
    }

    usar(ferramenta) {
        if (ferramenta instanceof Martelo) {
            this.acaoOk = true;
            console.log("Você quebrou o pote de açúcar com o martelo!");
            return true;
        }
        return false;
    }
}

class PoteDeArroz extends Objeto {
    constructor() {
        super("pote_de_arroz", "O pote de arroz está fechado", "O pote de arroz está quebrado. Tem arroz espalhado por todo lado");
    }

    usar(ferramenta) {
        if (ferramenta instanceof Martelo) {
            this.acaoOk = true;
            console.log("Você quebrou o pote de arroz com o martelo!");
            return true;
        }
        return false;
    }
}

module.exports = { Armario, Bilhete, PoteDeAcucar, PoteDeArroz };