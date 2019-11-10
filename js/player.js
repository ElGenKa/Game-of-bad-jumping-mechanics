var player;

//Объект игрока с его поведением
player = {
    x: 0,
    y: 0,
    keys: {
        a: false,
        d: false,
        l: false,
        r: false,
        s: false,
        kUp: function (key) {
            switch (key) {
                case 65: //A
                    player.keys.a = false;
                    break;
                case 68: //D
                    player.keys.d = false;
                    break;
                case 37: //left
                    player.keys.l = false;
                    break;
                case 39: //right
                    player.keys.r = false;
                    break;
                case 32: //SPACE
                    player.keys.s = false;
                    break;
            }
        },
        kDown: function (key) {
            switch (key) {
                case 65: //A
                    player.keys.a = true;
                    break;
                case 68: //D
                    player.keys.d = true;
                    break;
                case 37: //left
                    player.keys.l = true;
                    break;
                case 39: //right
                    player.keys.r = true;
                    break;
                case 32: //SPACE
                    player.keys.s = true;
                    break;
            }
        },
        checkKeys: function () {
            player.collisions.checkCollision();
            if (player.keys.a) {
                if (!player.collisions.leftBox) {
                    engine.cameraMoveX(-3);
                }
                if (player.status === 'jumped') {
                    player.entityImage.image(engine.images['playerJumpLeft'])
                } else {
                    player.entityImage.image(engine.images['playerLeft'])
                }
            }
            if (player.keys.d) {
                if (!player.collisions.rightBox) {
                    engine.cameraMoveX(3);
                }
                if (player.status === 'jumped') {
                    player.entityImage.image(engine.images['playerJumpRight'])
                } else {
                    player.entityImage.image(engine.images['playerRight'])
                }
            }
            if (player.keys.s) {
                if (player.status === 'idle') {
                    if (!player.collisions.topBox) {
                        engine.cameraMoveY(-10);
                        player.status = 'jumped';
                        player.gravity.jumpPower = 10;
                    }
                }
            }
            if (!player.keys.a && !player.keys.d) {
                player.entityImage.image(engine.images['playerLeft'])
            }
        }
    },
    collisions: {
        leftBox: false,
        topBox: false,
        rightBox: false,
        bottomBox: false,
        checkCollision: function () {
            player.collisions.leftBox = player.collisions.topBox = player.collisions.rightBox = player.collisions.bottomBox = false;
            layerHits.children.each(function (item) {
                    var itemR = item.getClientRect();
                    var playerR = player.entity.getClientRect();
                    if (item.attrs.name !== 'boxImage' && item.attrs.name !== 'player') {

                        if (itemR.x < playerR.x) {
                            if (engine.haveIntersectionY(itemR, playerR)) {
                                if (engine.haveIntersectionX(itemR, playerR)) {
                                    if (playerR.y > itemR.y)
                                        player.collisions.leftBox = true;
                                }
                            }
                        }
                        if (itemR.x > playerR.x) {
                            if (engine.haveIntersectionY(itemR, playerR)) {
                                if (engine.haveIntersectionX(itemR, playerR)) {
                                    if (playerR.y > itemR.y)
                                        player.collisions.rightBox = true;
                                }
                            }
                        }
                        if (itemR.y > playerR.y) {
                            if (engine.haveIntersectionY(itemR, playerR)) {
                                if (engine.haveIntersectionX(itemR, playerR)) {
                                    if (engine.haveIntersection(itemR, playerR)) {
                                        if (itemR.y < playerR.y + 24)
                                            engine.cameraMoveY(-1);
                                    }
                                    player.collisions.bottomBox = true;
                                    player.status = 'idle';
                                    player.gravity.jumpPower = 0;
                                }
                            }
                        }
                        if (itemR.y < playerR.y) {
                            if (engine.haveIntersectionY(itemR, playerR)) {
                                if (engine.haveIntersectionX(itemR, playerR)) {
                                    player.collisions.topBox = true;
                                }
                            }
                        }
                    }
                }
            );
        }
    },
    status: 'idle',
    entity: null,
    entityImage: null,
    gravity: {
        jumpPower: 0,
        check: function () {
            if (!player.collisions.bottomBox) {
                if (player.keys.s)
                    player.gravity.jumpPower -= 0.25;
                else
                    player.gravity.jumpPower -= 0.50;
            } else {
                player.gravity.jumpPower = 0;
                player.status = 'idle';
            }
            engine.cameraMoveY((player.gravity.jumpPower * -1));
        }
    }
};