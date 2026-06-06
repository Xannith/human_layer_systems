/*
 * toolkit-gate.js
 *
 * CLIENT-SIDE ONLY -- THIS IS NOT REAL SECURITY.
 *
 * This gate deters casual discovery of the /toolkit path. It is not genuine
 * access control. The HTML files remain directly reachable by URL, and anyone
 * who views source can read the passphrase below.
 *
 * To enforce real access control, use a host-level mechanism instead:
 *   - Cloudflare Access (zero-trust, no code required)
 *   - Netlify password protection (netlify.toml or project dashboard)
 *   - Vercel password protection (project settings)
 *   - HTTP basic auth configured at the server or CDN layer
 *
 * To rotate access: change PASSPHRASE below and redeploy.
 */
(function () {
  var PASSPHRASE  = "fluency2026";
  var SESSION_KEY = "hls_toolkit_auth";

  if (sessionStorage.getItem(SESSION_KEY) === "ok") return;

  /* Hide the page until the gate resolves so there is no flash of content. */
  document.documentElement.style.visibility = "hidden";

  function showGate() {
    var overlay = document.createElement("div");
    overlay.className = "tk-gate-overlay";
    overlay.innerHTML =
      '<div class="tk-gate-box">' +
        '<h2>AI Fluency Toolkit</h2>' +
        '<p>Internal practitioner tool. Enter the passphrase to continue.</p>' +
        '<input class="tk-gate-input" type="password" placeholder="Passphrase" autocomplete="current-password">' +
        '<button class="tk-gate-btn">Enter</button>' +
        '<div class="tk-gate-error" id="tk-gate-err"></div>' +
      '</div>';

    document.body.appendChild(overlay);
    document.documentElement.style.visibility = "";

    var input = overlay.querySelector(".tk-gate-input");
    var btn   = overlay.querySelector(".tk-gate-btn");
    var err   = document.getElementById("tk-gate-err");

    input.focus();

    function attempt() {
      if (input.value === PASSPHRASE) {
        sessionStorage.setItem(SESSION_KEY, "ok");
        overlay.remove();
      } else {
        err.textContent = "Incorrect passphrase.";
        input.value = "";
        input.focus();
      }
    }

    btn.addEventListener("click", attempt);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") attempt();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showGate);
  } else {
    showGate();
  }
}());
