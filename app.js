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

// Progress Bar Elements
let progressBar;
let progressTimeEl;
let progressIntervalEl;

// Selection View Elements
let selectionView;
let presetListEl;
let showBuilderBtn;

// Builder View Elements
let builderView;
let builderForm;
let intervalNameInput;
let intervalMinutesInput;
let intervalSecondsInput;
let customWorkoutListEl;
let startCustomBtn;
let backToSelectionBtn;

// ========================================
// 2. STATE GLOBAL APLIKASI
// ========================================

let currentWorkout = [];
let currentIntervalIndex = 0;
let timeLeftInInterval = 0;
let timerId = null;
let isPaused = true;

// Progress tracking
let totalWorkoutDuration = 0;
let elapsedTime = 0;

// Wake Lock untuk mencegah layar mati
let wakeLock = null;

// Custom Workout State
let customWorkout = [];

// ========================================
// 3. DATA PRESET LATIHAN
// ========================================

const presetWorkouts = [
    {
        id: 'hiit-beginner',
        name: 'HIIT Pemula',
        description: '5 menit pemanasan, 8 interval lari-jalan',
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
            { name: 'Pemanasan', duration: 300, type: 'warmup' }, // 5 menit
            { name: 'Lari 1 Menit', duration: 60, type: 'run' },
            { name: 'Pemulihan', duration: 60, type: 'recover' },
            { name: 'Lari 2 Menit', duration: 120, type: 'run' },
            { name: 'Pemulihan', duration: 60, type: 'recover' },
            { name: 'Lari 3 Menit', duration: 180, type: 'run' },
            { name: 'Pemulihan', duration: 90, type: 'recover' },
            { name: 'Lari 4 Menit', duration: 240, type: 'run' }, // Puncak piramida
            { name: 'Pemulihan', duration: 90, type: 'recover' },
            { name: 'Lari 3 Menit', duration: 180, type: 'run' },
            { name: 'Pemulihan', duration: 60, type: 'recover' },
            { name: 'Lari 2 Menit', duration: 120, type: 'run' },
            { name: 'Pemulihan', duration: 60, type: 'recover' },
            { name: 'Lari 1 Menit', duration: 60, type: 'run' },
            { name: 'Pendinginan', duration: 180, type: 'recover' } // 3 menit
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
        beepCountdown = new Audio('assets/beep-countdown.wav');
        beepTransition = new Audio('assets/beep-transition.wav');
        
        // Set volume
        beepCountdown.volume = 0.7;
        beepTransition.volume = 0.8;
    } catch (error) {
        // Fallback: generate beep menggunakan Web Audio API jika file tidak ada
        beepCountdown = null;
        beepTransition = null;
    }
}

function playBeep() {
    if (beepCountdown) {
        beepCountdown.currentTime = 0;
        beepCountdown.play().catch(e => {});
    } else {
        // Fallback: Web Audio API beep
        playWebAudioBeep(800, 0.1);
    }
}

function playTransition() {
    if (beepTransition) {
        beepTransition.currentTime = 0;
        beepTransition.play().catch(e => {});
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
        // Web Audio API not supported
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

// Fungsi untuk menghitung total durasi workout
function calculateTotalDuration(intervals) {
    return intervals.reduce((total, interval) => total + interval.duration, 0);
}

// Fungsi untuk format durasi dalam menit
function formatDurationMinutes(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (seconds === 0) {
        return `${minutes} menit`;
    }
    return `${minutes} menit ${seconds} detik`;
}

function updateTimerDisplay() {
    if (currentTimerEl) {
        currentTimerEl.textContent = formatTime(timeLeftInInterval);
    }
}

// Fungsi untuk menghitung elapsed time berdasarkan posisi saat ini
function calculateElapsedTime() {
    let elapsed = 0;
    
    // Tambahkan durasi semua interval sebelum interval saat ini
    for (let i = 0; i < currentIntervalIndex; i++) {
        elapsed += currentWorkout[i].duration;
    }
    
    // Tambahkan waktu yang sudah berlalu di interval saat ini
    if (currentWorkout[currentIntervalIndex]) {
        const currentIntervalDuration = currentWorkout[currentIntervalIndex].duration;
        elapsed += (currentIntervalDuration - timeLeftInInterval);
    }
    
    return elapsed;
}

// Fungsi untuk update progress bar
function updateProgressBar() {
    if (!progressBar || !progressTimeEl || !progressIntervalEl) return;
    
    // Hitung elapsed time
    elapsedTime = calculateElapsedTime();
    
    // Hitung persentase progress
    const progressPercent = totalWorkoutDuration > 0 
        ? (elapsedTime / totalWorkoutDuration) * 100 
        : 0;
    
    // Update progress bar width
    progressBar.style.width = `${Math.min(progressPercent, 100)}%`;
    
    // Update progress time text
    progressTimeEl.textContent = `${formatTime(Math.floor(elapsedTime))} / ${formatTime(totalWorkoutDuration)}`;
    
    // Update interval indicator
    progressIntervalEl.textContent = `Interval ${currentIntervalIndex + 1}/${currentWorkout.length}`;
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
    updateProgressBar();
    
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
        return;
    }
    
    const interval = currentWorkout[index];
    
    // Set waktu interval
    timeLeftInInterval = interval.duration;
    
    // Update UI
    updateIntervalInfo();
    updateTimerDisplay();
    updateProgressBar();
    
    // Apply warna background
    applyIntervalColor(interval);
}

// ========================================
// 8. FUNGSI KONTROL TIMER
// ========================================

// Fungsi untuk meminta Wake Lock (mencegah layar mati)
async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock aktif - layar akan tetap menyala');
            
            // Event listener jika wake lock dilepas oleh sistem
            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock dilepas');
            });
        } else {
            console.log('Wake Lock API tidak didukung browser ini');
        }
    } catch (err) {
        console.log('Gagal mengaktifkan Wake Lock:', err.message);
    }
}

