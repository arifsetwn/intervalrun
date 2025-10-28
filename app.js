// IntervalRun - App JavaScript
// Aplikasi Timer Interval Treadmill

// ========================================
// 1. INISIALISASI DOM ELEMENTS
// ========================================

// Timer View Elements
let timerView;
let currentIntervalNameEl;
let currentTimerEl;
let nextIntervalInfoEl;
let startPauseBtn;
let resetBtn;
let endWorkoutBtn;

// ========================================
// 2. STATE GLOBAL APLIKASI
// ========================================

let currentWorkout = [];
let currentIntervalIndex = 0;
let timeLeftInInterval = 0;
let timerId = null;
let isPaused = true;

// ========================================
// 3. DATA PRESET LATIHAN
// ========================================

const presetWorkouts = [
    {
        id: 'hiit-beginner',
        name: 'HIIT Pemula',
        description: '5 menit pemanasan, 5 interval lari-jalan',
        intervals: [
            { name: 'Pemanasan', duration: 300, type: 'warmup' }, // 5 menit
            { name: 'Lari Cepat', duration: 60, type: 'run' },    // 1 menit
            { name: 'Jalan Kaki', duration: 120, type: 'recover' }, // 2 menit
            { name: 'Lari Cepat', duration: 60, type: 'run' },
            { name: 'Jalan Kaki', duration: 120, type: 'recover' },
            { name: 'Lari Cepat', duration: 60, type: 'run' },
            { name: 'Jalan Kaki', duration: 120, type: 'recover' },
            { name: 'Lari Cepat', duration: 60, type: 'run' },
            { name: 'Jalan Kaki', duration: 120, type: 'recover' },
            { name: 'Lari Cepat', duration: 60, type: 'run' },
            { name: 'Pendinginan', duration: 180, type: 'recover' } // 3 menit
        ]
    },
    {
        id: 'tabata',
        name: 'Tabata 4 Menit',
        description: '8 round sprint 20 detik, istirahat 10 detik',
        intervals: [
            { name: 'Sprint', duration: 20, type: 'run' },
            { name: 'Istirahat', duration: 10, type: 'recover' },
            { name: 'Sprint', duration: 20, type: 'run' },
            { name: 'Istirahat', duration: 10, type: 'recover' },
            { name: 'Sprint', duration: 20, type: 'run' },
            { name: 'Istirahat', duration: 10, type: 'recover' },
            { name: 'Sprint', duration: 20, type: 'run' },
            { name: 'Istirahat', duration: 10, type: 'recover' },
            { name: 'Sprint', duration: 20, type: 'run' },
            { name: 'Istirahat', duration: 10, type: 'recover' },
            { name: 'Sprint', duration: 20, type: 'run' },
            { name: 'Istirahat', duration: 10, type: 'recover' },
            { name: 'Sprint', duration: 20, type: 'run' },
            { name: 'Istirahat', duration: 10, type: 'recover' },
            { name: 'Sprint', duration: 20, type: 'run' },
            { name: 'Istirahat', duration: 10, type: 'recover' }
        ]
    },
    {
        id: 'piramida',
        name: 'Piramida',
        description: 'Interval meningkat kemudian menurun',
        intervals: [
            { name: 'Pemanasan', duration: 180, type: 'warmup' },
            { name: 'Lari 1 Menit', duration: 60, type: 'run' },
            { name: 'Pemulihan', duration: 60, type: 'recover' },
            { name: 'Lari 2 Menit', duration: 120, type: 'run' },
            { name: 'Pemulihan', duration: 90, type: 'recover' },
            { name: 'Lari 3 Menit', duration: 180, type: 'run' },
            { name: 'Pemulihan', duration: 120, type: 'recover' },
            { name: 'Lari 2 Menit', duration: 120, type: 'run' },
            { name: 'Pemulihan', duration: 90, type: 'recover' },
            { name: 'Lari 1 Menit', duration: 60, type: 'run' },
            { name: 'Pendinginan', duration: 180, type: 'recover' }
        ]
    }
];

// ========================================
// 4. AUDIO SYSTEM
// ========================================

let beepCountdown;
let beepTransition;
let lastBeepSecond = -1; // Track detik terakhir beep untuk mencegah duplikasi

