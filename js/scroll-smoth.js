const header = document.getElementById('siteHeader');

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 60) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }

  lastScroll = currentScroll;
});

const params = new URLSearchParams(window.location.search);
const query = params.get('q');
