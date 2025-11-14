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

  loadComponent('navbar', '/components/navbar.html', 'navbarLoaded');
  loadComponent('footer', '/omponents/footer.html', 'footerLoaded');
  loadComponent('pet-container', '/omponents/pet_card.html', 'petLoaded');
});
