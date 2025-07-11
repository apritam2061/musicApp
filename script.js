// muscic arera logics 
let PlayPauseBtn = document.querySelector(".play-pause");
let PlayPauseIcon = document.querySelector(".play-pause i");

let AudioRange = document.querySelector("#audio-range");
let SongAudio = document.querySelector(".song-audio");

let CurrentTime = document.querySelector("#current-time");
let TotalDuration = document.querySelector("#total-duration");

let replayBtn = document.querySelector(".loop");

let ImageAnimate = document.querySelector(".song-image");

replayBtn.addEventListener("click", () => {
  SongAudio.loop = !SongAudio.loop;
  replayBtn.classList.toggle("loop-active");
});

function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  if (sec < 10) sec = "0" + sec;
  return `${mins}:${sec}`;
}

PlayPauseBtn.addEventListener("click", () => {
  if (SongAudio.paused) {
    SongAudio.play();
    PlayPauseIcon.classList.remove("fa-play");
    PlayPauseIcon.classList.add("fa-pause");
    ImageAnimate.classList.add("song-image-rotate-animate");
  } else {
    SongAudio.pause();
    PlayPauseIcon.classList.remove("fa-pause");
    PlayPauseIcon.classList.add("fa-play");
    ImageAnimate.classList.remove("song-image-rotate-animate");
  }
});

SongAudio.addEventListener("ended", () => {
  PlayPauseIcon.classList.remove("fa-pause");
  PlayPauseIcon.classList.add("fa-play");
  ImageAnimate.classList.remove("song-image-rotate-animate");
});

SongAudio.addEventListener("loadedmetadata", () => {
  AudioRange.max = SongAudio.duration;
  TotalDuration.textContent = formatTime(SongAudio.duration);
});

SongAudio.addEventListener("timeupdate", () => {
  AudioRange.value = SongAudio.currentTime;
});

AudioRange.addEventListener("input", () => {
  SongAudio.currentTime = AudioRange.value;
});

// searchbar things
let searchBar = document.querySelector("#search-bar");
let songListItems = document.querySelectorAll(".song-list");

searchBar.addEventListener("input", () => {
  let query = searchBar.value.toLowerCase();

  songListItems.forEach((item) => {
    let songTitle = item.childNodes[0].nodeValue.trim().toLowerCase();
    let artist = item.querySelector(".Artist").textContent.toLowerCase();

    if (songTitle.includes(query) || artist.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

// on cick song play logics(interconnection)
let songTitleText = document.querySelector("#music-area-song-name");
let ArtistText = document.querySelector("#music-area-artist");

songListItems.forEach((item) => {
  item.addEventListener("click", () => {
    let newSrc = item.getAttribute("data-src");
    let newImg = item.getAttribute("data-img");
    let newTitle = item.getAttribute("data-title");
    let newArtist = item.getAttribute("data-artist");

    SongAudio.src = newSrc;
    SongAudio.load();
    SongAudio.play();

    PlayPauseIcon.classList.remove("fa-play");
    PlayPauseIcon.classList.add("fa-pause");

    songTitleText.textContent = newTitle;
    ArtistText.textContent = newArtist;

    ImageAnimate.src = newImg;

    ImageAnimate.classList.remove("song-image-rotate-animate");
    void ImageAnimate.offsetWidth;
    ImageAnimate.classList.add("song-image-rotate-animate");
  });
});


let menuBar=document.querySelector(".fa-bars");
let menuBox=document.querySelector(".menuBox")
let musicArea=document.querySelector(".music-area");

menuBar.addEventListener("click",()=>{
  menuBox.classList.toggle("menubox-slide");
});