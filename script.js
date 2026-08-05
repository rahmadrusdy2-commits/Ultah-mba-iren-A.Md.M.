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

const photos = ['assets/foto1.jpg', 'assets/foto2.jpg']; 
let photoIndex = 0;

openBtn.addEventListener('click', () => {
    bgMusic.play().catch(error => console.log("Auto-play diblokir browser", error));
    
    openingScreen.classList.remove('active');
    mainScreen.classList.add('active');

    // Tembakan Confetti awal yang simpel
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#e94560', '#ffffff', '#ffb400']
        });
    }

    setTimeout(typeWriter, 1000);
    setInterval(changePhoto, 3500); 
});

function typeWriter() {
    if (charIndex < message.length) {
        typingText.innerHTML += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    } else {
        setTimeout(() => {
            letterBtn.style.display = 'block';
            addPhotoBtn.style.display = 'block';
            letterBtn.style.animation = 'fadeIn 1s ease-in';
            addPhotoBtn.style.animation = 'fadeIn 1s ease-in';
        }, 500);
    }
}

function changePhoto() {
    photo.style.opacity = 0;
    setTimeout(() => {
        photoIndex = (photoIndex + 1) % photos.length;
        photo.src = photos[photoIndex];
        photo.style.opacity = 1;
    }, 500);
}

// Pop-up Surat
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

// Fitur Input Foto dengan Sandi
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

// Memproses Foto
fileInput.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const newPhotoUrl = event.target.result;
            photos.push(newPhotoUrl);
            
            // Langsung pindah ke foto baru
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
        reader.readAsDataURL(e.target.files[0]);
    }
});
