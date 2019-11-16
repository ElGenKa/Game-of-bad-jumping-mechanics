var engine;
var player;

engine = {
    images: {},
    selectMap: null,
    npcI: 0,
    mapMovedX: 0,
    mapMovedY: 0,
    renderFrame: 0,
    npcs: [],
    bullets: [],
    interface: null,
    ini: function () {
        engine.loadImages(sources);

        layerHits = new Konva.Layer();
        layerInterface = new Konva.Layer();
        layerFon = new Konva.Layer();
        layerFon.add(
            new Konva.Rect({
                width: 1200,
                height: 670,
                fill: 'gray'
            })
        );
        //layerFon.fill('gray');
        bulletProto = new Konva.Rect({
            x: -1000,
            y: -1000,
            fill: 'red',
            name: 'bullet'
        });
        bulletClassProto = new Bullet();
        //engine.ini();

        //создаём контейнер
        stage = new Konva.Stage({
            container: 'game',  // индификатор div контейнера
            width: 1128,
            height: 620
        });

        //Отлавливаем нажатия клавишь
        $(document).keyup(function (item) {
            var keyPressed = item.which;
            player.keyHandler(keyPressed, 'up');
        });
        $(document).keydown(function (item) {
            var keyPressed = item.which;
            player.keyHandler(keyPressed, 'down');
        });

        engine.interface = new Interface();
        player = new Player();
        player.entity = new Konva.Image({
            image: engine.images['playerLeft'],
            x: 1128 / 2 - 33,
            y: 620 / 2 - 46,
            name: 'player',
            width: 66,
            height: 92
        });
        player.entityHitBox = new Konva.Rect({
            x: 1128 / 2 - 15,
            y: 620 / 2 + 23,
            name: 'player',
            height: 23,
            width: 33
        });
        player.entityHitBullets = new Konva.Rect({
            x: 1128 / 2 - 33 + 8,
            y: 620 / 2 - 28,
            name: 'player',
            subName: 'bulletBox',
            height: 75,
            width: 50
        });
        player.animator = new EntityAnimation(player.entity);
        player.inventory = new Inventory();
        player.weapon = new Weapon();
        player.hpBar = {
            down: new Konva.Image({
                image: engine.images['hpBarDown'],
                width: 100,
                height: 10,
                x: 1128 / 2 - 100 + 49,
                y: 620 / 2 - 70,
                name: 'playerBar',
            }),
            up: new Konva.Rect({
                fill: 'green',
                width: 98,
                height: 8,
                x: 1128 / 2 - 100 + 49 + 1,
                y: 620 / 2 - 70 + 1,
                name: 'playerBar',
            })
        };

        var bullet;
        for (i = 0; i < player.weapon.maxBullets; i++) {
            bullet = new Konva.Image({
                x: 10,
                y: 10 + i * 15,
                name: 'bullet',
                image: engine.images['playerBulletEmpty']
            });
            layerInterface.add(bullet);
        }

        var selMap = localStorage.getItem('selectMap');
        if (selMap) {
            engine.selectMap = selMap;
        } else
            engine.selectMap = 0;

        $('.mapSelector').on('click', function (item) {
            localStorage.setItem('selectMap', $(item.currentTarget).data('map'));
            location.reload();
        });

        // далее инициализируем карту
        initMap(engine.selectMap);

        layerHits.add(player.entity);
        layerInterface.add(player.hpBar.down);
        layerInterface.add(player.hpBar.up);
        layerHits.add(player.entityHitBox);
        layerHits.add(player.entityHitBullets);

        //var interface = new Interface();

        // добавляем слои
        stage.add(layerFon);
        stage.add(layerHits);
        stage.add(layerInterface);
    },
    render: function () {
        layerHits.clear();
        player.collisions.checkCollision();
        player.upd();
        engine.interface.upd();
        if (this.renderFrame % 2 !== 1) {
            if (engine.npcs) {
                engine.npcs.forEach(function (item) {
                    item.upd();
                });
            }
        }

        engine.bullets.forEach(function (item) {
            item.upd();
        });

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

    /**
     * @return {boolean}
     */
    Intersection: function (a, b) {
        return (b.x > a.x + a.width ||
            b.x + b.width < a.x ||
            b.y > a.y + a.height ||
            b.y + b.height < a.y);
    },

    cameraMoveX: function (x) {
        this.moveAllEntities((x * -1));
    },

    cameraMoveY: function (y) {
        this.moveAllEntities(0, (y * -1));
    },

    moveAllEntities: function (x = 0, y = 0) {
        layerHits.children.each(function (item) {
            if (item.attrs.name !== 'player' && item.attrs.name !== 'playerBar') {
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
            //console.log(sources[src].count);
            if (sources[src].count > 0) {
                engine.images[src] = {count: sources[src].count, image: []};
                for (var i = 0; i < sources[src].count; i++) {
                    //console.log(sources);
                    engine.images[src].image[i] = new Image();
                    engine.images[src].image[i].src = assetDir + sources[src].image[i];
                }
                //console.log(engine.images[src]);
            } else {
                //console.log(sources[src]);
                engine.images[src] = new Image();
                engine.images[src].src = assetDir + sources[src];
            }
        }
    },
};