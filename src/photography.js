(function () {
  'use strict';

  var PROJECT_ID = 'skutmuxd';
  var DATASET = 'photography';
  var BATCH_SIZE = 12;

  var currentOffset = 0;
  var loading = false;
  var allLoaded = false;
  var postsCache = []; // keep references for lightbox

  // --- Custom lightbox state ---
  var lightbox = null;       // DOM references object
  var lbPostIdx = -1;        // index into postsCache
  var lbImgIdx = 0;          // index within current post's images (on desktop)

  var mouseDownSound = new Audio('/assets/mouse-down.mov');
  mouseDownSound.preload = 'auto';
  mouseDownSound.load();

  var mouseUpSound = new Audio('/assets/mouse-up.mov');
  mouseUpSound.preload = 'auto';
  mouseUpSound.load();

  // --- Sanity image URL builder (no dependency needed) ---
  // Asset _ref format: "image-{hash}-{W}x{H}-{ext}"
  function imageUrl(ref, width) {
    var match = ref.match(/^image-(.+)-(\d+x\d+)-(\w+)$/);
    if (!match) return '';
    return (
      'https://cdn.sanity.io/images/' + PROJECT_ID + '/' + DATASET + '/' +
      match[1] + '-' + match[2] + '.' + match[3] +
      '?w=' + width + '&auto=format&q=80'
    );
  }

  // --- Fetch posts from Sanity HTTP API ---
  function fetchPosts(start, end) {
    var query = encodeURIComponent(
      '*[_type == "photographyPost"] | order(date desc) [$start...$end] { _id, title, date, "images": images[].asset._ref }'
    );
    var url =
      'https://' + PROJECT_ID + '.api.sanity.io/v2024-01-01/data/query/' +
      DATASET + '?query=' + query + '&$start=' + start + '&$end=' + end;

    return fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (json) { return json.result || []; });
  }

  // --- Render a single photo card ---
  function renderCard(post, index) {
    var coverRef = post.images[0];
    if (!coverRef) return null;

    var card = document.createElement('div');
    card.className = 'photo-card';
    card.style.animationDelay = (index % BATCH_SIZE) * 60 + 'ms';

    var img = document.createElement('img');
    img.src = imageUrl(coverRef, 600);
    img.alt = post.title || 'Photography';
    img.loading = 'lazy';
    img.draggable = false;
    card.appendChild(img);

    // Carousel badge
    if (post.images.length > 1) {
      var badge = document.createElement('span');
      badge.className = 'carousel-badge';
      badge.textContent = '1/' + post.images.length;
      card.appendChild(badge);
    }

    // Caption overlay
    if (post.title) {
      var caption = document.createElement('div');
      caption.className = 'photo-caption';
      // Show only first line of title for cleanliness
      var firstLine = post.title.split('\n')[0];
      caption.textContent = firstLine;
      card.appendChild(caption);
    }

    // Click → lightbox
    card.addEventListener('click', function () {
      openLightbox(post);
    });
    card.addEventListener('mousedown', playMouseDown);
    card.addEventListener('mouseup', playMouseUp);

    return card;
  }

  // --- Click sound (reuse site's existing audio) ---
  function playMouseDown() {
    try {
      mouseDownSound.currentTime = 0;
      var p = mouseDownSound.play();
      if (p !== undefined) {
        p.catch(function (e) { console.error('MouseDown Play Error:', e); });
      }
    } catch (e) {
      console.error('MouseDown Error:', e);
    }
  }

  function playMouseUp() {
    try {
      mouseUpSound.currentTime = 0;
      var p = mouseUpSound.play();
      if (p !== undefined) {
        p.catch(function (e) { console.error('MouseUp Play Error:', e); });
      }
    } catch (e) {
      console.error('MouseUp Error:', e);
    }
  }

  // --- Custom lightbox ---
  function buildLightbox() {
    if (lightbox) return;

    var overlay = document.createElement('div');
    overlay.className = 'ig-lightbox';

    overlay.innerHTML =
      '<button class="ig-lightbox-post-prev" aria-label="Previous post">&#8249;</button>' +
      '<div class="ig-lightbox-container">' +
      '<div class="ig-lightbox-stage">' +
      '<div class="ig-lightbox-spinner"><span></span></div>' +
      // No single img here; we append them dynamically
      '<button class="ig-lightbox-arrow ig-lightbox-prev" aria-label="Previous"><span>&#8249;</span></button>' +
      '<button class="ig-lightbox-arrow ig-lightbox-next" aria-label="Next"><span>&#8250;</span></button>' +
      '</div>' +
      '<div class="ig-lightbox-footer">' +
      '<div class="ig-lightbox-dots"></div>' +
      '<div class="ig-lightbox-caption"></div>' +
      '</div>' +
      '</div>' + // End of container
      '<div class="ig-lightbox-scroll-hint">&#xfe40;</div>' + // Out of container
      '<button class="ig-lightbox-post-next" aria-label="Next post">&#8250;</button>';



    document.body.appendChild(overlay);

    var container = overlay.querySelector('.ig-lightbox-container');
    var stage = overlay.querySelector('.ig-lightbox-stage');
    var prev = overlay.querySelector('.ig-lightbox-prev');
    var next = overlay.querySelector('.ig-lightbox-next');
    var dots = overlay.querySelector('.ig-lightbox-dots');
    var caption = overlay.querySelector('.ig-lightbox-caption');
    var postPrev = overlay.querySelector('.ig-lightbox-post-prev');
    var postNext = overlay.querySelector('.ig-lightbox-post-next');

    lightbox = {
      overlay: overlay, container: container, stage: stage,
      prev: prev, next: next, dots: dots, caption: caption,
      postPrev: postPrev, postNext: postNext
    };

    // Close on overlay click (not container)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });

    // Image navigation (left/right within post)
    prev.addEventListener('click', function (e) { e.stopPropagation(); navigateImage(-1); });
    next.addEventListener('click', function (e) { e.stopPropagation(); navigateImage(1); });

    // Post navigation (up/down between posts)
    postPrev.addEventListener('click', function (e) { e.stopPropagation(); navigatePost(-1); });
    postNext.addEventListener('click', function (e) { e.stopPropagation(); navigatePost(1); });

    // Click sounds for lightbox controls
    var buttons = [prev, next, postPrev, postNext];
    buttons.forEach(function (btn) {
      btn.addEventListener('mousedown', function (e) { e.stopPropagation(); playMouseDown(); });
      btn.addEventListener('mouseup', function (e) { e.stopPropagation(); playMouseUp(); });
    });

    overlay.addEventListener('mousedown', function (e) {
      if (e.target === overlay) playMouseDown();
    });
    overlay.addEventListener('mouseup', function (e) {
      if (e.target === overlay) playMouseUp();
    });

    // Keyboard: left/right = images (if multi) else posts, up/down = posts
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        navigatePost(-1, true);
      }
      if (e.key === 'ArrowRight') {
        navigatePost(1, true);
      }
      if (e.key === 'ArrowUp') { e.preventDefault(); navigatePost(-1, true); }
      if (e.key === 'ArrowDown') { e.preventDefault(); navigatePost(1, true); }
    });

    // Mouse wheel: scroll between posts
    overlay.addEventListener('wheel', function (e) {
      if (!overlay.classList.contains('active')) return;
      e.preventDefault();
      if (e.deltaY > 0) navigatePost(1);
      else if (e.deltaY < 0) navigatePost(-1);
    }, { passive: false });

    // Touch swipe: horizontal = images in post, vertical = between posts
    var touchStartX = 0;
    var touchStartY = 0;

    // We attach to overlay to catch swipes even if clicking outside image
    overlay.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    overlay.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;

      // Horizontal swipe (if significant) -> Navigate Image (but only if not already handled by native scroll)
      // Actually, since we use native scroll for images now, we might not need JS for horizontal.
      // But let's keep it for arrows or if user swipes on non-scrollable area.
      // HOWEVER, native scroll is better. Let's focus on VERTICAL for posts.

      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 50) {
        animatePostTransition(dy < 0 ? 1 : -1);
      }
    }, { passive: true });

    // Track horizontal scroll (Mobile) to update Dots & Arrows
    // 1. We need to know which image is in view.
    // 2. We trigger 'updateDotsAndArrows' on scroll.
    stage.addEventListener('scroll', function () {
      if (window.innerWidth <= 768) {
        updateMobileActiveIndex();
      }
    }, { passive: true });
  }

  function updateMobileActiveIndex() {
    if (!lightbox) return;
    var stage = lightbox.stage;
    var scrollLeft = stage.scrollLeft;
    var width = stage.clientWidth;
    if (width === 0) return;

    var idx = Math.round(scrollLeft / width);
    if (idx !== lbImgIdx) {
      lbImgIdx = idx;
      updateDots();
      updateArrows(); // Optional on mobile if using touch, but good for consistency
    }
  }

  function updateDots() {
    if (!lightbox) return;
    var dots = lightbox.dots.children;
    for (var i = 0; i < dots.length; i++) {
      if (i === lbImgIdx) dots[i].classList.add('active');
      else dots[i].classList.remove('active');
    }
  }

  function updateArrows() {
    if (!lightbox || lbPostIdx < 0) return;
    var post = postsCache[lbPostIdx];
    var total = post.images.length;

    // Hide if no prev/next text
    if (window.innerWidth <= 768) {
      lightbox.prev.style.display = 'none';
      lightbox.next.style.display = 'none';
    } else {
      lightbox.prev.style.display = lbImgIdx > 0 ? '' : 'none';
      lightbox.next.style.display = lbImgIdx < total - 1 ? '' : 'none';
    }

    // If single image, always hide (redundant check but safe)
    if (total <= 1) {
      lightbox.prev.style.display = 'none';
      lightbox.next.style.display = 'none';
    }
  }

  function animatePostTransition(dir) {
    if (!lightbox) return;
    var nextIdx = lbPostIdx + dir;
    if (nextIdx < 0 || nextIdx >= postsCache.length) return; // Boundary check

    // Hide scroll hint once user interacts
    var hint = lightbox.overlay.querySelector('.ig-lightbox-scroll-hint');
    if (hint) hint.classList.add('hidden');

    var container = lightbox.container;

    // 1. Animate Out
    var outClass = dir > 0 ? 'slide-up-out' : 'slide-down-out'; // moving to next (1) means current goes up
    container.classList.add(outClass);

    // 2. Wait for animation, then swap and Animate In
    setTimeout(function () {
      container.classList.remove(outClass);

      // Update Data
      lbPostIdx = nextIdx;
      lbImgIdx = 0; // reset to first image/cover
      updateLightbox();

      // Scroll container to start (horizontal)
      // lightbox.stage.scrollLeft = 0; // if stage is the scroll container
      // Actually stage is flex row, so yes.

      // Animate In
      var inClass = dir > 0 ? 'slide-up-in' : 'slide-down-in'; // coming from bottom if dir 1
      container.classList.add(inClass);

      setTimeout(function () {
        container.classList.remove(inClass);
      }, 400); // match CSS duration
    }, 300); // match CSS duration
  }

  function updateLightbox() {
    if (!lightbox || lbPostIdx < 0) return;
    var post = postsCache[lbPostIdx];
    var images = post.images;

    // Spinner
    var spinner = lightbox.overlay.querySelector('.ig-lightbox-spinner');
    spinner.style.display = 'flex';

    // Clear stage images (keeping spinner and arrows)
    // We want to keep the arrows and spinner, so remove all img elements
    var existingImgs = lightbox.stage.querySelectorAll('.ig-lightbox-img');
    existingImgs.forEach(function (el) { el.remove(); });

    // Render ALL images (Prefetching + Mobile Scroll)
    images.forEach(function (ref, idx) {
      var imgEl = document.createElement('img');
      imgEl.className = 'ig-lightbox-img';
      if (idx === lbImgIdx) imgEl.classList.add('active'); // for desktop carousel logic
      imgEl.src = imageUrl(ref, 1800);
      imgEl.alt = post.title || 'Photography';
      imgEl.draggable = false;

      // On desktop, we hide non-active images via CSS (or we can do it here inline if CSS fails)
      // Mobile shows all via CSS.
      // On desktop, we hide non-active images via CSS
      // Mobile shows all via CSS.


      if (idx === 0) {
        imgEl.onload = function () {
          spinner.style.display = 'none';
        };
        // If browser already has this image cached, hide spinner immediately
        if (imgEl.complete) {
          spinner.style.display = 'none';
        }
      }
      lightbox.stage.appendChild(imgEl); // just append, order matters
    });

    if (images.length === 0) spinner.style.display = 'none';

    // Dots (rebuild when post changes)
    lightbox.dots.innerHTML = '';
    if (images.length > 1) {
      for (var i = 0; i < images.length; i++) {
        var dot = document.createElement('span');
        dot.className = 'ig-lightbox-dot' + (i === lbImgIdx ? ' active' : '');
        lightbox.dots.appendChild(dot);
      }
    }

    // Show/hide image arrows (Standard logic)
    // We defer to updateArrows() now, which handles index logic
    updateArrows();

    // Caption
    lightbox.caption.textContent = post.title ? post.title.split('\n')[0] : '';
    lightbox.caption.style.display = post.title ? '' : 'none';

    // nav visibility (Post arrows)
    if (window.innerWidth <= 768) {
      lightbox.postPrev.style.display = 'none';
      lightbox.postNext.style.display = 'none';
    } else {
      lightbox.postPrev.style.display = '';
      lightbox.postNext.style.display = '';
      lightbox.postPrev.style.opacity = lbPostIdx > 0 ? '1' : '0.3';
      lightbox.postNext.style.opacity = lbPostIdx < postsCache.length - 1 ? '1' : '0.3';
    }

    // Vertical Scroll Hint (Mobile)
    var hint = lightbox.overlay.querySelector('.ig-lightbox-scroll-hint');
    if (hint) {
      // Show hint if there is a next post AND user hasn't scrolled yet
      if (lbPostIdx < postsCache.length - 1 && !hint.classList.contains('hidden')) {
        hint.style.display = '';
      } else {
        hint.style.display = 'none';
      }
    }
  }


  function navigateImage(dir, sound) {
    var post = postsCache[lbPostIdx];
    if (!post || post.images.length <= 1) return;
    var next = lbImgIdx + dir;
    if (next >= 0 && next < post.images.length) {
      lbImgIdx = next;
      if (sound) {
        playMouseDown();
        setTimeout(playMouseUp, 150);
      }
      // Update view (switches active image on desktop)
      // On mobile, this logic might be weird if user scrolled. 
      // But preserving desktop arrow logic is fine.
      updateLightbox();
    }
  }

  function navigatePost(dir, sound) {
    var next = lbPostIdx + dir;

    // If we are trying to go to the next post but we are at the end, load more
    if (dir === 1 && next >= postsCache.length && !allLoaded && !loading) {
      loadMore().then(function () {
        // After loading, postsCache should have new items
        if (next < postsCache.length) {
          navigatePost(dir, sound);
        }
      });
      return;
    }

    if (next >= 0 && next < postsCache.length) {
      // Hide scroll hint
      var hint = lightbox.overlay.querySelector('.ig-lightbox-scroll-hint');
      if (hint) hint.classList.add('hidden');

      lbPostIdx = next;
      lbImgIdx = 0;
      if (sound) {
        // The logic below works!
        // but it's commented out since the style of the button isn't physical enough.
        // TODO: Bring back after button feels more physical.
        // playMouseDown();
        // setTimeout(playMouseUp, 150);
      }
      updateLightbox();
    }
  }

  function openLightbox(post) {
    buildLightbox();

    lbPostIdx = postsCache.indexOf(post);
    lbImgIdx = 0;

    updateLightbox();
    lightbox.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --- Load next batch ---
  function loadMore() {
    if (loading || allLoaded) return Promise.resolve();
    loading = true;

    var sentinel = document.getElementById('photo-sentinel');
    sentinel.classList.add('active');

    return fetchPosts(currentOffset, currentOffset + BATCH_SIZE).then(function (posts) {
      if (posts.length < BATCH_SIZE) allLoaded = true;
      if (posts.length === 0) {
        sentinel.classList.remove('active');
        sentinel.style.display = 'none';
        loading = false;
        return;
      }

      var grid = document.getElementById('photo-grid');
      posts.forEach(function (post, i) {
        postsCache.push(post);
        var card = renderCard(post, i);
        if (card) grid.appendChild(card);
      });

      currentOffset += posts.length;
      loading = false;

      if (allLoaded) {
        sentinel.classList.remove('active');
        sentinel.style.display = 'none';
      } else {
        sentinel.classList.remove('active');
      }
    }).catch(function (err) {
      console.error('Failed to fetch photos:', err);
      loading = false;
      sentinel.classList.remove('active');
    });
  }

  // --- Infinite scroll ---
  function setupInfiniteScroll() {
    var sentinel = document.getElementById('photo-sentinel');
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting && !loading && !allLoaded) {
          loadMore();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(sentinel);
  }

  // --- Cinematic photo-mode toggle ---
  function setupPhotoMode() {
    var section = document.getElementById('photography');
    if (!section) return;

    var snapped = false;
    var scrollDir = 'down';
    var prevScrollY = window.scrollY;

    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      scrollDir = y > prevScrollY ? 'down' : 'up';
      prevScrollY = y;
    }, { passive: true });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var visibleHeight = entry.intersectionRect.height;
          var viewportHeight = window.innerHeight;
          // Activate when the photography section covers > 20% of the viewport
          if (visibleHeight > viewportHeight * 0.2) {
            document.body.classList.add('photo-mode');
            // Snap to section top when first entering photo-mode while scrolling down
            if (!snapped && scrollDir === 'down' && entry.boundingClientRect.top > 0) {
              snapped = true;
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else {
            document.body.classList.remove('photo-mode');
            snapped = false;
          }
        });
      },
      {
        threshold: (function () {
          var t = [];
          for (var i = 0; i <= 20; i++) t.push(i / 20);
          return t;
        })(),
      }
    );
    observer.observe(section);
  }

  // --- Initialize on DOM ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    loadMore();
    setupInfiniteScroll();
    setupPhotoMode();
  }
})();
