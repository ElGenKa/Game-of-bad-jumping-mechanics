class ItemScore extends ItemCore{
    constructor(x,y,score){
        return super(x,y,engine.images['ScoreIco'],25,25, 'score', score);
    }
}