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

// Custom Workout State
let customWorkout = [];

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
// 9. VIEW MANAGEMENT
// ========================================

function showView(viewId) {
    // Sembunyikan semua view
    const allViews = [selectionView, builderView, timerView];
    allViews.forEach(view => {
        if (view) {
            view.style.display = 'none';
        }
    });
    
    // Tampilkan view yang dipilih
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.style.display = 'flex';
        console.log('Showing view:', viewId);
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
        
        presetCard.innerHTML = `
            <div class="preset-title">${preset.name}</div>
            <div class="preset-description">${preset.description}</div>
        `;
        
        // Event listener untuk klik preset
        presetCard.addEventListener('click', function() {
            selectPresetWorkout(preset);
        });
        
        presetListEl.appendChild(presetCard);
    });
    
    console.log('Preset list populated with', presetWorkouts.length, 'items');
}

function selectPresetWorkout(preset) {
    console.log('Selected preset:', preset.name);
    
    // Set current workout ke preset yang dipilih
    currentWorkout = [...preset.intervals];
    currentIntervalIndex = 0;
    
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

function updateCustomWorkoutList() {
    if (!customWorkoutListEl) return;
    
    // Bersihkan list
    customWorkoutListEl.innerHTML = '';
    
    // Jika kosong, tampilkan pesan
    if (customWorkout.length === 0) {
        customWorkoutListEl.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 20px;">Belum ada interval. Tambahkan interval untuk memulai.</p>';
        
        // Disable tombol start
        if (startCustomBtn) {
            startCustomBtn.disabled = true;
        }
        return;
    }
    
    // Enable tombol start jika ada interval
    if (startCustomBtn) {
        startCustomBtn.disabled = false;
    }
    
    // Render setiap interval
    customWorkout.forEach((interval, index) => {
        const item = document.createElement('div');
        item.className = 'workout-item';
        item.dataset.index = index;
        
        item.innerHTML = `
            <div class="workout-item-info">
                <div class="workout-item-name">${interval.name}</div>
                <div class="workout-item-duration">${formatTime(interval.duration)}</div>
            </div>
            <button class="btn-delete" data-index="${index}">🗑️ Hapus</button>
        `;
        
        customWorkoutListEl.appendChild(item);
    });
    
    console.log('Custom workout list updated:', customWorkout.length, 'intervals');
}

function addIntervalToCustomWorkout(name, minutes, seconds) {
    // Validasi input
    if (!name || name.trim() === '') {
        alert('Nama interval tidak boleh kosong!');
        return false;
    }
    
    const totalSeconds = (parseInt(minutes) * 60) + parseInt(seconds);
    
    if (totalSeconds <= 0) {
        alert('Durasi interval harus lebih dari 0 detik!');
        return false;
    }
    
    // Tentukan type berdasarkan nama (simple keyword matching)
    let type = 'default';
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('lari') || nameLower.includes('sprint') || nameLower.includes('cepat')) {
        type = 'run';
    } else if (nameLower.includes('jalan') || nameLower.includes('pulih') || nameLower.includes('istirahat') || nameLower.includes('recover')) {
        type = 'recover';
    } else if (nameLower.includes('panas') || nameLower.includes('warmup')) {
        type = 'warmup';
    }
    
    // Tambahkan ke customWorkout
    const newInterval = {
        name: name,
        duration: totalSeconds,
        type: type
    };
    
    customWorkout.push(newInterval);
    
    console.log('Added interval:', newInterval);
    return true;
}

function deleteIntervalFromCustomWorkout(index) {
    if (index >= 0 && index < customWorkout.length) {
        const deleted = customWorkout.splice(index, 1);
        console.log('Deleted interval:', deleted[0]);
        updateCustomWorkoutList();
    }
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
    
    // Event delegation untuk tombol hapus
    if (customWorkoutListEl) {
        customWorkoutListEl.addEventListener('click', function(e) {
            // Cek apakah yang diklik adalah tombol delete
            if (e.target.classList.contains('btn-delete') || e.target.closest('.btn-delete')) {
                const btn = e.target.classList.contains('btn-delete') ? e.target : e.target.closest('.btn-delete');
                const index = parseInt(btn.dataset.index);
                
                if (confirm('Hapus interval ini?')) {
                    deleteIntervalFromCustomWorkout(index);
                }
            }
        });
    }
    
    // Event listener untuk tombol "Mulai Latihan"
    if (startCustomBtn) {
        startCustomBtn.addEventListener('click', function() {
            if (customWorkout.length === 0) {
                alert('Tambahkan minimal 1 interval untuk memulai!');
                return;
            }
            
            // Set current workout dari custom workout
            currentWorkout = [...customWorkout];
            currentIntervalIndex = 0;
            
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
    
    console.log('✅ Core Timer Engine initialized');
    console.log('✅ View Management initialized');
    console.log('✅ Preset workouts available:', presetWorkouts.length);
    console.log('🚀 IntervalRun ready to use!');
});
