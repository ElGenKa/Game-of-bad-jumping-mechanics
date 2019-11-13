class PlatformMedium extends BoxCore {
    constructor(x, y) {
        return super(
            x,
            y,
            140,
            70,
            {
                count: 2,
                image: [
                    engine.images['grassLeft'],
                    engine.images['grassRight']
                ]
            },
            'PlatformMedium');
    }
}