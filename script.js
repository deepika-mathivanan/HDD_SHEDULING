document.getElementById('schedulerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const queue = document.getElementById('queue').value.split(',').map(Number);
    const head = parseInt(document.getElementById('head').value);

    const results = document.getElementById('results');
    results.innerHTML = '';

    const fcfsResult = fcfs(queue, head);
    const sstfResult = sstf(queue, head);
    const scanResult = scan(queue, head);
    const cscanResult = cscan(queue, head);

    results.innerHTML += `<div class="result-section"><h3>FCFS</h3><p>${fcfsResult.sequence.join(' -> ')}</p><p>Total Overhead: ${fcfsResult.totalDistance}</p></div>`;
    results.innerHTML += `<div class="result-section"><h3>SSTF</h3><p>${sstfResult.sequence.join(' -> ')}</p><p>Total Overhead: ${sstfResult.totalDistance}</p></div>`;
    results.innerHTML += `<div class="result-section"><h3>SCAN</h3><p>${scanResult.sequence.join(' -> ')}</p><p>Total Overhead: ${scanResult.totalDistance}</p></div>`;
    results.innerHTML += `<div class="result-section"><h3>C-SCAN</h3><p>${cscanResult.sequence.join(' -> ')}</p><p>Total Overhead: ${cscanResult.totalDistance}</p></div>`;
});

function calculateTotalDistance(sequence) {
    let totalDistance = 0;
    for (let i = 1; i < sequence.length; i++) {
        totalDistance += Math.abs(sequence[i] - sequence[i - 1]);
    }
    return totalDistance;
}

function fcfs(queue, head) {
    const sequence = [head, ...queue];
    const totalDistance = calculateTotalDistance(sequence);
    return { sequence, totalDistance };
}

function sstf(queue, head) {
    const sequence = [head];
    let current = head;
    const remaining = [...queue];

    while (remaining.length) {
        let closestIndex = 0;
        for (let i = 1; i < remaining.length; i++) {
            if (Math.abs(remaining[i] - current) < Math.abs(remaining[closestIndex] - current)) {
                closestIndex = i;
            }
        }
        current = remaining[closestIndex];
        sequence.push(current);
        remaining.splice(closestIndex, 1);
    }

    const totalDistance = calculateTotalDistance(sequence);
    return { sequence, totalDistance };
}

function scan(queue, head) {
    const sequence = [head];
    const left = queue.filter(n => n < head).sort((a, b) => b - a);
    const right = queue.filter(n => n >= head).sort((a, b) => a - b);

    const fullSequence = sequence.concat(right, left);
    const totalDistance = calculateTotalDistance(fullSequence);
    return { sequence: fullSequence, totalDistance };
}

function cscan(queue, head) {
    const sequence = [head];
    const left = queue.filter(n => n < head).sort((a, b) => a - b);
    const right = queue.filter(n => n >= head).sort((a, b) => a - b);

    const fullSequence = sequence.concat(right, left);
    const totalDistance = calculateTotalDistance(fullSequence);
    return { sequence: fullSequence, totalDistance };
}
