//Challenge 3: Change the color of all Buttons

//Hold initial colors in an array
let allBtnColorBackUp = [];
let allBtn = document.getElementsByTagName('button');
for (let i = 0; i < allBtn.length; i++) {
    allBtnColorBackUp.push(allBtn[i].style.backgroundColor);    
}

function chgBtnColor (clr){
    console.log(clr);
    if (clr == 'red') {
        changeColorRed();
    } else if(clr == 'blue') {
        changeColorBlue();
    } else if(clr === 'green') {
        changeColorGreen();
    } else if(clr === 'random') {
        changeColorRandom();
    } else {
        changeColorReset();
    }
}

function changeColorRed(){
    for (let i = 0; i < allBtn.length; i++) {
        allBtn[i].style.backgroundColor = "red";
        allBtn[i].style.color = 'white';  
    }
}

function changeColorBlue(){
    for (let i = 0; i < allBtn.length; i++) {
        allBtn[i].style.backgroundColor = "royalblue";
        allBtn[i].style.color = 'white';    
    }
}

function changeColorGreen(){
    for (let i = 0; i < allBtn.length; i++) {
        allBtn[i].style.backgroundColor = "green";
        allBtn[i].style.color = 'white';  
    }
}

function changeColorRandom(){
    let colorChoices = ["red", "royalblue", "green", "yellow"];
    for (let i = 0; i < allBtn.length; i++) {
        let colorPosition = Math.floor(Math.random() * 4);
        allBtn[i].style.backgroundColor = colorChoices[colorPosition];
        if (allBtn[i].style.backgroundColor === 'yellow') {
            allBtn[i].style.color = 'black';
        }
    }
}

function changeColorReset(){
    for (let i = 0; i < allBtn.length; i++) {
        allBtn[i].style.backgroundColor = allBtnColorBackUp[i];  
        if (allBtn[i].style.backgroundColor === 'yellow') {
            allBtn[i].style.color = 'black';
        }  
    }
}

//Challenge 5: Blackjack

//Three objects: Player, Bot, Game

//The Player: attributes (wins, losses, draw, current score)
//The Player: functions => Choose randomly from deck of card

const cashSound = new Audio('static/sounds/cash.mp3');
const awwSound = new Audio('static/sounds/aww.mp3');
const swishSound = new Audio('static/sounds/swish.m4a');

const fullDeck = [
    [['heartsA', [1,11]], ['diamondA', [1,11]], ['spadeA', [1,11]], ['clubA', [1,11]]
    ],
    [
        ['hearts2', 2], ['diamond2', 2], ['spade2', 2], ['club2', 2]
    ],
    [
        ['hearts3', 3], ['diamond3', 3], ['spade3', 3], ['club3', 3]
    ],
    [
        ['hearts4', 4], ['diamond4', 4], ['spade4', 4], ['club4', 4]
    ],
    [
        ['hearts5', 5], ['diamond5', 5], ['spade5', 5], ['club5', 5]
    ],
    [
        ['hearts6', 6], ['diamond6', 6], ['spade6', 6], ['club6', 6]
    ],
    [
        ['hearts7', 7], ['diamond7', 7], ['spade7', 7], ['club7', 7]
    ],
    [
        ['hearts8', 8], ['diamond8', 8], ['spade8', 8], ['club8', 8]
    ],
    [
        ['hearts9', 9], ['diamond9', 9], ['spade9', 9], ['club9', 9]
    ],
    [
        ['hearts10', 10], ['diamond10', 10], ['spade10', 10], ['club10', 10]
    ],
    [
        ['heartsK', 10], ['diamondK', 10], ['spadeK', 10], ['clubK', 10]
    ],
    [
        ['heartsQ', 10], ['diamondQ', 10], ['spadeQ', 10], ['clubQ', 10]
    ],
    [
        ['heartsJ', 10], ['diamondJ', 10], ['spadeJ', 10], ['clubJ', 10]
    ]
];

let humanPlayer = {
    name: 'player',
    wins: 0,
    losses: 0,
    draws: 0,
    score: 0,
    hit: async function (){
        if (deck.hit) {
            let card = deck.getRandomCard();
            displayCard(card[0][0], this.name);
            updateScore(card[0][1], this);
            deck.stand = true;
            if (this.score > 21) {
                await sleep(1000);
                bot.hit();
            }
        }
    }
}

let bot = {
    name: 'bot',
    wins: 0,
    losses: 0,
    draws: 0,
    score: 0,
    hit: async function (){
        if (deck.stand) {
            deck.hit = false;
            deck.stand = false;
            deck.deal = true;
            while (this.score <= 16) {
                let card = deck.getRandomCard();
                displayCard(card[0][0], this.name);
                updateScore(card[0][1], this);
                await sleep(1000);
            }
            let gameWinner = decideWinner();
            updateWinner(gameWinner);        
        }
    }
}

