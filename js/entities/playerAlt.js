class Player {
    constructor() {
        this.entity = null;
        this.entityHitBox = null;
        this.entityHitBullets = null;
        this.animator = null;
        this.inventory = null;
        this.weapon = null;
        this.hp = 101;
        this.hpMax = 101;
        this.hpBar = null;
        this.speed = 10;
        this.deadTimer = null;
        this.collisions = {
            checkCollision: function () {
                player.collisions.leftBox = player.collisions.topBox = player.collisions.rightBox = player.collisions.downBox = false;
                var playerR = playerPosition.hitBoxBullet;
                mapChildrensBullet.each(function (item) {
                    var itemR = item.getClientRect();
                    if (itemR.x > 500 && itemR.x < 700) {
                        if (itemR.y > 200 && itemR.y < 400) {
                            if (!engine.Intersection(itemR, playerR)) {
                                //if (item.attrs.name === 'bullet') {
                                if (!item.attrs.classId.player) {
                                    item.attrs.classId.live = false;
                                    item.attrs.classId.entity.destroy();
                                    player.hp -= item.attrs.classId.bullet.damage;
                                }
                                //}
                            }
                        }
                    }
                });
                playerR = playerPosition.hitBox;
                var facePlayer = {
                    top: {
                        x: 0,
                        y: 0,
                    },
                    bottom: {
                        x: 0,
                        y: 0,
                    },
                    left: {
                        x: 0,
                        y: 0,
                    },
                    right: {
                        x: 0,
                        y: 0,
                    }
                };
                var faceItem = {
                    top: {
                        x: 0,
                        y: 0,
                    },
                    bottom: {
                        x: 0,
                        y: 0,
                    },
                    left: {
                        x: 0,
                        y: 0,
                    },
                    right: {
                        x: 0,
                        y: 0,
                    }
                };
                //var textBoxes = [];
                mapChildrens.forEach(function (item) {
                        if (item.attrs.name === 'box') {
                            var itemR = item.getClientRect();
                            if (itemR.x > 200 && itemR.x < 600 + itemR.width) {
                                if (itemR.y > 200 && itemR.y < 400 + itemR.height) {
                                    if (!engine.Intersection(itemR, playerR)) {
                                        //Ищем центры объектов
                                        itemR.centerX = itemR.x + itemR.width / 2;
                                        itemR.centerY = itemR.y + itemR.height / 2;
                                        playerR.centerX = playerR.x + playerR.width / 2;
                                        playerR.centerY = playerR.y + playerR.height / 2;
                                        playerR.distanceX = Math.abs(itemR.centerX - playerR.centerX);
                                        playerR.distanceY = Math.abs(itemR.centerY - playerR.centerY);

                                        facePlayer.left.x = playerR.x;
                                        facePlayer.left.y = playerR.y + playerR.height / 2;

                                        facePlayer.right.x = playerR.x + playerR.width;
                                        facePlayer.right.y = playerR.y + playerR.height / 2;

                                        facePlayer.bottom.x = playerR.x + playerR.width / 2;
                                        facePlayer.bottom.y = playerR.y + playerR.height;

                                        facePlayer.top.x = playerR.x + playerR.width / 2;
                                        facePlayer.top.y = playerR.y;

                                        faceItem.top.x = itemR.x + itemR.width / 2;
                                        faceItem.top.y = itemR.y;

                                        faceItem.left.x = itemR.x;
                                        faceItem.left.y = itemR.y + itemR.height / 2;

                                        faceItem.right.x = itemR.x + itemR.width;
                                        faceItem.right.y = itemR.y + itemR.height / 2;

                                        faceItem.bottom.x = itemR.x + itemR.width / 2;
                                        faceItem.bottom.y = itemR.y + itemR.height;

                                        var disTop = Math.sqrt(Math.pow(playerR.centerX - faceItem.top.x,2) + Math.pow(playerR.centerY - faceItem.top.y,2));
                                        var disBot = Math.sqrt(Math.pow(playerR.centerX - faceItem.bottom.x,2) + Math.pow(playerR.centerY - faceItem.bottom.y,2));
                                        var disLeft = Math.sqrt(Math.pow(playerR.centerX - faceItem.left.x,2) + Math.pow(playerR.centerY - faceItem.left.y,2));
                                        var disRight = Math.sqrt(Math.pow(playerR.centerX - faceItem.right.x,2) + Math.pow(playerR.centerY - faceItem.right.y,2));

                                        if (itemR.centerX < playerR.centerX && (disRight < disTop && disRight < disBot)) {
                                            faceItem.x = itemR.x + itemR.width;
                                            faceItem.y = itemR.y + itemR.height;
                                            console.log(1);
                                            if (facePlayer.left.x < faceItem.x) { //Если грань игрока в за гранью блока
                                                if (Math.abs(facePlayer.left.y - faceItem.y) < itemR.height) {
                                                    player.collisions.leftBox = true;
                                                    return true;
                                                }
                                            }

                                        } else if (itemR.centerX > playerR.centerX && (disLeft < disTop && disLeft < disBot)) { //Если левее
                                            faceItem.x = itemR.x;
                                            faceItem.y = itemR.y + itemR.height;
                                            console.log(2);
                                            if (facePlayer.right.x > faceItem.x) { //Если грань игрока в за гранью блока
                                                if (Math.abs(facePlayer.right.y - faceItem.y) < itemR.height) {
                                                    player.collisions.rightBox = true;
                                                    return true;
                                                }
                                            }

                                        } else if (playerR.centerY < itemR.centerY && (disTop < disLeft || disTop < disRight)) { //Ниже
                                            faceItem.x = itemR.x + itemR.width / 2;
                                            faceItem.y = itemR.y;
                                            console.log(3);
                                            if (facePlayer.bottom.y > faceItem.y) { //Если грань игрока в за гранью блока
                                                if (Math.abs(facePlayer.bottom.x - faceItem.x) < itemR.width) {
                                                    player.collisions.downBox = true;
                                                    return true;
                                                }
                                            }
                                        } else if (playerR.centerY > itemR.centerY && (disBot < disLeft || disBot < disRight)) { //выше
                                            faceItem.x = itemR.x + itemR.width / 2;
                                            faceItem.y = itemR.y + itemR.height;
                                            console.log(3);
                                            if (facePlayer.top.y < faceItem.y) { //Если грань игрока в за гранью блока
                                                if (Math.abs(facePlayer.top.x - faceItem.x) < itemR.width) {
                                                    player.collisions.topBox = true;
                                                    return true;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    return true;
                                }
                            } else {
                                return true;
                            }
                        }
                    }
                );
                /*console.clear();
                console.log(textBoxes);*/
            },
            leftBox: false,
            topBox: false,
            rightBox: false,
            downBox: false
        };
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            q: false,
            e: false,
            r: false,
            space: false,
            shift: false
        }
    }

    keyHandler(key, direction) {
        var set = direction !== 'up';
        switch (key) {
            case 87:
                this.keys.w = set;
                break; //W
            case 65:
                this.keys.a = set;
                break; //A
            case 83:
                this.keys.s = set;
                break; //S
            case 68:
                this.keys.d = set;
                break; //D
            case 81:
                this.keys.q = set;
                break; //Q
            case 69:
                this.keys.e = set;
                break; //E
            case 82:
                this.keys.r = set;
                break; //R
            case 32:
                this.keys.space = set;
                break; //SPACE
            case 16:
                this.keys.shift = set;
                break; //SHIFT

        }
    }

    upd() {
        //Animation & direction
        if (this.keys.w && this.keys.a) { // left-top
            this.animator.start(engine.images['playerAnimateLeftTop']);
            this.moveX(-this.speed, 'left');
            this.moveY(-this.speed, 'top');
        } else if (this.keys.a && this.keys.s) { // left-down
            this.animator.start(engine.images['playerAnimateLeftDown']);
            this.moveX(-this.speed, 'left');
            this.moveY(this.speed, 'down');
        } else if (this.keys.s && this.keys.d) { // right-down
            this.animator.start(engine.images['playerAnimateRightDown']);
            this.moveX(this.speed, 'right');
            this.moveY(this.speed, 'down');
        } else if (this.keys.d && this.keys.w) { // right-top
            this.animator.start(engine.images['playerAnimateRightTop']);
            this.moveX(this.speed, 'right');
            this.moveY(-this.speed, 'top');
        } else if (this.keys.w) { // top
            this.animator.start(engine.images['playerAnimateTop']);
            this.moveY(-this.speed, 'top');
        } else if (this.keys.a) { // left
            this.animator.start(engine.images['playerAnimateLeft']);
            this.moveX(-this.speed, 'left');
        } else if (this.keys.s) { // down
            this.animator.start(engine.images['playerAnimateDown']);
            this.moveY(this.speed, 'down');
        } else if (this.keys.d) { // right
            this.animator.start(engine.images['playerAnimateRight']);
            this.moveX(this.speed, 'right');
        } else { // stop playerFront
            this.animator.stop();
            this.entity.image(engine.images['playerFront'])
        }

        if (this.keys.space) {
            //console.log(this.weapon);
            this.weapon.fire(this.entity.getClientRect(), layerHits.getStage().getPointerPosition(), true);
        }

        if (this.keys.r) {
            this.weapon.reload();
        }
    }

    moveX(speed, direction) {
        if (direction === 'left') {
            if (!this.collisions.leftBox) {
                engine.cameraMoveX(-this.speed);
            }
        } else {
            if (!this.collisions.rightBox) {
                engine.cameraMoveX(this.speed);
            }
        }
    }

    moveY(speed, direction) {
        if (direction === 'top') {
            if (!this.collisions.topBox) {
                engine.cameraMoveY(-this.speed);
            }
        } else {
            if (!this.collisions.downBox) {
                engine.cameraMoveY(this.speed);
            }
        }
    }
}