function loadAudio() {
    try {
        // Coba load audio files
        beepCountdown = new Audio('assets/beep-countdown.mp3');
        beepTransition = new Audio('assets/beep-transition.mp3');
        
        // Set volume
        beepCountdown.volume = 0.7;
        beepTransition.volume = 0.8;
        
        console.log('Audio files loaded successfully');
    } catch (error) {
        console.warn('Audio files not found, using Web Audio API fallback');
        // Fallback: generate beep menggunakan Web Audio API jika file tidak ada
        beepCountdown = null;
        beepTransition = null;
    }
}

function playBeep() {
    if (beepCountdown) {
        beepCountdown.currentTime = 0;
        beepCountdown.play().catch(e => console.log('Beep play error:', e));
    } else {
        // Fallback: Web Audio API beep
        playWebAudioBeep(800, 0.1);
    }
}

function playTransition() {
    if (beepTransition) {
        beepTransition.currentTime = 0;
        beepTransition.play().catch(e => console.log('Transition play error:', e));
    } else {
        // Fallback: Web Audio API double beep
        playWebAudioBeep(600, 0.15);
        setTimeout(() => playWebAudioBeep(800, 0.15), 150);
    }
}

// Fallback Web Audio API untuk generate beep
function playWebAudioBeep(frequency, duration) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// ========================================
// 5. FUNGSI UTILITY (UI Updates)
// ========================================

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    if (currentTimerEl) {
        currentTimerEl.textContent = formatTime(timeLeftInInterval);
    }
}

function updateIntervalInfo() {
    // Update nama interval saat ini
    if (currentIntervalNameEl && currentWorkout[currentIntervalIndex]) {
        currentIntervalNameEl.textContent = currentWorkout[currentIntervalIndex].name.toUpperCase();
    }
    
    // Update info interval berikutnya
    if (nextIntervalInfoEl) {
        const nextIndex = currentIntervalIndex + 1;
        if (nextIndex < currentWorkout.length) {
            const nextInterval = currentWorkout[nextIndex];
            nextIntervalInfoEl.textContent = `Berikutnya: ${nextInterval.name} (${formatTime(nextInterval.duration)})`;
        } else {
            nextIntervalInfoEl.textContent = 'Berikutnya: Selesai! 🎉';
        }
    }
}

function applyIntervalColor(interval) {
    if (!timerView || !interval) return;
    
    // Hapus semua class background
    timerView.classList.remove('bg-run', 'bg-recover', 'bg-warmup', 'bg-default');
    
    // Terapkan class berdasarkan type interval
    switch(interval.type) {
        case 'run':
            timerView.classList.add('bg-run');
            break;
        case 'recover':
            timerView.classList.add('bg-recover');
            break;
        case 'warmup':
            timerView.classList.add('bg-warmup');
            break;
        default:
            timerView.classList.add('bg-default');
    }
}

// ========================================
// 6. CORE TIMER ENGINE - FUNGSI TICK
// ========================================

function tick() {
    // Kurangi waktu
    timeLeftInInterval--;
    
    // Update display
    updateTimerDisplay();
    
    // Cek untuk beep countdown (3, 2, 1)
    if (timeLeftInInterval <= 3 && timeLeftInInterval > 0) {
        // Hanya beep sekali per detik
        if (timeLeftInInterval !== lastBeepSecond) {
            playBeep();
            lastBeepSecond = timeLeftInInterval;
            
            // Tambah efek pulse pada timer
            if (currentTimerEl) {
                currentTimerEl.classList.add('pulse');
                setTimeout(() => currentTimerEl.classList.remove('pulse'), 1000);
            }
        }
    }
    
    // Cek akhir interval
    if (timeLeftInInterval < 0) {
        // Play transition beep
        playTransition();
        lastBeepSecond = -1; // Reset beep tracker
        
        // Pindah ke interval berikutnya
        currentIntervalIndex++;
        
        // Cek apakah latihan sudah selesai
        if (currentIntervalIndex >= currentWorkout.length) {
            // Latihan selesai!
            workoutComplete();
            return;
        }
        
        // Load interval berikutnya
        loadInterval(currentIntervalIndex);
    }
}

