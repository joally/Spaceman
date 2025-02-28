/*-------------- Constants -------------*/
const word = [
    { word:"cosmonaut",
      hint:"A Russian space traveler."
  },
    {word:"nebula",
    hint:" A cloud of gas and dust in space."
 },
  {word:"quasar",
     hint:"An extremely luminous and distant galaxy."
  },
   {word:"exoplanet",
     hint:"A planet orbiting a star other than our sun."
   },
   {word:"astrogation",
     hint:" The science of navigating among the stars."
 
   },
   {word:"singularity",
     hint:"A point of infinite density at the center of a black hole."
 },
  { word:"supernova",
    hint:"The explosion of a star."
 }
 ]
    



/*---------- Variables (state) ---------*/
let currentWord, wrongGuessesCount;
const maxGuesses = 6;
let guessedLetters = []


/*----- Cached Element References  -----*/
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const rocketShipImage = document.querySelector(".rocketShip-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");




const getRandomWord = ()=>{
    const randomWordObj = word[Math.floor(Math.random() * word.length)];
    //current word update hint
    currentWord = randomWordObj.word;
    document.querySelector(".hint-text b").innerText = randomWordObj.hint;
//call  reset game
     resetGame();
}
const resetGame = () => {
    correctLetters =[];
    wrongGuessesCount = 0;
    
    guessesText.innerText = `${wrongGuessesCount} /${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join(''),
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

// keyboard- words
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter,index) => {
            if(letter=== clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll('li')[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
    
        });
      }  else{
        wrongGuessesCount++;
        //rocket ship img goes
      }
      //disable clicked button
      button.disabled = true;
      guessesText.innerText = `${wrongGuessesCount} /${maxGuesses}`;
      if (wrongGuessesCount === maxGuesses)return gameOver(false);
      if([...new Set(correctLetters)].length === new Set(currentWord).size)return gameOver(true);
    }; 



//function end of game
const gameOver = (isVictory) => {
    const modalText = isVictory ? `You found the word:` : `The correctWord was:`;
    gameModal.querySelector("img").src = `images/${isVictory ? 'happy':'sad'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' :'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}
//for loop for keyboard
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}


        getRandomWord();

        //event listener for play again button
        playAgainBtn.addEventListener('click', getRandomWord);


/*----------- Event Listeners ----------*/
//initial game variables




   
   
   
   
   
   
   
