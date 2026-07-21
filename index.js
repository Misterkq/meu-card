//efeito da tela 

const card = document.getElementById('card');


card.addEventListener('mousemove', (e) => {
    
    const rect = card.getBoundingClientRect();
    
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    
    const maxRotation = 20;
    
    
    const rotateX = -(mouseY / (rect.height / 2)) * maxRotation;
    const rotateY = (mouseX / (rect.width / 2)) * maxRotation;
    
   
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener('mouseleave', () => {
    card.style.transition = "transform 0.9s ease";
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
});

card.addEventListener('mouseenter', () => {
    card.style.transition = "transform 0.1s ease";
});

// copiar o nick

// Seleciona todos os itens de redes sociais
const socialItems = document.querySelectorAll('.social-item');

socialItems.forEach(item => {
    item.addEventListener('click', () => {
        // Pega o texto do span .copyable dentro do item clicado
        const textToCopy = item.querySelector('.copyable').innerText;
        
        // Copia para a área de transferência do usuário
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(item, "Copiado!");
        });
    });
});

// Função para criar a mensagem azul flutuante ("Copiado!")
function showToast(element, message) {
    // Evita criar duplicados se o usuário clicar várias vezes rápido
    const existingToast = element.querySelector('.copy-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.innerText = message;

    element.appendChild(toast);

    // Remove a mensagem suavemente após 1.5 segundos
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 200);
    }, 1500);
}

//efeito da neve caindo na tela

function createSnow() {
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    document.body.appendChild(snowContainer);

    const snowSymbol = '❄';
    const totalFlakes = 35; // Quantidade de flocos na tela

    for (let i = 0; i < totalFlakes; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerText = snowSymbol;
        
        // Posição horizontal aleatória
        flake.style.left = Math.random() * 100 + 'vw';
        
        // Tamanhos e velocidades variadas pra dar profundidade
        const size = Math.random() * 12 + 10; // entre 10px e 22px
        const duration = Math.random() * 5 + 5; // cai entre 5s e 10s
        const delay = Math.random() * 5;

        flake.style.fontSize = `${size}px`;
        flake.style.animationDuration = `${duration}s`;
        flake.style.animationDelay = `${delay}s`;
        flake.style.opacity = Math.random();

        snowContainer.appendChild(flake);
    }
}

createSnow();

//AUDIO
const audio = document.getElementById('bg-música');
const musicBtn = document.getElementById('music-toggle');

let isPlaying = false;

// Função para iniciar a música
function startAudio() {
    if (!isPlaying) {
        audio.play().then(() => {
            isPlaying = true;
            musicBtn.innerText = '🔊';
            // Remove o evento do documento para não tentar tocar de novo a cada clique
            document.removeEventListener('click', startAudio);
        }).catch(error => {
            console.log("Aguardando interação do usuário para tocar o áudio.");
        });
    }
}

// 1. Toca automaticamente no PRIMEIRO CLIQUE em qualquer lugar da tela
document.addEventListener('click', startAudio);

// 2. Botão do canto para Pausar / Tocar manualmente
musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita conflito com o clique global da tela
    
    if (isPlaying) {
        audio.pause();
        musicBtn.innerText = '🔇';
        isPlaying = false;
    } else {
        audio.play();
        musicBtn.innerText = '🔊';
        isPlaying = true;
    }
});