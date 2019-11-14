var engine;

engine = {
    images: {},
    selectMap: null,
    npcI: 0,
    mapMovedX: 0,
    mapMovedY: 0,
    renderFrame: 0,
    npcs: [],
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
        player.collisions.checkCollision();
        player.keys.checkKeys();
        player.gravity.check();

        if (player.noDamageFrames > engine.renderFrame) {
            if (this.renderFrame % 2 !== 1) {
                player.entityImage.image(engine.images['playerDamage']);
            }
        }

        if (this.renderFrame % 2 !== 1) {
            if (engine.npcs) {
                engine.npcs.forEach(function (item) {
                    if (item.hp > 0)
                        item.upd();
                });
            }
        }

        layerInterface.clear();
        layerInterface.destroyChildren();
        layerInterface.add(
            new Konva.Image({
                image: engine.images['bgInterface'],
                width: 150,
                height: 50,
                x: 7,
                y: 7
            })
        );
        layerInterface.add(
            new Konva.Text({
                x: 15,
                y: 15,
                text: 'Lives: ',
                fontSize: 14,
                fontFamily: 'Calibri',
                fill: 'red'
            })
        );
        for (var iHp = 0; iHp < player.maxLives; iHp++) {
            if (player.lives > iHp) {
                layerInterface.add(
                    new Konva.Image({
                        image: engine.images['heart'],
                        x: 50 + (iHp * 13),
                        y: 15,
                        name: 'heart',
                        width: 10,
                        height: 10
                    })
                );
            } else {
                layerInterface.add(
                    new Konva.Image({
                        image: engine.images['heartZero'],
                        x: 50 + (iHp * 13),
                        y: 15,
                        name: 'heart',
                        width: 10,
                        height: 10
                    })
                );
            }
        }
        layerInterface.add(
            new Konva.Text({
                x: 15,
                y: 35,
                text: 'Score: ' + player.score,
                fontSize: 14,
                fontFamily: 'Calibri',
                fill: 'yellow'
            })
        );

        this.renderFrame += 1;
        if (player.lives <= 0) {
            clearTimeout(gameTimer);
            layerInterface.add(
                new Konva.Text({
                    x: 449,
                    y: 249,
                    text: 'GAME OVER',
                    fontSize: 32,
                    fontFamily: 'Calibri',
                    fill: 'black'
                })
            );
            layerInterface.add(
                new Konva.Text({
                    x: 450,
                    y: 250,
                    text: 'GAME OVER',
                    fontSize: 32,
                    fontFamily: 'Calibri',
                    fill: 'red'
                })
            );
        }
        layerHits.draw();
        layerInterface.draw();
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
            console.log(sources[src].count);
            if (sources[src].count > 0) {
                engine.images[src] = {count: sources[src].count, image: []};
                for(var i = 0; i<sources[src].count; i++){
                    console.log(sources);
                    engine.images[src].image[i] = new Image();
                    engine.images[src].image[i].src = assetDir + sources[src].image[i];
                }
                console.log(engine.images[src]);
            } else {
                //console.log(sources[src]);
                engine.images[src] = new Image();
                engine.images[src].src = assetDir + sources[src];
            }
        }
    },
};