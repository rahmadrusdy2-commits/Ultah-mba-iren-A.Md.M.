const openBtn = document.getElementById('open-btn');
const openingScreen = document.getElementById('opening-screen');
const mainScreen = document.getElementById('main-screen');
const bgMusic = document.getElementById('bg-music');
const typingText = document.getElementById('typing-text');
const photo = document.getElementById('photo');

// Ubah isi pesan ini sesuai keinginan Anda
const message = "Selamat ulang tahun, Mba Iren! 🎉 Semoga hari-harimu ke depan selalu dipenuhi dengan kebahagiaan, tawa, dan hal-hal manis. Terus bersinar ya! ✨";
let charIndex = 0;

// Daftar foto yang akan ditampilkan bergantian.
// Pastikan file "foto2.jpg" sudah diperbaiki namanya di dalam folder assets.
const photos = ['assets/foto1.jpg', 'assets/foto2.jpg']; 
let photoIndex = 0;

// Ketika tombol Buka Kejutan diklik
openBtn.addEventListener('click', () => {
    // 1. Putar Musik
    bgMusic.play().catch(error => {
        console.log("Browser memblokir pemutaran musik otomatis", error);
    });
    
    // 2. Ganti Layar
    openingScreen.classList.remove('active');
    mainScreen.classList.add('active');

    // 3. Tembakkan Confetti
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#e94560', '#ffffff', '#ffb400']
        });
    }

    // 4. Jalankan efek teks mengetik
    setTimeout(typeWriter, 1000); // Beri jeda 1 detik sebelum teks mulai
    
    // 5. Jalankan transisi foto otomatis setiap 3.5 detik
    setInterval(changePhoto, 3500); 
});

// Fungsi untuk efek mengetik satu per satu
function typeWriter() {
    if (charIndex < message.length) {
        typingText.innerHTML += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50); // Kecepatan mengetik (50ms per huruf)
    }
}

// Fungsi untuk efek transisi ganti foto
function changePhoto() {
    photo.style.opacity = 0; // Foto memudar
    
    setTimeout(() => {
        photoIndex = (photoIndex + 1) % photos.length;
        photo.src = photos[photoIndex]; // Ganti sumber foto
        photo.style.opacity = 1; // Foto muncul kembali
    }, 500); // Jeda memudar setengah detik
}
