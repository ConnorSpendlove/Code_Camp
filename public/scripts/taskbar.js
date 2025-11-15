document.addEventListener("petLoaded", () => {
  const happinessFill = document.getElementById("happiness-fill");

  const THIRTY_MINUTES = 30 * 60 * 1000;

  let savedHappiness = parseInt(localStorage.getItem("happiness"));
  let happiness = isNaN(savedHappiness) ? 20 : savedHappiness;

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

  // expose the function globally if needed
  window.increaseHappiness = increaseHappiness;
});
