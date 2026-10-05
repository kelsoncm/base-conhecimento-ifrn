/**
 * Analytics Events Tracking - Base de Conhecimento TIC IFRN
 * 
 * Monitora eventos de interação (cópia de código, cliques em sistemas
 * institucionais e expansão de detalhes) respeitando o consentimento LGPD.
 */
(function () {
  "use strict";

  /**
   * Verifica se o usuário aceitou o consentimento de cookies para analytics.
   * @returns {boolean}
   */
  function hasAnalyticsConsent() {
    if (typeof __md_get !== "function") {
      return false;
    }
    var consent = __md_get("__consent");
    return Boolean(consent && consent.analytics);
  }

  /**
   * Envia evento para o Google Analytics 4 via gtag ou dataLayer.
   * @param {string} eventName
   * @param {Object} eventParams
   */
  function sendGaEvent(eventName, eventParams) {
    if (!hasAnalyticsConsent()) {
      return;
    }

    if (typeof gtag === "function") {
      gtag("event", eventName, eventParams);
    } else if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: eventName }, eventParams));
    }
  }

  /**
   * Categoriza sistemas institucionais e plataformas externas com base no hostname.
   * @param {string} hostname
   * @returns {string}
   */
  function classifySystem(hostname) {
    if (hostname.indexOf("suap.ifrn.edu.br") !== -1) return "SUAP";
    if (hostname.indexOf("wifi.ifrn.edu.br") !== -1) return "Wi-Fi IFRN";
    if (hostname.indexOf("ifrn.edu.br") !== -1) return "Portal IFRN";
    if (hostname.indexOf("rnp.br") !== -1) return "RNP / Infovia";
    if (
      hostname.indexOf("portal.azure.com") !== -1 ||
      hostname.indexOf("microsoft.com") !== -1 ||
      hostname.indexOf("office.com") !== -1
    ) {
      return "Microsoft 365 / Azure";
    }
    if (hostname.indexOf("github.com") !== -1) return "GitHub";
    if (hostname.indexOf("tinyurl.com") !== -1) return "Manuais IFRN";
    return "Outro Externo";
  }

  /**
   * Inicializa os listeners de eventos usando event delegation no body.
   */
  function initAnalyticsListeners() {
    // 1. Rastreamento de cópia de comandos e scripts
    document.body.addEventListener("click", function (event) {
      var copyBtn = event.target.closest(".md-clipboard");
      if (!copyBtn) return;

      var codeBlock = copyBtn.closest(".highlight") || copyBtn.parentElement;
      var language = "code";

      if (codeBlock) {
        var codeElem = codeBlock.querySelector("code");
        if (codeElem && codeElem.className) {
          var match = codeElem.className.match(/language-([\w-]+)/);
          if (match) language = match[1];
        }
        if (language === "code" && codeBlock.className) {
          var blockMatch = codeBlock.className.match(/language-([\w-]+)/);
          if (blockMatch) language = blockMatch[1];
        }
      }

      sendGaEvent("code_copy", {
        page_path: window.location.pathname,
        code_language: language
      });
    });

    // 2. Rastreamento de links externos e sistemas institucionais
    document.body.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (!link || !link.href) return;

      try {
        var url = new URL(link.href, window.location.origin);
        if (url.protocol !== "http:" && url.protocol !== "https:") return;

        if (url.hostname !== window.location.hostname) {
          var system = classifySystem(url.hostname);
          sendGaEvent("outbound_click", {
            page_path: window.location.pathname,
            destination_url: url.href,
            destination_hostname: url.hostname,
            system_name: system,
            link_text: (link.textContent || "").trim().slice(0, 80)
          });
        }
      } catch (err) {
        // Ignora URLs inválidas
      }
    });

    // 3. Rastreamento de expansão de detalhes e troubleshooting
    document.body.addEventListener(
      "toggle",
      function (event) {
        var target = event.target;
        if (target && target.tagName === "DETAILS" && target.open) {
          var summary = target.querySelector("summary");
          var title = summary ? (summary.textContent || "").trim() : "Detalhes";

          sendGaEvent("expand_details", {
            page_path: window.location.pathname,
            section_title: title.slice(0, 80)
          });
        }
      },
      true
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnalyticsListeners);
  } else {
    initAnalyticsListeners();
  }
})();
