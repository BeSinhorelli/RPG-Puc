class Ferramenta {
    constructor(nome) {
        this.nome = nome;
    }
}

class Objeto {
    constructor(nome, descricaoFechado, descricaoAberto) {
        this.nome = nome;
        this.descricaoFechado = descricaoFechado;
        this.descricaoAberto = descricaoAberto;
        this.acaoOk = false;
    }

    usar(ferramenta) {
        return false;
    }

    get descricao() {
        return this.acaoOk ? this.descricaoAberto : this.descricaoFechado;
    }
}

class Mochila {
    constructor() {
        this.itens = new Map();
    }

    tem(item) {
        return this.itens.has(item);
    }

    pega(item) {
        return this.itens.get(item);
    }

    guarda(item) {
        this.itens.set(item.nome, item);
        console.log(`✅ ${item.nome} adicionado à mochila!`);
    }

    lista() {
        return Array.from(this.itens.keys());
    }
}

class Sala {
    constructor(nome, engine) {
        this.nome = nome;
        this.engine = engine;
        this.portas = new Map();
        this.objetos = new Map();
        this.ferramentas = new Map();
    }

    entra() {
        console.log(`\n🔍 === ${this.nome.toUpperCase()} ===`);
        console.log(this.getDescricaoSala());
        this.mostraObjetos();
        this.mostraFerramentas();
        this.mostraPortas();
        console.log("\n💡 O que você quer fazer?");
    }

    getDescricaoSala() {
        const descricoes = {
            "Hall": "Você está no hall de entrada. É um espaço amplo com paredes de mármore.",
            "Sala": "Uma sala confortável com sofás e uma lareira. Há um armário antigo no canto.",
            "Quarto": "Um quarto aconchegante. Há uma cama arrumada e uma mesa de cabeceira.",
            "Cozinha": "Uma cozinha bem equipada. Você vê vários potes sobre o balcão."
        };
        return descricoes[this.nome] || `Você está na ${this.nome}.`;
    }

    mostraObjetos() {
        if (this.objetos.size > 0) {
            console.log("\n📦 OBJETOS NA SALA:");
            this.objetos.forEach(obj => {
                console.log(`   📍 ${obj.nome}: ${obj.descricao}`);
            });
        }
    }

    mostraFerramentas() {
        if (this.ferramentas.size > 0) {
            console.log("\n🛠️  FERRAMENTAS DISPONÍVEIS:");
            this.ferramentas.forEach(ferr => {
                console.log(`   ⭐ ${ferr.nome} - Disponível para coleta`);
            });
        }
    }

    mostraPortas() {
        if (this.portas.size > 0) {
            console.log("\n🚪 PORTAS DISPONÍVEIS:");
            this.portas.forEach((sala, nome) => {
                console.log(`   ➡️  ${nome}`);
            });
        }
    }

    pegaFerramenta(nome) {
        if (this.ferramentas.has(nome)) {
            const ferramenta = this.ferramentas.get(nome);
            this.ferramentas.delete(nome);
            this.engine.mochila.guarda(ferramenta);
            return true;
        }
        return false;
    }

    usa(ferramenta, objeto) {
        return false;
    }
}

class Engine {
    constructor() {
        this.salaCorrente = null;
        this.mochila = new Mochila();
        this.jogoAtivo = true;
        this.primeiraVez = true;
    }

    criaCenario() {
        // Será implementado nas classes filhas
    }

    joga() {
        console.log("🎮 ===========================================");
        console.log("           JOGO DE AVENTURA - O DIAMANTE PERDIDO");
        console.log("==============================================");
        
        this.mostrarTutorial();
        this.criaCenario();
        this.salaCorrente.entra();
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const prompt = () => {
            if (!this.jogoAtivo) {
                readline.close();
                return;
            }
            
            readline.question('\n🎯 COMANDO > ', comando => {
                this.processaComando(comando);
                if (this.jogoAtivo) {
                    prompt();
                } else {
                    readline.close();
                }
            });
        };
        
        prompt();
    }

