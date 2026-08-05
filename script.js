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

// Data foto bawaan (pastikan nama file sesuai di folder assets Anda)
const photos = ['assets/foto1.jpg', 'assets/foto2.jpg']; 
let photoElements = [];
let currentPhotoIndex = -1;
let photoInterval;

// FUNGSI MEMBUAT FOTO BERSERAKAN
function createScatteredPhoto(src) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('scattered-photo');
    
    // Posisi acak di area layar
    const randomX = Math.floor(Math.random() * 70) + 15;
    const randomY = Math.floor(Math.random() * 70) + 15;
    // Kemiringan acak
    const randomRot = Math.floor(Math.random() * 50) - 25; 
    
    img.style.left = `${randomX}vw`;
    img.style.top = `${randomY}vh`;
    img.style.transform = `translate(-50%, -50%) rotate(${randomRot}deg)`;
    
    return img;
}

// Menyiapkan foto bawaan di awal
function initPhotos() {
    photos.forEach(src => {
        const img = createScatteredPhoto(src);
        photoContainer.appendChild(img);
        photoElements.push(img);
    });
}

// Animasi bergantian menarik foto ke atas
function animateNextPhoto() {
    if (photoElements.length === 0) return;

    if (currentPhotoIndex !== -1) {
        photoElements[currentPhotoIndex].classList.remove('active-photo');
    }

    currentPhotoIndex = (currentPhotoIndex + 1) % photoElements.length;
    photoElements[currentPhotoIndex].classList.add('active-photo');
}

// SAAT TOMBOL BUKA KEJUTAN DITEKAN
openBtn.addEventListener('click', () => {
    bgMusic.play().catch(error => console.log("Auto-play diblokir browser", error));
    openingScreen.classList.remove('active');
    mainScreen.classList.add('active');

    // Confetti meledak
    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#e94560', '#ffffff', '#ffb400'] });
    }

    // Inisialisasi dan jalankan animasi foto
    initPhotos();
    setTimeout(() => {
        animateNextPhoto(); 
        photoInterval = setInterval(animateNextPhoto, 4000); 
    }, 500);

    // Mulai efek teks
    setTimeout(typeWriter, 1000);
});

// Efek Mengetik
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

// Fitur Surat Khusus
letterBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Surat Khusus 💌',
        html: '<p style="line-height: 1.8; text-align: justify; font-size: 16px;">Selamat ulang tahun, Mba Iren! 🎂<br><br>Semoga di umur yang baru ini, semua impian yang belum terwujud bisa segera tercapai. Selalu dikelilingi oleh orang-baik, dijauhkan dari hal-hal sedih, dan selalu diberikan kesehatan. Jangan lupa untuk selalu tersenyum dan bahagia ya!<br><br><i>Enjoy your special day!</i> ❤️</p>',
        imageUrl: photos[currentPhotoIndex], 
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

// Fitur Sandi untuk Upload Foto
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
                    fileInput.click(); // Buka jendela pilih file
                });
            } else {
                Swal.fire({ title: 'Akses Ditolak! 🔒', text: 'Sandi salah!', icon: 'error', background: '#1a1a2e', color: '#fff', confirmButtonColor: '#e94560' });
            }
        }
    });
});

// MEMPROSES FOTO YANG DIUPLOAD (BISA BANYAK)
fileInput.addEventListener('change', function(e) {
    if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);
        let loadedCount = 0;

        clearInterval(photoInterval);
        
        if (currentPhotoIndex !== -1) {
            photoElements[currentPhotoIndex].classList.remove('active-photo');
        }

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const newPhotoUrl = event.target.result;
                photos.push(newPhotoUrl);
                
                const newImg = createScatteredPhoto(newPhotoUrl);
                photoContainer.appendChild(newImg);
                photoElements.push(newImg);
                
                loadedCount++;

                if (loadedCount === files.length) {
                    currentPhotoIndex = photoElements.length - 1;
                    
                    setTimeout(() => {
                        photoElements[currentPhotoIndex].classList.add('active-photo');
                        photoInterval = setInterval(animateNextPhoto, 4000); 
                    }, 50);
                    
                    Swal.fire({ 
                        toast: true, position: 'top-end', icon: 'success', 
                        title: `${files.length} Foto berhasil ditambahkan!`, 
                        showConfirmButton: false, timer: 3000, 
                        background: '#1a1a2e', color: '#fff' 
                    });
                }
            }
            reader.readAsDataURL(file);
        });
    }
});
