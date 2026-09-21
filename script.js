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


function updateMuseumClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  document.querySelector(".second-hand").style.transform =
    `translateX(-50%) rotate(${secondAngle}deg)`;

  document.querySelector(".minute-hand").style.transform =
    `translateX(-50%) rotate(${minuteAngle}deg)`;

  document.querySelector(".hour-hand").style.transform =
    `translateX(-50%) rotate(${hourAngle}deg)`;

  const date = document.getElementById("clock-date");

  if (date) {
    date.textContent = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  }
}

updateMuseumClock();
setInterval(updateMuseumClock, 1000);