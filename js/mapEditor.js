var engine;

engine = {
    images: {},
    selectMap: null,
    renderFrame: 0,
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
            engine.selectMap = selMap;
        } else
            engine.selectMap = 0;

        $('.mapSelector').on('click', function (item) {
            localStorage.setItem('selectMap', $(item.currentTarget).data('map'));
            location.reload();
        });
    },

    render: function () {
        layerHits.clear();
        if(this.selected)
            this.selected.strokeEnabled(true);
        if (this.keys.a) {
            this.cameraMoveX(-2);
        }
        if (this.keys.s) {
            this.cameraMoveY(2);
        }
        if (this.keys.d) {
            this.cameraMoveX(2);
        }
        if (this.keys.w) {
            this.cameraMoveY(-2);
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
        var res = layerHits.children;
        var contentTemp = [];
        res.forEach(function (item) {
            contentTemp.push({x: item.attrs.x, y: item.attrs.y, t: item.attrs.t, tNpc: item.attrs.tNpc});
        });
        var content = JSON.stringify(contentTemp);
        var fileName = 'map.txt';
        var a = document.createElement("a");
        var file = new Blob([content], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    },

    newPlatform: function () {
        layerHits.add(new PlatformMedium(300,300));
    },

    selected: null,
    acceptBlock(){
        engine.selected.destroy();
        var entity = eval("new " + $('#object_t').val() + "("+engine.selected.x()+","+engine.selected.y()+")");
        layerHits.add(entity);
    }

};