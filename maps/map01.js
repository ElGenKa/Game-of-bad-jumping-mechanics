function initMap01() {
    for(var i = 0; i< 3; i++){
        var shape = new Konva.Rect({
            width: 140,
            height: 30,
            x: 200 + (i*160),
            y: 320 + (i*40),
            name: 'box',
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 2
        });
        layer.add(shape);
    }
}