    mostrarTutorial() {
        console.log("\n📚 COMO JOGAR:");
        console.log("🎯 OBJETIVO: Encontre o diamante escondido!");
        console.log("\n🕹️  COMANDOS DISPONÍVEIS:");
        console.log("   • 'ir [sala]' - Mover para outra sala");
        console.log("   • 'pegar [ferramenta]' - Coletar ferramenta");
        console.log("   • 'usar [ferramenta] em [objeto]' - Usar ferramenta em objeto");
        console.log("   • 'mochila' - Ver itens na mochila");
        console.log("   • 'ajuda' - Mostrar este tutorial novamente");
        console.log("   • 'dica' - Receber uma dica");
        console.log("   • 'mapa' - Mostrar o mapa do jogo");
        console.log("   • 'sair' - Encerrar o jogo");
        
        console.log("\n📍 MAPA DO JOGO:");
        console.log("   Hall ↔ Sala ↔ Quarto");
        console.log("            ↕");
        console.log("         Cozinha");
        
        console.log("\n🎮 SEQUÊNCIA PARA VENCER:");
        console.log("   1. No Hall: 'pegar martelo'");
        console.log("   2. No Quarto: 'pegar chave'");
        console.log("   3. Na Sala: 'usar chave em armario'");
        console.log("   4. Na Cozinha: 'usar martelo em pote_de_acucar'");
        
        console.log("\n💡 DICA: Explore todas as salas e leia as descrições dos objetos!");
        console.log("\n🎯 Digite seus comandos quando aparecer 'COMANDO >'");
    }

    processaComando(comando) {
        const partes = comando.toLowerCase().trim().split(' ');
        const acao = partes[0];
        
        switch(acao) {
            case 'ir':
                if (partes.length < 2) {
                    console.log("❌ Para onde você quer ir? Use: 'ir [sala]'");
                    console.log("   Exemplo: 'ir sala'");
                    return;
                }
                const destino = partes[1];
                this.irPara(destino);
                break;
                
            case 'pegar':
            case 'coletar':
                if (partes.length < 2) {
                    console.log("❌ O que você quer pegar? Use: 'pegar [ferramenta]'");
                    console.log("   Exemplo: 'pegar martelo'");
                    return;
                }
                const ferramenta = partes[1];
                this.pegar(ferramenta);
                break;
                
            case 'usar':
                if (partes.length < 4 || partes[2] !== 'em') {
                    console.log("❌ Use: 'usar [ferramenta] em [objeto]'");
                    console.log("   Exemplo: 'usar chave em armario'");
                    return;
                }
                const ferramentaUsar = partes[1];
                const objetoUsar = partes[3];
                this.usar(ferramentaUsar, objetoUsar);
                break;
                
            case 'mochila':
            case 'inventario':
                this.verMochila();
                break;
                
            case 'ajuda':
            case 'help':
            case 'tutorial':
                this.mostrarTutorial();
                break;
                
            case 'sair':
            case 'exit':
                console.log("👋 Até logo! Obrigado por jogar!");
                this.jogoAtivo = false;
                break;
                
            case 'dica':
                this.mostrarDica();
                break;

            case 'mapa':
                this.mostrarMapa();
                break;
                
            default:
                console.log("❌ Comando não reconhecido. Comandos disponíveis:");
                console.log("   ir, pegar, usar, mochila, ajuda, dica, mapa, sair");
                console.log("   Use 'ajuda' para ver o tutorial completo.");
        }
    }

    irPara(destino) {
        const destinoFormatado = destino.toLowerCase();
        
        // Mapeamento de nomes alternativos
        const mapeamentoSalas = {
            'sala': 'Sala',
            'hall': 'Hall', 
            'quarto': 'Quarto',
            'cozinha': 'Cozinha',
            'estar': 'Sala',
            'entrada': 'Hall'
        };
        
        const destinoCorreto = mapeamentoSalas[destinoFormatado] || destinoFormatado;
        
        if (this.salaCorrente.portas.has(destinoCorreto)) {
            console.log(`🚶 Indo para ${destinoCorreto}...`);
            this.salaCorrente = this.salaCorrente.portas.get(destinoCorreto);
            this.salaCorrente.entra();
        } else {
            console.log(`❌ Não há porta para '${destinoFormatado}'`);
            console.log("📍 Salas disponíveis a partir daqui:");
            this.salaCorrente.portas.forEach((sala, nome) => {
                console.log(`   - ${nome}`);
            });
            console.log("💡 Use apenas os nomes simples: hall, sala, quarto, cozinha");
        }
    }

