// Array of quotes
const quotes = [
  "You are stronger than you think.",
  "Every day is a fresh start.",
  "Progress, not perfection.",
  "You deserve happiness and peace.",
  "Take it one step at a time.",
  "You are doing better than you think.",
  "Self-care is not selfish.",
  "It's okay to take a break.",
  "You are enough, just as you are.",
  "Small steps lead to big changes.",
  "Be kind to yourself today.",
  "You've survived 100% of your bad days.",
  "This too shall pass.",
  "You are capable of amazing things.",
  "Your feelings are valid.",
  "Take a deep breath. You've got this.",
  "You are not alone in this.",
  "It's okay to ask for help.",
  "You are worthy of love and care.",
  "Every moment is a new beginning.",
  "You are braver than you believe.",
  "Trust the process.",
  "You matter.",
  "Be gentle with yourself.",
  "You are doing your best, and that's enough.",
  "Growth takes time, and that's okay.",
  "You have the power to change your day.",
  "Remember to breathe.",
  "You are loved.",
  "Today is a good day to have a good day."
];

// Get quote of the day based on date
function getQuoteOfTheDay() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const quoteIndex = dayOfYear % quotes.length;
  return quotes[quoteIndex];
}

// Display quote of the day
function displayQuoteOfTheDay() {
  const quoteElement = document.getElementById("quote-of-the-day");
  if (quoteElement) {
    quoteElement.textContent = getQuoteOfTheDay();
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', displayQuoteOfTheDay);
} else {
  displayQuoteOfTheDay();
}

