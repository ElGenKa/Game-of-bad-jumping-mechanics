class PlatformExtraBig extends BoxCore {
    constructor(x, y) {
        return super(
            x,
            y,
            280,
            70,
            {
                count: 4,
                image: [
                    engine.images['grassLeft'],
                    engine.images['grassMid'],
                    engine.images['grassMid'],
                    engine.images['grassRight']
                ]
            },
            'PlatformExtraBig');
    }
}