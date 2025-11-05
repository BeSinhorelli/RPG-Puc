const { JogoDemo } = require("./JogoDemo.js");

console.log("=== INICIANDO JOGO DE AVENTURA ===");
console.log("Objetivo: Encontre o diamante escondido!");
console.log("Dica: Explore as salas, colete ferramentas e use-as nos objetos corretos.\n");

let jogo = new JogoDemo();
jogo.joga();