import { perguntas } from './perguntas.js';

const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');
const telaFinal = document.getElementById('tela-final');

const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const enunciadoEl = document.getElementById('enunciado');
const opcoesContainer = document.getElementById('opcoes-container');
const resultadoTexto = document.getElementById('resultado-texto');

let etapaAtual = 0;

btnIniciar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', reiniciarJogo);

function iniciarJogo() {
    telaInicial.classList.add('escondido');
    telaJogo.classList.remove('escondido');
    
    // Aleatoriedade na escolha do ponto de partida (Exemplo com Math.floor e Math.random)
    // Aqui sorteia se inicia na Fase 0 (ou escolhe uma pergunta aleatória)
    etapaAtual = 0; 
    mostrarEtapa();
}

function mostrarEtapa() {
    const dados = perguntas[etapaAtual];
    enunciadoEl.textContent = dados.enunciado;
    opcoesContainer.innerHTML = '';

    dados.opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.textContent = opcao.texto;
        botao.classList.add('btn-opcao');
        botao.addEventListener('click', () => selecionarOpcao(opcao));
        opcoesContainer.appendChild(botao);
    });
}

function selecionarOpcao(opcao) {
    if (opcao.resultado) {
        finalizarJogo(opcao.resultado);
    } else {
        etapaAtual = opcao.proximo;
        mostrarEtapa();
    }
}

function finalizarJogo(mensagem) {
    telaJogo.classList.add('escondido');
    telaFinal.classList.remove('escondido');
    resultadoTexto.textContent = mensagem;
}

function reiniciarJogo() {
    telaFinal.classList.add('escondido');
    telaInicial.classList.remove('escondido');
    etapaAtual = 0;
}