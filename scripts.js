'use strict'

const wordsToChoose = ['woda', 'kamieniarz', 'spacja', 'babcia'];
const lives = 7;
const playButton = document.querySelector('#play');
const wordPlace = document.querySelector('#word');
const checkButton = document.querySelector('#checkButton');
const letterInput = document.querySelector('#letterInput');
const gameStatus = document.querySelector('#gameStatus');
const showLives = document.querySelector('#lives');
let chosenWord;
let chosenWordArray;
let hiddenWord;
let hiddenWordDisplay = '';
let guessedLetters = [];
let remainingLives;

function startHangman() {
    playButton.classList.add("d-none");
    remainingLives = lives;
    writeInDocument('', gameStatus);
    setChosenWord();
    setDocumentState();
}

function checkLetter() {
    let value = letterInput.value.toUpperCase();
    checkIfGuessed(value);
    setDocumentStateAfterGuess();
    checkForWinningsOrLooses();
}

function checkForWinningsOrLooses() {
    let wordIsGuessed = !hiddenWord.some(letter => letter === '_');
    let livesLeft = remainingLives === 0;

    if (wordIsGuessed) {
        writeInDocument('Wygrałeś!', gameStatus);
    }
    if (livesLeft) {
        writeInDocument('Przegrałeś! Spróbuj jeszcze raz', gameStatus);
    }
    if (wordIsGuessed || livesLeft) {
        playButton.classList.remove("d-none");
    }
}

function checkIfGuessed(value) {
    if (guessedLetters.some(letter => letter === value)) {
        writeInDocument('Było!', gameStatus);
        remainingLives--;
    } else if (chosenWordArray.some(v => v === value)) {
        chosenWordArray.forEach((letter, index) => {
            if (letter === value) {
                hiddenWord[index] = value;
            }
        });
        writeInDocument('Zgadłeś!', gameStatus);
        guessedLetters.push(value);
    } else {
        writeInDocument('Nie zgadłeś', gameStatus);
        remainingLives--;
    }
}

function chooseWord(wordsToChoose) {
    return wordsToChoose[Math.floor(Math.random() * wordsToChoose.length)].toUpperCase();
}

function removeWordFromArray(word, array) {
    let index = array.indexOf(word);
    array.splice(index, 1);
}

function setChosenWord() {
    chosenWord = chooseWord(wordsToChoose);
    removeWordFromArray(chosenWord, wordsToChoose);
    chosenWordArray = Array.from(chosenWord);
    hiddenWord = Array.from(chosenWord).map(letter => { return '_' });
}

function setHiddenWordDisplay() {
    hiddenWordDisplay = '';
    hiddenWord.forEach(letter => {
        hiddenWordDisplay = hiddenWordDisplay + ' ' + letter;
    });
}

function setDocumentState() {
    setHiddenWordDisplay();
    writeInDocument(remainingLives, showLives);
    writeInDocument(hiddenWordDisplay, wordPlace);
}

function writeInDocument(word, node) {
    node.innerHTML = word;
}

function setDocumentStateAfterGuess() {
    letterInput.value = null;
    setDocumentState();
}

playButton.addEventListener('click', () => {
    startHangman();
});

checkButton.addEventListener('click', () => {
    checkLetter();
});