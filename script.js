let PlayPauseBtn=document.querySelector(".play-pause");
let PlayPauseIcon=document.querySelector(".play-pause i");

let AudioRange=document.querySelector("#audio-range");
let SongAudio=document.querySelector(".song-audio");

let CurrentTime = document.querySelector("#current-time");
let TotalDuration = document.querySelector("#total-duration");

let replayBtn=document.querySelector(".loop");

let ImageAnimate=document.querySelector(".song-image");



replayBtn.addEventListener("click",()=>
{
    SongAudio.loop=!SongAudio.loop;
    replayBtn.classList.toggle("loop-active")

});

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = "0" + sec;
    return `${mins}:${sec}`;
}

PlayPauseBtn.addEventListener("click", ()=>{
    if(SongAudio.paused)
    {
        SongAudio.play();
        PlayPauseIcon.classList.remove("fa-play");
        PlayPauseIcon.classList.add("fa-pause");
        ImageAnimate.classList.add("song-image-rotate-animate");

    }
    else
    {
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

SongAudio.addEventListener("loadedmetadata", ()=>{
    AudioRange.max=SongAudio.duration;
    TotalDuration.textContent = formatTime(SongAudio.duration);

});

SongAudio.addEventListener("timeupdate",()=>{
    AudioRange.value=SongAudio.currentTime;
    CurrentTime.textContent = formatTime(SongAudio.currentTime);

});

AudioRange.addEventListener("input", () => {
    SongAudio.currentTime = AudioRange.value;
});