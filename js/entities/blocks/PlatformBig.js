class PlatformBig extends BoxCore {
    constructor(x, y) {
        return super(
            x,
            y,
            210,
            70,
            {
                count: 3,
                image: [
                    engine.images['grassLeft'],
                    engine.images['grassMid'],
                    engine.images['grassRight']
                ]
            },
            'PlatformBig');
    }
}