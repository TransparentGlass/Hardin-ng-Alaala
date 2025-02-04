/* 
    Use for loop to generate cards
    to find the column, use iteration % gridSize
    to find the row, use iteration / gridSize but you have to round down using math.floor
*/

import { Graphics, Container } from "pixi.js"


export class Card{
    constructor(){
        this.cardContainer = new Container();
    }

    generateCards(gridSize){
        const padding = 10;
    
        for (let i=0; i < gridSize * gridSize; i++){
            const card = new Graphics()
            .rect(0,0,100,150)
            .fill('E5E5E5');
            card.eventMode = true;
            card.cursor = 'pointer';
    
    
            let row = Math.floor(i / gridSize);
            let column = (i % gridSize)
            console.log(`Index: ${i}, row: ${row}, col: ${column}`)
    
            card.x = column * (card.width + padding);
            card.y = row * (card.height + padding);
            console.log(`Card x: ${card.x}, card y: ${card.y}`);
            
    
            this.cardContainer.addChild(card);
        }
    }

    getCardContainer(){
        return this.cardContainer;
    }
    
    //TODO: place individual cards into a list with their states.
    //TODO: change state(for now color) if card is clicked

}
