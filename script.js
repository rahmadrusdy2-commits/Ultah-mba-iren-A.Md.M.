// ==========================
// ELEMEN
// ==========================

const loading = document.getElementById("loading");

const home = document.getElementById("home");
const giftPage = document.getElementById("giftPage");
const birthdayPage = document.getElementById("birthdayPage");
const gallery = document.getElementById("gallery");
const letter = document.getElementById("letter");
const ending = document.getElementById("ending");

const startButton = document.getElementById("startButton");
const giftBox = document.querySelector(".gift-box");

const typing = document.getElementById("typing");
const music = document.getElementById("music");
const slideImage = document.getElementById("slideImage");

// ==========================
// LOADING
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.style.display = "none";

    }, 2500);

});

// ==========================
// FOTO
// ==========================

const photos = [

    "assets/foto1.jpg",
    "assets/foto2.jpg",
    "assets/foto3.jpg",
    "assets/foto4.jpg",
    "assets/foto5.jpg"

];

let currentPhoto = 0;

// ==========================
// UCAPAN
// ==========================

const message = `

Selamat Ulang Tahun 🎉❤️

Semoga hari ini menjadi awal dari
kebahagiaan yang baru.

Semoga semua impianmu tercapai.

Semoga selalu sehat.

Semoga selalu tersenyum.

Terima kasih sudah hadir
dan menjadi orang yang luar biasa.

Happy Birthday ❤️

`;

let index = 0;

// ==========================
// MULAI
// ==========================

startButton.addEventListener("click", () => {

    home.classList.add("hidden");

    giftPage.classList.remove("hidden");

});

// ==========================
// BUKA KADO
// ==========================

giftBox.addEventListener("click", () => {

    giftPage.classList.add("hidden");

    birthdayPage.classList.remove("hidden");

    music.play();

    typeWriter();

    startGallery();

    launchConfetti();

});

// ==========================
// TYPING EFFECT
// ==========================

function typeWriter(){

    if(index < message.length){

        typing.innerHTML += message.charAt(index);

        index++;

        setTimeout(typeWriter,45);

    }else{

        setTimeout(showGallery,2000);

    }

}

// ==========================
// GALERI
// ==========================

function startGallery(){

    setInterval(()=>{

        currentPhoto++;

        if(currentPhoto >= photos.length){

            currentPhoto = 0;

        }

        slideImage.src = photos[currentPhoto];

    },3000);

}

function showGallery(){

    gallery.classList.remove("hidden");

    setTimeout(()=>{

        letter.classList.remove("hidden");

    },12000);

    setTimeout(()=>{

        ending.classList.remove("hidden");

    },22000);

}

// ==========================
// CONFETTI
// ==========================

function launchConfetti(){

    const duration = 6000;

    const animationEnd = Date.now() + duration;

    const defaults = {

        startVelocity:30,

        spread:360,

        ticks:80,

        zIndex:9999

    };

    function randomInRange(min,max){

        return Math.random()*(max-min)+min;

    }

    const interval = setInterval(function(){

        const timeLeft = animationEnd - Date.now();

        if(timeLeft <= 0){

            return clearInterval(interval);

        }

        confetti({

            ...defaults,

            particleCount:5,

            origin:{
                x:randomInRange(0.1,0.3),
                y:Math.random()-0.2
            }

        });

        confetti({

            ...defaults,

            particleCount:5,

            origin:{
                x:randomInRange(0.7,0.9),
                y:Math.random()-0.2
            }

        });

    },250);

}

// ==========================
// HATI BERTERBANGAN
// ==========================

const hearts = document.getElementById("hearts");

function createHeart(){

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";

    heart.style.left = Math.random()*100 + "vw";

    heart.style.bottom = "-30px";

    heart.style.fontSize = (20 + Math.random()*30) + "px";

    heart.style.animation = "floatHeart 6s linear forwards";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },6000);

}

setInterval(createHeart,500);
// =========================================
// FIREWORKS CANVAS
// =========================================

const fireCanvas = document.getElementById("fireworks");
const ctx = fireCanvas.getContext("2d");

fireCanvas.width = window.innerWidth;
fireCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    fireCanvas.width = window.innerWidth;
    fireCanvas.height = window.innerHeight;
});

let particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;

        this.dx = (Math.random() - 0.5) * 8;
        this.dy = (Math.random() - 0.5) * 8;

        this.life = 100;
        this.color = color;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        this.dy += 0.05;
        this.life--;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function createFirework() {

    const x = Math.random() * fireCanvas.width;
    const y = Math.random() * fireCanvas.height / 2;

    const colors = [
        "#ff4d6d",
        "#ffd60a",
        "#00f5d4",
        "#ffffff",
        "#8ec5ff",
        "#ff99ff"
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    for(let i=0;i<80;i++){

        particles.push(new Particle(x,y,color));

    }

}

function animateFireworks(){

    ctx.clearRect(0,0,fireCanvas.width,fireCanvas.height);

    particles.forEach((particle,index)=>{

        particle.update();

        particle.draw();

        if(particle.life<=0){

            particles.splice(index,1);

        }

    });

    requestAnimationFrame(animateFireworks);

}

animateFireworks();

// =========================================
// FIREWORK TIAP 2 DETIK
// =========================================

setInterval(()=>{

    createFirework();

},2000);

// =========================================
// SLIDESHOW FADE
// =========================================

slideImage.style.transition = "opacity .8s";

function startGallery(){

    setInterval(()=>{

        slideImage.style.opacity = "0";

        setTimeout(()=>{

            currentPhoto++;

            if(currentPhoto>=photos.length){

                currentPhoto=0;

            }

            slideImage.src=photos[currentPhoto];

            slideImage.style.opacity="1";

        },700);

    },3500);

}

// =========================================
// TOMBOL PLAY / PAUSE MUSIK
// =========================================

const musicBtn = document.createElement("button");

musicBtn.innerHTML="🎵";

musicBtn.style.position="fixed";
musicBtn.style.right="20px";
musicBtn.style.bottom="20px";
musicBtn.style.width="60px";
musicBtn.style.height="60px";
musicBtn.style.borderRadius="50%";
musicBtn.style.border="none";
musicBtn.style.cursor="pointer";
musicBtn.style.fontSize="25px";
musicBtn.style.zIndex="999";
musicBtn.style.background="#ff4b8a";
musicBtn.style.color="white";

document.body.appendChild(musicBtn);

musicBtn.onclick=()=>{

    if(music.paused){

        music.play();

        musicBtn.innerHTML="🎵";

    }else{

        music.pause();

        musicBtn.innerHTML="🔇";

    }

};

// =========================================
// SCROLL HALUS KE BAGIAN AKHIR
// =========================================

function showEnding(){

    ending.classList.remove("hidden");

    ending.scrollIntoView({

        behavior:"smooth"

    });

}

// =========================================
// PESAN TERAKHIR
// =========================================

setTimeout(()=>{

    showEnding();

},32000);

// =========================================
// EFEK BERKEDIP PADA JUDUL
// =========================================

const title=document.querySelector(".title");

setInterval(()=>{

    title.style.opacity="0.5";

    setTimeout(()=>{

        title.style.opacity="1";

    },400);

},1500);

// =========================================
// UCAPAN DI CONSOLE 😊
// =========================================

console.log("🎉 Happy Birthday! Website berhasil dimuat.");
