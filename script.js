const openBtn = document.getElementById('open-btn');
const letterBtn = document.getElementById('letter-btn');
const addPhotoBtn = document.getElementById('add-photo-btn');
const gameBtn = document.getElementById('game-btn');
const fileInput = document.getElementById('file-input');
const openingScreen = document.getElementById('opening-screen');
const mainScreen = document.getElementById('main-screen');
const bgMusic = document.getElementById('bg-music');
const typingText = document.getElementById('typing-text');
const photoContainer = document.getElementById('photo-container');

const message = "Selamat ulang tahun, Mba Iren! 🎉 Semoga hari-harimu ke depan selalu dipenuhi dengan kebahagiaan, tawa, dan hal-hal manis. Terus bersinar ya! ✨";
let charIndex = 0;

const defaultPhotos = ['assets/foto1.jpg', 'assets/foto2.jpg'];
const savedPhotos = JSON.parse(localStorage.getItem('saved_photos')) || [];
let photos = [...defaultPhotos, ...savedPhotos];

let photoElements = [];
let currentPhotoIndex = -1;
let photoInterval;

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
    randomizePosition(img);
    return img;
}

function initPhotos() {
    photoContainer.innerHTML = "";
    photoElements = [];
    photos.forEach(src => {
        const img = createScatteredPhoto(src);
        photoContainer.appendChild(img);
        photoElements.push(img);
    });
}

function animateNextPhoto() {
    if (photoElements.length === 0) return;

    if (currentPhotoIndex !== -1 && photoElements[currentPhotoIndex]) {
        photoElements[currentPhotoIndex].classList.remove('active-photo');
        randomizePosition(photoElements[currentPhotoIndex]);
    }

    currentPhotoIndex = (currentPhotoIndex + 1) % photoElements.length;
    if (photoElements[currentPhotoIndex]) {
        photoElements[currentPhotoIndex].classList.add('active-photo');
    }
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
            addPhotoBtn.style.display = 'flex'; 
            gameBtn.style.display = 'flex'; // Munculkan tombol game di kiri bawah
            letterBtn.style.animation = 'fadeIn 1s ease-in';
            addPhotoBtn.style.animation = 'fadeIn 1s ease-in';
            gameBtn.style.animation = 'fadeIn 1s ease-in';
        }, 500);
    }
}

letterBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Surat Khusus 💌',
        html: '<p style="line-height: 1.8; text-align: justify; font-size: 16px;">Selamat ulang tahun, Mba Iren! 🎂<br><br>Semoga di umur yang baru ini, semua impian yang belum terwujud bisa segera tercapai. Selalu dikelilingi oleh orang-baik, dijauhkan dari hal-hal sedih, dan selalu diberikan kesehatan. Jangan lupa untuk selalu tersenyum dan bahagia ya!<br><br><i>Enjoy your special day!</i> ❤️</p>',
        imageUrl: photos[currentPhotoIndex] || photos[0], 
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
// FITUR MINI GAME BERHADIAH SHOPEEPAY (PRANK)
// ==========================================
gameBtn.addEventListener('click', () => {
    let score = 0;
    Swal.fire({
        title: '🎮 Misi Kilat ShopeePay!',
        html: `
            <p style="font-size: 15px; margin-bottom: 15px;">Ketuk tombol <b>"KLIK KADO!"</b> secepat mungkin selama 7 detik untuk klaim saldo ShopeePay Rp 50.000.000!</p>
            <h2 id="game-score" style="color: #ffb703; font-size: 36px; margin: 10px 0;">0 Kado</h2>
            <button id="tap-btn" style="background-color: #ffb703; color: #1a1a2e; font-size: 20px; padding: 15px 30px; border-radius: 50px; font-weight: bold; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(255,183,3,0.5);">🎁 KLIK KADO!</button>
        `,
        background: '#1a1a2e',
        color: '#fff',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
            const tapBtn = document.getElementById('tap-btn');
            const scoreDisplay = document.getElementById('game-score');
            
            tapBtn.addEventListener('click', () => {
                score++;
                scoreDisplay.innerText = `${score} Kado`;
                // Efek getar tombol saat diklik
                tapBtn.style.transform = 'scale(0.95)';
                setTimeout(() => tapBtn.style.transform = 'scale(1)', 100);
            });

            // Timer game selama 7 detik
            let timeLeft = 7;
            const timerInterval = setInterval(() => {
                timeLeft--;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    // Sembunyikan game dan tampilkan hasil pencairan ShopeePay palsu yang romantis
                    Swal.fire({
                        title: '🎉 Berhasil!',
                        html: `
                            <p>Kamu berhasil mengumpulkan <b>${score} Kado</b>!</p>
                            <p style="color: #06d6a0; font-weight: bold; margin-top: 10px;">Rp 50.000.000 berhasil dikirim ke ShopeePay Mba Iren! 💸</p>
                            <p style="font-size: 13px; color: #aaa; margin-top: 15px;"><i>(Tapi boong! Saldo tercairkan dalam bentuk doa dan kebahagiaan abadi dari yang buat web ini wkwk ❤️)</i></p>
                        `,
                        icon: 'success',
                        background: '#1a1a2e',
                        color: '#fff',
                        confirmButtonText: 'Asyik! Terima Kasih 💖',
                        confirmButtonColor: '#e94560'
                    });
                    if (typeof confetti === 'function') {
                        confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
                    }
                }
            }, 1000);
        }
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
        let loadedCount = 0;
        let newUploadedUrls = [];

        clearInterval(photoInterval);
        
        if (currentPhotoIndex !== -1 && photoElements[currentPhotoIndex]) {
            photoElements[currentPhotoIndex].classList.remove('active-photo');
            randomizePosition(photoElements[currentPhotoIndex]);
        }

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.src = event.target.result;
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const maxDim = 500;

                    if (width > height) {
                        if (width > maxDim) {
                            height *= maxDim / width;
                            width = maxDim;
                        }
                    } else {
                        if (height > maxDim) {
                            width *= maxDim / height;
                            height = maxDim;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    newUploadedUrls.push(compressedBase64);
                    loadedCount++;

                    if (loadedCount === files.length) {
                        photos.push(...newUploadedUrls);
                        
                        try {
                            const currentSaved = JSON.parse(localStorage.getItem('saved_photos')) || [];
                            currentSaved.push(...newUploadedUrls);
                            localStorage.setItem('saved_photos', JSON.stringify(currentSaved));
                        } catch (err) {
                            console.log("Penyimpanan penuh:", err);
                        }

                        newUploadedUrls.forEach(url => {
                            const newImg = createScatteredPhoto(url);
                            photoContainer.appendChild(newImg);
                            photoElements.push(newImg);
                        });

                        currentPhotoIndex = photoElements.length - files.length;
                        
                        setTimeout(() => {
                            animateNextPhoto();
                            photoInterval = setInterval(animateNextPhoto, 4000); 
                        }, 50);
                        
                        Swal.fire({ 
                            toast: true, position: 'top-end', icon: 'success', 
                            title: `${files.length} Foto berhasil dikompres & disimpan!`, 
                            showConfirmButton: false, timer: 3000, 
                            background: '#1a1a2e', color: '#fff' 
                        });

                        fileInput.value = "";
                    }
                }
            }
            reader.readAsDataURL(file);
        });
    }
});
