let startTime;
let running = false;
let lapTimes = [];
let totalElapsedTime = 0;

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - totalElapsedTime;
        running = true;
        updateStopwatch();
    }
}

function stopStopwatch() {
    if (running) {
        running = false;
        totalElapsedTime = Date.now() - startTime;
        updateLapList();
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
        const elapsedTime = Date.now() - startTime;
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
        listItem.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapList.appendChild(listItem);
    });
}
