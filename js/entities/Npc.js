class Npc {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.entity = null;
        this.entityImage = null;
        this.speed = 1;
        this.ID = engine.npcI;
        this.viewDistance = 0;
        this.killer = false;
        this.jumpPower = 0;
        this.hp = 1;
        this.addScore = 0;
        this.status = 'idle';
        this.collisions = {
            leftBox: false,
            topBox: false,
            rightBox: false,
            bottomBox: false,
        };

        var w = 57;
        var h = 32;
        var image;
        var name;
        var entity;
        var entityImage;
        switch (type) {
            case 'snake':
                image = engine.images['snakeLeft'];
                name = 'snake';
                this.viewDistance = 500;
                this.killer = true;
                this.addScore = 100;
                break;
        }

        this.name = name;

        if (engine.editor !== 1) {
            entity = new Konva.Rect({
                x: x,
                y: y,
                width: w,
                height: h,
                npcID: this.ID,
                id: 'npc-' + this.ID,
                idImage: 'npcImage-' + this.ID,
                name: 'npc'
            });
        }

        entityImage = new Konva.Image({
            image: image,
            x: x,
            y: y,
            cameraMoveX: engine.mapMovedX,
            cameraMoveY: engine.mapMovedY,
            width: w,
            height: h,
            nameAlt: name,
            id: 'npcImage-' + this.ID,
            idBox: 'npc-' + this.ID,
            name: 'npcImage',
            tNpc: name,
        });

        if (entity)
            this.entity = entity;
        this.entityImage = entityImage;

        if (entity)
            layerHits.add(entity);
        layerHits.add(entityImage);

        engine.npcI += 1;
    }

    upd() {
        if (this.hp > 0) {
            this.x = this.entity.attrs.x;
            this.y = this.entity.attrs.y;
            var playerDistance = player.x - this.x;
            if (playerDistance < this.viewDistance && playerDistance > -this.viewDistance) {
                if (playerDistance < this.viewDistance && playerDistance > 0) {
                    this.moveRight(this.speed);
                } else {
                    this.moveLeft(this.speed);
                }
            }

            var thisNpc = this.entity.getClientRect();
            var thisThis = this;
            thisThis.collisions.leftBox = thisThis.collisions.rightBox = thisThis.collisions.bottomBox = false;
            layerHits.children.each(function (item) {
                    var itemR = item.getClientRect();
                    if (item.attrs.name !== 'boxImage' && item.attrs.name !== 'player' && item.attrs.name !== 'npcImage') {
                        if (itemR.x < thisNpc.x) {
                            if (engine.haveIntersectionY(itemR, thisNpc)) {
                                if (engine.haveIntersectionX(itemR, thisNpc)) {
                                    if (thisNpc.y > itemR.y) {
                                        thisThis.collisions.leftBox = true;
                                    }
                                }
                            }
                        }
                        if (itemR.x > thisNpc.x) {
                            if (engine.haveIntersectionY(itemR, thisNpc)) {
                                if (engine.haveIntersectionX(itemR, thisNpc)) {
                                    if (thisNpc.y > itemR.y) {
                                        thisThis.collisions.rightBox = true;
                                    }
                                }
                            }
                        }
                        if (itemR.y > thisNpc.y) {
                            if (engine.haveIntersectionY(itemR, thisNpc)) {
                                if (engine.haveIntersectionX(itemR, thisNpc)) {
                                    if (engine.haveIntersection(itemR, thisNpc)) {
                                        if (itemR.y < thisNpc.y + (thisNpc.height - 1))
                                            thisThis.moveTop(1);
                                    }
                                    thisThis.collisions.bottomBox = true;
                                    thisThis.status = 'idle';
                                    thisThis.jumpPower = 0;
                                }
                            }
                        }
                    }
                }
            );
            if (!this.collisions.bottomBox) {
                this.jumpPower += 0.25;
                this.moveDown(this.jumpPower);
            } else {
                this.jumpPower = 0;
                this.status = 'idle';
            }
        }
    }

    moveLeft() {
        if (!this.collisions.leftBox) {
            this.entity.x(this.x - this.speed);
            this.entityImage.x(this.x - this.speed);
        }
        this.entityImage.image(engine.images['snakeLeft']);
    }

    moveRight() {
        if (!this.collisions.rightBox) {
            this.entity.x(this.x + this.speed);
            this.entityImage.x(this.x + this.speed);
        }
        this.entityImage.image(engine.images['snakeRight']);
    }

    moveDown(grav) {
        this.entity.y(this.y + grav);
        this.entityImage.y(this.y + grav);
    }

    moveTop(grav) {
        this.entity.y(this.y - grav);
        this.entityImage.y(this.y - grav);
    }
}