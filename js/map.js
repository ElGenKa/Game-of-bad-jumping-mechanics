function initMap(map) {
    map.forEach(function (item) {
        var shape = new Konva.Rect({
            width: 140,
            height: 30,
            x: item.x,
            y: item.y,
        });

        var shapeImage = new Konva.Image({
            image: engine.images['box'],
            x: item.x,
            y: item.y,
            width: 140,
            height: 30,
            name: 'box'

        });
        layerHits.add(shape);
        layerImg.add(shapeImage);
    });
}