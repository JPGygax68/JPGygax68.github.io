const TO_HAVE_FR = {
  I: "j'ai",
  you: "vous avez",
  he: "il a",
  she: "elle a",
  it: "il a",
  we: "nous avons",
  you_plural: "vous avez",
  you_formal: "vous avez",
  they: "ils ont",
};
const TO_HAVE_DE = {
  I: "ich habe",
  you: "du hast",
  he: "er hat",
  she: "sie hat",
  it: "er hat",
  we: "wir haben",
  you_plural: "ihr habt",
  you_formal: "Sie haben",
  they: "sie haben",
};
const CONJUGATIONS_FR = [
  { text: "j'ai", form: 1, plural: false },
  { text: "tu as", form: 2, plural: false, formal: false },
  { text: "vous avez", form: 2, plural: false, formal: true },
  { text: "il a", form: 3, plural: false, gender: "m" },
  { text: "elle a", form: 3, plural: false, gender: "f" },
  { text: "nous avons", form: 1, plural: true },
  { text: "vous avez", form: 2, plural: true },
  { text: "ils ont", form: 3, plural: true, gender: "m" },
  { text: "elles ont", form: 3, plural: true, gender: "f" },
];
const CONJUGATIONS_DE = [
  { text: "ich habe", to_be: false, form: 1, plural: false },
  { text: "du hast", to_be: false, form: 2, plural: false, formal: false },
  { text: "Sie haben", to_be: false, form: 2, plural: false, formal: true },
  { text: "er hat", to_be: false, form: 3, plural: false, gender: "m" },
  //{ text: "es hat", form: 3, plural: false, gender: "n" },
  { text: "sie hat", to_be: false, form: 3, plural: false, gender: "f" },
  { text: "wir haben", to_be: false, form: 1, plural: true },
  { text: "ihr habt", to_be: false, form: 2, plural: true },
  { text: "sie haben", to_be: false, form: 3, plural: true },
  { text: "ich bin", to_be: true, form: 1, plural: false },
  { text: "du bist", to_be: true, form: 2, plural: false, formal: false },
  { text: "Sie sind", to_be: true, form: 2, plural: false, formal: true },
  { text: "er ist", to_be: true, form: 3, plural: false, gender: "m" },
  { text: "sie ist", to_be: true, form: 3, plural: false, gender: "f" },
  { text: "wir sind", to_be: true, form: 1, plural: true },
  { text: "ihr seit", to_be: true, form: 2, plural: true },
  { text: "sie sind", to_be: true, form: 3, plural: true },
];
const TOBE_DE = [
];

const ACTIONS = [
  {
    fr: "dessiné un plan",
    de: "einen Plan gezeichnet",
  },
  {
    fr: "ouvert la porte",
    de: "die Tür geöffnet",
  },
  {
    fr: "ouvert les livres",
    de: "die Bücher geöffnet",
  },
  {
    fr: "imité le cri d'un animal",
    de: "den Schrei eines Tieres nachgeahmt",
  },
  {
    fr: "chanté le refrain",
    de: "den Refrain gesungen",
  },
  {
    fr: "scotché les livres",
    de: "die Bücher geklebt",
  },
  {
    fr: "acheté les livres",
    de: "die Bücher gekauft",
  },
  {
    fr: "acheté un pyjama",
    de: "ein Pyjama gekauft",
  },
  {
    fr: "acheté une machine",
    de: "eine Maschine gekauft",
  },
  {
    fr: "pris un caillou",
    de: "einen Stein genommen",
  },
  {
    fr: "pris les ciseaux",
    de: "die Schere genommen",
  },
  {
    fr: "été drôle[pl:s]",
    de: "lustig gewesen",
    describes_state: true // must use conjugated form of "sein" in German
  },
  {
    fr: "rempli un verre",
    de: "ein Glas gefüllt",
  },
  {
    fr: "mis les baskets",
    de: "die Turnschuhe angezogen",
  },
  {
    fr: "mis un pyjama",
    de: "einen Pyjama angezogen",
  },
  {
    fr: "rangé les livres",
    de: "die Bücher eingeräumt",
  },
  {
    fr: "visité une exposition",
    de: "eine Ausstellung besucht",
  },
  {
    fr: "fait des grimaces",
    de: "Grimassen gemacht",
  },
  {
    fr: "fait une fête",
    de: "ein Fest gemacht",
  },
  {
    fr: "vu un fantôme",
    de: "einen Geist gesehen",
  },
  {
    fr: "vu une sauterelle",
    de: "eine Heuschrecke gesehen",
  },
  {
    fr: "organisé une fête",
    de: "ein Fest organisiert",
  },
  {
    fr: "vu un plan",
    de: "einen Plan gesehen",
  },
  {
    fr: "organisé une exposition",
    de: "eine Ausstellung organisiert",
  },
  {
    fr: "eu peur",
    de: "Angst gehabt",
  },
  {
    fr: "utilisé un élastique",
    de: "ein Gummiband benutzt",
  },
  {
    fr: "utilisé les ciseaux",
    de: "die Schere benutzt",
  }
];

