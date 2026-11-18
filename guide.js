// 使い方ガイド: 画面に入ったものをふわっと出す・目次の今いる場所を光らせる
(function () {
  var items = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });

  // STEP 3 のトグルは、設定の絵がしっかり見えてからオンにする
  var setIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("on"); setIo.unobserve(e.target); }
    });
  }, { threshold: 0.7 });
  document.querySelectorAll(".set").forEach(function (el) { setIo.observe(el); });

  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove("on"); });
      var a = map[e.target.id];  // ヒーローに戻ったときは a がないので、どれも光らせない
      if (a) {
        a.classList.add("on");
        var bar = a.parentNode;
        bar.scrollTo({ left: a.offsetLeft - 20, behavior: "smooth" });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  var hero = document.querySelector(".ghero");
  if (hero) spy.observe(hero);
  Object.keys(map).forEach(function (id) {
    var s = document.getElementById(id);
    if (s) spy.observe(s);
  });
})();

