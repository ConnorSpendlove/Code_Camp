const happinessFill = document.getElementById("happiness-fill");
const THIRTY_MINUTES =  30 * 60 * 1000;

// Load happiness from localStorage or default to 20
let savedHappiness = parseInt(localStorage.getItem("happiness"));
let happiness;
if (!isNaN(savedHappiness)) {
  happiness = savedHappiness;
} else {
  happiness = 20;
}

// Update the happiness bar immediately
happinessFill.style.width = happiness + "%";

// Increase happiness bar
function increaseHappiness() {
  happiness = Math.min(happiness + 10, 100);
  happinessFill.style.width = happiness + "%";

  //Save value
  localStorage.setItem("happiness", happiness);
}

//Function to decrease happiness bar
function decreaseHappiness() {
  happiness = Math.max(0, happiness - 5);
  happinessFill.style.width = happiness + "%";
  localStorage.setItem("happiness", happiness);
}

//Interval of every 30 minutes to decrease hapiness
setInterval(decreaseHappiness, THIRTY_MINUTES);

