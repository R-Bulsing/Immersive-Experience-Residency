// Haal score op uit de URL
const urlParams = new URLSearchParams(window.location.search);
const score = parseInt(urlParams.get('score'), 10);  // score als getal

// Laat de score zien op de pagina (optioneel)
const scoreElement = document.querySelector('#score');
if (scoreElement && !isNaN(score)) {
    scoreElement.textContent = `Je score: ${score} van de 12 vragen correct`;
}

// Bepaal threshold voor winnen
const winThreshold = 6;

// Na 15 seconden doorgaan naar de juiste animatie
setTimeout(() => {
    // Als score ongeldig is, wordt deze op 0 gezet zodat verlies.html wordt geladen
    const finalScore = isNaN(score) ? 0 : score;

    if (finalScore >= winThreshold) {
        window.location.href = 'win.html';      // naar win animatie
    } else {
        window.location.href = 'verlies.html';  // naar verlies animatie
    }
}, 10000);