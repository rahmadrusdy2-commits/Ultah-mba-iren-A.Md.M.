const openBtn = document.getElementById('open-btn');
const letterBtn = document.getElementById('letter-btn');
const addPhotoBtn = document.getElementById('add-photo-btn');
const fileInput = document.getElementById('file-input');
const openingScreen = document.getElementById('opening-screen');
const mainScreen = document.getElementById('main-screen');
const bgMusic = document.getElementById('bg-music');
const typingText = document.getElementById('typing-text');
const photo = document.getElementById('photo');

const message = "Selamat ulang tahun, Mba Iren! 🎉 Semoga hari-harimu ke depan selalu dipenuhi dengan kebahagiaan, tawa, dan hal-hal manis. Terus bersinar ya! ✨";
let charIndex = 0;

// Daftar foto awal
const photos = ['assets/foto1.jpg', 'assets/foto2.jpg']; 
let photoIndex = 0;

openBtn.addEventListener('click', () => {
    bgMusic.play().catch(error => console.log("Auto-play diblokir browser", error));
    openingScreen.classList.remove('active');
    mainScreen.classList.add('active');

    fireworksEffect();
    createBalloons();
    setTimeout(typeWriter, 1000);
    setInterval(changePhoto, 3500); 
});

// Fungsi Mengetik
function typeWriter() {
    if (charIndex < message.length) {
        typingText.innerHTML += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    } else {
        // Tampilkan kedua tombol setelah teks selesai
        setTimeout(() => {
            letterBtn.style.display = 'block';
            addPhotoBtn.style.display = 'block';
            letterBtn.style.animation = 'fadeIn 1s ease-in';
            addPhotoBtn.style.animation = 'fadeIn 1s ease-in';
        }, 500);
    }
}

// Fungsi Ganti Foto
function changePhoto() {
    photo.style.opacity = 0;
    setTimeout(() => {
        photoIndex = (photoIndex + 1) % photos.length;
        photo.src = photos[photoIndex];
        photo.style.opacity = 1;
    }, 500);
}

// Fitur Kembang Api
function fireworksEffect() {
    let duration = 15 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    let interval = setInterval(function() {
        let timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        
        let particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Fitur Balon
function createBalloons() {
    for(let i = 0; i < 20; i++) {
        let balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        balloon.style.animationDuration = (Math.random() * 4 + 5) + 's'; 
        balloon.style.animationDelay = (Math.random() * 5) + 's';
        document.body.appendChild(balloon);
    }
}

// Klik Tombol Surat
letterBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Surat Khusus 💌',
        html: '<p style="line-height: 1.8; text-align: justify; font-size: 16px;">Selamat ulang tahun, Mba Iren! 🎂<br><br>Semoga di umur yang baru ini, semua impian yang belum terwujud bisa segera tercapai. Selalu dikelilingi oleh orang-baik, dijauhkan dari hal-hal sedih, dan selalu diberikan kesehatan. Jangan lupa untuk selalu tersenyum dan bahagia ya!<br><br><i>Enjoy your special day!</i> ❤️</p>',
        imageUrl: photos[photoIndex],
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Foto Mba Iren',
        confirmButtonText: 'Tutup Surat 💖',
        confirmButtonColor: '#e94560',
        background: '#1a1a2e',
        color: '#fff',
        backdrop: `rgba(0,0,0,0.8)`
    });
});

// ==========================================
// FITUR BARU: INPUT FOTO DENGAN SANDI
// ==========================================
addPhotoBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Masukkan Sandi Rahasia',
        input: 'password',
        inputPlaceholder: 'Sandi...',
        background: '#1a1a2e',
        color: '#fff',
        confirmButtonColor: '#e94560',
        confirmButtonText: 'Verifikasi',
    }).then((result) => {
        if (result.isConfirmed) {
            // Mengecek kata sandi
            if (result.value === "UNYmantap1") {
                Swal.fire({
                    title: 'Akses Diberikan! 🔓',
                    text: 'Silakan pilih foto baru.',
                    icon: 'success',
                    background: '#1a1a2e',
                    color: '#fff',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    // Membuka jendela pemilihan file (galeri)
                    fileInput.click();
                });
            } else {
                Swal.fire({
                    title: 'Akses Ditolak! 🔒',
                    text: 'Sandi salah. Coba ingat-ingat lagi.',
                    icon: 'error',
                    background: '#1a1a2e',
                    color: '#fff',
                    confirmButtonColor: '#e94560'
                });
            }
        }
    });
});

// Menangani foto setelah pengguna memilihnya dari galeri HP/Laptop
fileInput.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const newPhotoUrl = event.target.result;
            
            // Masukkan foto baru ke dalam antrean slideshow
            photos.push(newPhotoUrl);
            
            // Langsung paksa tampilkan foto baru tersebut
            photoIndex = photos.length - 1;
            photo.style.opacity = 0;
            setTimeout(() => {
                photo.src = photos[photoIndex];
                photo.style.opacity = 1;
            }, 500);
            
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Foto berhasil ditambahkan!',
                showConfirmButton: false,
                timer: 3000,
                background: '#1a1a2e',
                color: '#fff'
            });
        }
        // Membaca file gambar sebagai URL
        reader.readAsDataURL(e.target.files[0]);
    }
});
