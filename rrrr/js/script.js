// ================================================
// SPØRGSMÅL OG SVAR
// ================================================

const spg = [
  {
    spg: "Hvad er din absolut største styrke?",
    svar: [
      { tekst: "Min evne til at tænke kreativt og skabe min egen stil", dukke: "Lulu" },
      { tekst: "Min dybe intuition og evne til at gennemskue svære ting", dukke: "Sinhu" },
      { tekst: "Min varme for mennesker og evnen til at få folk til at grine", dukke: "Pupparpasta" },
      { tekst: "Min loyalitet og evne til at passe på dem omkring mig", dukke: "Verda" },
    ],
  },
  {
    spg: "Hvad ønsker du dig mere af?",
    svar: [
      { tekst: "Plads til at være mig selv", dukke: "Lulu" },
      { tekst: "Ro og tid til at fordybe sig i interesser", dukke: "Sinhu" },
      { tekst: "Hyggelige stunder med venner", dukke: "Verda" },
      { tekst: "Frihed til at bryde ud og opleve verden", dukke: "Dragen" },
    ],
  },
  {
    spg: "Hvor trives du allerbedst?",
    svar: [
      { tekst: "Hvor der er varme og tryghed", dukke: "Pupparpasta" },
      { tekst: "I et kreativt rum", dukke: "Lulu" },
      { tekst: "I godt selskab", dukke: "Verda" },
      { tekst: "Hvor der er total frihed", dukke: "Dragen" },
    ],
  },
  {
    spg: "Hvad gør dig mest glad?",
    svar: [
      { tekst: "At kunne slappe af, læse en bog og en skål slik", dukke: "Sinhu" },
      { tekst: "At være omringet af dem jeg holder af", dukke: "Pupparpasta" },
      { tekst: "At gøre en ven glad", dukke: "Verda" },
      { tekst: "Følelsen af at være fri", dukke: "Dragen" },
    ],
  },
  {
    spg: "Hvordan slapper du bedst af?",
    svar: [
      { tekst: "Ved at komme ud under den blå himmel", dukke: "Dragen" },
      { tekst: "Ved at dyrke mine hobbyer", dukke: "Lulu" },
      { tekst: "Ved at lukke øjnene og dykke ned i mine drømme", dukke: "Sinhu" },
      { tekst: "Ved at hygge med familie og mine nærmeste", dukke: "Pupparpasta" },
    ],
  },
];


// ================================================
// DUKKE-DATA
// ================================================

const dukker = {
  Lulu: {
    navn: "Lulu",
    billede: "img/lulu.png",
    baggrund: "img/maling.gif",
    baggrundKlasse: "lulu-baggrund",
    beskrivelse: "Du er kreativ, fantasifuld og tør være lidt anderledes. Du skaber din egen verden og lader ikke andre definere din identitet – det er modigt!",
  },
  Sinhu: {
    navn: "Sinhu",
    billede: "img/sinhu.png",
    baggrund: "img/vinger.gif",
    baggrundKlasse: "sinhu-baggrund",
    beskrivelse: "Du er en sjælden, dyb og magisk beskytter. Ligesom Ovartacis elskede papmaché-hest er du gruppens mest loyale ven og en rådgiver, man kan søge hjælp hos.",
  },
  Pupparpasta: {
    navn: "Pupparpasta",
    billede: "img/pupparpasta.png",
    baggrund: "img/bog.gif",
    baggrundKlasse: "pupparpasta-baggrund",
    beskrivelse: "Du er indbegrebet af leg og humor. For dig er verden et sted uden stramme regler, hvor der altid er plads til nye, skøre og fantastiske idéer.",
  },
  Verda: {
    navn: "Verda",
    billede: "img/verda.png",
    baggrund: "img/cykel.gif",
    baggrundKlasse: "verda-baggrund",
    beskrivelse: "Du er den trofaste ven, der elsker det nære selskab. Du trives bedst på eventyr i hverdagen - gerne en cykeltur til stranden med nogen, du holder af.",
  },
  Dragen: {
    navn: "Dragen",
    billede: "img/dragen.png",
    baggrund: "img/drage-vinger.gif",
    baggrundKlasse: "dragen-baggrund",
    beskrivelse: "Du er det ultimative symbol på frihed. Du elsker følelsen af uafhængighed og drømmer stort om at kunne bevæge dig frit – både i tid og sted.",
  },
};


