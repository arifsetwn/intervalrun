// IntervalRun - App JavaScript
// Aplikasi Timer Interval Treadmill

// Inisialisasi
console.log('IntervalRun v1.0 - Aplikasi dimuat');

// State global aplikasi (akan dikembangkan lebih lanjut)
let currentWorkout = [];
let currentIntervalIndex = 0;
let timeLeftInInterval = 0;
let timerId = null;
let isPaused = true;

// Fungsi utilitas
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Event listener ketika DOM siap
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM siap. Aplikasi IntervalRun siap digunakan.');
});
