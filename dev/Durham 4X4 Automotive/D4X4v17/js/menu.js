document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById('menuIcon');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuIcon && mobileMenu) {
    menuIcon.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('show');
      menuIcon.setAttribute('aria-expanded', isOpen);
      menuIcon.classList.toggle('active', isOpen);
    });
  }
});
