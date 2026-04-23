function animateCounter(el, target, duration) {
  var start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = Math.min((timestamp - start) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function () {
  var counters = document.querySelectorAll('.stat-num[data-target]');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var statEl = entry.target;
        var target = parseInt(statEl.dataset.target, 10);
        var countEl = statEl.querySelector('.count');
        var duration = Math.max(800, target * 30);
        animateCounter(countEl, target, duration);
        observer.unobserve(statEl);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
});
