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
    isInit: false,
    interface: null,
    ini: function () {
        var playerSize = {w: 66, h: 92};
        var groupPlayer;
        if (!this.isInit) {
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
            bulletProto = new Konva.Rect({
                x: -1000,
                y: -1000,
                fill: 'red',
                name: 'bullet'
            });
            bulletClassProto = new Bullet();

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

            groupPlayer = new Konva.Group({
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
                y: playerSize.h - 35,
                name: 'player',
                subName: 'hitBox',
                height: 35,
                width: 35
            });
            groupPlayer.add(player.entityHitBox);
            player.entityHitBullets = new Konva.Rect({
                x: (playerSize.w - 50) / 2,
                y: (playerSize.h - 50) / 2 - 4,
                name: 'player',
                subName: 'bulletBox',
                height: 75,
                width: 50
            });
            groupPlayer.add(player.entityHitBullets);

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

            engine.selectMap = 0;

            $('.mapSelector').on('click', function (item) {
                localStorage.setItem('selectMap', $(item.currentTarget).data('map'));
                location.reload();
            });

            // далее инициализируем карту
            initMap(engine.selectMap);

            layerHits.add(groupPlayer);
            layerInterface.add(player.hpBar.down);
            layerInterface.add(player.hpBar.up);

            // добавляем слои
            stage.add(layerFon);
            stage.add(layerHits);
            stage.add(layerInterface);
            this.isInit = true;
        } else {
            if(engine.selectMap === 0){
                $('.modal').show();
                $('#mCount').html( player.inventory.score );
                drawButtons();
            }else{
                $('.modal').hide();
            }
            this.npcs.forEach(function (item) {
                item.live = false;
                item.entity.destroy();
                item.hpBar.destroy();
            });
            this.bullets.forEach(function (item) {
                item.live = false;
            });
            this.npcs = [];
            this.bullets = [];
            layerHits.destroy();
            layerHits = new Konva.Layer();
            groupPlayer = new Konva.Group({
                x: 1128 / 2 - playerSize.w / 2,
                y: 620 / 2 - playerSize.h / 2,
                name: 'player',
                width: playerSize.w,
                height: playerSize.h
            });
            stage.add(layerHits);
            initMap(engine.selectMap);
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
                y: playerSize.h - 35,
                name: 'player',
                subName: 'hitBox',
                height: 35,
                width: 35
            });
            groupPlayer.add(player.entityHitBox);
            player.entityHitBullets = new Konva.Rect({
                x: (playerSize.w - 50) / 2,
                y: (playerSize.h - 50) / 2 - 4,
                name: 'player',
                subName: 'bulletBox',
                height: 75,
                width: 50
            });
            player.animator = new EntityAnimation(player.entity);
            groupPlayer.add(player.entityHitBullets);
            layerHits.add(groupPlayer);

        }
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
            if (item.attrs.subName === 'bulletBox') {
                playerPosition.hitBoxBullet = item.getClientRect();
            }
            if (item.attrs.subName === 'hitBox') {
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
                if (itemR.x > 0 && itemR.x < 1300 && itemR.y < 700 && itemR.y > 0) {
                    mapChildrens[i] = item;
                    if (mapChildrens[i].attrs.upd)
                        mapChildrens[i].attrs.upd(mapChildrens[i].getClientRect());
                    //item.attrs.upd();
                    i++;
                }
            });
            layerHits.find('.item').each(function (item) {
                var itemR = item.getClientRect();
                if (itemR.x > 0 && itemR.x < 1300 && itemR.y < 700 && itemR.y > 0) {
                    mapChildrens[i] = item;
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
            if (item.attrs.name !== 'player') {
                moveDis.x = x;
                moveDis.y = y;
                item.move(moveDis);
            }
        });
    },

    loadImages: function (sources) {
        var assetDir = 'assets/';
        engine.images = {};
        for (var src in sources) {
            if (sources[src].count > 0) {
                engine.images[src] = {count: sources[src].count, image: []};
                for (var i = 0; i < sources[src].count; i++) {
                    //console.log(sources);
                    engine.images[src].image[i] = new Image();
                    engine.images[src].image[i].src = assetDir + sources[src].image[i];
                }
            } else {
                engine.images[src] = new Image();
                engine.images[src].src = assetDir + sources[src];
            }
        }
    },
};