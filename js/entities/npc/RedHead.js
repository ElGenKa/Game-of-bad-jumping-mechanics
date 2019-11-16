class RedHead extends NpcCore {
    constructor(x, y) {
        var textures = {
            'front': engine.images['redHeadFront'],
            'left': engine.images['redHeadAnimateLeft'],
            'right': engine.images['redHeadAnimateRight'],
            'top': engine.images['redHeadAnimateTop'],
            'down': engine.images['redHeadAnimateDown'],
        };

        var weapon = {
            rate: 1000,
            reloadRate: 2000,
            bulletSpeed: 9,
            w: 10,
            h: 10
        };

        return super(x, y, textures, 50, 50, 100, 100, true, 500, 'RedHead', weapon, 2);
    }
}