document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript, calling init()');
    currentScreen = 'startScreen';
    switchScreen();
});

// Screens
const startScreen = document.getElementById('startScreen');
const guitarScreen = document.getElementById('guitarScreen');
const unlockScreen = document.getElementById('unlockScreen');

// Strings
const string1 = document.getElementById('l1');
const string2 = document.getElementById('l2');
const string3 = document.getElementById('l3');
const string4 = document.getElementById('l4');
const string5 = document.getElementById('l5');
const string6 = document.getElementById('l6');

// Strings
let strings = {
    strum1: string1,
    strum2: string2,
    strum3: string3,
    strum4: string4,
    strum5: string5,
    strum6: string6
}

const lockScreenButton = document.getElementById('lockScreen');

// current combination of frets, strings, and the right combination
var fretsClicked = [];
var stringsClicked = [];
// password 
var correctFrets = ["f2s4", "f3s5", "f2s6"]; // D major
var correctStrings = ["strum3", "strum4", "strum5", "strum6"]; // D major

// Define a variable to track the current screen
let currentScreen = 'startScreen';

// Flag to track whether the left mouse button is currently down
let isLeftMouseDown = false;

function switchScreen() {
    if (currentScreen === 'startScreen') {
        initSlideUpGesture();
        resetGuitar();
        startScreen.style.display = 'flex';
        startScreen.style.transform = 'translateY(0)'; // Slide the start screen in
        guitarScreen.style.display = 'none';
        guitarScreen.style.transform = 'translateY(100%)'; // Slide the guitar screen out
        unlockScreen.style.transform = 'translateY(100%)'; // Slide the unlocked screen out
    } else if (currentScreen === 'guitarScreen') {
        bindFretButtonsToFunction();
        bindStringButtonsToFunction();
        initStrumming();
        guitarScreen.style.transform = 'translateY(0)'; // Slide the guitar screen in
        guitarScreen.style.display = 'flex';
        startScreen.style.transform = 'translateY(-100%)'; // Slide the start screen out
        startScreen.style.display = 'none';
        unlockScreen.style.transform = 'translateY(100%)'; // Slide the unlocked screen out
    } else if (currentScreen === 'unlockScreen') {
        initLockScreenButton();
        unlockScreen.style.transform = 'translateY(0)'; // Slide the unlocked screen in
        unlockScreen.style.display = 'flex';
        guitarScreen.style.transform = 'translateY(-100%)'; // Slide the start screen out
        guitarScreen.style.display = 'none'; // Slide the guitar screen out
    }
}

// Functions for Start Screen

let startY = null;

function initSlideUpGesture() {

    // support for touch events
    document.addEventListener('touchstart', handleStart);
    document.addEventListener('touchend', handleEnd);

    // support for mouse events
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mouseup', handleEnd);
}

function handleStart(event) {
    if (event.touches) {
        // Touch events
        startY = event.touches[0].clientY;
    } else {
        // Mouse events
        startY = event.clientY;
    }
}

function handleEnd(event) {
    if (startY !== null) {

        // if start screen, startY should be at the bottom of the screen
        // if guitar screen, startY should be at the top of the screen
        if ((currentScreen === 'startScreen' && startY > window.innerHeight * 5 / 6)
            || currentScreen === 'guitarScreen' && startY < window.innerHeight * 1 / 6) {


            let currentY;
            if (event.changedTouches) {
                // Touch events
                currentY = event.changedTouches[0].clientY;
            } else {
                // Mouse events
                currentY = event.clientY;
            }

            // Calculate the distance between the start and current touch/mouse positions
            // and determine if the user is sliding up to the guitar screen
            const deltaY = currentY - startY;
            const screenHeight = window.innerHeight; // Get the screen height
            const threshold = event.changedTouches ? (screenHeight / 3) : 2;

            if (deltaY < -threshold) { // Adjust the threshold as needed
                // Transition to the guitar screen
                currentScreen = 'guitarScreen';
                switchScreen();
            } else if (deltaY > threshold) { // Adjust the threshold as needed
                // Transition to the start screen
                console.log("Transitioning to start screen");
                currentScreen = 'startScreen';
                switchScreen();
            }
            startY = null;

        }
    }
}


// Functions for Guitar Screen

function bindFretButtonsToFunction() {
    var frets = document.querySelectorAll("button.fret");

    frets.forEach((fret) => {
        fret.addEventListener('click', onFretClick);
    });
}

function bindStringButtonsToFunction() {
    var strings = document.querySelectorAll("div.string button");

    strings.forEach((string) => {

        string.addEventListener('touchstart', onStringTouchStart);
        string.addEventListener('touchmove', onStringTouchMove);
        string.addEventListener('touchend', onStringTouchEnd);

        string.addEventListener('mousedown', onStringMouseDown);
        string.addEventListener('mouseover', onStringMouseOver);
        string.addEventListener('mouseleave', onStringMouseLeave);
    });
}

function onStringTouchStart() {
    console.log("Clicked string # " + this.id);
    logButtonID(this.id); // Log the ID when the button is clicked

    strings[this.id].style.width = '5px';
    strings[this.id].style.background = '#CA3401';
}

