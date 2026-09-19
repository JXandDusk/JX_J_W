// Keep native anchors, browser history, and keyboard behavior intact.
// CSS controls smooth scrolling and respects reduced-motion preferences.
const navigationLinks = document.querySelectorAll('nav a[href^="#"]');
function updateCurrentSection() {
  navigationLinks.forEach(link => {
    if (link.getAttribute('href') === window.location.hash) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
window.addEventListener('hashchange', updateCurrentSection);
updateCurrentSection();
