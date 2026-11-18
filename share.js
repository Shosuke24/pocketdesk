// iPhone で見ているとき: 共有シートでこのページを Mac に送る（AirDrop など）
(function () {
  if (!navigator.share) return;
  document.documentElement.classList.add("can-share");
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".share")) return;
    navigator.share({ title: document.title, url: "https://shosuke24.github.io/pocketdesk/guide.html#start" }).catch(function () {});
  });
})();
