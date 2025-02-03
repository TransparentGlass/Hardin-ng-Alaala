
import { Application} from "pixi.js";
import { cardContainer, generateCards } from "./generate-card";

(async () => {
    const app = new Application();
    await app.init({
        background:'#1E90FF',
        resizeTo: window
    })
    app.canvas.style.position = 'absolute';
    globalThis.__PIXI_APP__ = app;


    document.body.appendChild(app.canvas);

    //generate cards
    generateCards(2);
    cardContainer.position.set(app.screen.width / 2, app.screen.height / 2); 
    cardContainer.pivot.set(cardContainer.width / 2, cardContainer.height /2);
    app.stage.addChild(cardContainer);
    
})();