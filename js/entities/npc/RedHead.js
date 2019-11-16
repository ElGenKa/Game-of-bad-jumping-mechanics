class RedHead extends NpcCore{
    constructor(x,y){
        var textures = {
            'front': engine.images['redHeadFront'],
            'left': engine.images['redHeadAnimateLeft'],
            'right': engine.images['redHeadAnimateRight'],
            'top': engine.images['redHeadAnimateTop'],
            'down': engine.images['redHeadAnimateDown'],
        };

        return super(x,y,textures, 50, 50, 100, 100, true, 300, 'RedHead');
    }
}