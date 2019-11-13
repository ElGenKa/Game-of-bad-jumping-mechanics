function initMap(map) {
    maps[map].forEach(function (item) {
        entity = eval("new " + item.t + "("+item.x+","+item.y+")");
        layerHits.add(entity);
    });
}