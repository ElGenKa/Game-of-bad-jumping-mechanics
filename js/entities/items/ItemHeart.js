class ItemHeart extends ItemCore{
    constructor(x,y,regen){
        return super(x,y,engine.images['heart'],25,25, 'heart', regen);
    }
}