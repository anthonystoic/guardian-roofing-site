(function () {
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.querySelector('.mobile-menu');
  var close = document.querySelector('.mobile-menu-close');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (close && menu) {
    close.addEventListener('click', function () {
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  document.querySelectorAll('.mobile-menu a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu && menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  document.querySelectorAll('form[data-mock]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = f.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Sent, we\'ll be in touch shortly'; btn.disabled = true; }
    });
  });
})();
