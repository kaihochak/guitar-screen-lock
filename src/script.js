document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript, calling init()');
    init();
});

// current combination of frets, strings, and the right combination
var fretsClicked = [];
var stringsClicked = [];
var correctFrets = ["f2s4","f3s5","f2s6"]; // D major
var correctStrings = ["strum3","strum4","strum5","strum6"]; // D major






/*
 * onClick handler for each fret button.
 * Toggles the appearance of the fret to indicate being pressed
 * and adds the clicked fret to the input combination: fretsClicked[]
 * Uses id of button to know which fret is being pressed.
 */
function onFretClick() {
    console.log("Clicked fret # " + this.id);

    if (this.style.background != 'red') {
        this.style.background = 'red'; // change color of fret to indicate pressed down
        fretsClicked.push(this.id); // add this fret to the input combination
    } else {
        this.style.background = ''; // revert color to not pushed down
        fretsClicked.pop(this.id) // remove fret from input combination
    }

    console.log(fretsClicked); // log current fret combination
}

function onStringClick() {
    console.log("Clicked string # " + this.id);
    if (this.style.background != 'red') {
        this.style.background = 'red'; // change color of fret to indicate pressed down
        stringsClicked.push(this.id); // add this string to the input combination
    } else {
        this.style.background = ''; // revert color to not pushed down
        stringsClicked.pop(this.id) // remove string from input combination
    }

    console.log(stringsClicked); // log current string combination
}





/*
 * Gets every fret button using the query button.fret
 * and binds the onFretClick function to the onClick event.
 * Same principle for string elements, using query div.string button
 */ 
function bindFretButtonsToFunction() {
    var frets = document.querySelectorAll("button.fret");

    frets.forEach((fret) => {
        fret.onclick = onFretClick;
    });
}
function bindStringButtonsToFunction() {
    var strings = document.querySelectorAll("div.string button");

    strings.forEach((string) => {
        string.onclick = onStringClick;
    });
}



/*
 * Reset the guitar and all selections
 */
function reset() {
    fretsClicked = [];
    stringsClicked = [];

    document.querySelectorAll("button.fret").forEach((fret) => {
        fret.style.background = "";
    });
    
    document.querySelectorAll("div.string button").forEach((string) => {
        string.style.background = "";
    });
}



/*
 * Bind the input button to the verification function
 * When clicked, the selected frets and strings are compared against
 * the correct chord combination. If correct, phone unlocks
 * else, everything is cleared and user is able to try again
 */ 
function initVerification() {

    ////////////////////////// Temporary //////////////// 
    // click title to submit input
    // Can't think of a good way to submit input
    // another button? a strum button that plays a guitar sound?
    document.querySelector('h1').onclick = function() {
        console.log("verifying input chord");

        // if chosen frets and strings match the saved password, unlock
        if(fretsClicked.sort().join(',')=== correctFrets.sort().join(',') && 
            stringsClicked.sort().join(',')=== stringsClicked.sort().join(',')) {
            console.log("correct chord entered . . . unlocking phone");
            // TODO: change page to unlocked phone screen
            document.querySelector('body').style.background = 'green'; //temp
        } else {
            console.log("incorrect chord . . . clearing entry");
            reset();
        }
    }
}






function init() {
    bindFretButtonsToFunction();
    bindStringButtonsToFunction();

    initVerification();
}