document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript, calling init()');
    init();
});

// current combination of frets, strings, and the right combination
var fretsClicked = [];
var stringsClicked = [];
var correctFrets = ["f2s4", "f3s5", "f2s6"]; // D major
var correctStrings = ["strum3", "strum4", "strum5", "strum6"]; // D major

// Define a variable to track the current screen
let currentScreen = 'startScreen';

function switchScreen() {
    const startScreen = document.getElementById('startScreen');
    const guitarScreen = document.getElementById('guitarScreen');
    const unlockedScreen = document.getElementById('unlockedScreen');

    if (currentScreen === 'startScreen') {
        startScreen.style.display = 'flex';
        startScreen.style.transform = 'translateY(0)'; // Slide the start screen in
        guitarScreen.style.display = 'none';
        guitarScreen.style.transform = 'translateY(100%)'; // Slide the guitar screen out
        unlockedScreen.style.transform = 'translateY(100%)'; // Slide the unlocked screen out
    } else if (currentScreen === 'guitarScreen') {
        guitarScreen.style.transform = 'translateY(0)'; // Slide the guitar screen in
        guitarScreen.style.display = 'flex';
        startScreen.style.transform = 'translateY(-100%)'; // Slide the start screen out
        startScreen.style.display = 'none';
        unlockedScreen.style.transform = 'translateY(100%)'; // Slide the unlocked screen out
    } else if (currentScreen === 'unlockedScreen') {
        startScreen.style.transform = 'translateY(-100%)'; // Slide the start screen out
        guitarScreen.style.transform = 'translateY(-100%)'; // Slide the guitar screen out
        unlockedScreen.style.transform = 'translateY(0)'; // Slide the unlocked screen in
    }
}

function initSlideUpGesture2() {
    const startScreen = document.getElementById('startScreen');
    const guitarScreen = document.getElementById('guitarScreen');

    let startY = null;

    function handleStart(event) {
        if (event.touches) {
            // Touch events
            startY = event.touches[0].clientY;
        } else {
            // Mouse events
            startY = event.clientY;
            console.log("Mouse down at " + startY);
        }
    }

    function handleEnd(event) {
        if (startY !== null) {
            let currentY;
            if (event.changedTouches) {
                // Touch events
                currentY = event.changedTouches[0].clientY;
            } else {
                // Mouse events
                currentY = event.clientY;
                console.log("Mouse move at " + currentY);
            }

            // Calculate the distance between the start and current touch/mouse positions
            // and determine if the user has slid up to at least half the screen
            const deltaY = currentY - startY;
            const screenHeight = window.innerHeight; // Get the screen height

            const threshold = event.changedTouches ? (screenHeight / 3) : 2;

            console.log("Delta Y: " + deltaY);
            console.log("Threshold: " + -threshold);
            console.log("Screen height: " + (-screenHeight / 3));
            if (deltaY < -screenHeight / 2) {
                // Transition to the guitar screen
                console.log("Transitioning to guitar screen");
                currentScreen = 'guitarScreen';
                switchScreen();
            }
            startY = null;
        }
    }

    // support for touch events
    document.addEventListener('touchstart', handleStart);
    document.addEventListener('touchend', handleEnd);

    // support for mouse events
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mouseup', handleEnd);
}



function initSlideUpGesture() {

    let startY = null;

    function handleStart(event) {
        if (event.touches) {
            // Touch events
            startY = event.touches[0].clientY;
        } else {
            // Mouse events
            startY = event.clientY;
            console.log("Mouse down at " + startY);
        }
    }

    function handleEnd(event) {
        if (startY !== null) {
            let currentY;
            if (event.changedTouches) {
                // Touch events
                currentY = event.changedTouches[0].clientY;
            } else {
                // Mouse events
                currentY = event.clientY;
                console.log("Mouse move at " + currentY);
            }

            // Calculate the distance between the start and current touch/mouse positions
            // and determine if the user is sliding up to the guitar screen
            const deltaY = currentY - startY;
            const screenHeight = window.innerHeight; // Get the screen height
            const threshold = event.changedTouches ? (screenHeight / 3) : 2;

            console.log("Delta Y: " + deltaY);
            console.log("Threshold: " + -threshold);
            console.log("Screen height: " + (-screenHeight / 3));

            if (deltaY < -threshold) { // Adjust the threshold as needed
                // Transition to the guitar screen
                console.log("Transitioning to guitar screen");
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

    // support for touch events
    document.addEventListener('touchstart', handleStart);
    document.addEventListener('touchend', handleEnd);

    // support for mouse events
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mouseup', handleEnd);
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

function onStringClick() {
    console.log("Clicked string # " + this.id);
    logButtonID(this.id); // Log the ID when the button is clicked

    this.style.background = 'red'; // Highlight the button immediately on click
    stringsClicked.push(this.id); // add this string to the input combination

    console.log(stringsClicked); // log current string combination
}

function onStringMouseOver() {
    if (event.buttons === 1) { // Check if the left mouse button is clicked
        console.log("Mouse over string # " + this.id);
        logButtonID(this.id); // Log the ID when the button is moused over
        this.style.background = 'red'; // change color of string when mouse is clicked
    }

}

function onStringMouseLeave() {
    if (event.buttons === 1) { // Check if the left mouse button is clicked

        setTimeout(() => {
            this.style.background = '';
        }, 500);
    }
}


function logButtonID(id) {
    console.log("Button ID: " + id);
}

function bindFretButtonsToFunction() {
    var frets = document.querySelectorAll("button.fret");

    frets.forEach((fret) => {
        fret.addEventListener('click', onFretClick);
    });
}

function bindStringButtonsToFunction() {
    var strings = document.querySelectorAll("div.string button");

    strings.forEach((string) => {
        string.addEventListener('click', onStringClick);
        string.addEventListener('mouseover', onStringMouseOver);
        string.addEventListener('mouseleave', onStringMouseLeave);
    });
}

function reset() {
    fretsClicked = [];
    stringsClicked = [];

    document.querySelectorAll("button.fret").forEach((fret) => {
        fret.style.background = '';
    });

    document.querySelectorAll("div.string button").forEach((string) => {
        string.style.background = '';
    });
}

function unlockPhone() {
    // Transition to the unlocked screen
    const guitarScreen = document.getElementById('guitarScreen');
    const unlockedScreen = document.getElementById('unlockedScreen');

    guitarScreen.style.display = 'none';
    unlockedScreen.style.display = 'block';
    currentScreen = 'unlockedScreen';
}

function initVerification() {
    document.querySelector('h1').addEventListener('click', function () {
        console.log("verifying input chord");

        if (
            fretsClicked.sort().join(',') === correctFrets.sort().join(',') &&
            stringsClicked.sort().join(',') === stringsClicked.sort().join(',')
        ) {
            console.log("correct chord entered . . . unlocking phone");
            // TODO: change page to unlocked phone screen
            document.querySelector('body').style.background = 'green'; //temp
            unlockPhone();
        } else {
            console.log("incorrect chord . . . clearing entry");
            reset();
        }
    });
}

function init() {
    initSlideUpGesture();
    bindFretButtonsToFunction();
    bindStringButtonsToFunction();
    initVerification();
}
