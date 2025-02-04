/* 
    Use for loop to generate cards
    to find the column, use iteration % gridSize
    to find the row, use iteration / gridSize but you have to round down using math.floor
*/

import { Graphics, Container } from "pixi.js"


export class Card{
    constructor(){
        this.cardContainer = new Container();
        this.cards = [];
        this.flippedCard = [];
    }

    generateCards(gridSize){
        const padding = 10;

        if (gridSize % 3 == 0){
            console.log("grid size must be an even number.")
            return;
        }
        
        
        for (let i=0; i < gridSize * gridSize; i++){
            const card = new Graphics()
            .rect(0,0,100,150)
            .fill('E5E5E5');
            card.eventMode = 'static';
            card.cursor = 'pointer';
    
    
            let row = Math.floor(i / gridSize);
            let column = (i % gridSize)
    
            card.x = column * (card.width + padding);
            card.y = row * (card.height + padding);
            card.on('pointerdown', () => this.flipCard(card, i));
            
            this.cards.push({sprite: card, value: i % (gridSize*gridSize /2), flipped: false})
            
            this.cardContainer.addChild(card);
        }
        console.log(this.cards);
    }

    getCardContainer(){
        return this.cardContainer;
    }
    

    flipCard(card, index){
        if (this.cards[index].flipped){
            console.log(`the card ${index} is already flipped`)
            return;
        } else if (this.flippedCard.length == 2){
            console.log(`the 2 cards has been flipped`)
            return;
        }
        console.log(`this card ${index} is flipped`);
        this.cards[index].flipped = true;

        card.clear();
        card.rect(0,0,100,150)
        card.fill('ba0012') //red

        this.flippedCard.push({card, index});
        
        if (this.flippedCard.length == 2){
            setTimeout(() => {
                console.log('checking...');
                for (let i = 0; i < this.flippedCard.length; i++){
                    console.log(`The cards in this list is: ${this.flippedCard[i].index}`)

                    let currentCard = this.flippedCard[i].card ;

                    this.cards[this.flippedCard[i].index].flipped = false;
                    currentCard.clear()
                    .rect(0,0,100,150)
                    .fill('E5E5E5'); //back to white

    
                }
                this.flippedCard = [];
            }, 500)
            
        }
    }

    

    //TODO: make match algorithm for the cards
    matchCard(){    

    }

}
