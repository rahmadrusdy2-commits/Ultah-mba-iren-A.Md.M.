const openBtn = document.getElementById('open-btn');
const letterBtn = document.getElementById('letter-btn');
const addPhotoBtn = document.getElementById('add-photo-btn');
const fileInput = document.getElementById('file-input');
const openingScreen = document.getElementById('opening-screen');
const mainScreen = document.getElementById('main-screen');
const bgMusic = document.getElementById('bg-music');
const typingText = document.getElementById('typing-text');
const photoContainer = document.getElementById('photo-container');

const message = "Selamat ulang tahun, Mba Iren! 🎉 Semoga hari-harimu ke depan selalu dipenuhi dengan kebahagiaan, tawa, dan hal-hal manis. Terus bersinar ya! ✨";
let charIndex = 0;

// Array penyimpan data foto
const photos = ['assets/foto1.jpg', 'assets/foto2.jpg']; 
let photoElements = [];
let currentPhotoIndex = -1;
let photoInterval;

// FUNGSI MEMBUAT FOTO BERSERAKAN
function createScatteredPhoto(src) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('scattered-photo');
    
    // Posisi acak (15% sampai 85% layar agar tidak terlalu ke pinggir)
    const randomX = Math.floor(Math.random() * 70) + 15;
    const randomY = Math.floor(Math.random() * 70) + 15;
    // Kemiringan acak (-25 derajat sampai 25 derajat)
    const randomRot = Math.floor(Math.random() * 50) - 25; 
    
    img.style.left = `${randomX}vw`;
    img.style.top = `${randomY}vh`;
    img.style.transform = `translate(-50%, -50%) rotate(${randomRot}deg)`;
    
    return img;
}

// Menyiapkan foto di awal
function initPhotos() {
    photos.forEach(src => {
        const img = createScatteredPhoto(src);
        photoContainer.appendChild(img);
        photoElements.push(img);
    });
}

// Fungsi animasi foto bergerak ke atas dan kembali
function animateNextPhoto() {
    if (photoElements.length === 0) return;

    // Hapus status aktif di foto sebelumnya (kembali berserakan)
    if (currentPhotoIndex !== -1) {
        photoElements[currentPhotoIndex].classList.remove('active-photo');
    }

    // Pindah ke foto berikutnya
    currentPhotoIndex = (currentPhotoIndex + 1) % photoElements.length;
    
    // Jadikan foto saat ini aktif (membesar dan ke atas)
    photoElements[currentPhotoIndex].classList.add('active-photo');
}

openBtn.addEventListener('click', () => {
    bgMusic.play().catch(error => console.log("Auto-play diblokir browser", error));
    openingScreen.classList.remove('active');
    mainScreen.classList.add('active');

    // Tembakan Confetti awal
    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#e94560', '#ffffff', '#ffb400'] });
    }

    // Mulai inisialisasi foto berserakan dan jalankan animasinya
    initPhotos();
    setTimeout(() => {
        animateNextPhoto(); // Tarik foto pertama
        photoInterval = setInterval(animateNextPhoto, 4000); // Ganti tiap 4 detik (1.5s transisi + 2.5s diam)
    }, 500);

    setTimeout(typeWriter, 1000);
});

// Fungsi Mengetik Pesan
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

// Pop-up Surat (mengambil foto yang sedang aktif di atas)
letterBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Surat Khusus 💌',
        html: '<p style="line-height: 1.8; text-align: justify; font-size: 16px;">Selamat ulang tahun, Mba Iren! 🎂<br><br>Semoga di umur yang baru ini, semua impian yang belum terwujud bisa segera tercapai. Selalu dikelilingi oleh orang-baik, dijauhkan dari hal-hal sedih, dan selalu diberikan kesehatan. Jangan lupa untuk selalu tersenyum dan bahagia ya!<br><br><i>Enjoy your special day!</i> ❤️</p>',
        imageUrl: photos[currentPhotoIndex], // Foto yang sedang tampil
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

// Fitur Tambah Foto dengan Sandi
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
                Swal.fire({ title: 'Akses Diberikan! 🔓', icon: 'success', background: '#1a1a2e', color: '#fff', timer: 1500, showConfirmButton: false }).then(() => {
                    fileInput.click();
                });
            } else {
                Swal.fire({ title: 'Akses Ditolak! 🔒', icon: 'error', background: '#1a1a2e', color: '#fff', confirmButtonColor: '#e94560' });
            }
        }
    });
});

// Memproses Foto Tambahan dari Galeri
fileInput.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const newPhotoUrl = event.target.result;
            photos.push(newPhotoUrl);
            
            // Buat elemen foto baru berserakan
            const newImg = createScatteredPhoto(newPhotoUrl);
            photoContainer.appendChild(newImg);
            photoElements.push(newImg);
            
            // Hentikan interval sementara
            clearInterval(photoInterval);
            
            // Kembalikan foto yang aktif saat ini
            if (currentPhotoIndex !== -1) {
                photoElements[currentPhotoIndex].classList.remove('active-photo');
            }
            
            // Langsung tarik foto yang baru saja ditambahkan ke atas
            currentPhotoIndex = photoElements.length - 1;
            
            // Beri sedikit jeda agar DOM memproses elemen baru, lalu animasikan
            setTimeout(() => {
                photoElements[currentPhotoIndex].classList.add('active-photo');
                // Mulai lagi interval pergantian otomatis
                photoInterval = setInterval(animateNextPhoto, 4000); 
            }, 50);
            
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Foto berhasil ditambahkan!', showConfirmButton: false, timer: 2000, background: '#1a1a2e', color: '#fff' });
        }
        reader.readAsDataURL(e.target.files[0]);
    }
});
