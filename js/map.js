function initMap(map) {
    map.forEach(function (item) {
        var shape = new Konva.Rect({
            width: 140,
            height: 30,
            x: item.x,
            y: item.y,
            name: 'box'
        });

        var shapeImage = new Konva.Image({
            image: engine.images['box'],
            x: item.x,
            y: item.y,
            width: 140,
            height: 30,
            name: 'boxImage'
        });
        layerHits.add(shape);
        layerHits.add(shapeImage);
        //layerImg.add(shapeImage);
    });
}