// Fungsi untuk melepaskan Wake Lock
async function releaseWakeLock() {
    if (wakeLock !== null) {
        try {
            await wakeLock.release();
            wakeLock = null;
            console.log('Wake Lock dinonaktifkan');
        } catch (err) {
            console.log('Gagal melepas Wake Lock:', err.message);
        }
    }
}

function startTimer() {
    if (currentWorkout.length === 0) {
        alert('Tidak ada latihan yang dipilih!');
        return;
    }
    
    isPaused = false;
    
    // Aktifkan Wake Lock agar layar tetap menyala
    requestWakeLock();
    
    // Mulai interval timer
    timerId = setInterval(tick, 1000);
    
    // Update tombol UI
    if (startPauseBtn) {
        startPauseBtn.textContent = '⏸️ Jeda';
        startPauseBtn.classList.remove('btn-start');
        startPauseBtn.classList.add('btn-pause');
    }
}

function pauseTimer() {
    isPaused = true;
    
    // Stop interval timer
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    
    // Lepaskan Wake Lock saat pause
    releaseWakeLock();
    
    // Update tombol UI
    if (startPauseBtn) {
        startPauseBtn.textContent = '▶️ Lanjutkan';
        startPauseBtn.classList.remove('btn-pause');
        startPauseBtn.classList.add('btn-start');
    }
}

function resetTimer() {
    // Pause timer dulu
    pauseTimer();
    
    // Reset ke interval pertama
    currentIntervalIndex = 0;
    lastBeepSecond = -1;
    elapsedTime = 0;
    
    // Load interval pertama
    if (currentWorkout.length > 0) {
        loadInterval(0);
    }
    
    // Update progress bar
    updateProgressBar();
    
    // Update tombol UI
    if (startPauseBtn) {
        startPauseBtn.textContent = '▶️ Mulai';
        startPauseBtn.classList.remove('btn-pause');
        startPauseBtn.classList.add('btn-start');
    }
}

function workoutComplete() {
    // Stop timer
    pauseTimer();
    
    // Lepaskan Wake Lock saat selesai
    releaseWakeLock();
    
    // Update UI untuk menampilkan pesan selesai
    if (currentIntervalNameEl) {
        currentIntervalNameEl.textContent = '🎉 SELESAI! 🎉';
    }
    
    if (currentTimerEl) {
        currentTimerEl.textContent = '00:00';
    }
    
    if (nextIntervalInfoEl) {
        nextIntervalInfoEl.textContent = 'Latihan telah selesai! Bagus sekali! 💪';
    }
    
    // Reset button state
    if (startPauseBtn) {
        startPauseBtn.textContent = '▶️ Mulai';
        startPauseBtn.classList.remove('btn-pause');
        startPauseBtn.classList.add('btn-start');
    }
    
    // Optional: Tampilkan alert atau notifikasi
    setTimeout(() => {
        alert('🎉 Latihan Selesai!\n\nBagus sekali! Anda telah menyelesaikan latihan.');
    }, 500);
}

// ========================================
// 9. VIEW MANAGEMENT
// ========================================

