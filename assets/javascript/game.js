var display = {
    score: document.getElementById("score"),
    answer: document.getElementById("answer"),
    guess: document.getElementById("guessLeft"),
    letters: document.getElementById("lettersGuessed")
}

var game = {
    wordList:  ["aardvark", "alligator", "alpaca", "anteater",
                "antelope", "baboon", "badger", "beaver",
                "bluebird", "bobcat", "buffalo", "bulldog",
                "camel", "caterpillar", "cheetah", "chicken",
                "chihuahua", "chipmunk", "couger", "crocodile",
                "dolphin", "donkey", "elephant", "falcon",
                "ferret", "gazelle", "gorilla", "groundhog",
                "horse", "hummingbird", "iguana", "impala",
                "jaguar", "kangaroo", "leopard", "lion",
                "llama", "lobster", "manatee", "meerkat",
                "mockingbird", "muskrat", "narwhal", "octopus",
                "ostrich", "panda", "peacock", "rabbit", "raccoon",
                "rattlesnake", "rhinoceros", "scorpion", "squirrel",
                "tarantula", "walrus", "whale", "wolverine", "zebra"],
    currentWord: "",
    wins: 0,
    guessCount: 10,
    guessedLetters: [],
    wrongGuess: [],
    gameOver: false,
    setupGame: function(){
        this.guessCount = 10;
        this.guessedLetters = [];
        this.wrongGuess = [];
        this.gameOver = false;
        display.score.textContent = this.wins;
        display.guess.textContent = this.guessCount;
        display.letters.textContent = this.wrongGuess;
        this.getNewWord();
    },
    getNewWord: function(){
        //pick a word, and make sure it's not the same as the current one
        var newWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        if (newWord === this.currentWord){
            //if it is make a new word
            this.getNewWord();
        }
        else{
            //if it's really new, make it the current word and update the answer
            this.currentWord = newWord;
            this.updateAnswer();
        }    
    },
    updateAnswer: function(){
        var displayed = "";
        //for each letter of the word, check if it's been guessed and either add it to what should be displayed of " _ " as a placeholder
        for(var i = 0; i < this.currentWord.length; i++){
            if(this.guessedLetters.indexOf(this.currentWord[i]) != -1){
                displayed = displayed + this.currentWord[i];
            }
            else{
                displayed = displayed + " _ ";
            }
        }
        //if there aren't any placeholders the game is over, you won!
        if(displayed.indexOf("_") == -1){
            this.wins++;
            this.gameOver = true;
        }
        display.answer.textContent = displayed;
    },
    checkGuess: function(letter){
        //check if the game is over or not, so subsequent clicks start a new game
        if(this.gameOver || this.guessCount === 0){
            this.setupGame();
        }
        else{ 
            //make sure the letter hasn't already been guessed
            if(this.guessedLetters.indexOf(letter) == -1){
                this.guessedLetters.push(letter);
                //check if it's a letter of the word, and if it is update the answer
                if(this.currentWord.indexOf(letter) != -1){
                    this.updateAnswer();
                }
                //otherwise add it to the wrong guesses and update chances
                else{
                    this.wrongGuess.push(letter);
                    this.guessCount--;
                    display.letters.textContent = this.wrongGuess;
                    display.guess.textContent = this.guessCount;

                }
            }   
        }

    }
}

//when a key is pressed, make sure it's a letter, and if it is pass it to the game
document.onkeyup = function(event){
    var pressedKey = event.key.toLowerCase();
    var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    if(alphabet.indexOf(pressedKey) != -1){
        game.checkGuess(pressedKey);
    }
}

//setup the game on the first page load
game.setupGame();
