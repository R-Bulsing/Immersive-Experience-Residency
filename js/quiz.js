/* 1: id's en classes ophalen */
const timerElement = document.querySelector(".timer");
const vraagTeller = document.querySelector(".vraag-teller");
const antwoorden = document.querySelectorAll(".antwoord");

// getElementById zoekt alleen naar het element met deze ID
const vraagElement = document.getElementById("vraag");
const antwoordA = document.getElementById("antwoordA");
const antwoordB = document.getElementById("antwoordB");
const antwoordC = document.getElementById("antwoordC");
const antwoordD = document.getElementById("antwoordD");

/* 2: vragen lijst */
let questions = [
{
question: "Waarom beweegt een dirigent zijn handen?",
options: ["Om te dansen", "Om aanwijzingen te geven", "Om zelf muziek te maken", "Om het publiek te begroeten"],
answer: "Om muzikanten aanwijzingen te geven"
},
{
question: "Wat gebeurt er bij grote bewegingen van de dirigent?",
options: ["De muziek wordt harder", "Iedereen stopt", "De muziek wordt langzamer", "Muzikanten gaan zitten"],
answer: "De muziek wordt harder"
},
{
question: "Wat gebeurt er bij kleine rustige bewegingen?",
options: ["De muziek wordt sneller", "De muziek wordt harder", "De muziek wordt zachter", "De muziek stopt"],
answer: "De muziek wordt zachter"
},
{
question: "Welke muziek heeft meestal een dirigent?",
options: ["Pop", "Klassiek", "Rock", "Rap"],
answer: "Klassiek"
},
{
question: "Wie was een beroemde dirigent?",
options: ["Ludwig van Beethoven", "Leonard Bernstein", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach"],
answer: "Leonard Bernstein"
},
{
question: "Welke taak hoort NIET bij een dirigent?",
options: ["Orkest leiden", "Muziek interpreteren", "Instrumenten repareren", "Tempo aangeven"],
answer: "Instrumenten repareren"
},
{
question: "Waarvoor is een lessenaar?",
options: ["Voor bladmuziek", "Voor decoratie", "Om aan te ruiken", "Voor fruit"],
answer: "Voor bladmuziek"
},
{
question: "Waar besteedt een dirigent de meeste tijd aan?",
options: ["Muzikanten kiezen", "Locatie kiezen", "Repetities", "Reclame maken"],
answer: "Repetities"
},
{
question: "Mag een dirigent het podium indelen?",
options: ["Nee, nooit", "Nee, geen invloed", "Soms op aanvraag", "Ja, meestal wel"],
answer: "Ja, meestal wel"
},
{
question: "Wat leest een dirigent tijdens een stuk?",
options: ["Alleen viool", "Alleen melodie", "Alle instrumenten", "Alleen ritme"],
answer: "Alle instrumenten"
},
{
question: "Bij welke groep horen pauken?",
options: ["Blaas", "Percussie", "Strijk", "Toets"],
answer: "Percussie"
},
{
question: "Waarom hebben pauken een pedaal?",
options: ["Toon veranderen", "Harder maken", "Tempo volgen", "Geluid dempen"],
answer: "Toon veranderen"
}
];

/* 3: variabelen */
let userAnswers = {};
let currentQuestionIndex = 0;
let timeLeft = 20;
let timer;

/* 4: timer functie */
function startTimer() {
    timeLeft = 20;

    timer = setInterval(() => {
        timerElement.textContent = "0:" + timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

/* 5: vraag laden */
function loadQuestion() {
    clearInterval(timer);

    let q = questions[currentQuestionIndex];

    vraagElement.textContent = q.question;

    antwoordA.textContent = q.options[0];
    antwoordB.textContent = q.options[1];
    antwoordC.textContent = q.options[2];
    antwoordD.textContent = q.options[3];

    vraagTeller.textContent = `${currentQuestionIndex + 1}/${questions.length}`;

    startTimer();
}

/* 6: klikbare antwoorden */
antwoorden.forEach(antwoord => {
    antwoord.addEventListener("click", function () {
        clearInterval(timer);

        let gekozen = this.textContent;
        userAnswers[currentQuestionIndex] = gekozen;

        nextQuestion();
    });
});

/* 7: volgende vraag */
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        checkAnswers();
    }
}

/* 8: score berekenen */
function checkAnswers() {
    clearInterval(timer);

    let score = 0;

    questions.forEach((q, index) => {
        if (userAnswers[index] === q.answer) {
            score++;
        }
    });

    // Verwijder de setTimeout en stuur de gebruiker direct naar de eindpagina
    window.location.href = 'eind.html?score=' + score;
}

/* 9: quiz reset (vervangen door navigatie naar eindpagina) */
function resetQuiz() {
    currentQuestionIndex = 0;
    userAnswers = {};
    loadQuestion();
}

/* 10: quiz starten */
loadQuestion();