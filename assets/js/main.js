/* =====================================================================
   SITE SETTINGS — the only two things to edit as the pieces go live
   ---------------------------------------------------------------------
   checkoutUrl : paste ONE checkout link between the quotes. Either
             - a Stripe Payment Link (starts with https://buy.stripe.com/), or
             - a Shopify product link.
             Every "Order" button then becomes "Buy now" and opens that
             checkout. While it is empty, the buttons send the visitor to the
             contact form with the product pre-selected, so nothing is broken.
   bookingUrl : paste a Microsoft Bookings (or other calendar) link. The
             contact page then shows an "Open the calendar" button. While it
             is empty, dealers use the inquiry form.
   ===================================================================== */
var AAC = {
  checkoutUrl: 'https://advancedautomotiveconcepts.myshopify.com/products/safelink-bicycle-gps-tracker-gls11',
  bookingUrl: ''
};

document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  var burgerBtn = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      burgerBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        burgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Buy buttons: open the checkout once checkoutUrl is set, otherwise the contact form
  if (/^https:\/\//.test(AAC.checkoutUrl)) {
    document.querySelectorAll('[data-buy]').forEach(function (a) {
      a.href = AAC.checkoutUrl;
      a.textContent = a.getAttribute('data-buy-label') || 'Buy now';
    });
    document.querySelectorAll('[data-when-live]').forEach(function (el) { el.hidden = false; });
    document.querySelectorAll('[data-when-not-live]').forEach(function (el) { el.hidden = true; });
  }

  // Dealer economics calculator: plain arithmetic on what the visitor types
  var calc = document.getElementById('calcForm');
  if (calc) {
    var money = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
    var run = function () {
      var units = Math.max(0, parseFloat(document.getElementById('c-units').value) || 0);
      var pen = Math.min(100, Math.max(0, parseFloat(document.getElementById('c-pen').value) || 0)) / 100;
      var grossRaw = document.getElementById('c-gross').value;
      var gross = parseFloat(grossRaw);
      var sold = units * pen;
      document.getElementById('o-units').textContent = Math.round(sold).toLocaleString('en-US');
      var ok = grossRaw !== '' && gross >= 0;
      document.getElementById('o-month').textContent = ok ? money(sold * gross) : '—';
      document.getElementById('o-year').textContent = ok ? money(sold * gross * 12) : '—';
      document.getElementById('o-pvr').textContent = ok ? money(pen * gross) : '—';
      var cta = document.getElementById('calcCta');
      if (cta) cta.href = 'contact.html?interest=Dealer%20F%26I%20program&units=' + Math.round(units) + '&pen=' + Math.round(pen * 100);
    };
    calc.addEventListener('input', run);
    run();
  }

  // Product gallery: switch between the poster and the two videos
  var gallery = document.querySelector('[data-gallery]');
  if (gallery) {
    var mainImg = document.getElementById('galleryMain');
    var mainVid = document.getElementById('galleryVideo');
    gallery.querySelectorAll('.thumb').forEach(function (t) {
      t.addEventListener('click', function () {
        gallery.querySelectorAll('.thumb').forEach(function (o) {
          o.classList.toggle('is-active', o === t);
          o.setAttribute('aria-pressed', o === t ? 'true' : 'false');
        });
        if (t.dataset.video) {
          mainImg.hidden = true;
          mainVid.hidden = false;
          mainVid.poster = t.dataset.poster;
          mainVid.src = t.dataset.video;
          mainVid.play().catch(function () {});
        } else {
          mainVid.pause();
          mainVid.removeAttribute('src');
          mainVid.load();
          mainVid.hidden = true;
          mainImg.hidden = false;
        }
      });
    });
  }

  // Sticky buy bar on phones: visible whenever the main buy button is off screen
  var sticky = document.getElementById('stickyBuy');
  var mainBuy = document.querySelector('#buy [data-buy]');
  if (sticky && mainBuy && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      sticky.hidden = entries[0].isIntersecting;
    }).observe(mainBuy);
  }

  // Only one video plays at a time
  var vids = document.querySelectorAll('video');
  vids.forEach(function (v) {
    v.addEventListener('play', function () {
      vids.forEach(function (o) { if (o !== v) o.pause(); });
    });
  });
});
