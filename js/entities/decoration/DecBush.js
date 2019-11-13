class DecBush extends DecorationCore{
    constructor(x,y){
        return super(
            x,
            y,
            70,
            70,
            {
                count: 1,
                image: engine.images['DecBush']
            },
            'DecBush'
        );
    }
}