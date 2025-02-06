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
        this.cardColor= ['b067f5', '8aff9a', 'ff9aee', '8afff5', '5a5255', '559e83', 'ae5a41', 'c3cb71']
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
            
            let cardValue = i % (gridSize*gridSize /2)
            let row = Math.floor(i / gridSize);
            let column = (i % gridSize)
            
            card.x = column * (card.width + padding);
            card.y = row * (card.height + padding);
            card.on('pointerdown', () => this.flipCard(card, i));
            
            this.cards.push({sprite: card, value: cardValue, flipped: false})

            this.cardContainer.addChild(card);
        }

        this.shuffle();
        
    }

   
    flipCard(card, deckIndex){
        if (this.cards[deckIndex].flipped){
            console.log(`the card ${deckIndex} is already flipped`)
            return;
        } else if (this.flippedCard.length == 2){
            console.log(`the 2 cards has been flipped`)
            return;
        }

        console.log(`this card ${deckIndex} is flipped value of ${this.cards[deckIndex].value}`);
        
        this.cards[deckIndex].flipped = true;
        this.cardFlipFront(card, deckIndex)

        this.flippedCard.push({card, deckIndex});
        
        if (this.flippedCard.length == 2){
            console.log('checking...')
            setTimeout(() =>{this.matchCard()}, 1000) 
        }
    }

    matchCard(){ 
        //matched values
        const card1 = this.cards[this.flippedCard[0].deckIndex]
        const card2 = this.cards[this.flippedCard[1].deckIndex]
        
        if(card1.value == card2.value || card2.value == card1.value){
            console.log(`\n match!`)
            this.flippedCard[0].card.eventMode = 'passive';
            this.flippedCard[1].card.eventMode = 'passive';
            this.flippedCard = [];
            

        }else{
            console.log('\ntry again')

            card1.flipped= false;
            card2.flipped = false;   

            this.cardFlipBack(this.flippedCard[0].card)
            this.cardFlipBack(this.flippedCard[1].card)
            
            this.flippedCard = [];
            
        }
        
    }

    shuffle(){
        const array = this.cards;
        console.log('shuffle is running ')
        for (let i = array.length - 1; i > 0 ; i--){
            let j = Math.floor(Math.random() * (i + 1))
            
            let temporaryArray = array[i]; array[i] = array[j]; array[j] = temporaryArray;
            
        }
    }

    cardFlipBack(card){
        card.clear()
        .rect(0,0,100,150)
        .fill('E5E5E5'); 
    }

    cardFlipFront(card, deckIndex){
        card.clear()
        .rect(0,0,100,150)
        .fill(this.cardColor[this.cards[deckIndex].value])
    }

    getCardContainer(){
        return this.cardContainer;
    }
}
