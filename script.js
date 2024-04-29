const html = document.querySelector('html');
const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imgPlayPause = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const comecar = new Audio('/sons/play.wav');
const pausar = new Audio('/sons/pause.mp3');
const alerta = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focobt.classList.add('active');
})

curtobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtobt.classList.add('active');
})

longobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longobt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfice.<br> <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        alerta.play();
        alert('Tempo finalizado!',);
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        pausar.play();
        zerar();
        return;
    }
    comecar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    imgPlayPause.setAttribute('src', '/imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';
    imgPlayPause.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();