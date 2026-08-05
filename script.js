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

const photos = ['assets/foto1.jpg', 'assets/foto2.jpg']; 
let photoElements = [];
let currentPhotoIndex = -1;
let photoInterval;

// Fungsi untuk memberi posisi acak pada foto
function randomizePosition(img) {
    const randomX = Math.floor(Math.random() * 96) + 2; 
    const randomY = Math.floor(Math.random() * 96) + 2; 
    const randomRot = Math.floor(Math.random() * 70) - 35; 
    
    img.style.left = `${randomX}vw`;
    img.style.top = `${randomY}vh`;
    img.style.transform = `translate(-50%, -50%) rotate(${randomRot}deg)`;
}

function createScatteredPhoto(src) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('scattered-photo');
    randomizePosition(img); // Atur posisi acak awal
    return img;
}

function initPhotos() {
    photos.forEach(src => {
        const img = createScatteredPhoto(src);
        photoContainer.appendChild(img);
        photoElements.push(img);
    });
}

// Animasi bergantian: saat pindah foto, foto sebelumnya dikembalikan ke posisi acak baru
function animateNextPhoto() {
    if (photoElements.length === 0) return;

    if (currentPhotoIndex !== -1) {
        // Hapus kelas aktif, lalu acak ulang posisinya ke tempat baru di latar belakang
        photoElements[currentPhotoIndex].classList.remove('active-photo');
        randomizePosition(photoElements[currentPhotoIndex]);
    }

    currentPhotoIndex = (currentPhotoIndex + 1) % photoElements.length;
    photoElements[currentPhotoIndex].classList.add('active-photo');
}

openBtn.addEventListener('click', () => {
    bgMusic.play().catch(error => console.log("Auto-play diblokir browser", error));
    openingScreen.classList.remove('active');
    mainScreen.classList.add('active');

    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#e94560', '#ffffff', '#ffb400'] });
    }

    initPhotos();
    setTimeout(() => {
        animateNextPhoto(); 
        photoInterval = setInterval(animateNextPhoto, 4000); 
    }, 500);

    setTimeout(typeWriter, 1000);
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
                Swal.fire({ title: 'Akses Ditolak! 🔒', text: 'Sandi salah!', icon: 'error', background: '#1a1a2e', color: '#fff', confirmButtonColor: '#e94560' });
            }
        }
    });
});

fileInput.addEventListener('change', function(e) {
    if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);

        clearInterval(photoInterval);
        
        if (currentPhotoIndex !== -1) {
            photoElements[currentPhotoIndex].classList.remove('active-photo');
            randomizePosition(photoElements[currentPhotoIndex]);
        }

        files.forEach((file) => {
            const newPhotoUrl = URL.createObjectURL(file); 
            photos.push(newPhotoUrl);
            
            const newImg = createScatteredPhoto(newPhotoUrl);
            photoContainer.appendChild(newImg);
            photoElements.push(newImg);
        });

        currentPhotoIndex = photoElements.length - files.length;
        
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

        fileInput.value = "";
    }
});
