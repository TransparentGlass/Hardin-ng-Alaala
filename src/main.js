
import { Application } from "pixi.js";

(async () => {
    const app = new Application();
    await app.init({
        background:'#1E90FF',
        resizeTo: window
    })
    app.canvas.style.position = 'absolute';

    document.body.appendChild(app.canvas);
    
})();