// ================================================
// POINTSYSTEM
// ================================================

let spgIndex = 0;
let scores = { Lulu: 0, Sinhu: 0, Pupparpasta: 0, Verda: 0, Dragen: 0 };


// ================================================
// STARTER QUIZZEN
// ================================================

function startQuiz() {
  spgIndex = 0;
  scores = { Lulu: 0, Sinhu: 0, Pupparpasta: 0, Verda: 0, Dragen: 0 };

  document.getElementById("start-skaerm").classList.add("skjult");
  document.getElementById("quiz-skaerm").classList.remove("skjult");

  visSpoergsmaal();
}


// ================================================
// VISER SPØRGSMÅLENE
// ================================================

function visSpoergsmaal() {
  const aktuelleSpg = spg[spgIndex];
  document.getElementById("spg-tekst").innerText = aktuelleSpg.spg;

  // Opdaterer progress bar
  const procent = ((spgIndex + 1) / spg.length) * 100;
  document.getElementById("progress-bar").style.width = procent + "%";

  const svarContainer = document.getElementById("svar-knap-container");
  svarContainer.innerHTML = "";

  aktuelleSpg.svar.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = ans.tekst;
    btn.className = "quiz-svarknap";
    btn.onclick = () => {
      if (ans.dukke) { scores[ans.dukke]++; }
      spgIndex++;

      if (spgIndex < spg.length) {
        visSpoergsmaal();
      } else {
        visLoadingSkaerm();
      }
    };
    svarContainer.appendChild(btn);
  });
}


// ================================================
// LOADING SKÆRM
// ================================================

function visLoadingSkaerm() {
  document.getElementById("quiz-skaerm").classList.add("skjult");
  document.getElementById("vente-side").classList.remove("skjult");

  setTimeout(visResultat, 1000);
}


// ================================================
// BEREGNER VINDER OG VISER RESULTAT
// ================================================

function visResultat() {
  document.getElementById("vente-side").classList.add("skjult");
  document.getElementById("resultat-skaerm").classList.remove("skjult");

  // Finder højeste score eller trækker lod ved stemmelighed
  const maxScore = Math.max(...Object.values(scores));
  const winners = Object.keys(scores).filter(dukke => scores[dukke] === maxScore);
  const randomWinnerIndex = Math.floor(Math.random() * winners.length);
  const winner = winners[randomWinnerIndex];

  // Gem og hent vinder fra localStorage
  localStorage.setItem("quizVinder", winner);
  const gemtVinder = localStorage.getItem("quizVinder");

  const dukke = dukker[gemtVinder];

  // Sæt tekst
  document.getElementById("dukke-navn").innerText = dukke.navn;
  document.getElementById("dukke-beskrivelse").innerText = dukke.beskrivelse;

  // Sæt dukke-billede
  document.getElementById("dukke-billede").src = dukke.billede;

  // Sæt baggrund/gif med individuel klasse
  const baggrundEl = document.getElementById("dukke-baggrund");
  baggrundEl.src = dukke.baggrund;
  baggrundEl.className = "dukke-baggrund"; // nulstil tidligere klasse
  baggrundEl.classList.add(dukke.baggrundKlasse); // tilføj den specifikke
}


// ================================================
// TILBAGE TIL START
// ================================================

function goBackToStart() {
  document.getElementById("quiz-skaerm").classList.add("skjult");
  document.getElementById("vente-side").classList.add("skjult");
  document.getElementById("resultat-skaerm").classList.add("skjult");
  document.getElementById("start-skaerm").classList.remove("skjult");
}