let conjugationFr = null;
let conjugationDe = null;
let action = null;
let textFr = null;
let textDe = null;

let recognition = null;

function createFrenchToGermanTask() {
  conjugationFr = CONJUGATIONS_FR[Math.floor(Math.random() * CONJUGATIONS_FR.length)];
  action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  const text = capitalize(conjugationFr.text) + " " + action.fr + ".";
  $("#french").text(text);
}

function createGermanToFrenchTask() {
  action = randomArrayElement(ACTIONS);
  //action = ACTIONS[11];
  const possibleConjugations = CONJUGATIONS_DE.filter((conj) => {
    return action.describes_state && conj.to_be || !action.describes_state && !conj.to_be;
  });
  conjugationDe = randomArrayElement(possibleConjugations);
  textDe = capitalize(conjugationDe.text) + " " + action.de + ".";
  $("#german_original").text(textDe);
  $('#french_input').val('');
  $('#french_translations').empty();
}

function checkFrenchTranslation() {
  const french_text = $('#french_input').val();
  console.log(french_text);
  showPossibleFrenchTranslations(french_text);
}

function showPossibleFrenchTranslations(ref) {
  let possibleGermanConjugations = getMatchingGermanConjugations(textDe);
  $('#french_translations').empty();
  for (const conjDe of possibleGermanConjugations) {
    for (const conjFr of CONJUGATIONS_FR) {
      if (germanConjugationMatches(conjDe, conjFr)) {
        const actionFr = action.fr.replaceAll(/\[(.+)\:(.+)\]/g, function (match, p1, p2) {
          if (p1 == 'pl' && conjFr.plural) return p2;
          return '';
        });
        const text = capitalize(`${conjFr.text} ${actionFr}.`);
        const classes = ref === text ? 'correct' : '';
        $('#french_translations').append(`<li class="${classes}">${text}<span class="material-symbols-outlined" onclick="speakFrench('${text})')">text_to_speech</span></li>`);
      }
    }
  }
}

function getMatchingGermanConjugations(conjText) {
  const results = [];
  const origWords = conjText.split(' ');
  for (const conjDe of CONJUGATIONS_DE) {
    const conjDeWords = conjDe.text.split(' ');
    if (conjDeWords[0].toLowerCase() === origWords[0].toLowerCase() &&
      conjDeWords[1] === origWords[1]) {
      results.push(conjDe);
    }
  }
  //console.log('getMatchingGermanConjugations:', results);
  return results;
}

function germanConjugationMatches(french, german) {
  return (french.form === german.form) &&
    // (orig.to_be === void 0 || trans.to_be === void 0 || orig.to_be == trans.to_be) &&
    (french.gender === (void 0) || german.gender === (void 0) || french.gender === german.gender) &&
    (french.plural === (void 0) || german.plural === (void 0) || french.plural === german.plural) &&
    (french.formal === (void 0) || german.formal === (void 0) || french.formal === german.formal);
}

function checkGermanTranslation() {
  let input = $('#german_input').val();
  if (input.length > 0) {
    let text = extractBareSentence($("#german_input").val());
    console.log(text);
  }
}

$(document).ready(function () {
  console.log("ready!");
  setupSpeechRecognition();
  createGermanToFrenchTask();
});

function setupSpeechRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
    console.log("Speech recognition not supported");
  } else {
    console.log("Speech recognition supported");
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "fr-FR";
    recognition.onresult = function (event) {
      console.log('onresult', event.results.length);
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          console.log("final:", event.results[i][0].transcript);
          const text = toCompleteSentence(event.results[i][0].transcript.trim());
          $("#french_input").val(text);
          checkFrenchTranslation();
        } else {
          interim_transcript += event;
        }
      }
    }
    recognition.start()
  }
}

function speakGerman() {
  const text = $("#german_original").text();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  recognition.stop();
  window.speechSynthesis.speak(utterance);
  utterance.onend = function () {
    recognition.start();
  }
}

function speakFrench(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  recognition.stop();
  window.speechSynthesis.speak(utterance);
  utterance.onend = function () {
    recognition.start();
  }
}

function toCompleteSentence(text) {
  const last = text[text.length - 1];
  if (last !== '.' && last !== '!') {
    text += '.';
  }
  text = capitalize(text);
  return text;
}

function extractBareSentence(text) {
  text = unCapitalize(text);
  const last = text[text.length - 1];
  if (last === '.' || last === '!') {
    text = text.slice(void 0, text.length - 1);
  }
  return text;
}

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

function unCapitalize(s) {
  return s[0].toLowerCase() + s.slice(1);
}

function randomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Create a random index to pick from the original array
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Cache the value, and swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
