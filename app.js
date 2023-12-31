
//Audio files
let amnSong= document.getElementById("amn-song");
let basSong= document.getElementById("bas-song");
let lcscSong= document.getElementById("lcsc-song");
let miSong= document.getElementById("mi-song");
let sitcSong= document.getElementById("sitc-song");
let wafimbSong= document.getElementById("wafimb-song");
//song names for clicking
let amnPlay = document.getElementById("amn-play");
let basPlay = document.getElementById("bas-play");
let lcscPlay = document.getElementById("lcsc-play");
let miPlay = document.getElementById("mi-play");
let sitcPlay = document.getElementById("sitc-play");
let wafimbPlay = document.getElementById("wafimb-play");





let backBtn = document.getElementById("back");
let forwardBtn = document.getElementById("forward");
let ctrl = document.getElementById("ctrl");

let songs = [
    wafimbSong,
    amnSong,
    sitcSong,
    basSong,
    miSong,
    lcscSong,
    
    
];

let currentSongIndex= 0;
let currentSong = null;

const progress = document.getElementById("progress");
const durationContainer = document.getElementById('duration');
const timeContainer = document.getElementById('current-time');
const audioPlayerContainer = document.getElementById('audio-player-container');

//this functions changes time in seconds to time in mins and secs for display purposes
const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }
 //////////////////////////////////////////////////////// 
///////////BIG PLAY FUNCTION BEGINS HERE////////////////
////////Function to play a song by clicking a song/////
function playSong(songElement){
    //if there is a song playing it is paused and set back to 0
    if (currentSong) {
        currentSong.pause();
        currentSong.currentTime = 0;  
        currentSong.parentElement.classList.remove('song-playing');
    }
    //update currentSong and index variable
    currentSong = songElement;
    currentSongIndex = songs.indexOf(songElement);
    
    //highlight the current song thats playing
    currentSong.parentElement.classList.add('song-playing');


    //displaying duration to the right of the bar//////
    const displayDuration = () => {
        durationContainer.textContent = calculateTime(currentSong.duration);
      }
    /////sets the maxlength of the slider bar///////
    const setProgressMax = () => {
        progress.max = Math.floor(currentSong.duration);
      }
   
    //////helps with loading the metadata-time to right of bar, max length of bar, and buffer amount///////
      if (currentSong.readyState > 0) {
        displayDuration();
        setProgressMax();
      } else {
        currentSong.addEventListener('loadedmetadata', () => {
          displayDuration();
          setProgressMax();
        });
      }
    
    

    ///////plays the song and changes the play button to show pause
    currentSong.play();
    ctrl.classList.add("fa-pause");
    ctrl.classList.remove("fa-play");
    userStartedPlayback = true;
    

    //////this sets the sliders value to the songs current time and changes the time on the left/////
      currentSong.addEventListener('timeupdate', () => {
        progress.value = Math.floor(currentSong.currentTime);
        timeContainer.textContent = calculateTime(progress.value);
      });


    //////this is so when you click somewhere on the slider the song plays from where you click////
    progress.onchange = function(){
        currentSong.play();
        currentSong.currentTime = progress.value;
        ctrl.classList.add("fa-pause");
        ctrl.classList.remove("fa-play");
    }

    ////////this plays the next song once the current song is finished/////
    currentSong.addEventListener("ended", function () {
        playNextSong();
    });
}
/////////////////////////////////////////////////
////////////End of click song to Play function//////////////////////
/////////////////////////////////////////////////


////////////////////////////////////////////////////////
/////function that works the play pause button/////////
////////////////////////////////////////////////////////
function pauseOrPlay() {
    if (currentSong) {
        if (currentSong.paused) {
            // If the current song is paused, resume playing
            currentSong.play();
            ctrl.classList.add("fa-pause");
            ctrl.classList.remove("fa-play");
        } else {
            // If the current song is playing, pause it
            currentSong.pause();
            ctrl.classList.add("fa-play");
            ctrl.classList.remove("fa-pause");
        }
    }
}

///////////////////////////////////////////
//////function for next song button////////
function playNextSong() {
    
    let nextSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[nextSongIndex]);
}
////////function for previous song button///////
function playPreviousSong() {
    let previousSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[previousSongIndex]);
}




////////////////////////////////////////////////////////////////////////////
//////event listeners to play songs by clicking on them///////////////////
amnPlay.addEventListener("click", function () {
    playSong(amnSong);
});
basPlay.addEventListener("click", function () {
    playSong(basSong);
});
lcscPlay.addEventListener("click", function () {
    playSong(lcscSong);
});
miPlay.addEventListener("click", function () {
    playSong(miSong);
});
sitcPlay.addEventListener("click", function () {
    playSong(sitcSong);
});
wafimbPlay.addEventListener("click", function () {
    playSong(wafimbSong);
});

////////////////play pause controls/////////////////

///this function checks to see if a song has been played yet, if not, it plays the first song...if something is already playing it acts as a regular play/pause
let userStartedPlayback = false;

ctrl.addEventListener("click", function () {
    if (!userStartedPlayback) {
        // If the user hasn't manually started playback yet, play the first song
        playSong(wafimbSong);
        userStartedPlayback = true;
    } else {
        // If the user has manually started playback, toggle between play and pause
        pauseOrPlay();
    }
});


///forward reverse
backBtn.addEventListener("click", function () {
    playPreviousSong();
});
forwardBtn.addEventListener("click", function () {
    playNextSong();
});
