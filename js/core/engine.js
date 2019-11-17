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

        var playerSize = {w: 66, h: 92};
        var groupPlayer = new Konva.Group({
            x: 1128 / 2 - playerSize.w / 2,
            y: 620 / 2 - playerSize.h / 2,
            name: 'player',
            width: playerSize.w,
            height: playerSize.h
        });

        player.entity = new Konva.Image({
            image: engine.images['playerLeft'],
            x: 0,
            y: 0,
            name: 'player',
            width: 66,
            height: 92,
        });
        groupPlayer.add(player.entity);
        player.entityHitBox = new Konva.Rect({
            x: 16,
            y: playerSize.h - 23,
            name: 'player',
            subName: 'hitBox',
            height: 23,
            width: 33,
            fill: 'rgba(255,244,0,0.1)'
        });
        groupPlayer.add(player.entityHitBox);
        player.entityHitBullets = new Konva.Rect({
            x: (playerSize.w - 50) / 2,
            y: (playerSize.h - 50) / 2 - 4,
            name: 'player',
            subName: 'bulletBox',
            height: 75,
            width: 50,
            fill: 'rgba(255,0,172,0.1)'
        });
        groupPlayer.add(player.entityHitBullets);

        var hitBox;
        //HitBox
        //left
        hitBox = new Konva.Rect({
            x: player.entityHitBox.x(),
            y: player.entityHitBox.y(),
            width: 3,
            height: player.entityHitBox.height(),
            name: 'HitBoxLeft',
            fill: 'hellow'
        });
        groupPlayer.add(hitBox);
        //Right
        hitBox = new Konva.Rect({
            x: player.entityHitBox.x() + player.entityHitBox.width() - 3,
            y: player.entityHitBox.y(),
            width: 3,
            height: player.entityHitBox.height(),
            name: 'HitBoxRight',
            fill: 'hellow'
        });
        groupPlayer.add(hitBox);
        //Top
        hitBox = new Konva.Rect({
            x: player.entityHitBox.x(),
            y: player.entityHitBox.y(),
            width: player.entityHitBox.width(),
            height: 3,
            name: 'HitBoxTop',
            fill: 'hellow'
        });
        groupPlayer.add(hitBox);
        //Down
        hitBox = new Konva.Rect({
            x: player.entityHitBox.x(),
            y: player.entityHitBox.y() + player.entityHitBox.height()-3,
            width: player.entityHitBox.width(),
            height: 3,
            name: 'HitBoxTop',
            fill: 'hellow'
        });
        groupPlayer.add(hitBox);

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

        layerHits.add(groupPlayer);
        /*layerHits.add(player.entity);
        layerHits.add(player.entityHitBox);
        layerHits.add(player.entityHitBullets);*/
        layerInterface.add(player.hpBar.down);
        layerInterface.add(player.hpBar.up);


        //var interface = new Interface();

        // добавляем слои
        stage.add(layerFon);
        stage.add(layerHits);
        stage.add(layerInterface);

        playerData = layerHits.find('.player')[0];
        playerPosition = {
            x: playerData.x(),
            y: playerData.y(),
            width: playerData.width(),
            height: playerData.height(),
            hitBoxBullet: {},
            hitBox: {},
        };
        playerData.children.each(function (item) {
            if(item.attrs.subName === 'bulletBox'){
                playerPosition.hitBoxBullet = item.getClientRect();
            }
            if(item.attrs.subName === 'hitBox') {
                playerPosition.hitBox = item.getClientRect();
            }
        });
    },
    render: function () {
        layerHits.clear();

        mapChildrensBullet = layerHits.find('.bullet');
        mapChildrensAll = layerHits.children;
        if (this.renderFrame % 3 !== 1) {
            mapChildrens = [];
            var i = 0;
            mapChildrensTemp = layerHits.find('.mapGroup')[0].children;
            mapChildrensTemp.each(function (item) {
                var itemR = item.getClientRect();
                if(itemR.x > 0 && itemR.x < 1300 && itemR.y < 700 && itemR.y > 0) {
                    mapChildrens[i] = item;
                    if(mapChildrens[i].attrs.upd)
                        mapChildrens[i].attrs.upd(mapChildrens[i].getClientRect());
                    //item.attrs.upd();
                    i++;
                }
            });
            //mapChildrens

            player.collisions.checkCollision();
            if (engine.npcs) {
                engine.npcs.forEach(function (item) {
                    item.upd();
                });
            }
            engine.bullets.forEach(function (item) {
                item.upd();
            });
        }
        player.upd();
        engine.interface.upd();

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
        var moveDis = {x: 0, y: 0};
        layerHits.children.each(function (item) {
            //console.log(item);
            if (item.attrs.name !== 'player') {
                moveDis.x = x;
                moveDis.y = y;
                item.move(moveDis);
                /*if (x) {
                    var newX = item.x() + x;
                    item.x(newX);
                }
                if (y) {
                    var newY = item.y() + y;
                    item.y(newY);
                }*/
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