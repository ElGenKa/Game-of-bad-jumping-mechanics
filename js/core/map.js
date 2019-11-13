function initMap(map) {
    var decoration = [];
    var blocks = [];
    maps[map].forEach(function (item) {
        entity = eval("new " + item.t + "("+item.x+","+item.y+")");
        if(entity.attrs.name === 'decoration'){
            decoration.push(entity);
        }else{
            blocks.push(entity);
        }
    });
    decoration.forEach(function (item) {
        layerHits.add(item);
    });
    blocks.forEach(function (item) {
        layerHits.add(item);
    });
}