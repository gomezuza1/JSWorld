// option 1 without for each

// const menuBars = document.getElementById('menu-bars');
// const overlay = document.getElementById('overlay');
// const nav1 = document.getElementById('nav-1');
// const nav2 = document.getElementById('nav-2');
// const nav3 = document.getElementById('nav-3');
// const nav4 = document.getElementById('nav-4');
// const nav5 = document.getElementById('nav-5');
// const navItems = [nav1, nav2, nav3, nav4, nav5];

// function toggleNav() {
//     // Toggle: Menu Bars Open/Closed
//     menuBars.classList.toggle('change');
  
//     // Toggle: Menu Active
//     overlay.classList.toggle('overlay-active');
//     // console.log("menubars", menuBars);
//     // console.log("overlay", overlay.classList.contains('overlay-active'));
//     if (overlay.classList.contains('overlay-active')) {
//         // Animate In - Overlay
//         overlay.classList.add('overlay-slide-right');
//         overlay.classList.remove( 'overlay-slide-left');
//      } else {
//         // Animate Out - Overlay
//         overlay.classList.remove('overlay-slide-right');
//         overlay.classList.add( 'overlay-slide-left');
//       }


// }


// // Event Listeners
// menuBars.addEventListener('click', toggleNav);

// // old way
// // nav1.addEventListener('click', toggleNav);
// // nav2.addEventListener('click', toggleNav);
// // nav3.addEventListener('click', toggleNav);
// // nav4.addEventListener('click', toggleNav);
// // nav5.addEventListener('click', toggleNav);

// // // for way 
// navItems.forEach((nav) => {
//   nav.addEventListener('click', toggleNav);
// });

// option 2

const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];


// const music player
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
// END const music player


// Control Navigation Animation
function navAnimation(direction1, direction2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
  });
}

function toggleNav() {
  // Toggle: Menu Bars Open/Closed
  menuBars.classList.toggle('change');
  // Toggle: Menu Active
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    // Animate In - Overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    // Animate In - Nav Items
    navAnimation('out', 'in');
  } else {
    // Animate Out - Overlay
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
    // Animate Out - Nav Items
    navAnimation('in', 'out');
  }
}

// scripts to music player

// Music
const songs = [
    {
      name: 'jacinto-1',
      displayName: 'Electric Chill Machine',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-3',
      displayName: 'Goodnight, Disco Queen',
      artist: 'Jacinto Design',
    },
    {
      name: 'metric-1',
      displayName: 'Front Row (Remix)',
      artist: 'Metric/Jacinto Design',
    },
  ];



// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
  }

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
  }
  
  // Next Song
  function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
  }


// On Load - Select First Song
  loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
      const { duration, currentTime } = e.srcElement;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      }
      // Calculate display for currentTime
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
  
  // Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// END scripts to music player



// Event Listeners wensite
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});

// Event Listeners music player


// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);