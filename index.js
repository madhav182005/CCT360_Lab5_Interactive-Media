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

