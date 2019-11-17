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
            rate: 250,
            reloadRate: 3000,
            bulletSpeed: 8,
            w: 9,
            h: 9,
            damage: 10
        };

        return super(x, y, textures, 50, 50, 50, 200, true, 500, 'BlueHead', weapon, 1);
    }
}