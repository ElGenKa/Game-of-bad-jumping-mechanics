class Inventory {
    constructor(){
        this.gems = 0;
        this.score = 0;
    }

    addScore(score){
        this.score += score;
    }

    addGems(gems){
        this.gems += gems;
    }
}