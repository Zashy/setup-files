/* Start Edit */
// First make sure the wrapper app is loaded
document.addEventListener("DOMContentLoaded", function() {

   // Then get its webviews
   const webviews = document.querySelectorAll(".TeamView webview");

   const customCustomCSS = `
     .client_main_container {
         filter: invert(100%) hue-rotate(-120deg);
     }

     .client_main_container .emoji,
     .client_main_container .emoji-outer,
     #whats_new_toggle,
     .client_main_container img,
     .client_main_container .c-message_attachment__image,
   .client_main_container .message_attachment__thumb,
     .client_main_container video,
     .client_main_container .btn:not(.btn_outline),
     .client_main_container [style*=background-image] {
         filter: invert(100%) hue-rotate(120deg);
     }

     .client_main_container pre {
         background-color: #ddeeee;
     }

     #footer, #messages_container {
      background-image: none;
      background-color: #fff;
     }
   `

   // Insert a style tag into the wrapper view
   const s = document.createElement('style');
   s.type = 'text/css';
   s.innerHTML = customCustomCSS;
   document.head.appendChild(s);


   // Wait for each webview to load
   webviews.forEach(webview => {
      webview.addEventListener('ipc-message', message => {
        if (message.channel == 'didFinishLoading') {
          // Finally add the CSS into the webview
          const script = `
            const s = document.createElement('style');
            s.type = 'text/css';
            s.id = 'slack-custom-css';
            s.innerHTML = \`${customCustomCSS}\`;
            document.head.appendChild(s);
          `
          webview.executeJavaScript(script);
        }
      });
   });
});
/* End Edit */