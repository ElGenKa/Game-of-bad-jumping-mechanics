//var player;

class PlayerOld {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.status = 'idle';
        this.entity = null;
        this.entityImage = null;
        this.lives = 3;
        this.maxLives = 3;
        this.score = 0;
        this.noDamageFrames = 0;
        this.animator = null;
        this.keys = {
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
                        player.animator.stop();
                        /*if (player.gravity.jumpPower > 0)
                            player.entityImage.image(engine.images['playerJumpLeft']);
                        else*/
                            player.entityImage.image(engine.images['playerHurtLeft']);
                    } else {
                        player.animator.start(engine.images['playerAnimateLeft'], 50);
                        //player.entityImage.image(engine.images['playerLeft'])
                    }
                }
                if (player.keys.d) {
                    if (!player.collisions.rightBox) {
                        engine.cameraMoveX(3);
                    }
                    if (player.status === 'jumped') {
                        player.animator.stop();
                        /*if (player.gravity.jumpPower > 0)
                            player.entityImage.image(engine.images['playerJumpRight']);
                        else*/
                            player.entityImage.image(engine.images['playerHurtRight']);
                    } else {
                        player.animator.start(engine.images['playerAnimateRight'], 50);
                        //player.entityImage.image(engine.images['playerRight'])
                    }
                }
                if (player.keys.s) {
                    if (player.status === 'idle') {
                        if (!player.collisions.topBox) {
                            engine.cameraMoveY(-10);
                            player.status = 'jumped';
                            //player.gravity.jumpPower = 10;
                        }
                    }
                }
                if (!player.keys.a && !player.keys.d) {
                    player.animator.stop();
                    player.entityImage.image(engine.images['playerFront'])
                }
            }
        };
        this.collisions = {
            leftBox: false,
            topBox: false,
            rightBox: false,
            bottomBox: false,
            checkCollision: function () {
                player.collisions.leftBox = player.collisions.topBox = player.collisions.rightBox = player.collisions.bottomBox = false;
                layerHits.children.each(function (item) {
                        var itemR = item.getClientRect();
                        var playerR = player.entityImage.getClientRect();
                        if (item.attrs.name !== 'decoration' && item.attrs.name !== 'player') {
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
                                            //console.log(player.collisions.leftBox);
                                            if (itemR.y < playerR.y + (playerR.height - 1)) {
                                                if (itemR.y < playerR.y + (playerR.height - 1))
                                                    engine.cameraMoveY(-1);
                                            } else {

                                            }
                                        }
                                        player.collisions.bottomBox = true;
                                        player.status = 'idle';
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
                                engine.cameraMoveY(-10);
                                engine.cameraMoveX(10);
                            }
                            if (direction === 'right') {
                                player.lives -= 1;
                                player.gravity.gravityRight = 6;
                                engine.cameraMoveY(-10);
                                engine.cameraMoveX(-10);
                            }
                            if (direction === 'top') {
                                player.lives -= 5;
                            }
                        }
                        if (direction === 'bottom') {
                            engine.cameraMoveY(-10);
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
        };
        this.gravity = {
            gravityLeft: 0,
            gravityRight: 0,
            jumpPower: 0,
            check: function () {
                /*if (!player.collisions.bottomBox) {
                    if (player.keys.s)
                        player.gravity.jumpPower -= 0.25;
                    else a
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
                }*/
            }
        };
    }
}

//Объект игрока с его поведением
/*
player = new Player();
player.entityImage = new Konva.Image({
    image: engine.images['playerLeft'],
    x: 600,
    y: 200,
    name: 'player',
    width: 66,
    height: 92
});
player.animator = new Animation(player.entityImage);*/
