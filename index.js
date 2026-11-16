// CCT360 Lab 5 - Mumbai, in Motion
// JavaScript section for the Mumbai Soundscape Website. 

// Store information about all four scenes in an array. 
// Use loops, arrays, conditions, functions and HTML5 audio events.
// Each scene starts at a specific time in the 76-second audio recording.


// Each scene has a title, description, image, and alt text for accessibility.
// The start time is in seconds and corresponds to the audio playback time.
// Every new scene will be displayed when the audio playback time reaches the start time of that scene which is in increments of 19 seconds.
// The last scene will be displayed when the audio playback time reaches 57 seconds and will remain until the end of the audio recording at 76 seconds.
// This helps us design and control the sequence and timing of the scenes in the audio-visual experience.
// The scenes are displayed in the order they are defined in the array, and the audio playback time is used to tell which scene to display at any possible given moment.
const scenes = [
    {
        start: 0,
        title: "The city wakes",
        description: "Morning traffic and car horns bring the city streets to life.",
        image: "images/mumbai-streets.jpg",
        alt: "A busy Mumbai intersection near Chhatrapati Shivaji Maharaj Terminus with traffic."
    },

    {
        start: 19,
        title: "The daily commute",
        description: "A Mumbai local train travels through a busy station.",
        image: "images/mumbai-local-train.jpg",
        alt: "Mumbai local train in the early morning."
    },

    {
        start: 38,
        title: "The monsoon arrives",
        description: "Rain pours onto the streets as traffic fades into the background.",
        image: "images/mumbai-monsoon.jpg",
        alt: "Mumbai during the monsoon season at the Gateway of India."
    },

    {
        start: 57,
        title: "A quieter coastline",
        description: "Waves and sea breeze bring calm to Marine Drive.",
        image: "images/mumbai-marine-drive.jpg",
        alt: "Scenic view of Marine Drive and waves along the Mumbai coastline."
    }
];


// Connecting the JavaScript to the HTML elements using their IDs.
// This allows us to manipulate the audio player and scene display dynamically.
// This helps us find a specific HTML element on a webpage and save it in a variable so the user can change and interact with it later.
const audio = document.getElementById("soundscape");

const sceneImage = document.getElementById("scene-image");
const sceneNumber = document.getElementById("scene-number");
const sceneTitle = document.getElementById("scene-title");
const sceneDescription = document.getElementById("scene-description");

const playButton = document.getElementById("play-button");
const restartButton = document.getElementById("restart-button");

const seekBar = document.getElementById("seek-bar");
const timeDisplay = document.getElementById("time-display");

const volumeBar = document.getElementById("volume-bar");
const volumeText = document.getElementById("volume-text");

const playerStatus = document.getElementById("player-status");

const chapterButtons = document.getElementsByClassName("chapter-button");


// Keep track of the current scene and set the starting volume.
let currentScene = -1;
audio.volume = 0.8;


// Convert seconds into minutes and seconds for the time display.
// This function takes a number of seconds as input and returns a string formatted as "minutes:seconds".
// Adds a leading zero when the remaining seconds are less than 10.
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remaining = Math.floor(seconds % 60);

    if (remaining < 10) {
        return minutes + ":0" + remaining;
    } else {
        return minutes + ":" + remaining;
    }
}


// Change the image, scene number, title, and description.
function showScene(number) {

    currentScene = number;

    sceneImage.src = scenes[number].image;
    sceneImage.alt = scenes[number].alt;

    sceneNumber.textContent = "CHAPTER 0" + (number + 1) + " / 04";
    sceneTitle.textContent = scenes[number].title;
    sceneDescription.textContent = scenes[number].description;

    // Remove the active class from all chapter buttons.
    for (let i = 0; i < chapterButtons.length; i++) {
        chapterButtons[i].className = "chapter-button";
    }

    // Highlight the selected chapter.
    chapterButtons[number].className = "chapter-button active";
}


// Check which scene should be shown based on the audio time.
function updateScene() {

    let selectedScene = 0;

    for (let i = 0; i < scenes.length; i++) {

        if (audio.currentTime >= scenes[i].start) {
            selectedScene = i;
        }

    }

    // Only update the image when the scene changes.
    if (selectedScene !== currentScene) {
        showScene(selectedScene);
    }
}


// Update the progress slider, time display and current scene.
function updateProgress() {

    seekBar.value = audio.currentTime;

    timeDisplay.textContent =
        formatTime(audio.currentTime) + " / " +
        formatTime(audio.duration || 76);

    updateScene();
}


// Play or pause the audio.
playButton.addEventListener("click", function () {

    if (audio.paused) {

        // Start from the beginning if the audio already ended.
        if (audio.ended) {
            audio.currentTime = 0;
        }

        audio.play();

    } else {
        audio.pause();
    }

});


// Restart the entire soundscape.
restartButton.addEventListener("click", function () {

    audio.currentTime = 0;
    updateProgress();
    audio.play();

});


// Allow the user to move through the audio using the progress slider.
seekBar.addEventListener("input", function () {

    audio.currentTime = Number(seekBar.value);
    updateProgress();

});

// Change the audio volume using the slider.
volumeBar.addEventListener("input", function () {

    audio.volume = Number(volumeBar.value);

    volumeText.textContent =
        Math.round(audio.volume * 100) + "%";

});


// Make each of the four chapter buttons interactive.
for (let i = 0; i < chapterButtons.length; i++) {

    chapterButtons[i].addEventListener("click", function () {

        // Jump to the starting time of the selected scene.
        audio.currentTime = scenes[i].start;

        updateProgress();

        // Play the audio from the selected scene.
        audio.play();

    });

}


// HTML5 audio events shown in Lecture 7.

// When the audio information has loaded.
audio.addEventListener("loadedmetadata", function () {

    seekBar.max = audio.duration;
    updateProgress();

});


// Update the display as the audio plays.
audio.addEventListener("timeupdate", updateProgress);


// Change the button and message when playback begins.
audio.addEventListener("play", function () {

    playButton.textContent = "Pause";
    playerStatus.textContent = "Now playing.";

});


// Change the button and message when the audio is paused.
audio.addEventListener("pause", function () {

    playButton.textContent = "Play";

    if (!audio.ended) {
        playerStatus.textContent = "Paused.";
    }

});


// Display a message when the soundscape finishes.
audio.addEventListener("ended", function () {

    playButton.textContent = "Play";

    playerStatus.textContent =
        "Journey complete. Press Restart to listen again.";

});



// Display a message if the audio cannot be loaded.
audio.addEventListener("error", function () {

    playerStatus.textContent =
        "Audio not found. Check the audio folder and MP3 filename.";

});


// Display the first scene when the webpage opens.
showScene(0);