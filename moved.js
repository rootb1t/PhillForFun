// Moved to phill.rootb1t.com. Loaded first on every page.
// On the old address (GitHub Pages) every visit is forwarded to the new domain with the same page, query and hash.
// The member's account key lives in this origin's localStorage, so it travels in the URL fragment (never sent to any
// server) and is removed from the address bar right after arrival.
(function () {
  var SITE_ORIGIN = "https://phill.rootb1t.com";
  var ACCOUNT_KEY = "phill_account_key";
  var MOVE = "#__move=";
  if (location.hostname === "rootb1t.github.io") {
    var key = "";
    try { key = localStorage.getItem(ACCOUNT_KEY) || ""; } catch (_) {}
    var page = location.pathname.replace(/^\/PhillForFun(\/|$)/, "/");
    var target = location.hash || "";
    var hash = key ? MOVE + encodeURIComponent(key) + "&to=" + encodeURIComponent(target) : target;
    location.replace(SITE_ORIGIN + page + location.search + hash);
    return;
  }
  if (location.hash.indexOf(MOVE) === 0) {
    var p = new URLSearchParams(location.hash.slice(2));
    var k = p.get("_move") || "";
    try { if (k && !localStorage.getItem(ACCOUNT_KEY)) localStorage.setItem(ACCOUNT_KEY, k); } catch (_) {}
    history.replaceState(null, "", location.pathname + location.search + (p.get("to") || ""));
  }
})();