function onStringTouchMove(event) {
    console.log("Clicked string # " + this.id);
    let targetID = document.elementFromPoint(
        event.touches[0].clientX, event.touches[0].clientY).id;
    logButtonID(targetID); // Log the ID when the button is clicked
    strings[targetID].style.width = '5px';
    strings[targetID].style.background = '#CA3401';

    setTimeout(() => {
        strings[targetID].style.width = '1px';
        strings[targetID].style.background = '#826352';
    }, 500);

}

function onStringTouchEnd() {
    console.log("Clicked string # " + this.id);
    logButtonID(this.id); // Log the ID when the button is clicked

    setTimeout(() => {
        strings[this.id].style.width = '1px';
        strings[this.id].style.background = '#826352';
    }, 500);
}


function initStrumming() {

    // support for touch events
    document.addEventListener('touchstart', handleStrumStart);
    document.addEventListener('touchend', handleStrumEnd);

    // support for mouse events
    document.addEventListener("mousedown", handleStrumStart);
    document.addEventListener("mouseup", handleStrumEnd);
}

function handleStrumStart(event) {
    if (event.touches) {
        // Touch events
    } else {
        // Mouse events
        if (event.button === 0) isLeftMouseDown = true;
    }
}

function handleStrumEnd(event) {

    if (!event.target.classList.contains('fret')) {
        if (event.touches || event.button === 0) {
            isLeftMouseDown = false;
            verifyChord();
        }
    }


    // if (event.button === 0 && !event.target.classList.contains('fret')) {
    //     isLeftMouseDown = false;
    //     verifyChord();
    // }
}

function onFretClick() {
    console.log("Clicked fret # " + this.id);
    logButtonID(this.id); // Log the ID when the button is clicked

    if (this.style.background != 'red') {
        this.style.background = 'red'; // change color of fret to indicate being pressed
        fretsClicked.push(this.id); // add this fret to the input combination
    } else {
        this.style.background = ''; // revert color to not pushed down
        fretsClicked.pop(this.id); // remove fret from input combination
    }

    console.log(fretsClicked); // log current fret combination
}

function onStringMouseDown() {

    console.log("Clicked string # " + this.id);
    logButtonID(this.id); // Log the ID when the button is clicked

    strings[this.id].style.width = '5px';
    strings[this.id].style.background = '#CA3401';
}

function onStringMouseOver(event) {
    if (event.buttons === 1) { // Check if the left mouse button is clicked
        console.log("Mouse over string # " + this.id);
        logButtonID(this.id); // Log the ID when the button is moused over
        stringsClicked.push(this.id); // add this fret to the input combination
        strings[this.id].style.width = '5px';
        strings[this.id].style.background = '#CA3401';
    }
}

function onStringMouseLeave(event) {
    if (event.buttons === 1) { // Check if the left mouse button is clicked
        stringsClicked.push(this.id); // add this fret to the input combination
        setTimeout(() => {
            strings[this.id].style.width = '1px';
            strings[this.id].style.background = '#826352';
        }, 500);
    }
}

function arraysAreEqual(arr1, arr2) {
    // Remove duplicates from the arrays
    const uniqueArr1 = arr1.filter((value, index, self) => self.indexOf(value) === index);
    const uniqueArr2 = arr2.filter((value, index, self) => self.indexOf(value) === index);

    // Sort the unique arrays and then compare them
    uniqueArr1.sort();
    uniqueArr2.sort();

    // Check if the arrays are equal
    return JSON.stringify(uniqueArr1) === JSON.stringify(uniqueArr2);
}

function verifyChord() {

    console.log("Verifying chord . . .");

    const guitar = document.getElementById('guitar');

    if (arraysAreEqual(fretsClicked, correctFrets) && 
        arraysAreEqual(stringsClicked, correctStrings)) {
        console.log("correct chord entered . . . unlocking phone");
        currentScreen = 'unlockScreen';
        switchScreen();
    } else {
        console.log("incorrect chord . . . clearing entry");
        printChords();
        resetGuitar();
        guitar.style.animation = "shake 1s";
        setTimeout(() => {
            guitar.style.animation = "";
        }, 1000);
    }
    
    // fix the bug of strings staying red
    let stringValues = Object.values(strings);
    for (let i = 0; i < stringValues.length; i++) {
        let value = stringValues[i];
        value.style.width = '1px';
        value.style.background = '#826352';
    }
}

function printChords() {
    console.log("Frets: " + fretsClicked);
    console.log("Strings: " + stringsClicked);
}

function resetGuitar() {
    fretsClicked = [];
    stringsClicked = [];

    document.querySelectorAll("button.fret").forEach((fret) => {
        fret.style.background = '';
    });

    document.querySelectorAll("div.string button").forEach((string) => {
        string.style.background = '';
    });

}

function logButtonID(id) {
    console.log("Button ID: " + id);
}

// Functions for unlock screen

function initLockScreenButton() {
    lockScreenButton.addEventListener('click', function () {
        currentScreen = 'startScreen';
        switchScreen();
    });
}
