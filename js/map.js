function initMap(map) {
    var entity;
    var entityImage;
    var nameHit;
    var nameImage;
    var x;
    var y;
    var w;
    var h;
    var image;
    var i = 0;
    var drag = false;
    if (engine.editor === 1)
        drag = true;
    //console.log(map[0])
    for(var i = 0; i<map[0]['length']; i++){
        var item = map[0][i];
        item = JSON.parse(item).attrs;
        //console.log(JSON.parse(item));
        x = item.x;
        y = item.y;
        nameHit = 'box';
        nameImage = 'boxImage';
        switch (item.t) {
            case 'platform-medium':
                w = 140;
                h = 40;
                image = engine.images['box'];
                break;
            case 'platform-small':
                w = 70;
                h = 40;
                image = engine.images['boxSmall'];
                break;
            case 'platform-big':
                w = 210;
                h = 40;
                image = engine.images['boxBig'];
                break;
            case 'mysterious':
                nameHit = 'mysterious';
                w = 30;
                h = 30;
                image = engine.images['boxMysterious'];
                break;
            case 'mysteriousEmpty':
                nameHit = 'mysteriousEmpty';
                w = 30;
                h = 30;
                image = engine.images['boxMysterious'];
                break;
            case 'npc':
                engine.npcs[engine.npcI] = new Npc(x, y, item.tNpc);
                break;
        }

        if (item.t !== 'npc') {
            if (engine.editor !== 1) {
                entity = new Konva.Rect({
                    x: x,
                    y: y,
                    cameraMoveX: engine.mapMovedX,
                    cameraMoveY: engine.mapMovedY,
                    width: w,
                    height: h,
                    id: 'box-' + i,
                    idImage: 'image-' + i,
                    name: nameHit
                });
            }

            entityImage = new Konva.Image({
                image: image,
                x: x,
                y: y,
                cameraMoveX: engine.mapMovedX,
                cameraMoveY: engine.mapMovedY,
                draggable: drag,
                width: w,
                height: h,
                id: 'image-' + i,
                idBox: 'box-' + i,
                t: item.t,
                name: nameImage
            });

            if (entity)
                layerHits.add(entity);
            layerHits.add(entityImage);
            i++;
        }
    }
    /*map.forEach(function (item) {
        //console.log(item);
        x = item.x;
        y = item.y;
        nameHit = 'box';
        nameImage = 'boxImage';
        switch (item.t) {
            case 'platform-medium':
                w = 140;
                h = 40;
                image = engine.images['box'];
                break;
            case 'platform-small':
                w = 70;
                h = 40;
                image = engine.images['boxSmall'];
                break;
            case 'platform-big':
                w = 210;
                h = 40;
                image = engine.images['boxBig'];
                break;
            case 'mysterious':
                nameHit = 'mysterious';
                w = 30;
                h = 30;
                image = engine.images['boxMysterious'];
                break;
            case 'mysteriousEmpty':
                nameHit = 'mysteriousEmpty';
                w = 30;
                h = 30;
                image = engine.images['boxMysterious'];
                break;
            case 'npc':
                engine.npcs[engine.npcI] = new Npc(x, y, item.tNpc);
                break;
        }

        if (item.t !== 'npc') {
            if (engine.editor !== 1) {
                entity = new Konva.Rect({
                    x: x,
                    y: y,
                    cameraMoveX: engine.mapMovedX,
                    cameraMoveY: engine.mapMovedY,
                    width: w,
                    height: h,
                    id: 'box-' + i,
                    idImage: 'image-' + i,
                    name: nameHit
                });
            }

            entityImage = new Konva.Image({
                image: image,
                x: x,
                y: y,
                cameraMoveX: engine.mapMovedX,
                cameraMoveY: engine.mapMovedY,
                draggable: drag,
                width: w,
                height: h,
                id: 'image-' + i,
                idBox: 'box-' + i,
                t: item.t,
                name: nameImage
            });

            if (entity)
                layerHits.add(entity);
            layerHits.add(entityImage);
            i++;
        }
    });*/

    layerHits.children.each(function (item) {
        console.log(item.attrs);
    });
}