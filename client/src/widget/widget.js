// ============================================================
// widget.js — Embeddable chat widget for external websites
// Loads a chat iframe on any page via a single <script> tag.
// ============================================================

// IIFE wrapper: makes `return` statements legal (early exit without errors)
// and keeps all variables out of the global scope.
(function () {

  // GUARD 1 — Iframe detection:
  // If this script somehow runs inside the iframe it created, bail immediately.
  // This prevents the widget from recursively injecting itself inside itself.
  if (window.self !== window.top) return;

  // GUARD 2 — Singleton:
  // Prevents double-injection from Vite HMR, React StrictMode double-mount,
  // or duplicate <script> tags on the host page.
  if (window.__SYD_WIDGET_INITIALIZED__) return;
  window.__SYD_WIDGET_INITIALIZED__ = true;

  // Inline SVG icons — avoids CORS issues from unpkg/CDN imports
  const messageCircleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`;
  const xSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  // document.currentScript is null inside type="module" scripts.
  // Query the script tag manually to read its data-business-id attribute.
  const scriptTag = document.querySelector('script[src*="widget.js"]');

  // Handle both cases: DOM not ready yet, or already ready (async/defer loads).
  // Previously only `DOMContentLoaded` was used — this missed already-loaded documents.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => addWidget(scriptTag));
  } else {
    addWidget(scriptTag);
  }

  function addWidget(scriptTag) {
    // Read businessId from the script tag's data attribute
    // optional chaining: safety net so code doesn't crash if attributes are missing
    const id = scriptTag?.dataset?.businessId;
    if (!id) return;

    // GUARD 3 — DOM duplicate prevention:
    // Prevents a second button/iframe being appended if addWidget is somehow called twice.
    if (document.getElementById('syd-chat-button')) return;

    // ── CREATE LAUNCHER BUTTON ─────────────────────────────────────────────
    const button = document.createElement('button');
    button.id = 'syd-chat-button'; // ID used by GUARD 3 above
    button.innerHTML = messageCircleSvg;
    button.setAttribute('aria-label', 'Open chat');

    Object.assign(button.style, {
      position: 'fixed',
      right: '24px',
      bottom: '24px',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      border: 'none',
      background: '#111',
      color: 'white',
      fontSize: '22px',
      cursor: 'pointer',
      boxShadow: '0 6px 20px #7F77DD',
      zIndex: '999999',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transformOrigin: '70% 70%',
      animation: 'syd-wave 2s infinite',
    });

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.08)';
      button.style.boxShadow = '0 10px 30px #7F77DD';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 6px 20px #7F77DD';
    });

    // ── CREATE IFRAME ──────────────────────────────────────────────────────
    const iframe = document.createElement('iframe');
    iframe.id = 'syd-chat-iframe';

    // Resolve the correct base URL for local dev vs production
    const baseUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:5173'
      : 'https://chatbot-ai-git-main-prashantstack-devs-projects.vercel.app';

    // `embedded=true` tells the React app it is running inside the widget iframe.
    // App.jsx reads this and renders ONLY the chat UI — no Salon page, no floating button.
    iframe.src = `${baseUrl}?businessId=${id}&embedded=true`;
    iframe.setAttribute('title', 'AI Chat Assistant');
    iframe.setAttribute('allow', 'microphone'); // required for voice input

    Object.assign(iframe.style, {
      position: 'fixed',
      right: '24px',
      bottom: '90px',
      width: '380px',
      height: '600px',
      border: '1px solid rgba(255,255,255,0.4)',
      borderRadius: '32px',
      boxShadow: '0 8px 32px rgba(31,38,135,0.15)',
      // Transparent background so glassmorphism backdrop-blur works in the React app
      background: 'transparent',
      zIndex: '999999',
      // Hidden initially — toggled by button click below
      opacity: '0',
      transform: 'translateY(20px) scale(0.95)',
      pointerEvents: 'none',
      transition: 'all 0.3s ease',
    });

    // ── TOGGLE LOGIC ───────────────────────────────────────────────────────
    let isOpen = false;

    button.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        button.innerHTML = xSvg;
        button.setAttribute('aria-label', 'Close chat');
        iframe.style.opacity = '1';
        iframe.style.transform = 'translateY(0) scale(1)';
        iframe.style.pointerEvents = 'auto';
      } else {
        button.innerHTML = messageCircleSvg;
        button.setAttribute('aria-label', 'Open chat');
        iframe.style.opacity = '0';
        iframe.style.transform = 'translateY(20px) scale(0.95)';
        iframe.style.pointerEvents = 'none';
      }
    });

    // ── KEYFRAME ANIMATION ─────────────────────────────────────────────────
    // Prefixed `syd-wave` to avoid colliding with host-page keyframe names
    if (!document.getElementById('syd-widget-styles')) {
      const style = document.createElement('style');
      style.id = 'syd-widget-styles';
      style.innerHTML = `
        @keyframes syd-wave {
          0%   { transform: rotate(0deg); }
          15%  { transform: rotate(14deg); }
          30%  { transform: rotate(-8deg); }
          45%  { transform: rotate(14deg); }
          60%  { transform: rotate(-4deg); }
          75%  { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
      `;
      document.head.appendChild(style);
    }

    // ── ATTACH TO HOST PAGE ────────────────────────────────────────────────
    document.body.appendChild(iframe);
    document.body.appendChild(button);
  }

})(); // end IIFE