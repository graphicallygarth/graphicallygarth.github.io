document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById('menuIcon');
  const mainLinks = document.getElementById('mainLinks');

  if (menuIcon && mainLinks) {
    menuIcon.addEventListener('click', function () {
      mainLinks.classList.toggle('open');
      menuIcon.setAttribute('aria-expanded', mainLinks.classList.contains('open'));
    });
  }
});