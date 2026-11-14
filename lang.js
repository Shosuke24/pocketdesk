// 日本語・英語の切り替え（初めは端末の言語。選んだら覚える）
(function () {
  var KEY = "pocketdesk-lang";
  function pick() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === "ja" || saved === "en") return saved;
    } catch (e) {}
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "ja" || q === "en") return q;
    return (navigator.language || "").toLowerCase().indexOf("ja") === 0 ? "ja" : "en";
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
    var t = document.querySelector('meta[name="title-' + lang + '"]');
    if (t) document.title = t.content;
  }
  apply(pick());
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".langs button");
    if (!b) return;
    try { localStorage.setItem(KEY, b.dataset.lang); } catch (err) {}
    apply(b.dataset.lang);
  });
})();
