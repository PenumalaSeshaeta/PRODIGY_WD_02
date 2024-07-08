let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let lapCount = 0;
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function formatTime(time) {
    const hours = Math.floor(time / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = (time % 1000).toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function start() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timer);
        running = false;
    }
}

function stop() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    lapCount = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
}

function lap() {
    if (running) {
        lapCount++;
        const lapTime = document.createElement('div');
        lapTime.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
        lapsContainer.appendChild(lapTime);
    }
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
stopButton.addEventListener('click', stop);
lapButton.addEventListener('click', lap);

updateDisplay();
