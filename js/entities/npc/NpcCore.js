class NpcCore {
    constructor(x, y, textures, w, h, addScore, hp, killer, viewDistance, name, weapon, speed) {
        this.entity = null;
        this.speed = speed;
        this.viewDistance = viewDistance;
        this.killer = killer;
        this.hp = hp;
        this.maxHp = hp;
        this.addScore = addScore;
        this.status = 'idle';
        this.textures = textures;
        this.collisions = {
            leftBox: false,
            topBox: false,
            rightBox: false,
            downBox: false,
        };
        var entity;
        var drag = false;
        if (engine.editor === 1)
            drag = true;
        entity = new Konva.Image({
            image: textures.front,
            x: x,
            y: y,
            width: w,
            height: h,
            name: 'npcEnemy',
            draggable: drag,
            tNpc: name,
            controller: this
        });
        this.animator = new EntityAnimation(entity);
        this.entity = entity;
        this.hpBar = new Konva.Rect({
            width: 50,
            height: 4
        });
        layerInterface.add(this.hpBar);
        this.weapon = new Weapon(weapon);
        this.live = true;
        this.deadTimer = null;
        engine.npcI += 1;
        engine.npcs.push(this);
        return entity;
    }

    upd() {
        if (this.hp > 0) {
            var thisNpc = this.entity.getClientRect();
            var thisThis = this;
            thisThis.collisions.leftBox = thisThis.collisions.rightBox = thisThis.collisions.downBox = thisThis.collisions.topBox = false;

            mapChildrensBullet.each(function (item) {
                if (item.attrs.classId.player) {
                    var itemR = item.getClientRect();
                    if (!engine.Intersection(itemR, thisNpc)) {
                        item.attrs.classId.live = false;
                        item.attrs.classId.entity.destroy();
                        thisThis.hp -= item.attrs.classId.bullet.damage;
                    }
                }
            });
            mapChildrens.forEach(function (item) {
                    var itemR = item.getClientRect();
                    if (itemR.x > thisNpc.x - 200  && itemR.x < 200 + thisNpc.x) {
                        if (itemR.y > thisNpc.y - 200  && itemR.y < 200 +thisNpc.y) {
                            if (item.attrs.name !== 'npcEnemy' && item.attrs.name !== 'player' && item.attrs.name !== 'decoration') {
                                if (!engine.Intersection(itemR, thisNpc)) {
                                    itemR.centerX = itemR.x + itemR.width / 2;
                                    itemR.centerY = itemR.y + itemR.height / 2;
                                    thisNpc.centerX = thisNpc.x + thisNpc.width / 2;
                                    thisNpc.centerY = thisNpc.y + thisNpc.height / 2;
                                    if (engine.haveIntersectionX(itemR, thisNpc)) {
                                        if (thisNpc.centerX > itemR.centerX) {
                                            thisThis.collisions.leftBox = true;
                                        } else {
                                            thisThis.collisions.rightBox = true;
                                        }
                                    }
                                    if (engine.haveIntersectionY(itemR, thisNpc)) {
                                        if (thisNpc.centerY > itemR.centerY) {
                                            thisThis.collisions.topBox = true;
                                        } else {
                                            thisThis.collisions.downBox = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            );
            var x = this.entity.attrs.x;
            var y = this.entity.attrs.y;
            //var player = layerHits.find('.player')[0];
            var playerDistanceX = playerPosition.x - x;
            var playerDistanceY = playerPosition.y - y;
            if (playerDistanceX < this.viewDistance && playerDistanceX > -this.viewDistance) {
                var playerDirect = playerData.getClientRect();
                playerDirect.x = playerDirect.x + playerDirect.width / 2;
                playerDirect.y = playerDirect.y + playerDirect.height / 2;
                this.weapon.fire(this.entity.getClientRect(), playerDirect, false);
                if (playerDistanceX > 0) {
                    this.moveX(this.speed, 'right');
                    this.animator.start(this.textures['right']);
                } else {
                    this.moveX(-this.speed, 'left');
                    this.animator.start(this.textures['left']);
                }
            }
            if (playerDistanceY < this.viewDistance && playerDistanceY > -this.viewDistance) {
                if (playerDistanceY < this.viewDistance && playerDistanceY > 0) {
                    this.moveY(this.speed, 'down');
                    this.animator.start(this.textures['down']);
                } else {
                    this.moveY(this.speed, 'top');
                    this.animator.start(this.textures['top']);
                }
            } else {
                this.animator.stop();
                this.entity.image(this.textures['front']);
            }
        } else if (this.hp <= 0) {
            if (this.live) {
                this.live = false;
                this.deadTimer = setInterval(function (npc) {
                    var newOp = npc.entity.opacity() - 0.1;
                    npc.entity.opacity(newOp);
                    if (newOp <= 0) {
                        clearInterval(npc.deadTimer);
                        npc.entity.destroy();
                    }
                }, 100, this)
            }
        }
    }

    moveX(speed, direction) {
        var newX;
        if (direction === 'left') {
            if (!this.collisions.leftBox) {
                newX = this.entity.x() - this.speed;
                this.entity.x(newX);
            }
        } else {
            if (!this.collisions.rightBox) {
                newX = this.entity.x() + this.speed;
                this.entity.x(newX)
            }
        }
    }

    moveY(speed, direction) {
        var newY;
        if (direction === 'top') {
            if (!this.collisions.topBox) {
                newY = this.entity.y() - this.speed;
                this.entity.y(newY)
            }
        } else {
            if (!this.collisions.downBox) {
                newY = this.entity.y() + this.speed;
                this.entity.y(newY)
            }
        }
    }
}