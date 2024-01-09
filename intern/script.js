let startTime;
let running = false;
let lapTimes = [];
let totalElapsedTime = 0;

function startStopwatch() {
    if (!running) {
        startTime = Date.now();
        if (lapTimes.length === 0) {
            totalElapsedTime = 0; // Reset totalElapsedTime only if lapTimes is empty (first start)
        }
        running = true;
        updateStopwatch();
    }
}

function stopStopwatch() {
    if (running) {
        running = false;
        totalElapsedTime += Date.now() - startTime;
        lapTimes.push(Date.now() - startTime);
    }
}

function lapStopwatch() {
    if (running) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        updateLapList();
    }
}

function resetStopwatch() {
    running = false;
    startTime = undefined;
    totalElapsedTime = 0;
    lapTimes = [];
    document.getElementById('stopwatch').innerText = '00:00:00';
    updateLapList();
}

function updateStopwatch() {
    if (running) {
        const elapsedTime = totalElapsedTime + (Date.now() - startTime);
        const formattedTime = formatTime(elapsedTime);
        document.getElementById('stopwatch').innerText = formattedTime;
        setTimeout(updateStopwatch, 10);
    }
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    const pad = (num) => (num < 10 ? '0' : '') + num;

    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

function updateLapList() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';

    lapTimes.forEach((lap, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${index + 1}: ${formatTime(lap)} (${formatTime(calculateLapTime(index))})`;
        lapList.appendChild(listItem);
    });
}

function calculateLapTime(index) {
    if (index === 0) {
        return lapTimes[0];
    } else {
        const lapTime = lapTimes[index] - lapTimes[index - 1];
        return lapTime >= 0 ? lapTime : 0;
    }
}
