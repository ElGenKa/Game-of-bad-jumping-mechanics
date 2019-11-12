var engine;

engine = {
    images: {},
    selectMap: null,
    renderFrame: 0,
    mapMovedX: 0,
    mapMovedY: 0,
    editor: 1,
    npcs: [],
    keys: {
        a: false,
        s: false,
        d: false,
        w: false
    },
    ini: function () {
        engine.loadImages(sources);
        var selMap = localStorage.getItem('selectMap');
        if (selMap) {
            switch (selMap) {
                case 'map01':
                    //engine.selectMap = JSON.parse(map01);
                    //console.log(engine.selectMap);
                    engine.selectMap = map01;
                    break;
                case 'map02':
                    engine.selectMap = map02;
                    break;
                case 'map03':
                    engine.selectMap = map03;
                    break;
                default:
                    engine.selectMap = map01;
                    break;
            }
        } else
            engine.selectMap = map01;

        $('.mapSelector').on('click', function (item) {
            localStorage.setItem('selectMap', $(item.currentTarget).data('map'));
            location.reload();
        });
    },

    render: function () {
        layerHits.clear();
        if (this.keys.a) {
            this.cameraMoveX(-2);
            this.mapMovedX -= 2;
        }
        if (this.keys.s) {
            this.cameraMoveY(2);
            this.mapMovedY += 2;
        }
        if (this.keys.d) {
            this.cameraMoveX(2);
            this.mapMovedX += 2;
        }
        if (this.keys.w) {
            this.cameraMoveY(-2);
            this.mapMovedY -= 2;
        }
        this.renderFrame += 1;
        layerHits.draw();
    },

    cameraMoveX: function (x) {
        this.moveAllEntities((x * -1));
    },

    cameraMoveY: function (y) {
        this.moveAllEntities(0, (y * -1));
    },

    moveAllEntities: function (x = 0, y = 0) {
        engine.mapMovedX += x;
        engine.mapMovedY += y;
        layerHits.children.each(function (item) {
            if (item.attrs.name !== 'player') {
                if (x) {
                    var newX = item.attrs.x + x;
                    item.x(newX);
                }
                if (y) {
                    var newY = item.attrs.y + y;
                    item.y(newY);
                }
            }
        });
    },

    loadImages: function (sources) {
        var assetDir = 'assets/';
        engine.images = {};
        for (var src in sources) {
            engine.images[src] = new Image();
            engine.images[src].src = assetDir + sources[src];
        }
    },

    keyDown: function (keyPressed) { //65 83 68 87
        //console.log(keyPressed);
        switch (keyPressed) {
            case 65: //A
                engine.keys.a = true;
                break;
            case 83: //S
                engine.keys.s = true;
                break;
            case 68: //D
                engine.keys.d = true;
                break;
            case 87: //W
                engine.keys.w = true;
                break;
        }
    },

    keyUp: function (keyPressed) {
        switch (keyPressed) {
            case 65: //A
                engine.keys.a = false;
                break;
            case 83: //S
                engine.keys.s = false;
                break;
            case 68: //D
                engine.keys.d = false;
                break;
            case 87: //W
                engine.keys.w = false;
                break;
        }
    },

    download: function () {
        var content = JSON.stringify(layerHits.children);
        var fileName = 'map01.js';
        var a = document.createElement("a");
        var file = new Blob([content], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

};