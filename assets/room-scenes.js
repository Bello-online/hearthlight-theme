/* Room scenes: prev/next buttons for the scroll-snap track. No dependencies.
   Native scrolling, keyboard and touch all keep working without this script. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function init(root) {
    if (root.dataset.roomScenesReady === 'true') return;
    var track = root.querySelector('[data-track]');
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    if (!track || !prev || !next) return;
    root.dataset.roomScenesReady = 'true';

    function stepSize() {
      var card = track.querySelector('[data-card]');
      if (!card) return track.clientWidth;
      var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      return card.getBoundingClientRect().width + gap;
    }

    function scrollByCards(direction) {
      track.scrollBy({
        left: direction * stepSize(),
        top: 0,
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
    }

    function update() {
      var overflow = track.scrollWidth - track.clientWidth;
      var atStart = track.scrollLeft <= 1;
      var atEnd = track.scrollLeft >= overflow - 1;
      root.classList.toggle('room-scenes--overflow', overflow > 1);
      prev.disabled = atStart;
      next.disabled = atEnd;
    }

    prev.addEventListener('click', function () {
      scrollByCards(-1);
    });
    next.addEventListener('click', function () {
      scrollByCards(1);
    });

    var frame = 0;
    track.addEventListener(
      'scroll',
      function () {
        if (frame) return;
        frame = window.requestAnimationFrame(function () {
          frame = 0;
          update();
        });
      },
      { passive: true }
    );

    if ('ResizeObserver' in window) {
      new ResizeObserver(update).observe(track);
    } else {
      window.addEventListener('resize', update);
    }

    update();
  }

  function initAll(scope) {
    var roots = (scope || document).querySelectorAll('[data-room-scenes]');
    Array.prototype.forEach.call(roots, init);
  }

  initAll();

  // Theme editor: re-run when the section is added or re-rendered.
  document.addEventListener('shopify:section:load', function (event) {
    initAll(event.target);
  });
})();
