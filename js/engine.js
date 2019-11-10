var engine;

engine = {
    images: {},
    selectMap: null,
    ini: function(){
        var selMap = localStorage.getItem('selectMap');
        if(selMap){
            switch (selMap) {
                case 'map01':
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
        }
        else
            engine.selectMap = map01;

        $('.mapSelector').on('click', function (item) {
            localStorage.setItem('selectMap', $(item.currentTarget).data('map'));
            location.reload();
        });
    },

    render: function () {
        layerHits.clear();
        player.collisions.checkCollision();
        player.keys.checkKeys();
        player.gravity.check();
        layerHits.draw();
    },
    haveIntersectionX: function (r1, r2) {
        return !(
            r2.x > r1.x + r1.width ||
            r2.x + r2.width < r1.x
        );
    },
    haveIntersectionY: function (r1, r2) {
        return !(
            r2.y > r1.y + r1.height ||
            r2.y + r2.height < r1.y
        );
    },
    haveIntersection: function (r1, r2) {
        return (this.haveIntersectionX(r1, r2) || this.haveIntersectionY(r1, r2))
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
    }
};