function showView(viewId) {
    // Sembunyikan semua view dengan remove class
    const allViews = [selectionView, builderView, timerView];
    allViews.forEach(view => {
        if (view) {
            view.classList.remove('active-view');
        }
    });
    
    // Tampilkan view yang dipilih dengan add class
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active-view');
    }
}

// ========================================
// 10. SELECTION VIEW - PRESET LOGIC
// ========================================

function populatePresetList() {
    if (!presetListEl) return;
    
    // Bersihkan list dulu
    presetListEl.innerHTML = '';
    
    // Tambahkan setiap preset sebagai card
    presetWorkouts.forEach(preset => {
        const presetCard = document.createElement('div');
        presetCard.className = 'preset-item';
        presetCard.dataset.presetId = preset.id;
        
        // Hitung total durasi
        const totalDuration = calculateTotalDuration(preset.intervals);
        const durationText = formatDurationMinutes(totalDuration);
        
        presetCard.innerHTML = `
            <div class="preset-title">${preset.name}</div>
            <div class="preset-description">${preset.description}</div>
            <div class="preset-duration">⏱️ Total: ${durationText}</div>
        `;
        
        // Event listener untuk klik preset
        presetCard.addEventListener('click', function() {
            selectPresetWorkout(preset);
        });
        
        presetListEl.appendChild(presetCard);
    });
}

function selectPresetWorkout(preset) {
    // Set current workout ke preset yang dipilih
    currentWorkout = [...preset.intervals];
    currentIntervalIndex = 0;
    
    // Hitung total durasi workout
    totalWorkoutDuration = calculateTotalDuration(currentWorkout);
    elapsedTime = 0;
    
    // Load interval pertama
    loadInterval(0);
    
    // Reset button state
    if (startPauseBtn) {
        startPauseBtn.textContent = '▶️ Mulai';
        startPauseBtn.disabled = false;
        startPauseBtn.classList.remove('btn-pause');
        startPauseBtn.classList.add('btn-start');
    }
    
    console.log('   Calling showView(timer-view)...');
    // Pindah ke timer view
    showView('timer-view');
}

function setupSelectionView() {
    // Populate preset list
    populatePresetList();
    
    // Event listener untuk tombol "Buat Latihan Baru"
    if (showBuilderBtn) {
        showBuilderBtn.addEventListener('click', function() {
            showView('builder-view');
        });
    }
    
    // Event listener untuk tombol "Akhiri Latihan" di timer view
    if (endWorkoutBtn) {
        endWorkoutBtn.addEventListener('click', function() {
            pauseTimer();
            resetTimer();
            showView('selection-view');
        });
    }
}

// ========================================
// 11. BUILDER VIEW - CUSTOM WORKOUT LOGIC
// ========================================

function addIntervalToCustomWorkout(name, minutes, seconds) {
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    
    // Validasi
    if (!name || name.trim() === '') {
        alert('Nama interval tidak boleh kosong!');
        return false;
    }
    
    if (totalSeconds <= 0) {
        alert('Durasi harus lebih dari 0 detik!');
        return false;
    }
    
    // Tambahkan ke customWorkout array
    customWorkout.push({
        name: name,
        duration: totalSeconds,
        type: 'custom' // Default type untuk custom intervals
    });
    
    return true;
}

function updateCustomWorkoutList() {
    if (!customWorkoutListEl) return;
    
    // Bersihkan list
    customWorkoutListEl.innerHTML = '';
    
    if (customWorkout.length === 0) {
        customWorkoutListEl.innerHTML = '<p class="empty-message">Belum ada interval. Tambahkan interval pertama Anda!</p>';
        
        // Disable tombol start jika tidak ada interval
        if (startCustomBtn) {
            startCustomBtn.disabled = true;
        }
        return;
    }
    
    // Enable tombol start karena ada interval
    if (startCustomBtn) {
        startCustomBtn.disabled = false;
    }
    
    // Tampilkan setiap interval
    customWorkout.forEach((interval, index) => {
        const intervalItem = document.createElement('div');
        intervalItem.className = 'custom-interval-item';
        
        intervalItem.innerHTML = `
            <span class="interval-number">${index + 1}.</span>
            <span class="interval-name">${interval.name}</span>
            <span class="interval-duration">${formatTime(interval.duration)}</span>
            <button class="btn-remove" data-index="${index}">🗑️</button>
        `;
        
        // Event listener untuk tombol hapus
        const removeBtn = intervalItem.querySelector('.btn-remove');
        removeBtn.addEventListener('click', function() {
            removeIntervalFromCustomWorkout(index);
        });
        
        customWorkoutListEl.appendChild(intervalItem);
    });
    
    // Tambahkan info total durasi
    const totalDuration = customWorkout.reduce((sum, interval) => sum + interval.duration, 0);
    const totalInfo = document.createElement('div');
    totalInfo.className = 'total-duration';
    totalInfo.innerHTML = `<strong>Total Durasi:</strong> ${formatTime(totalDuration)}`;
    customWorkoutListEl.appendChild(totalInfo);
}

