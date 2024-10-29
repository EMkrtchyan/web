window.onload = function() {
    const buttons = [
        document.getElementById('left-eye'),
        document.getElementById('right-eye'),
        document.getElementById('nose')
    ];
    let score = 0;
    let timeLimit = 5000; // Starting time limit (in milliseconds)
    let currentTimeout;
    const timeBar = document.getElementById('time-bar');
    const scoreDisplay = document.getElementById('score');
    const gameOverScreen = document.getElementById('game-over');
    const restartButton = document.getElementById('restart-button');
    
    const input1 = document.getElementById('input1')
    const input2 = document.getElementById('input2')

    const button1 = document.getElementById('submit-button1')
    const button2 = document.getElementById('submit-button2')

    function fib(n){
        if (n<=1) return n;
        return fib(n-1)+fib(n-2)
    }

    function changeToCircle(button) {
        button.classList.remove('triangle', 'yellow');
        button.classList.add('circle', 'red');
    }

    function changeToTriangle(button) {
        button.classList.remove('circle', 'red');
        button.classList.add('triangle', 'yellow');
    }

    function startTimer() {
        let startTime = Date.now();
        currentTimeout = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = 100 - (elapsedTime / timeLimit) * 100;
            timeBar.style.width = progress + '%';
            if (progress <= 0) {
                clearInterval(currentTimeout);
                gameOver();
            }
        }, 20);
    }

    function stopTimer() {
        clearInterval(currentTimeout);
    }

    function gameOver() {
        buttons.forEach(button => button.classList.add('hidden')); // Hide buttons
        gameOverScreen.style.display = 'block'; // Show Game Over screen
    }

    function restartGame() {
        score = 0;
        timeLimit = 5000;
        scoreDisplay.innerText = score;
        timeBar.style.width = '100%';
        gameOverScreen.style.display = 'none';
        buttons.forEach(button => {
            changeToTriangle(button);
            button.classList.remove('hidden');
        });
        nextButton();
    }

    function nextButton() {
        stopTimer();
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        changeToCircle(randomButton);
        startTimer();

        randomButton.addEventListener('click', () => {
            if (randomButton.classList.contains('red')) {
                changeToTriangle(randomButton);
                score++;
                scoreDisplay.innerText = score;
                timeLimit = Math.max(1000, timeLimit - 200);
                nextButton();
            }
        }, { once: true });
    }
    restartButton.addEventListener('click', restartGame);
    nextButton();
};