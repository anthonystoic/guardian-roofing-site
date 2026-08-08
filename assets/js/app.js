/* Meta Pixel Code */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2370856260405632');
fbq('track', 'PageView');
/* End Meta Pixel Code */

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

  /* ------------------------------------------------------------------ *
   *  CONTACT / QUOTE FORMS  ->  email via Web3Forms
   *  Get a free access key at https://web3forms.com (enter the inbox
   *  address, e.g. tyler@guardingthefort.com; the key is emailed to you).
   *  Paste that key below. This is the ONLY value you need to change.
   * ------------------------------------------------------------------ */
  var WEB3FORMS_ACCESS_KEY = '55f824fd-ff96-4e85-8cff-653cb9e823d6';

  function showLeadError(f, btn, original) {
    var box = f.querySelector('.form-error');
    if (!box) {
      box = document.createElement('p');
      box.className = 'form-error';
      f.appendChild(box);
    }
    box.innerHTML = 'Sorry, something went wrong sending your request. Please call or text ' +
      '<a href="tel:+12606198026">260-619-8026</a> and we\'ll take care of you.';
    if (btn) { btn.disabled = false; btn.innerHTML = original; }
  }

  function showLeadSuccess(f) {
    var name = (f.querySelector('[name="fn"]') || {}).value || '';
    var wrap = document.createElement('div');
    wrap.className = 'form-success';
    wrap.innerHTML =
      '<div class="form-success-mark">✓</div>' +
      '<h3>Request received' + (name ? ', ' + name : '') + '!</h3>' +
      '<p>Thanks for reaching out. Tyler reviews every request personally and will ' +
      'get back to you within one business day. Need us sooner? Call or text ' +
      '<a href="tel:+12606198026">260-619-8026</a>.</p>';
    f.parentNode.replaceChild(wrap, f);
    wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  document.querySelectorAll('form[data-lead-form]').forEach(function (f) {
    // spam honeypot (bots fill this; humans never see it)
    if (!f.querySelector('[name="botcheck"]')) {
      var hp = document.createElement('input');
      hp.type = 'checkbox'; hp.name = 'botcheck'; hp.tabIndex = -1;
      hp.setAttribute('autocomplete', 'off');
      hp.style.cssText = 'position:absolute;left:-9999px;opacity:0;height:0;width:0;';
      f.appendChild(hp);
    }

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = f.querySelector('button[type="submit"]');
      var original = btn ? btn.innerHTML : '';
      var errBox = f.querySelector('.form-error');
      if (errBox) { errBox.remove(); }

      if (WEB3FORMS_ACCESS_KEY.indexOf('REPLACE_WITH') === 0) {
        console.error('Web3Forms access key not set in assets/js/app.js — form not wired yet.');
        showLeadError(f, btn, original);
        return;
      }

      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      var data = new FormData(f);
      data.append('access_key', WEB3FORMS_ACCESS_KEY);
      data.append('from_name', 'Guardian Roofing Website');
      if (!data.get('subject')) {
        data.append('subject', f.getAttribute('data-subject') || 'New website lead - Guardian Roofing');
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json && json.success) {
            if (typeof fbq === 'function') {
              fbq('track', 'Lead', {
                content_name: f.getAttribute('data-subject') || 'Website lead'
              });
            }
            showLeadSuccess(f);
          }
          else { showLeadError(f, btn, original); }
        })
        .catch(function () { showLeadError(f, btn, original); });
    });
  });
})();
