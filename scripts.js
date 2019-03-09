'use strict'

const lives = 10;
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

// Hangman
const myHangman = document.getElementById("hangman");
const context = myHangman.getContext('2d');
context.beginPath();
context.strokeStyle = "#000";
context.lineWidth = 2;

function startHangman() {
    playButton.classList.add("d-none");
    gameArea.classList.remove("d-none");
    remainingLives = lives;
    writeInDocument('', gameStatus);
    setChosenWord();
    setDocumentState();
    resetHangman();
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
        animateHangman();
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
        animateHangman();
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

function animateHangman() {
    let drawMe = remainingLives;
    drawArray[drawMe]();
}

function resetHangman() {
    context.clearRect(0, 0, myHangman.width, myHangman.height);
    context.beginPath();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
}

const head = function () {
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
}

const frame1 = function () {
    draw(0, 150, 150, 150);
};

const frame2 = function () {
    draw(10, 0, 10, 600);
};

const frame3 = function () {
    draw(0, 5, 70, 5);
};

const frame4 = function () {
    draw(60, 5, 60, 15);
};

const torso = function () {
    draw(60, 36, 60, 70);
};

const rightArm = function () {
    draw(60, 46, 100, 50);
};

const leftArm = function () {
    draw(60, 46, 20, 50);
};

const rightLeg = function () {
    draw(60, 70, 100, 100);
};

const leftLeg = function () {
    draw(60, 70, 20, 100);
};

const drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

playButton.addEventListener('click', () => {
    startHangman();
});

checkButton.addEventListener('click', () => {
    checkLetter();
});