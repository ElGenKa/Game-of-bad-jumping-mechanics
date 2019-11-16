class BlueHead extends NpcCore {
    constructor(x, y) {
        var textures = {
            'front': engine.images['redHeadFront'],
            'left': engine.images['redHeadAnimateLeft'],
            'right': engine.images['redHeadAnimateRight'],
            'top': engine.images['redHeadAnimateTop'],
            'down': engine.images['redHeadAnimateDown'],
        };

        var weapon = {
            rate: 1500,
            reloadRate: 3000,
            bulletSpeed: 4,
            w: 3,
            h: 3
        };

        return super(x, y, textures, 50, 50, 200, 200, true, 500, 'BlueHead', weapon, 1);
    }
}