const openButton = document.querySelector('#open-sidebar-button');
const navbar = document.querySelector('.header__menu');

const media = window.matchMedia('(max-width: 767px)');

media.addEventListener('change', (event) => updateNavbar(event));

function updateNavbar(event) {
  const isMobile = event.matches;
  if (isMobile) {
    navbar.setAttribute('inert', '');
  }
  else {
    navbar.removeAttribute('inert');
  }
}

function openSidebar() {
  navbar.classList.toggle('show');
  openButton.setAttribute('aria-expanded', 'true');
  navbar.removeAttribute('inert');
}

function closeSidebar() {
  navbar.classList.remove('show');
  openButton.setAttribute('aria-expanded', 'false');
  navbar.setAttribute('inert', '');
}

updateNavbar(media);