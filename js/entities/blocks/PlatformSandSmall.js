class PlatformSandSmall extends BoxCore{
    constructor(x,y){
        return super(
            x,
            y,
            70,
            70,
            {
                count: 1,
                image: engine.images['sandMid']
            },
            'PlatformSandSmall'
        );
    }
}