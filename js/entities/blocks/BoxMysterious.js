class BoxMysterious extends BoxCore{
    constructor(x,y,dropType = 'score', drop = '100'){
        var entity = super(x,y,140,40,engine.images['boxMysterious'],'mysterious');
        entity.attrs.dropType = dropType;
        entity.attrs.drop = drop;
        return entity;
    }
}