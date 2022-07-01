/*GAME FUNCTION
-  Player must guess the name of the number betweena min and max
-  Player gets a certain amount of guesses
-  Notify player of number of guesses remaining
-  Notify the palyer the correct answer if he or she loose
-  Let the palyer choose to play again
-*/

//Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI ELEMENTS
const game = document.getElementById('game'), // for the game card
    minNum = document.querySelector('.min-num'), //for the min-num
    maxNum = document.querySelector('.max-num'), //for the max-num
    guessBtn = document.querySelector('#guess-btn'), //for the submit button
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//ASSIGN UI MIN & MAX so we can declare 
minNum.textContent = min;
maxNum.textContent = max;

///Play Again event listener
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();

    }
})

//Event Listener forsubmit button
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    console.log(guess);

    //Validate the guessed number to make sure it is between the range of the minimum and maximum
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max} `, 'red');
    }
    //Check if game is won
    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct, Ultimate level unlocked`);

    } else {
        //Wrong number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            //Game over  - lost
            gameOver(false, `Game Over , Get a Grip loser!!!. The correct number was ${winningNum}`);

        } else {
            //Game continues - answer wrong

            //Change the border color
            guessInput.style.borderColor = 'red';
            message.style.color = 'red';
            //Clear input
            guessInput.value = '';
            //Tell user its the wrong number
            setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left before you unlock the ultimate search`, 'red');


        }

    }
});
//Game Over
function gameOver(won, msg) {
    let color;
    won = true ? color = 'green' : color = red;
    //Disable the input
    guessInput.disabled = true;
    //Change the border color
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    //Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';


}

//Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//declaring the function setMessage
function setMessage(msg, color) {

    message.textContent = msg;

}