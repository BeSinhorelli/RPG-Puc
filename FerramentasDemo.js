const { Ferramenta } = require("./Basicas.js");

class Chave extends Ferramenta {
    constructor() {
        super("chave");
    }
}

class Martelo extends Ferramenta {
    constructor() {
        super("martelo");
    }
}

module.exports = { Chave, Martelo };