    pegar(ferramenta) {
        const ferramentaFormatada = ferramenta.toLowerCase();
        
        if (!this.salaCorrente.pegaFerramenta(ferramentaFormatada)) {
            console.log(`❌ Não há '${ferramentaFormatada}' aqui para pegar`);
            if (this.salaCorrente.ferramentas.size > 0) {
                console.log("🛠️  Ferramentas disponíveis nesta sala:");
                this.salaCorrente.ferramentas.forEach(ferr => {
                    console.log(`   - ${ferr.nome}`);
                });
            } else {
                console.log("💡 Não há ferramentas disponíveis nesta sala.");
            }
        }
    }

    usar(ferramenta, objeto) {
        const ferramentaFormatada = ferramenta.toLowerCase();
        const objetoFormatado = objeto.toLowerCase();
        
        // Mapeamento de nomes alternativos
        const mapeamentoObjetos = {
            'armario': 'armario',
            'bilhete': 'bilhete',
            'pote_de_acucar': 'pote_de_acucar',
            'pote_de_arroz': 'pote_de_arroz',
            'acucar': 'pote_de_acucar',
            'arroz': 'pote_de_arroz',
            'pote': 'pote_de_acucar'
        };
        
        const objetoCorreto = mapeamentoObjetos[objetoFormatado] || objetoFormatado;
        
        if (!this.mochila.tem(ferramentaFormatada)) {
            console.log(`❌ Você não tem '${ferramentaFormatada}' na mochila`);
            this.verMochila();
            return;
        }
        
        if (!this.salaCorrente.usa(ferramentaFormatada, objetoCorreto)) {
            console.log(`❌ Não foi possível usar '${ferramentaFormatada}' em '${objetoFormatado}'`);
            if (this.salaCorrente.objetos.size > 0) {
                console.log("📦 Objetos disponíveis nesta sala:");
                this.salaCorrente.objetos.forEach(obj => {
                    console.log(`   - ${obj.nome}: ${obj.descricao}`);
                });
            } else {
                console.log("💡 Não há objetos interativos nesta sala.");
            }
        }
    }

    verMochila() {
        const itens = this.mochila.lista();
        console.log("\n🎒 SUA MOCHILA:");
        if (itens.length === 0) {
            console.log("   (vazia)");
            console.log("💡 Dica: Explore as salas e use 'pegar [ferramenta]' para coletar itens!");
        } else {
            itens.forEach(item => console.log(`   ✅ ${item}`));
        }
    }

    mostrarDica() {
        const salaAtual = this.salaCorrente.nome;
        console.log("\n💡 DICA:");
        
        switch(salaAtual) {
            case 'Hall':
                console.log("   Procure por ferramentas disponíveis aqui no Hall.");
                console.log("   Use 'pegar martelo' para coletar o que encontrar.");
                break;
            case 'Sala':
                console.log("   Há um armário aqui que parece trancado.");
                console.log("   Você precisará de uma chave para abri-lo.");
                break;
            case 'Quarto':
                console.log("   Explore esta sala cuidadosamente.");
                console.log("   Talvez encontre algo útil para suas aventuras.");
                break;
            case 'Cozinha':
                console.log("   Esses potes parecem interessantes...");
                console.log("   Talvez você precise quebrar algum para encontrar algo valioso.");
                break;
            default:
                console.log("   Explore todas as salas e colete ferramentas!");
        }
        
        console.log("   Use 'ajuda' para ver o tutorial completo.");
    }

    mostrarMapa() {
        console.log("\n🗺️  MAPA DO JOGO:");
        console.log("   Hall ↔ Sala ↔ Quarto");
        console.log("            ↕");
        console.log("         Cozinha");
        console.log("\n📍 Você está atualmente no: " + this.salaCorrente.nome);
    }

    indicaFimDeJogo() {
        console.log("\n🎉 ===========================================");
        console.log("          PARABÉNS! VOCÊ GANHOU O JOGO!");
        console.log("==============================================");
        console.log("💎 Você encontrou o diamante escondido!");
        console.log("👑 Missão cumprida com sucesso!");
        console.log("==============================================");
        this.jogoAtivo = false;
    }
}

module.exports = { Ferramenta, Objeto, Mochila, Sala, Engine };