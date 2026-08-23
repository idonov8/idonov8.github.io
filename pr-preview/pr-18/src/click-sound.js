// Shared click-sound module — used by script.js and photography.js
(function () {
  var down = new Audio('/assets/mouse-down.mov');
  down.preload = 'auto';
  down.load();

  var up = new Audio('/assets/mouse-up.mov');
  up.preload = 'auto';
  up.load();

  function play(sound) {
    try {
      sound.currentTime = 0;
      var p = sound.play();
      if (p !== undefined) p.catch(function () {});
    } catch (_) {}
  }

  window.clickSound = {
    down: function () { play(down); },
    up:   function () { play(up); }
  };
})();
