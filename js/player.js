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
                    if (item.attrs.name !== 'boxImage' && item.attrs.name !== 'player' && item.attrs.name !== 'npcImage') {
                        if (itemR.x < playerR.x) {
                            if (engine.haveIntersectionY(itemR, playerR)) {
                                if (engine.haveIntersectionX(itemR, playerR)) {
                                    if (playerR.y > itemR.y) {
                                        player.collisions.leftBox = true;
                                        if (item.attrs.name === 'npc') {
                                            player.collisions.checkNpc(engine.npcs[item.attrs.npcID], 'left');
                                        }
                                    }
                                }
                            }
                        }
                        if (itemR.x > playerR.x) {
                            if (engine.haveIntersectionY(itemR, playerR)) {
                                if (engine.haveIntersectionX(itemR, playerR)) {
                                    if (playerR.y > itemR.y) {
                                        player.collisions.rightBox = true;
                                        if (item.attrs.name === 'npc') {
                                            player.collisions.checkNpc(engine.npcs[item.attrs.npcID], 'right');
                                        }
                                    }
                                }
                            }
                        }
                        if (itemR.y > playerR.y) {
                            if (engine.haveIntersectionY(itemR, playerR)) {
                                if (engine.haveIntersectionX(itemR, playerR)) {
                                    if (engine.haveIntersection(itemR, playerR)) {
                                        if (itemR.y < playerR.y + (playerR.height - 1))
                                            engine.cameraMoveY(-1);
                                    }
                                    player.collisions.bottomBox = true;
                                    player.status = 'idle';
                                    player.gravity.jumpPower = 0;
                                    if (item.attrs.name === 'npc') {
                                        player.collisions.checkNpc(engine.npcs[item.attrs.npcID], 'bottom');
                                    }
                                }
                            }
                        }
                        if (itemR.y < playerR.y) {
                            if (engine.haveIntersectionY(itemR, playerR)) {
                                if (engine.haveIntersectionX(itemR, playerR)) {
                                    player.collisions.topBox = true;
                                    player.gravity.jumpPower = -1;
                                    if (item.attrs.name === 'mysterious' || item.attrs.name === 'mysteriousEmpty') {
                                        layerHits.children.each(function (itemImageSearch) {
                                            if (itemImageSearch.attrs.id === item.attrs.idImage)
                                                itemImageSearch.image(engine.images['boxMysteriousEmpty']);
                                        });
                                        if (item.attrs.name === 'mysterious')
                                            player.score += 100;
                                        item.name('mysteriousEmpty');
                                    }
                                    if (item.attrs.name === 'npc') {
                                        player.collisions.checkNpc(engine.npcs[item.attrs.npcID], 'top');
                                    }
                                }
                            }
                        }
                    }
                }
            );
        },
        checkNpc: function (npc, direction) {
            if (npc.killer) {
                if (direction) {
                    if (player.noDamageFrames < engine.renderFrame && direction !== 'bottom') {
                        player.noDamageFrames = engine.renderFrame + 150;
                        if (direction === 'left') {
                            player.lives -= 1;
                            player.gravity.gravityLeft = 6;
                            player.gravity.jumpPower = 10;
                            engine.cameraMoveY(-10);
                            engine.cameraMoveX(10);
                        }
                        if (direction === 'right') {
                            player.lives -= 1;
                            player.gravity.gravityRight = 6;
                            player.gravity.jumpPower = 10;
                            engine.cameraMoveY(-10);
                            engine.cameraMoveX(-10);
                        }
                        if (direction === 'top') {
                            player.lives -= 5;
                        }
                    }
                    if (direction === 'bottom') {
                        engine.cameraMoveY(-10);
                        player.gravity.jumpPower = 7;
                        npc.hp -= 1;
                        if (npc.hp <= 0) {
                            player.score += npc.addScore;
                            npc.entity.destroy();
                            npc.entityImage.destroy();
                        }
                    }
                }
            }
        }
    },
    status: 'idle',
    entity: null,
    entityImage: null,
    score: 0,
    lives: 3,
    maxLives: 3,
    noDamageFrames: 0,
    gravity: {
        gravityLeft: 0,
        gravityRight: 0,
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

            if (player.gravity.gravityLeft > 0) {
                if (!player.collisions.rightBox) {
                    engine.cameraMoveX(player.gravity.gravityLeft);
                }
                player.gravity.gravityLeft -= 0.25;
            }
            if (player.gravity.gravityRight > 0) {
                if (!player.collisions.leftBox) {
                    engine.cameraMoveX(-player.gravity.gravityRight);
                }
                player.gravity.gravityRight -= 0.25;
            }
        }
    }
};