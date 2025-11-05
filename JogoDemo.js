const { Engine } = require("./Basicas.js");
const { Cozinha, HallEntrada, Quarto, SalaDeEstar } = require("./SalasDemo.js");

class JogoDemo extends Engine {
    constructor() {
        super();
    }

    criaCenario() {
        let hall = new HallEntrada(this);
        let sala = new SalaDeEstar(this);
        let quarto = new Quarto(this);
        let cozinha = new Cozinha(this);

        hall.portas.set(sala.nome, sala);
        sala.portas.set(hall.nome, hall);
        sala.portas.set(quarto.nome, quarto);
        sala.portas.set(cozinha.nome, cozinha);
        quarto.portas.set(sala.nome, sala);
        cozinha.portas.set(sala.nome, sala);

        this.salaCorrente = hall;
    }
}

module.exports = { JogoDemo };