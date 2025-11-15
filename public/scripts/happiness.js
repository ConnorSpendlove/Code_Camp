function initHappinessBar() {
  const happinessFill = document.getElementById("happiness-fill");
  if (!happinessFill) {
    console.warn("Happiness bar not found yet.");
    return;
  }

  const THIRTY_MINUTES = 30 * 60 * 1000;

  let savedHappiness = parseInt(localStorage.getItem("happiness"));
  let happiness = !isNaN(savedHappiness) ? savedHappiness : 20;

  happinessFill.style.width = happiness + "%";

  function increaseHappiness() {
    happiness = Math.min(happiness + 10, 100);
    happinessFill.style.width = happiness + "%";
    localStorage.setItem("happiness", happiness);
  }

  function decreaseHappiness() {
    happiness = Math.max(0, happiness - 5);
    happinessFill.style.width = happiness + "%";
    localStorage.setItem("happiness", happiness);
  }

  setInterval(decreaseHappiness, THIRTY_MINUTES);

  window.increaseHappiness = increaseHappiness;
}

// Wait for pet card to load
document.addEventListener("petLoaded", initHappinessBar);