let cards;

let deck = {
    hit: true,
    stand: false,
    deal: false,
    getRandomCard: function(){
        let rand1 = Math.floor(Math.random() * cards.length);
        while (cards[rand1].length === 0) {
            rand1 = Math.floor(Math.random() * cards.length);
        }
        let rand2 = Math.floor(Math.random() * cards[rand1].length);

        let option = cards[rand1].splice(rand2, 1);
        return option;
    },

    reShuffle: function(){
        cards = [];

        for (let index = 0; index < fullDeck.length; index++) {
        cards.push(fullDeck[index]);    
        }
    }
}

deck.reShuffle();

function displayCard(dealedCard, playerName){
    let image = document.createElement('img');
    image.src = `static/img/cards/${dealedCard}.png`;
    image.style.width = '20%';
    image.style.margin = '2.5% 10px'
    console.log(image.src);
    if (playerName === 'player') {
        document.querySelector('#your-box').appendChild(image);
    } else {
        document.querySelector('#dealer-box').appendChild(image);
    }

    //play deal sound
    swishSound.play();
}

function updateScore(score, playerN){
    console.log(typeof score);
    //check burst

    if (typeof score !== 'number') {
        if (playerN.score + 11 <= 21) {
            playerN.score += 11;
        } else {
            playerN.score += 1;
        }
    } else {
        playerN.score += score;        
    }    

    if (playerN.score <= 21) {
        if (playerN.name === 'player') {
            document.querySelector('#your-blackjack-result').innerHTML = playerN.score;
        } else {
            document.querySelector('#dealer-blackjack-result').innerHTML = playerN.score;
        }
    } else{
        if (playerN.name === 'player') {
            document.querySelector('#your-blackjack-result').innerHTML = 'BUST!';
            document.querySelector('#your-blackjack-result').style.color = 'red';
        } else {
            document.querySelector('#dealer-blackjack-result').innerHTML = 'BUST!';
            document.querySelector('#dealer-blackjack-result').style.color = 'red';
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function decideWinner(){
    let playerScore = humanPlayer.score;
    let botScore = bot.score;
    let winner;
    //your score is greater than bot score and less than 21: You won
    //your score is less than 21 and less than bot score: You lost
    //your score is less than 21 and bot score is greater than 21: You won
    //your score is less than 21 and equal to bot score: you drew
    //Your score is greater than 21 and bot score is greater than 21: you drew
    //Your score is greater than 21 and bot choice is less than 21: you lost
    if (playerScore <= 21) {
        if (playerScore > botScore) {
            winner = 'player';
        } else if (playerScore === botScore) {
            winner = 'draw';
        } else if (botScore > 21){
            winner = 'player';
        } else {
            winner = 'bot';
        }
    } else {
        if (botScore <= 21) {
            winner = 'bot';
        } else {
            winner = 'draw';
        }
    }
    return winner;
}

function updateWinner(winr){
    if (winr === 'player') {
        //Play cash sound
        cashSound.play();

        humanPlayer.wins++;
        document.querySelector('h3 span').innerHTML = "You won!";
        document.querySelector('h3 span').style.color = 'green';
        document.querySelector('#wins').innerHTML = humanPlayer.wins;
    } else if (winr === 'bot') {
        //Play aww sound
        awwSound.play();
        humanPlayer.losses++;
        document.querySelector('h3 span').innerHTML = "You lost!";
        document.querySelector('h3 span').style.color = 'red';
        document.querySelector('#losses').innerHTML = humanPlayer.losses;
    } else {
        humanPlayer.draws++;
        document.querySelector('h3 span').innerHTML = "You drew!";
        document.querySelector('h3 span').style.color = 'black';
        document.querySelector('#draws').innerHTML = humanPlayer.draws;
    }
}

function deal(){
    //reShuffle deck
    deck.reShuffle();

    //clear images
    let images1 = document.querySelector('#your-box').querySelectorAll('img');
    let images2 = document.querySelector('#dealer-box').querySelectorAll('img');
    console.log(images1);
    console.log(images1);
    for (let index = 0; index < images1.length; index++) {
        images1[index].remove();        
    }

    for (let index = 0; index < images2.length; index++) {
        images2[index].remove();        
    }

    //reset score
    resetScore();

    //reset win status
    document.querySelector('h3 span').innerHTML = "Let's play!";
    document.querySelector('h3 span').style.color = 'black';

    deck.hit = true;
    deck.stand = false;
    deck.deal = false;
}

function resetScore(){
    humanPlayer.score = 0;
    bot.score = 0;
    document.querySelector('#your-blackjack-result').innerHTML = humanPlayer.score;
    document.querySelector('#your-blackjack-result').style.color = 'white';
    document.querySelector('#dealer-blackjack-result').innerHTML = bot.score;
    document.querySelector('#dealer-blackjack-result').style.color = 'white';    
}