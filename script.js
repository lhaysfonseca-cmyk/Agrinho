// Banco de dados dos desafios da fazenda sustentável
const scenarios = [
    {
        question: "Pragas estão atacando sua plantação de soja. O que você faz?",
        opt1: "Aplicar pesticidas químicos pesados imediatamente para salvar 100% da safra.",
        opt2: "Adotar o Manejo Integrado de Pragas (MIP) usando predadores naturais e controle biológico.",
        effect1: { prod: 20, env: -25 }, // Opção 1: +Produção, -Ambiente
        effect2: { prod: 5, env: 15 }    // Opção 2: Equilibrado
    },
    {
        question: "O período de seca começou e a irrigação precisa ser planejada. Qual estratégia usar?",
        opt1: "Utilizar irrigação por inundação contínua puxando água do rio local.",
        opt2: "Instalar um sistema de irrigação por gotejamento automatizado com captação de chuva.",
        effect1: { prod: 10, env: -20 },
        effect2: { prod: 15, env: 10 }
    },
    {
        question: "Sua propriedade possui uma área de mata nativa (Reserva Legal) degradada. O que fazer?",
        opt1: "Desmatar o restante para expandir a área de pastagem do gado.",
        opt2: "Iniciar um projeto de reflorestamento com árvores nativas e sistemas agroflorestais.",
        effect1: { prod: 25, env: -35 },
        effect2: { prod: -5, env: 30 }
    },
    {
        question: "O solo da sua principal área de cultivo está perdendo nutrientes. Como proceder?",
        opt1: "Aumentar a quantidade de fertilizantes sintéticos e fazer plantio convencional revirando a terra.",
        opt2: "Praticar a rotação de culturas (como soja e milho) e adotar o Plantio Direto sobre a palhada.",
        effect1: { prod: 15, env: -15 },
        effect2: { prod: 10, env: 20 }
    }
];

let currentLevel = 0;
let production = 50;
let environment = 50;

function updateUI() {
    // Garante que os valores fiquem entre 0 e 100
    production = Math.max(0, Math.min(100, production));
    environment = Math.max(0, Math.min(100, environment));

    // Atualiza textos e barras de progresso
    document.getElementById("prod-value").innerText = production + "%";
    document.getElementById("env-value").innerText = environment + "%";
    document.getElementById("bar-prod").style.width = production + "%";
    document.getElementById("bar-env").style.width = environment + "%";

    // Verifica condições de derrota/vitória antes do fim dos níveis
    if (production <= 0 || environment <= 0) {
        endGame(false, "Sua fazenda faliu ou causou um desastre ecológico irreversível!");
        return;
    }

    // Avança ou encerra o jogo
    if (currentLevel < scenarios.length) {
        showScenario();
    } else {
        checkFinalResult();
    }
}

function showScenario() {
    let current = scenarios[currentLevel];
    document.getElementById("question").innerText = current.question;
    document.getElementById("opt1").innerText = current.opt1;
    document.getElementById("opt2").innerText = current.opt2;
}

function chooseOption(optionNum) {
    let current = scenarios[currentLevel];
    
    if (optionNum === 1) {
        production += current.effect1.prod;
        environment += current.effect1.env;
    } else {
        production += current.effect2.prod;
        environment += current.effect2.env;
    }

    currentLevel++;
    updateUI();
}

function checkFinalResult() {
    if (production >= 50 && environment >= 50) {
        endGame(true, `Parabéns! Você alcançou o equilíbrio ideal. Sua produção está em ${production}% e o meio ambiente em ${environment}%. Você é um agro-líder sustentável!`);
    } else if (production > environment) {
        endGame(false, `Sua produção foi alta (${production}%), mas o Meio Ambiente despencou para ${environment}%. A terra ficou infértil a longo prazo.`);
    } else {
        endGame(false, `Você protegeu a natureza (${environment}%), mas a produção caiu para ${production}%. A fazenda não se sustentou financeiramente.`);
    }
}

function endGame(victory, text) {
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("game-over-box").style.display = "block";
    document.getElementById("game-over-title").innerText = victory ? "🏆 Vitória Sustentável!" : "❌ Fim de Jogo!";
    document.getElementById("game-over-text").innerText = text;
}

function restartGame() {
    currentLevel = 0;
    production = 50;
    environment = 50;
    document.getElementById("quiz-box").style.display = "block";
    document.getElementById("game-over-box").style.display = "none";
    updateUI();
}

// Inicializa o jogo ao carregar a página
window.onload = updateUI;