// This variable keeps track of whose turn it is
let activePlayer = 'X';

// This array stores an array of moves. We use this to determine win conditions
let selectedSquares = [];

// This function is for placing an x or o in a square
function placeXOrO(squareNumber) {
    // This condition ensures a square hasn't been selected aleady
    // The .some() method is used to check each element of selectedSquare array to see if it contains the square number clicked on

    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        // This variable retrieves the html element id that was clicked
        let select = document.getElementById(squareNumber);
        // This condition checks whose turn it is
        if (activePlayer === 'X') {
            // If activePlayer is equal to 'X', the x.png is placed in HTML.
            select.style.backgroundImage = 'url("./img/x.png")';
            // Active player may only be 'X' or 'O', so if not 'X', it must be 'O'
        } else {
            // If activePlayer is equal to 'O', the o.png is placed in HTML
            select.style.backgroundImage = 'url("./img/o.png")';
        }
        // squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        // This calls a function to check for any win conditions
        checkWinConditions();
        // This condition is for changing the active player
        if (activePlayer === 'X') {
            // If active player is 'X', change it to 'O'
            activePlayer = 'O';
        } else {
            // Change the active player to 'X'
            activePlayer = 'X';
        }

        // This function plays placement sound
        audio('./media/place.mp3');
        //This condition checks to see if it is computer's turn
        if (activePlayer === 'O') {
            // This function disables clicked for computer choice
            disableClick();
            // This function waits 1 second before computer places image and enables click
            setTimeout(function () { computersTurn(); }, 1000)
        }
        // Returning true is needed for computersTurn function to work
        return true;
    }
    // This function results in a random square being selected
    function computersTurn() {
        // This boolean is needed for the while looop
        let success = false;
        // This variable stores a random number 0-8
        let pickASquare;
        // This condition allows the while loop to keep trying if a square is selected already
        while(!success) {
            // A random number between 0 and 8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            // If the random number evaluated returns true, the square hasn't been selected yet
            if (placeXOrO(pickASquare)) {
                // This line calls the function
                placeXOrO(pickASquare);
                // This changes our boolean and ends the loop
                success = true;
            };
        }
    }
}

// This function parses the selectedSquares array to search for win conditions
// drawWinLine function is called to draw line if condition is met

function checkWinConditions() {
    //X 0, 1, 2 condition
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) } 
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) } 
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) } 
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) } 
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }  
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520) }  
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100) } 
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) } 
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) } 
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) } 
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) }  
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520) } 
    // This condition checks for tie. If none of the above conditions register and 9 squares are selected, the code executes.
    else if (selectedSquares.length == 9) {
        // This function plays the tie game sound
        audio('./media/tie.mp3');
        // This function sets a .3 second timer before the resetGame is called
        setTimeout(function () { resetGame(); }, 1000);
    } 

    // This function checks if an array includes 3 strings. It is user to check for each win condition
    function arrayIncludes(squareA, squareB, squareC) {
        // These 3 variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // If the 3 variables we pass are all included in the array, true is returned and our else if condition executes the drawWinLine function
        if (a === true && b === true && c=== true) { return true }
    }
}

// This function makes our body element temporarily unclickable
function disableClick() {
    // This makes the body unclickable
    body.style.pointerEvents = 'none';
    // This makes the body clickable again after 1 second
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

// This function takes a string parameter of the path out set earlier for placement sound ('./media/place.mp3')
function audio(audioURL) {
    // We create a new audio object and we pass the path as a parameter
    let audio = new Audio(audioURL);
    //Play method plays our audio sound
    audio.play();
}

// This function utilizes html canvas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //This line accesses html canvas element
    const canvas = document.getElementById('win-lines');
    // This line givues us access to methods and properties to user on vancas
    const c = canvas.getContext('2d');
    // This line indicates where the start of a lines x axis is
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        // These variables store temporary x and y axis data updated in animation loop
        x = x1,
        y = y1;


    // This function interacts with the canvas
    function animateLineDrawing() {
        // This variable creates a loop
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        // This method clears content from last loop iteration
        c.clearRect(0, 0, 608, 608);
        // This method starts a new path
        c.beginPath();
        // This method moves us to a starting point for line
        c.moveTo(x1, y1);
        // This method indicates the end point in line
        c.lineTo(x, y);
        // This method sets the width of line
        c.lineWidth = 10;
        // This method sets the color of line
        c.strokeStyle = 'rgba(70, 225, 33, .8)';
        // This method draws everything we laid out above
        c.stroke();
        // This condition checks if we've reached the endpoint
        if (x1 <= x2 && y1 <= y2) {
            // This condition adds 10 to the previous end x point
            if (x < x2) {x += 10;}
            // This condition adds 10 to the previous end y point
            if (y < y2) {y += 10;}
            // This condition cancels animation loop if we've reached the end points
            if (x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop);}
        }
        // This condition is similar to the one above
        // This is necessary for the 6, 4, 2 win condition
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) {x += 10;}
            if (y > y2) {y -= 10;}
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop);}
        } 
    }

    // This function clears canvas after our win line is drawn
    function clear() {
        // This line starts animation loop
        const animationLoop = requestAnimationFrame(clear);
        // This line clears our canvas
        c.clearRect(0, 0, 608, 608);
        // THis line stops our animation loop
        cancelAnimationFrame(animationLoop);
    }
    // This line disallows clicking while the win sound is playing
    disableClick();
    // This line plays the win sound
    audio('./media/winGame.mp3');
    // This line calls main animation loop
    animateLineDrawing();
    // This line waits 1 second then clears canvas, resets game, and allows clicking again
    setTimeout(function() { clear(); resetGame(); }, 1000);
}

// This funtion resets the game in the event of a tie or a win
function resetGame() {
    // This for loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        // This variable gets the html element of i
        let square = document.getElementById(String(i))
        // This removes elements backgroundImage
        square.style.backgroundImage = ''
    }
    // This resets array so it is empty and game can start over
    selectedSquares = [];
}