function removeIntervalFromCustomWorkout(index) {
    customWorkout.splice(index, 1);
    updateCustomWorkoutList();
}

function setupBuilderView() {
    // Event listener untuk form submission
    if (builderForm) {
        builderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Baca nilai dari input
            const name = intervalNameInput.value;
            const minutes = intervalMinutesInput.value || 0;
            const seconds = intervalSecondsInput.value || 0;
            
            // Tambah interval
            if (addIntervalToCustomWorkout(name, minutes, seconds)) {
                // Update list
                updateCustomWorkoutList();
                
                // Reset form
                builderForm.reset();
                intervalMinutesInput.value = 0;
                intervalSecondsInput.value = 30;
                intervalNameInput.focus();
            }
        });
    }
    
    // Event listener untuk tombol "Mulai Latihan"
    if (startCustomBtn) {
        startCustomBtn.addEventListener('click', function() {
            // Validasi: pastikan ada interval
            if (customWorkout.length === 0) {
                alert('Tambahkan minimal satu interval terlebih dahulu!');
                return;
            }
            
            // Set current workout dari custom workout
            currentWorkout = [...customWorkout];
            currentIntervalIndex = 0;
            
            // Hitung total durasi workout
            totalWorkoutDuration = calculateTotalDuration(currentWorkout);
            elapsedTime = 0;
            
            // Load interval pertama
            loadInterval(0);
            
            // Reset button state
            if (startPauseBtn) {
                startPauseBtn.textContent = '▶️ Mulai';
                startPauseBtn.disabled = false;
                startPauseBtn.classList.remove('btn-pause');
                startPauseBtn.classList.add('btn-start');
            }
            
            // Pindah ke timer view
            showView('timer-view');
            
            console.log('Starting custom workout with', currentWorkout.length, 'intervals');
        });
    }
    
    // Event listener untuk tombol "Kembali"
    if (backToSelectionBtn) {
        backToSelectionBtn.addEventListener('click', function() {
            showView('selection-view');
        });
    }
    
    // Initial render
    updateCustomWorkoutList();
}

// ========================================
// 12. EVENT LISTENERS (Timer Controls)
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
// 13. INISIALISASI APLIKASI
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('IntervalRun v1.0 - DOM Ready');
    
    // Inisialisasi DOM elements - Timer View
    timerView = document.getElementById('timer-view');
    currentIntervalNameEl = document.getElementById('current-interval-name');
    currentTimerEl = document.getElementById('current-timer');
    nextIntervalInfoEl = document.getElementById('next-interval-info');
    startPauseBtn = document.getElementById('start-pause-btn');
    resetBtn = document.getElementById('reset-btn');
    endWorkoutBtn = document.getElementById('end-workout-btn');
    
    // Inisialisasi DOM elements - Progress Bar
    progressBar = document.getElementById('progress-bar');
    progressTimeEl = document.getElementById('progress-time');
    progressIntervalEl = document.getElementById('progress-interval');
    
    // Inisialisasi DOM elements - Selection View
    selectionView = document.getElementById('selection-view');
    presetListEl = document.getElementById('preset-list');
    showBuilderBtn = document.getElementById('show-builder-btn');
    
    // Inisialisasi DOM elements - Builder View
    builderView = document.getElementById('builder-view');
    builderForm = document.getElementById('builder-form');
    intervalNameInput = document.getElementById('interval-name');
    intervalMinutesInput = document.getElementById('interval-minutes');
    intervalSecondsInput = document.getElementById('interval-seconds');
    customWorkoutListEl = document.getElementById('custom-workout-list');
    startCustomBtn = document.getElementById('start-custom-btn');
    backToSelectionBtn = document.getElementById('back-to-selection-btn');
    
    // Load audio files
    loadAudio();
    
    // Setup event listeners (timer controls)
    setupEventListeners();
    
    // Setup selection view
    setupSelectionView();
    
    // Setup builder view
    setupBuilderView();
    
    // Tampilkan selection view sebagai default
    showView('selection-view');
});
