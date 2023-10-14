document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript, calling init()');
    init();
});

// current combination of frets, strings, and the right combination
var fretsClicked = [];
var stringsClicked = [];
var correctFrets = ["f2s4", "f3s5", "f2s6"]; // D major
var correctStrings = ["strum3", "strum4", "strum5", "strum6"]; // D major

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
        } else {
            console.log("incorrect chord . . . clearing entry");
            reset();
        }
    });
}

function init() {
    bindFretButtonsToFunction();
    bindStringButtonsToFunction();
    initVerification();
}
