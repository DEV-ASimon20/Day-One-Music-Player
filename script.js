const songsList = [
    {
        name: "My Tears Are Becoming a Sea",
        artist: "M83",
        src: "assets/1.mp3",
        cover: "assets/1.jpg"
    },
    {
        name: "Outro",
        artist: "M83",
        src: "assets/2.mp3",
        cover: "assets/2.jpg"
    },
    {
        name: "Wait",
        artist: "M83",
        src: "assets/3.mp3",
        cover: "assets/3.jpg"
    },

    {
        name: "You Get What you give",
        artist: "New Radicals",
        src: "assets/4.mp3",
        cover: "assets/4.jpg"
    },
    

    {
        name: "Shimauta",
        artist: "Alfredo Casero",
        src: "assets/5.mp3",
        cover: "assets/5.jpg"
    },

    {
        name: "Space Song",
        artist: "Beach House",
        src: "assets/6.mp3",
        cover: "assets/6.jpg"
    },


    {
        name: "Cry",
        artist: "Cigarettes After Sex",
        src: "assets/7.mp3",
        cover: "assets/7.jpg"
    },

    {
        name: "Blank Space",
        artist: "Taylor Swift",
        src: "assets/8.mp3",
        cover: "assets/8.jpg"
    },

    {
        name: "A Mi Manera",
        artist: "Ataque 77",
        src: "assets/9.mp3",
        cover: "assets/9.jpg"
    },

    
];

const artisName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artisName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}











