document.addEventListener('DOMContentLoaded', () => {
  const loadComponent = async (id, file, eventName) => {
    const response = await fetch(file);
    if (response.ok) {
      document.getElementById(id).innerHTML = await response.text();
      if (eventName) {
        document.dispatchEvent(new Event(eventName));
      }
    }
  };
  
  loadComponent('navbar', 'components/navbar.html', 'navbarLoaded');
  loadComponent('footer', 'components/footer.html', 'footerLoaded');
  loadComponent('pet-container', 'components/pet_card.html', 'petLoaded');

  // Wait for navbar to load before adding event listeners
  document.addEventListener('navbarLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const closeNav = document.getElementById('closeNav');

    if (!hamburger || !mobileNav || !closeNav) return;

    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
    });

    closeNav.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });

    // Optional: close if user clicks outside panel
    window.addEventListener('click', (e) => {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        e.target !== hamburger
      ) {
        mobileNav.classList.remove('open');
      }
    });
  });
});