// ========================================
// 7. FUNGSI LOAD INTERVAL
// ========================================

function loadInterval(index) {
    if (index >= currentWorkout.length || index < 0) {
        console.error('Invalid interval index:', index);
        return;
    }
    
    const interval = currentWorkout[index];
    
    // Set waktu interval
    timeLeftInInterval = interval.duration;
    
    // Update UI
    updateIntervalInfo();
    updateTimerDisplay();
    
    // Apply warna background
    applyIntervalColor(interval);
    
    console.log(`Loaded interval ${index + 1}/${currentWorkout.length}: ${interval.name}`);
}

// ========================================
// 8. FUNGSI KONTROL TIMER
// ========================================

function startTimer() {
    if (currentWorkout.length === 0) {
        alert('Tidak ada latihan yang dipilih!');
        return;
    }
    
    isPaused = false;
    
    // Mulai interval timer
    timerId = setInterval(tick, 1000);
    
    // Update tombol UI
    if (startPauseBtn) {
        startPauseBtn.textContent = '⏸️ Jeda';
        startPauseBtn.classList.remove('btn-start');
        startPauseBtn.classList.add('btn-pause');
    }
    
    console.log('Timer started');
}

function pauseTimer() {
    isPaused = true;
    
    // Stop interval timer
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    
    // Update tombol UI
    if (startPauseBtn) {
        startPauseBtn.textContent = '▶️ Lanjutkan';
        startPauseBtn.classList.remove('btn-pause');
        startPauseBtn.classList.add('btn-start');
    }
    
    console.log('Timer paused');
}

function resetTimer() {
    // Pause timer dulu
    pauseTimer();
    
    // Reset ke interval pertama
    currentIntervalIndex = 0;
    lastBeepSecond = -1;
    
    // Load interval pertama
    if (currentWorkout.length > 0) {
        loadInterval(0);
    }
    
    // Update tombol UI
    if (startPauseBtn) {
        startPauseBtn.textContent = '▶️ Mulai';
        startPauseBtn.classList.remove('btn-pause');
        startPauseBtn.classList.add('btn-start');
    }
    
    console.log('Timer reset');
}

function workoutComplete() {
    // Stop timer
    pauseTimer();
    
    // Update UI dengan pesan selesai
    if (currentIntervalNameEl) {
        currentIntervalNameEl.textContent = 'LATIHAN SELESAI! 🎉';
    }
    if (currentTimerEl) {
        currentTimerEl.textContent = '00:00';
    }
    if (nextIntervalInfoEl) {
        nextIntervalInfoEl.textContent = 'Kerja bagus! Anda sudah menyelesaikan latihan.';
    }
    
    // Ubah background ke success color
    if (timerView) {
        timerView.classList.remove('bg-run', 'bg-recover', 'bg-warmup', 'bg-default');
        timerView.classList.add('bg-recover'); // Hijau untuk success
    }
    
    // Update tombol
    if (startPauseBtn) {
        startPauseBtn.textContent = '✓ Selesai';
        startPauseBtn.disabled = true;
    }
    
    console.log('Workout completed!');
}

// ========================================
// 9. EVENT LISTENERS
// ========================================

function setupEventListeners() {
    // Start/Pause Button
    if (startPauseBtn) {
        startPauseBtn.addEventListener('click', function() {
            if (isPaused) {
                startTimer();
            } else {
                pauseTimer();
            }
        });
    }
    
    // Reset Button
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetTimer();
        });
    }
    
    console.log('Event listeners attached');
}

// ========================================
// 10. INISIALISASI APLIKASI
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('IntervalRun v1.0 - DOM Ready');
    
    // Inisialisasi DOM elements
    timerView = document.getElementById('timer-view');
    currentIntervalNameEl = document.getElementById('current-interval-name');
    currentTimerEl = document.getElementById('current-timer');
    nextIntervalInfoEl = document.getElementById('next-interval-info');
    startPauseBtn = document.getElementById('start-pause-btn');
    resetBtn = document.getElementById('reset-btn');
    endWorkoutBtn = document.getElementById('end-workout-btn');
    
    // Load audio files
    loadAudio();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('Core Timer Engine initialized');
    console.log('Preset workouts available:', presetWorkouts.length);
});
