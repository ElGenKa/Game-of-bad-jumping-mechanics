class ItemCore {
    constructor(x, y, asset, w, h, name, subParam = false) {
        var entity = new Konva.Image({
            image: asset,
            x: x,
            y: y,
            width: w,
            height: h,
            name: 'item',
            subName: name,
            subParam: subParam
        });
        layerHits.add(entity);
        return entity;
    }
}