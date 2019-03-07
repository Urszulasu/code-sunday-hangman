'use strict'

const lives = 7;
const playButton = document.querySelector('#play');
const wordPlace = document.querySelector('#word');
const checkButton = document.querySelector('#checkButton');
const letterInput = document.querySelector('#letterInput');
const gameStatus = document.querySelector('#gameStatus');
const livesPlace = document.querySelector('#lives');
const gameArea = document.querySelector('#gameArea');

let chosenWord;
let chosenWordArray;
let hiddenWordArray;
let hiddenWordDisplay = '';
let guessedLetters = [];
let remainingLives;

let wordsToChoose = ['woda', 'kamieniarz', 'spacja', 'babcia'];
wordsToChoose = wordsToChoose.map(word => word.toUpperCase());

function startHangman() {
    playButton.classList.add("d-none");
    gameArea.classList.remove("d-none");
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
    let wordIsGuessed = !hiddenWordArray.some(letter => letter === '_');
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
                hiddenWordArray[index] = value;
            }
        });
        writeInDocument('Zgadłeś!', gameStatus);
        guessedLetters.push(value);
    } else {
        writeInDocument('Nie zgadłeś', gameStatus);
        remainingLives--;
    }
}

function chooseWord(wordsArray) {
    return wordsArray[Math.floor(Math.random() * wordsToChoose.length)];
}

function removeWordFromArray(word, wordsArray) {
    let index = wordsArray.indexOf(word);
    wordsArray.splice(index, 1);
}

function setChosenWord() {
    chosenWord = chooseWord(wordsToChoose);
    removeWordFromArray(chosenWord, wordsToChoose);
    chosenWordArray = Array.from(chosenWord);
    hiddenWordArray = Array.from(chosenWord).map(letter => { return '_' });
    guessedLetters = [];
}

function setHiddenWordDisplay() {
    hiddenWordDisplay = '';
    hiddenWordArray.forEach(letter => {
        hiddenWordDisplay = hiddenWordDisplay + ' ' + letter;
    });
}

function setDocumentState() {
    setHiddenWordDisplay();
    writeInDocument(remainingLives, livesPlace);
    writeInDocument(hiddenWordDisplay, wordPlace);
}

function setDocumentStateAfterGuess() {
    letterInput.value = null;
    setDocumentState();
}

function writeInDocument(word, node) {
    node.innerHTML = word;
}

playButton.addEventListener('click', () => {
    startHangman();
});

checkButton.addEventListener('click', () => {
    checkLetter();
});