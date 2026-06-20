/* =====================================================
   QUIZ "Che tipo di Brava Ragazza sei?"
   Bonus interattivo per Esaurita ma Sorridente
   ===================================================== */

(function () {
  'use strict';

  /* -----------------------------------------------------
     DATI — Domande e profili (testi dal brief)
     ----------------------------------------------------- */

  const QUESTIONS = [
    {
      n: 1,
      text: "Quando senti di \"tenere tutto insieme\" più degli altri?",
      options: [
        { letter: "A", text: "Quando tutti si sfogano con me e io ascolto sempre.", profile: "A" },
        { letter: "B", text: "Quando la casa è in ordine e tutti hanno ciò che serve.", profile: "B" },
        { letter: "C", text: "Quando al lavoro risolvo problemi che non sarebbero nemmeno miei.", profile: "C" },
        { letter: "D", text: "Quando riesco a incastrare tutto, anche se per me non avanza niente.", profile: "D" }
      ]
    },
    {
      n: 2,
      text: "Il messaggio che ti manda più in tilt è:",
      options: [
        { letter: "A", text: "\"Ti posso chiamare? Ho bisogno di parlarti.\"", profile: "A" },
        { letter: "B", text: "\"Mancano i calzini puliti, non li trovo da nessuna parte.\"", profile: "B" },
        { letter: "C", text: "\"Ti ho messo in copia, tanto sei bravissima a gestire queste cose.\"", profile: "C" },
        { letter: "D", text: "\"Hai un minuto?\" (quando sai che non sarà mai un minuto).", profile: "D" }
      ]
    },
    {
      n: 3,
      text: "Come ti senti quando provi a dire \"no\"?",
      options: [
        { letter: "A", text: "In colpa, come se stessi abbandonando qualcuno.", profile: "A" },
        { letter: "B", text: "Inadeguata, come se non fossi capace di gestire casa e famiglia.", profile: "B" },
        { letter: "C", text: "Non professionale, come se stessi sabotando la mia carriera.", profile: "C" },
        { letter: "D", text: "Egoista, come se mi stessi mettendo al centro \"troppo\".", profile: "D" }
      ]
    },
    {
      n: 4,
      text: "La tua frase automatica preferita è:",
      options: [
        { letter: "A", text: "\"Tranquilla, ci sono io.\"", profile: "A" },
        { letter: "B", text: "\"Faccio io, ci metto un attimo.\"", profile: "B" },
        { letter: "C", text: "\"Se serve resto un po' di più, nessun problema.\"", profile: "C" },
        { letter: "D", text: "\"L'importante è che stiate bene voi.\"", profile: "D" }
      ]
    },
    {
      n: 5,
      text: "Quando sei davvero stanca, cosa salta per prima?",
      options: [
        { letter: "A", text: "I miei bisogni emotivi: non chiedo più niente a nessuno.", profile: "A" },
        { letter: "B", text: "Il mio riposo: vado avanti a oltranza.", profile: "B" },
        { letter: "C", text: "I miei confini al lavoro: dico sì a tutto.", profile: "C" },
        { letter: "D", text: "Tutto quello che è piacere puro: hobbies, sport, incontri con amiche.", profile: "D" }
      ]
    },
    {
      n: 6,
      text: "Dove senti di dover \"essere perfetta\" più spesso?",
      options: [
        { letter: "A", text: "Come amica, partner, figlia: negli affetti.", profile: "A" },
        { letter: "B", text: "Come madre / gestore di casa: tutto deve girare.", profile: "B" },
        { letter: "C", text: "Come professionista: non posso permettermi errori.", profile: "C" },
        { letter: "D", text: "Come donna in generale: corpo, immagine, ruolo… tutto.", profile: "D" }
      ]
    },
    {
      n: 7,
      text: "Se avessi una giornata libera solo per te, cosa succederebbe davvero?",
      options: [
        { letter: "A", text: "Risponderei a tutti i messaggi arretrati, \"così mi tolgo il pensiero\".", profile: "A" },
        { letter: "B", text: "Metterei a posto casa \"così poi mi rilasso davvero\" (spoiler: non succede).", profile: "B" },
        { letter: "C", text: "Recupererei lavoro in arretrato, \"così lunedì parto più tranquilla\".", profile: "C" },
        { letter: "D", text: "Mi sentirei a disagio, come se stessi rubando tempo a qualcuno.", profile: "D" }
      ]
    },
    {
      n: 8,
      text: "Qual è il tuo pensiero più frequente, ma inconfessabile?",
      options: [
        { letter: "A", text: "\"Vorrei che per una volta qualcuno si prendesse cura di me.\"", profile: "A" },
        { letter: "B", text: "\"Vorrei che la casa potesse andare avanti due giorni senza di me.\"", profile: "B" },
        { letter: "C", text: "\"Vorrei spegnere il telefono del lavoro per 24 ore, senza conseguenze.\"", profile: "C" },
        { letter: "D", text: "\"Vorrei sparire per un weekend intero senza dare spiegazioni.\"", profile: "D" }
      ]
    },
    {
      n: 9,
      text: "Quando qualcuno ti chiede \"come stai?\", cosa succede di solito?",
      options: [
        { letter: "A", text: "Ascolto prima come sta lui/lei, poi minimizzo me.", profile: "A" },
        { letter: "B", text: "Rispondo \"bene\", ma nella testa ho la lista di tutto quello che devo fare.", profile: "B" },
        { letter: "C", text: "Dico \"un po' stanca\" e subito dopo aggiungo \"ma niente di che\".", profile: "C" },
        { letter: "D", text: "Dico \"sto bene\", poi la sera crollo senza capire perché.", profile: "D" }
      ]
    },
    {
      n: 10,
      text: "Cosa temi di più se inizi a mettere te stessa al centro, anche solo un po'?",
      options: [
        { letter: "A", text: "Che gli altri si sentano rifiutati o abbandonati.", profile: "A" },
        { letter: "B", text: "Che la casa, la famiglia, l'organizzazione vadano in tilt.", profile: "B" },
        { letter: "C", text: "Che qualcuno al lavoro pensi che non sei più affidabile.", profile: "C" },
        { letter: "D", text: "Che tu non sia una \"brava persona\" se ti scegli.", profile: "D" }
      ]
    }
  ];

  const PROFILES = {
    A: {
      name: "La Brava Ragazza Salva-Tutti",
      subtitle: "Il centralino emotivo h24",
      recognition: "Tu sei quella che ascolta tutti. L'amica che riceve i vocali da 7 minuti, la collega a cui si sfogano, la persona che \"sa capire\". Sei il pronto soccorso emotivo di mezzo mondo, e spesso nessuno si chiede dove finisce quello che ricevi.",
      validation: "Non sei dipendente dagli altri, non sei \"troppo buona\" nel senso sbagliato. Sei stata educata a credere che essere una brava persona significhi esserci sempre per tutti, anche quando non ci sei più per te.",
      insight: "Il punto non è smettere di voler bene. È smettere di farlo a spese tue. Chi ti ama davvero resterà anche se ogni tanto non rispondi al volo, o se dici \"oggi non ce la faccio ad ascoltare\".",
      action: "Oggi scegli una persona a cui di solito dici subito \"se hai bisogno chiama\" e, solo per oggi, non ti offri tu per prima. Resta in silenzio e guarda cosa succede. Cinque minuti. Solo questo.",
      quote: "Tu non sei il pronto soccorso emotivo di tutti: sei casa, prima di tutto per te."
    },
    B: {
      name: "La Brava Ragazza Perfettina di Casa",
      subtitle: "Il CEO del Bucato S.p.A.",
      recognition: "Tu vedi tutto: briciole, calzini, zaini, scadenze della mensa, compleanni, lavatrici. La casa funziona perché tu sei il sistema operativo invisibile. Se non ci fossi tu, metà delle cose \"magicamente\" fatte non succederebbero.",
      validation: "Non sei maniaca del controllo, né fissata con la perfezione senza motivo. Sei stata cresciuta con l'idea che una casa in ordine significhi \"sei a posto tu\", e che se qualcosa manca è colpa tua.",
      insight: "La verità è che fai il lavoro di tre persone e lo chiami \"normale\". E nessuno ti ha mai detto che si può essere una brava madre / compagna / figlia anche se il lavello ogni tanto rimane pieno.",
      action: "Oggi scegli UNA cosa che di solito fai tu per tutti (es: piegare il bucato, sparecchiare, controllare gli zaini) e NON farla. Lasciala lì. Guarda cosa succede davvero, non quello che temi. Cinque minuti. Solo questo.",
      quote: "Tu non sei nata per essere la colf emotiva di nessuno, nemmeno della tua famiglia."
    },
    C: {
      name: "La Brava Ragazza Eroina del Lavoro",
      subtitle: "Sempre disponibile, mai davvero fuori servizio",
      recognition: "Tu sei quella che \"ci pensa lei\". Messaggi, mail, emergenze vere o presunte: arrivi tu e il problema si risolve. Sei l'affidabile, la responsabile, quella che \"se dice di sì, allora siamo tranquilli\".",
      validation: "Non sei una workaholic senz'anima. Sei stata premiata per anni ogni volta che superavi i tuoi limiti. Ti hanno fatto credere che il tuo valore sia legato a quanto fai, non a chi sei.",
      insight: "Il paradosso è che più dimostri di saper fare tutto, più ti caricano. Non sei tu a sbagliare: è il sistema che si appoggia sempre sulle spalle più forti. Ma anche le spalle più forti hanno diritto di riposo.",
      action: "Oggi scegli una notifica del lavoro (mail, messaggio, gruppo) e disattivala per 5 minuti mentre fai altro. Cinque minuti in cui il mondo continua a girare senza di te. Cinque minuti. Solo questo.",
      quote: "Tu non sei il tuo rendimento: sei una persona anche quando il pc è spento."
    },
    D: {
      name: "La Brava Ragazza Senza Tempo per Sé",
      subtitle: "L'ultima voce in agenda",
      recognition: "Tu sei quella che incastra tutto. Agenda piena, testa piena, cuore pieno… ma il tuo nome, da qualche parte, non c'è. Se chiedi a qualcuno \"di cosa hai bisogno oggi?\", quasi mai la risposta sei tu.",
      validation: "Non sei disorganizzata, né \"una che si trascura\". Sei solo abituata a mettere il tuo tempo all'asta per chiunque alzi la mano, e ti hanno detto che lamentarsi è da egoisti.",
      insight: "Il trucco è semplice e scomodo: se non ti prenoti tu, non ti prenota nessuno. Il tuo tempo non è un resto da riempire, è una voce da mettere in cima, anche se piccolo, anche se solo per cinque minuti.",
      action: "Oggi apri l'agenda (o il telefono) e blocca un quadratino da 5 minuti con scritto SOLO \"Per me\". Non scrivere cosa farai. Esiste prima il tempo, poi il contenuto. Cinque minuti. Solo questo.",
      quote: "Tu non sei l'ultima della lista: sei la riga senza la quale la lista non esiste."
    }
  };

  /* -----------------------------------------------------
     STATO
     ----------------------------------------------------- */
  const state = {
    name: "",
    current: 0,            // indice domanda 0..9
    answers: new Array(QUESTIONS.length).fill(null), // 'A'|'B'|'C'|'D'|null
    screen: "landing"      // 'landing' | 'quiz' | 'result'
  };

  /* -----------------------------------------------------
     RIFERIMENTI DOM
     ----------------------------------------------------- */
  const $ = (sel) => document.querySelector(sel);

  const els = {
    screenLanding: $("#screen-landing"),
    screenQuiz:    $("#screen-quiz"),
    screenResult:  $("#screen-result"),

    startBtn:   $("#startBtn"),
    userName:   $("#userName"),
    restartBtn: $("#restartBtn"),

    quizCount:    $("#quizCount"),
    quizEyebrow:  $("#quizEyebrow"),
    quizQuestion: $("#quizQuestion"),
    quizOptions:  $("#quizOptions"),
    progressBar:  $("#progressBar"),
    prevBtn:      $("#prevBtn"),
    nextBtn:      $("#nextBtn"),

    resultName:        $("#resultName"),
    resultProfileName: $("#resultProfileName"),
    resultProfileTitle:$("#resultProfileTitle"),
    resultRecognition: $("#resultRecognition"),
    resultValidation:  $("#resultValidation"),
    resultInsight:     $("#resultInsight"),
    resultAction:      $("#resultAction"),
    resultQuote:       $("#resultQuote"),

    printBtn: $("#printBtn"),
    redoBtn:  $("#redoBtn")
  };

  /* -----------------------------------------------------
     NAVIGAZIONE TRA SCHERMATE
     ----------------------------------------------------- */
  function showScreen(name) {
    state.screen = name;

    [els.screenLanding, els.screenQuiz, els.screenResult].forEach(s => {
      s.classList.remove("is-active");
      s.setAttribute("aria-hidden", "true");
    });

    let target;
    if (name === "landing") target = els.screenLanding;
    else if (name === "quiz") target = els.screenQuiz;
    else if (name === "result") target = els.screenResult;

    target.classList.add("is-active");
    target.setAttribute("aria-hidden", "false");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* -----------------------------------------------------
     LANDING — start
     ----------------------------------------------------- */
  els.startBtn.addEventListener("click", () => {
    state.name = (els.userName.value || "").trim();
    state.current = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    renderQuestion();
    showScreen("quiz");
  });

  // Enter sull'input fa partire il quiz
  els.userName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      els.startBtn.click();
    }
  });

  /* -----------------------------------------------------
     QUIZ
     ----------------------------------------------------- */
  function renderQuestion() {
    const idx = state.current;
    const q = QUESTIONS[idx];

    els.quizCount.textContent = `Domanda ${q.n} di ${QUESTIONS.length}`;
    els.quizEyebrow.textContent = `— Domanda ${q.n} —`;
    els.quizQuestion.textContent = q.text;

    // progress
    const pct = Math.round(((idx + 1) / QUESTIONS.length) * 100);
    els.progressBar.style.width = pct + "%";
    els.progressBar.parentElement.setAttribute("aria-valuenow", String(q.n));

    // opzioni
    els.quizOptions.innerHTML = "";
    q.options.forEach((opt) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.dataset.profile = opt.profile;
      btn.setAttribute("aria-pressed", "false");
      if (state.answers[idx] === opt.profile) {
        btn.classList.add("is-selected");
        btn.setAttribute("aria-pressed", "true");
      }

      const letter = document.createElement("span");
      letter.className = "option__letter";
      letter.textContent = opt.letter;
      letter.setAttribute("aria-hidden", "true");

      const text = document.createElement("span");
      text.className = "option__text";
      text.textContent = opt.text;

      btn.appendChild(letter);
      btn.appendChild(text);

      btn.addEventListener("click", () => selectOption(idx, opt.profile, btn));

      li.appendChild(btn);
      els.quizOptions.appendChild(li);
    });

    // nav
    els.prevBtn.disabled = idx === 0;
    updateNextBtn();
  }

  function selectOption(idx, profile, btnEl) {
    state.answers[idx] = profile;

    // visual: marca selezionata
    els.quizOptions.querySelectorAll(".option").forEach((b) => {
      b.classList.remove("is-selected");
      b.setAttribute("aria-pressed", "false");
    });
    btnEl.classList.add("is-selected");
    btnEl.setAttribute("aria-pressed", "true");

    updateNextBtn();
  }

  function updateNextBtn() {
    const hasAnswer = state.answers[state.current] !== null;
    els.nextBtn.disabled = !hasAnswer;

    const isLast = state.current === QUESTIONS.length - 1;
    // Aggiorna label del "Avanti" sull'ultima domanda
    if (isLast) {
      els.nextBtn.innerHTML = 'Scopri il tuo profilo <span class="btn__arrow" aria-hidden="true">→</span>';
    } else {
      els.nextBtn.innerHTML = 'Avanti <span class="btn__arrow" aria-hidden="true">→</span>';
    }
  }

  els.nextBtn.addEventListener("click", () => {
    if (state.answers[state.current] === null) return;

    if (state.current < QUESTIONS.length - 1) {
      state.current++;
      renderQuestion();
    } else {
      // calcola risultato
      computeAndShowResult();
    }
  });

  els.prevBtn.addEventListener("click", () => {
    if (state.current > 0) {
      state.current--;
      renderQuestion();
    }
  });

  els.restartBtn.addEventListener("click", () => {
    if (confirm("Vuoi davvero ricominciare? Perderai le risposte di questo quiz.")) {
      state.current = 0;
      state.answers = new Array(QUESTIONS.length).fill(null);
      showScreen("landing");
    }
  });

  /* -----------------------------------------------------
     RISULTATO
     ----------------------------------------------------- */
  function computeProfile() {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    state.answers.forEach((p) => {
      if (p && counts[p] !== undefined) counts[p]++;
    });

    // Trova il profilo dominante
    let winner = "A";
    let max = -1;
    // Iteriamo in ordine A, B, C, D — in caso di parità vince il primo incontrato
    ["A", "B", "C", "D"].forEach((k) => {
      if (counts[k] > max) {
        max = counts[k];
        winner = k;
      }
    });

    return { winner, counts };
  }

  function computeAndShowResult() {
    const { winner } = computeProfile();
    const p = PROFILES[winner];

    // Nome opzionale
    if (state.name) {
      els.resultName.textContent = `il risultato di ${state.name}`;
    } else {
      els.resultName.textContent = "";
    }

    els.resultProfileName.textContent = p.name;
    els.resultProfileTitle.textContent = p.subtitle;
    els.resultRecognition.textContent = p.recognition;
    els.resultValidation.textContent = p.validation;
    els.resultInsight.textContent = p.insight;
    els.resultAction.textContent = p.action;
    els.resultQuote.textContent = p.quote;

    // Aggiorna anche il <title> della pagina per la stampa
    document.title = `${p.name} — Quiz "Esaurita ma Sorridente"`;

    showScreen("result");
  }

  /* -----------------------------------------------------
     STAMPA / SALVATAGGIO
     ----------------------------------------------------- */
  els.printBtn.addEventListener("click", () => {
    window.print();
  });

  els.redoBtn.addEventListener("click", () => {
    // reset completo
    state.name = "";
    state.current = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    els.userName.value = "";
    document.title = 'Che tipo di Brava Ragazza sei? — Quiz di Esaurita ma Sorridente';
    showScreen("landing");
  });

  /* -----------------------------------------------------
     INIT
     ----------------------------------------------------- */
  // Niente da fare: la landing è già visibile (is-active in HTML)

})();
