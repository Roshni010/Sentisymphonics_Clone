let lastDetectedEmotion = null;
let lastMusicRecommendations = [];

function analyzeEmotion() {
    // Send a POST request to the server to analyze the emotion
    fetch("/process_emotion", {
        method: "POST",
    })
    .then(response => response.json())
    .then(data => {
        // Clear the previous results
        const musicRecommendationsDiv = document.getElementById("music-recommendations");
        const detectedEmotionDiv = document.getElementById("detected-emotion");

        musicRecommendationsDiv.innerHTML = ""; // Clear music recommendations
        detectedEmotionDiv.innerHTML = ""; // Clear detected emotion

        // Process and display the detected emotions and up to 10 music recommendations
        data.forEach(result => {
            if (result.emotion) {
                const emotionParagraph = document.createElement("p");
                emotionParagraph.innerText = `Emotion: ${result.emotion}`;
                detectedEmotionDiv.appendChild(emotionParagraph);

                // Check if the emotion has changed
                if (result.emotion !== lastDetectedEmotion) {
                    // Update lastDetectedEmotion
                    lastDetectedEmotion = result.emotion;

                    // Update music recommendations only if they are available
                    if (result.music_recommendations.length > 0) {
                        lastMusicRecommendations = result.music_recommendations;

                        // Create an unordered list to display up to 10 music recommendations
                        const musicList = document.createElement("ul");
                        const numRecommendations = Math.min(10, lastMusicRecommendations.length);
                        for (let i = 0; i < numRecommendations; i++) {
                            const recommendation = lastMusicRecommendations[i];
                            const musicItem = document.createElement("li");
                            musicItem.innerText = `Music Track: ${recommendation.name} by ${recommendation.artist} (Album: ${recommendation.album}, Mood: ${recommendation.mood})`;
                            musicList.appendChild(musicItem);
                        }
                        musicRecommendationsDiv.appendChild(musicList);
                    }
                    var preloader = document.getElementById("preloader");
                    preloader.style.display = "none";
                } else {
                    // If the emotion hasn't changed, display the stored recommendations
                    if (lastMusicRecommendations.length > 0) {
                        const musicList = document.createElement("ul");
                        const numRecommendations = Math.min(10, lastMusicRecommendations.length);
                        for (let i = 0; i < numRecommendations; i++) {
                            const recommendation = lastMusicRecommendations[i];
                            const musicItem = document.createElement("li");
                            musicItem.innerText = `Music Track: ${recommendation.name} by ${recommendation.artist} (Album: ${recommendation.album}, Mood: ${recommendation.mood})`;
                            musicList.appendChild(musicItem);
                        }
                        musicRecommendationsDiv.appendChild(musicList);
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error("Error: " + error);
    });
}

// Automatically trigger the emotion analysis every 3 seconds
setInterval(analyzeEmotion, 6000);

// Initial call to analyze emotion
analyzeEmotion();


//https://open.spotify.com/track/0faXHILILebCGnJBPU6KJJ?si=5707d0dac15e4a50

// let lastDetectedEmotion = null;
// let lastMusicRecommendations = [];

// function askForCameraAccess() {
//     // Request access to the user's camera
//     navigator.mediaDevices.getUserMedia({ video: true })
//         .then((stream) => {
//             // If the user grants access, start analyzing emotions
//             analyzeEmotion(stream);
//         })
//         .catch(error => {
//             console.error("Error accessing the camera: " + error);
//         });
// }

// function analyzeEmotion(cameraStream) {
//     // Send a POST request to the server to analyze the emotion
//     fetch("/process_emotion", {
//         method: "POST",
//         // Include the camera stream in the request body or modify as needed
//         body: cameraStream,
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Rest of your code for processing and displaying results
//         // ...
//         const musicRecommendationsDiv = document.getElementById("music-recommendations");
//         const detectedEmotionDiv = document.getElementById("detected-emotion");

//         musicRecommendationsDiv.innerHTML = ""; // Clear music recommendations
//         detectedEmotionDiv.innerHTML = ""; // Clear detected emotion

//         // Process and display the detected emotions and up to 10 music recommendations
//         data.forEach(result => {
//             if (result.emotion) {
//                 const emotionParagraph = document.createElement("p");
//                 emotionParagraph.innerText = `Emotion: ${result.emotion}`;
//                 detectedEmotionDiv.appendChild(emotionParagraph);

//                 // Check if the emotion has changed
//                 if (result.emotion !== lastDetectedEmotion) {
//                     // Update lastDetectedEmotion
//                     lastDetectedEmotion = result.emotion;

//                     // Update music recommendations only if they are available
//                     if (result.music_recommendations.length > 0) {
//                         lastMusicRecommendations = result.music_recommendations;

//                         // Create an unordered list to display up to 10 music recommendations
//                         const musicList = document.createElement("ul");
//                         const numRecommendations = Math.min(10, lastMusicRecommendations.length);
//                         for (let i = 0; i < numRecommendations; i++) {
//                             const recommendation = lastMusicRecommendations[i];
//                             const musicItem = document.createElement("li");
//                             musicItem.innerText = `Music Track: ${recommendation.name} by ${recommendation.artist} (Album: ${recommendation.album}, Mood: ${recommendation.mood})`;
//                             musicList.appendChild(musicItem);
//                         }
//                         musicRecommendationsDiv.appendChild(musicList);
//                     }
//                     var preloader = document.getElementById("preloader");
//                     preloader.style.display = "none";
//                 } else {
//                     // If the emotion hasn't changed, display the stored recommendations
//                     if (lastMusicRecommendations.length > 0) {
//                         const musicList = document.createElement("ul");
//                         const numRecommendations = Math.min(10, lastMusicRecommendations.length);
//                         for (let i = 0; i < numRecommendations; i++) {
//                             const recommendation = lastMusicRecommendations[i];
//                             const musicItem = document.createElement("li");
//                             musicItem.innerText = `Music Track: ${recommendation.name} by ${recommendation.artist} (Album: ${recommendation.album}, Mood: ${recommendation.mood})`;
//                             musicList.appendChild(musicItem);
//                         }
//                         musicRecommendationsDiv.appendChild(musicList);
//                     }
//                 }
//             }
//         });


//         // Stop the camera stream after analysis
//         cameraStream.getTracks().forEach(track => track.stop());
//     })
//     .catch(error => {
//         console.error("Error: " + error);
//     });
// }

// // Function to handle the user's decision on camera access
// function handleCameraAccessDecision(permission) {
//     if (permission === 'granted') {
//         // If permission is granted, ask for camera access and start analyzing emotions
//         askForCameraAccess();
//     } else {
//         // Handle the case where the user denies camera access
//         console.log('User denied camera access');
//     }
// }

// // Ask for camera access when the page loads
// document.addEventListener('DOMContentLoaded', () => {
//     // Prompt the user for camera access
//     navigator.permissions.query({ name: 'camera' })
//         .then(permissionStatus => {
//             // Check if the user has already made a decision
//             handleCameraAccessDecision(permissionStatus.state);

//             // Listen for changes in camera access permission
//             permissionStatus.onchange = () => {
//                 handleCameraAccessDecision(permissionStatus.state);
//             };
//         })
//         .catch(error => {
//             console.error("Error checking camera permission: " + error);
//         });
// });

