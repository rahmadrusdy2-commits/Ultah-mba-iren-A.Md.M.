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
