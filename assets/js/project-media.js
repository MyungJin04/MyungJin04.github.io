(() => {
  const videos = document.querySelectorAll('.js-lazy-video');
  if (!videos.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const loadVideo = (video) => {
    if (video.dataset.loaded === 'true') return;

    video.querySelectorAll('source[data-src]').forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
    });
    video.dataset.loaded = 'true';
    video.load();
  };

  videos.forEach((video) => {
    if (reduceMotion) {
      video.removeAttribute('autoplay');
      video.controls = true;
    }
  });

  if (!('IntersectionObserver' in window)) {
    videos.forEach((video) => {
      loadVideo(video);
      if (!reduceMotion) video.play().catch(() => {});
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          loadVideo(video);
          if (!reduceMotion) video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      });
    },
    { rootMargin: '200px 0px', threshold: 0.01 }
  );

  videos.forEach((video) => observer.observe(video));
})();
