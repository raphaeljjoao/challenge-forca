/* Botões e input */
const btnIniciar = document.getElementById('iniciar-jogo');
const inputNovaPalavra = document.getElementById('input-nova-palavra');
const btnAddPalavra = document.getElementById('add-palavra');

const palavras = [
    'HTML',
    'CSS',
    'Java',
    'JS',
    'Alura',
    'One',
    'Oracle',
    'GitHub'
]

const funcoesErros = [
    desenhaCabeca,
    desenhaCorpo,
    desenhaPernaEsquerda,
    desenhaPernaDireita,
    desenhaBracoEsquerdo,
    desenhaBracoDireito
]

let jogoIniciado = false;
let palavra;
let numAcertos = 0;
let erros = [];

/* Funções */
const sorteiaPalavra = () => palavras[Math.round(Math.random() * 100 % (palavras.length - 1))];
const iniciaJogo = () => {
    if (jogoIniciado) return;


    // palavra = sorteiaPalavra();
    palavra = 'JS';
    jogoIniciado = true;
    desenhaBase();
    desenhaCampos(palavra.length);
}

const analisaChute = (letra) => {
    let ocorrencias = (palavra.match(new RegExp(letra, 'gi'))||[]).length;
    if (ocorrencias > 0) escrevenumAcertos(letra);
    else {
        let desenhoAtual = funcoesErros[erros.length];
        desenhoAtual();
        erros.push(letra);
    }
    numAcertos += ocorrencias;



    if (numAcertos === palavra.length) ganharJogo();
    if (erros.length >= funcoesErros.length) perderJogo();
};

const escrevenumAcertos = (letra) => {
    for (let i = 0; i < palavra.length; i++){
        if (letra.toUpperCase() === palavra[i].toUpperCase()) escreveLetra(letra, i);
    }
}

const capturaTeclado = (evento) => {
    if (!jogoIniciado) return;
    let keyCode = evento.keyCode;
    let letra = String.fromCharCode(keyCode);
    if (keyCode >= 65 && keyCode <= 90 && !erros.includes(letra)){
        analisaChute(letra);
    }
};

const ganharJogo = () => {
    let x = canvasWidth * 0.6;
    ctx.font = '35px Arial'
    ctx.fillStyle = '#0A3871';
    ctx.fillText('Você venceu!', x, canvasHeight / 7);
    ctx.fillText('Parabéns!', x + x/17, canvasHeight / 5);
};

const perderJogo = () => {
    let x = canvasWidth * 0.6;
    ctx.font = '35px Arial'
    ctx.fillStyle = '#BD1E15';
    ctx.fillText('Você perdeu.', x, canvasHeight / 7);
    ctx.fillText('Tente mais uma vez!', x - x/10, canvasHeight / 5);
};

const addNovaPalavra = () => {
    let novaPalavra = inputNovaPalavra.value;
    if (palavras.includes(novaPalavra) || novaPalavra.length > maxLetras || novaPalavra === '') return;
    palavras.push(novaPalavra);
    inputNovaPalavra.value = '';
};


/* Eventos */
btnIniciar.onclick = iniciaJogo;
btnAddPalavra.onclick = addNovaPalavra;
document.onkeydown = capturaTeclado;