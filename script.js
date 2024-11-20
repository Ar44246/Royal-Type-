const startBtn = document.getElementById('start-btn');
const timeLeftDisplay = document.getElementById('time-left');
const typingBox = document.getElementById('typing-box');
const textDisplay = document.getElementById('text-display');
const wpmDisplay = document.getElementById('wpm');
const scoreDisplay = document.getElementById('score');
const progressBarFill = document.getElementById('progress-bar-fill');
const leaderboardList = document.getElementById('leaderboard');
const adsContainer = document.getElementById('ads-container');

let timeLeft = 60;
let score = 0;
let wpm = 0;
let gameTimer;
let typingTimer;
let leaderboard = [];

const randomParagraphs = [
  "This is a simple typing test. The goal is to type as quickly and accurately as possible.",
  "Practice makes perfect, so keep typing to improve your skills and speed!",
  "The quick brown fox jumps over the lazy dog. Type it as fast as you can!",
  "Learning to type faster will help you in every profession. Keep practicing!"
];

// Start Game
startBtn.addEventListener('click', () => {
  score = 0;
  wpm = 0;
  timeLeft = 60;
  typingBox.disabled = false;
  typingBox.value = '';
  typingBox.focus();
  startBtn.disabled = true;

  textDisplay.textContent = randomParagraphs[Math.floor(Math.random() * randomParagraphs.length)];

  gameTimer = setInterval(updateTimer, 1000);
  typingTimer = setInterval(updateWPM, 1000);
  adsContainer.style.display = "block"; // Show ads at the start
});

// Update Timer
function updateTimer() {
  if (timeLeft === 0) {
    clearInterval(gameTimer);
    clearInterval(typingTimer);
    typingBox.disabled = true;
    startBtn.disabled = false;
    alert(`Game Over! Your WPM: ${wpm}`);
    saveLeaderboard();
    showLeaderboard();
  } else {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    updateProgressBar();
  }
}

// Update Progress Bar
function updateProgressBar() {
  let percentage = (60 - timeLeft) / 60 * 100;
  progressBarFill.style.width = percentage + '%';
}

// Update Words Per Minute (WPM)
function updateWPM() {
  let typedWords = typingBox.value.split(' ').length;
  wpm = typedWords / (60 - timeLeft) * 60;
  wpmDisplay.textContent = Math.floor(wpm);
}

// Save and Show Leaderboard
function saveLeaderboard() {
  const name = prompt("Enter your name for the leaderboard:");
  leaderboard.push({ name: name, wpm: wpm });
  leaderboard = leaderboard.sort((a, b) => b.wpm - a.wpm); // Sort leaderboard
  if (leaderboard.length > 5) leaderboard.pop(); // Keep top 5 scores
}

function showLeaderboard() {
  leaderboardList.innerHTML = '';
  leaderboard.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = `${entry.name}: ${entry.wpm} WPM`;
    leaderboardList.appendChild(li);
  });
}

// Simulate an Ad (for monetization)
setInterval(() => {
  adsContainer.innerHTML = `<p>Advertisement: Check out our amazing offers!</p>`;
}, 5000);

// Additional Features: Ads & Monetization
// Add an ad system like Google AdSense or integrate custom ads based on the page's performance.
function switchLanguage(language) {
  const title = document.getElementById('title');
  const description = document.getElementById('description');

  // Switch content based on language selected
  if(language === 'en') {
    title.textContent = "Welcome to Typing Test";
    description.textContent = "Test your typing speed with a variety of words!";
  } else if(language === 'hi') {
    title.textContent = "टाइपिंग टेस्ट में आपका स्वागत है";
    description.textContent = "विभिन्न शब्दों के साथ अपनी टाइपिंग गति का परीक्षण करें!";
  }
}
function activatePremium() {
  // Code to unlock premium features like advanced lessons
  alert("Premium features unlocked!");
  // Replace or hide ads, and enable premium content
}
function changeTheme(color) {
  document.body.style.backgroundColor = color;
  alert(`Theme changed to ${color}`);
}
// Get elements
var modal = document.getElementById('premiumModal');
var btn = document.getElementById('premiumBtn');
var closeBtn = document.getElementById('closeModalBtn');
var subscribeBtn = document.getElementById('subscribeBtn');

// Show modal on button click
btn.onclick = function() {
  modal.style.display = "block";
}

// Close modal when close button is clicked
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// If user clicks subscribe button, trigger payment process
subscribeBtn.onclick = function() {
  // Call your payment gateway here (Stripe or PayPal)
  processPayment();
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
