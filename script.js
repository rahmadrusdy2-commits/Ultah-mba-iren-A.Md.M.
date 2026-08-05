const openBtn = document.getElementById('open-btn');
const letterBtn = document.getElementById('letter-btn');
const openingScreen = document.getElementById('opening-screen');
const mainScreen = document.getElementById('main-screen');
const bgMusic = document.getElementById('bg-music');
const typingText = document.getElementById('typing-text');
const photo = document.getElementById('photo');

const message = "Selamat ulang tahun, Mba Iren! 🎉 Semoga hari-harimu ke depan selalu dipenuhi dengan kebahagiaan, tawa, dan hal-hal manis. Terus bersinar ya! ✨";
let charIndex = 0;

const photos = ['assets/foto1.jpg', 'assets/foto2.jpg']; 
let photoIndex = 0;

openBtn.addEventListener('click', () => {
    // 1. Putar Musik
    bgMusic.play().catch(error => console.log("Auto-play diblokir browser", error));
    
    // 2. Transisi Layar
    openingScreen.classList.remove('active');
    mainScreen.classList.add('active');

    // 3. Mulai Kembang Api & Balon
    fireworksEffect();
    createBalloons();

    // 4. Mulai Efek Mengetik
    setTimeout(typeWriter, 1000);
    
    // 5. Ganti Foto Otomatis
    setInterval(changePhoto, 3500); 
});

// Fungsi Mengetik
function typeWriter() {
    if (charIndex < message.length) {
        typingText.innerHTML += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    } else {
        // Tampilkan tombol surat setelah selesai mengetik
        setTimeout(() => {
            letterBtn.style.display = 'block';
            letterBtn.style.animation = 'fadeIn 1s ease-in';
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

// Fungsi Kembang Api Premium (Selama 15 Detik)
function fireworksEffect() {
    let duration = 15 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    let interval = setInterval(function() {
        let timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        let particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, { particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}

// Fungsi Membuat Balon Terbang
function createBalloons() {
    const colors = ['#e94560', '#ffb400', '#00bbf9', '#00f5d4', '#f15bb5'];
    for(let i = 0; i < 20; i++) {
        let balloon = document.createElement('div');
        balloon.classList.add('balloon');
        // Posisi horizontal acak
        balloon.style.left = Math.random() * 100 + 'vw';
        // Warna acak dengan memutar hue (rona warna) dari warna dasar
        balloon.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        // Kecepatan dan penundaan acak agar tidak terbang bersamaan
        balloon.style.animationDuration = (Math.random() * 4 + 5) + 's'; 
        balloon.style.animationDelay = (Math.random() * 5) + 's';
        document.body.appendChild(balloon);
    }
}

// Event Listener untuk Tombol Surat (Pop-up SweetAlert2)
letterBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Surat Khusus 💌',
        // Anda bisa mengedit teks surat panjang ini
        html: '<p style="line-height: 1.8; text-align: justify; font-size: 16px;">Selamat ulang tahun, Mba Iren! 🎂<br><br>Semoga di umur yang baru ini, semua impian yang belum terwujud bisa segera tercapai. Selalu dikelilingi oleh orang-baik, dijauhkan dari hal-hal sedih, dan selalu diberikan kesehatan. Jangan lupa untuk selalu tersenyum dan bahagia ya!<br><br><i>Enjoy your special day!</i> ❤️</p>',
        imageUrl: photos[photoIndex], // Menggunakan foto yang saat ini sedang tampil di layar
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Foto Mba Iren',
        confirmButtonText: 'Tutup Surat 💖',
        confirmButtonColor: '#e94560',
        background: '#1a1a2e',
        color: '#fff',
        backdrop: `rgba(0,0,0,0.8)` // Membuat latar belakang jadi lebih gelap saat surat dibuka
    });
});
