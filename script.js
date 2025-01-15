// Header
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

// Contacts Form
const form = document.querySelector('.contacts__form');
const inputs = form.querySelectorAll('.input');
const submitButton = form.querySelector('.btn');

function checkFormValidity() {
  const allValid = Array.from(inputs).every(input => input.value.trim() !== '' && input.checkValidity());
  if (allValid) {
    submitButton.classList.remove('btn__disabled'); 
    submitButton.classList.add('btn__available'); 
    submitButton.disabled = false; 
  } else {
    submitButton.classList.remove('btn__available'); 
    submitButton.classList.add('btn__disabled'); 
    submitButton.disabled = true;
  }
}

inputs.forEach(input => {
  input.addEventListener('input', checkFormValidity);
});

form.addEventListener('reset', () => {
  submitButton.classList.remove('btn__available');
  submitButton.classList.add('btn__disabled');
  submitButton.disabled = true;
});

document.addEventListener('DOMContentLoaded', checkFormValidity);
