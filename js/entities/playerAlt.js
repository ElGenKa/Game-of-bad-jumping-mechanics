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
        this.speed = 3;
        this.deadTimer = null;
        this.collisions = {
            checkCollision: function () {
                player.collisions.leftBox = player.collisions.topBox = player.collisions.rightBox = player.collisions.downBox = false;
                layerHits.children.each(function (item) {
                    var itemR = item.getClientRect();
                    var playerR = player.entityHitBox.attrs;
                    if(itemR.x > 400 && itemR.x < 800) {
                        if(itemR.y > 200 && itemR.y < 500) {
                            if (item.attrs.name !== 'decoration' && item.attrs.name !== 'player' && item.attrs.name !== 'npcEnemy') {
                                if (!engine.Intersection(itemR, playerR)) {
                                    itemR.centerX = itemR.x + itemR.width / 2;
                                    itemR.centerY = itemR.y + itemR.height / 2;
                                    playerR.centerX = playerR.x + playerR.width / 2;
                                    playerR.centerY = playerR.y + playerR.height / 2;
                                    var direc = 0;
                                    if (engine.haveIntersectionX(itemR, playerR)) {
                                        if (playerR.centerX > itemR.centerX) {
                                            player.collisions.leftBox = true;
                                        } else {
                                            player.collisions.rightBox = true;
                                        }

                                    }
                                    if (engine.haveIntersectionY(itemR, playerR)) {
                                        if (playerR.centerY > itemR.centerY) {
                                            player.collisions.topBox = true;
                                        } else {
                                            player.collisions.downBox = true;
                                        }
                                    }
                                }
                            }
                        }else{
                            return true;
                        }
                    }else{
                        return true;
                    }
                });
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

        if(this.keys.space){
            //console.log(this.weapon);
            this.weapon.fire(this.entity.getClientRect(),layerHits.getStage().getPointerPosition(),true);
        }

        if(this.keys.r){
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