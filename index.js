let playerScore = Number(localStorage.getItem('playerScore')) || 0;
let computerScore = Number(localStorage.getItem('computerScore')) || 0;
updateScoreDisplay();

function getKeyNumericValue(name) {
    let keyVal = 0;
    if (name === 'rock') {
        keyVal = 1;
    } else if (name === 'paper') {
        keyVal = 2;
    } else if (name === 'scissor') {
        keyVal = 3;
    }
    return keyVal;
}

function generateRandomNumber() {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 3) + 1;
    return randomNumber;
}

function determineGameResult(userChoice, compChoice) {
    if (userChoice === compChoice) {
        return 'tie';
    } else if (
        (userChoice === 1 && compChoice === 3) ||
        (userChoice === 2 && compChoice === 1) ||
        (userChoice === 3 && compChoice === 2)
    ) {
        return 'user';
    } else {
        return 'comp';
    }
}

function updateGameScores(result) {
    if (result === 'user') {
        playerScore += 1;
    } else if (result === 'comp') {
        computerScore += 1;
    }

    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);

    updateScoreDisplay();
}

function updateChoiceDisplay(userChoice, compChoice) {
    if (userChoice === 1) {
        document.getElementById('user-rock').style.display = 'flex';
        document.getElementById('user-paper').style.display = 'none';
        document.getElementById('user-scissor').style.display = 'none';
    } else if (userChoice === 2) {
        document.getElementById('user-rock').style.display = 'none';
        document.getElementById('user-paper').style.display = 'flex';
        document.getElementById('user-scissor').style.display = 'none';
    } else if (userChoice === 3) {
        document.getElementById('user-rock').style.display = 'none';
        document.getElementById('user-paper').style.display = 'none';
        document.getElementById('user-scissor').style.display = 'flex';
    }

    if (compChoice === 1) {
        document.getElementById('pc-rock').style.display = 'flex';
        document.getElementById('pc-paper').style.display = 'none';
        document.getElementById('pc-scissor').style.display = 'none';
    } else if (compChoice === 2) {
        document.getElementById('pc-rock').style.display = 'none';
        document.getElementById('pc-paper').style.display = 'flex';
        document.getElementById('pc-scissor').style.display = 'none';
    } else if (compChoice === 3) {
        document.getElementById('pc-rock').style.display = 'none';
        document.getElementById('pc-paper').style.display = 'none';
        document.getElementById('pc-scissor').style.display = 'flex';
    }
}

function updateGameResultZone(result, userChoice, compChoice) {
    document.querySelector('.playing-area').style.display = 'none';
    document.querySelector('.result-area').style.display = 'flex';

    const winText = document.getElementById('win-text');
    const lostText = document.getElementById('lost-text');
    const tieText = document.getElementById('tie-text');
    const subText = document.querySelector('.sub-text');
    const playAgainBtn = document.querySelector('.playBtn');
    const replayBtn = document.querySelector('.replayBtn');
    const userIcon = document.querySelector('.user-sd-icon');
    const pcIcon = document.querySelector('.pc-sd-icon');

    if (result === 'tie') {
        winText.style.display = 'none';
        lostText.style.display = 'none';
        subText.style.display = 'none';
        playAgainBtn.style.display = 'none';
        document.querySelector('.nextBtn').style.display = 'none';

        tieText.style.display = 'block';
        replayBtn.style.display = 'block';

        updateChoiceDisplay(userChoice, compChoice);
       
    } else if (result === 'user') {
        lostText.style.display = 'none';
        tieText.style.display = 'none';
        replayBtn.style.display = 'none';

        winText.style.display = 'block';
        subText.style.display = 'block';
        playAgainBtn.style.display = 'block';
        document.querySelector('.nextBtn').style.display = 'inline';

        updateChoiceDisplay(userChoice, compChoice);

        
    } else if (result === 'comp') {
        winText.style.display = 'none';
        tieText.style.display = 'none';
        replayBtn.style.display = 'none';
        document.querySelector('.nextBtn').style.display = 'none';

        lostText.style.display = 'block';
        subText.style.display = 'block';
        playAgainBtn.style.display = 'block';

        updateChoiceDisplay(userChoice, compChoice);

        
    }
}

function updateScoreDisplay() {
    const updatedScores = { user: playerScore, computer: computerScore };
    document.querySelector('.scoreComp').innerText = updatedScores.computer;
    document.querySelector('.scorePlayer').innerText = updatedScores.user;
}

document.querySelectorAll('.item').forEach((key) => key.addEventListener('click', handleClickEvent));

function handleClickEvent(event) {
    const target = event.target;
    const parentDiv = target.closest('.item');

    if (parentDiv) {
        const keyClicked = parentDiv.id;
        const userChoice = getKeyNumericValue(keyClicked);

        const compChoice = generateRandomNumber();
        const result = determineGameResult(userChoice, compChoice);

        updateGameScores(result);
        updateGameResultZone(result, userChoice, compChoice);
    }
}

function handlePlayAgain() {
    document.querySelector('.playing-area').style.display = 'flex';
    document.querySelector('.result-area').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    document.querySelector('.winner-screen').style.display = 'none';
}

function handleNextPage() {
    document.querySelector('.game-container').style.display = 'none';
    document.querySelector('.congrats').style.display = 'flex';
    document.querySelector('.nextBtn').style.display = 'none';
}

function handleShowRules() {
    document.querySelector('.cross').style.display = 'flex';
    document.querySelector('.rules').style.display = 'flex';
}

function handleRemoveRules() {
    document.querySelector('.cross').style.display = 'none';
    document.querySelector('.rules').style.display = 'none';
}

document.querySelector('.replayBtn').addEventListener('click', handlePlayAgain);
document.querySelector('.playBtn').addEventListener('click', handlePlayAgain);
document.querySelector('.nextBtn').addEventListener('click', handleNextPage);
document.querySelector('.winnerPlayBtn').addEventListener('click', handlePlayAgain);
document.querySelector('.rulesBtn').addEventListener('click', handleShowRules);
document.querySelector('.cross').addEventListener('click', handleRemoveRules);
