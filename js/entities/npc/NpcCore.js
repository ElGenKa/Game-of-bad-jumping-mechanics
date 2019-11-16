class NpcCore {
    constructor(x, y, textures, w, h, addScore, hp, killer, viewDistance, name, weapon) {
        this.entity = null;
        this.speed = 1;
        this.viewDistance = viewDistance;
        this.killer = killer;
        this.hp = hp;
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
        });
        this.animator = new EntityAnimation(entity);
        this.entity = entity;
        this.weapon = new Weapon(weapon);
        engine.npcI += 1;
        engine.npcs.push(this);
        return entity;
    }

    upd() {
        if (this.hp > 0) {
            var thisNpc = this.entity.getClientRect();
            var thisThis = this;
            thisThis.collisions.leftBox = thisThis.collisions.rightBox = thisThis.collisions.downBox = thisThis.collisions.topBox = false;
            layerHits.children.each(function (item) {
                    var itemR = item.getClientRect();
                    if (item.attrs.name !== 'npcEnemy' && item.attrs.name !== 'player' && item.attrs.name !== 'decoration') {
                        if (!engine.Intersection(itemR, thisNpc)) {
                            itemR.centerX = itemR.x + itemR.width / 2;
                            itemR.centerY = itemR.y + itemR.height / 2;
                            thisNpc.centerX = thisNpc.x + thisNpc.width / 2;
                            thisNpc.centerY = thisNpc.y + thisNpc.height / 2;

                            //console.log(itemR.centerX + " " + thisNpc.centerX);
                            var direc = 0;
                            if (engine.haveIntersectionX(itemR, thisNpc)) {
                                //console.log(itemR.centerX + " " + thisNpc.centerX);
                                if (thisNpc.centerX > itemR.centerX) {
                                    //console.log(itemR);
                                    thisThis.collisions.leftBox = true;
                                    /*direc = ((itemR.x + itemR.width) - playerR.x);
                                    //player.moveX(direc, 'right');*/
                                } else {
                                    //console.log('2');
                                    thisThis.collisions.rightBox = true;
                                    /*direc = ((playerR.x + playerR.width) - itemR.x);
                                    //player.moveX(direc, 'left');*/
                                }

                            }
                            if (engine.haveIntersectionY(itemR, thisNpc)) {
                                if (thisNpc.centerY > itemR.centerY) {
                                    //console.log('3');
                                    thisThis.collisions.topBox = true;
                                    /*direc = itemR.y - playerR.y;
                                    //player.moveY(direc, 'down');*/
                                } else {
                                    //console.log('4');
                                    thisThis.collisions.downBox = true;
                                    /*direc = playerR.y - itemR.y;
                                    //player.moveY(direc, 'top');*/
                                }

                            }
                        }
                    }
                }
            );

            var x = this.entity.attrs.x;
            var y = this.entity.attrs.y;
            var playerDistanceX = player.entity.x() - x;
            var playerDistanceY = player.entity.y() - y;
            //console.log(playerDistanceX);
            if (playerDistanceX < this.viewDistance && playerDistanceX > -this.viewDistance) {
                this.weapon.fire(this.entity.getClientRect(),player.entity.getClientRect(),false);
                if (playerDistanceX > 0) {
                    //console.log('1');
                    this.moveX(this.speed, 'right');
                    this.animator.start(this.textures['right']);
                } else {
                    //console.log('2');
                    this.moveX(-this.speed, 'left');
                    this.animator.start(this.textures['left']);
                }
            }
            if (playerDistanceY < this.viewDistance && playerDistanceY > -this.viewDistance) {
                if (playerDistanceY < this.viewDistance && playerDistanceY > 0) {
                    //console.log('3');
                    this.moveY(this.speed, 'down');
                    this.animator.start(this.textures['down']);
                } else {
                    //console.log('4');
                    this.moveY(this.speed, 'top');
                    this.animator.start(this.textures['top']);
                }
            }
            else{
                //console.log('5');
                this.animator.stop();
                this.entity.image(this.textures['front']);
            }
        }
    }

    moveX(speed, direction) {
        //console.log(this.collisions);
        var newX;
        if (direction === 'left') {
            if (!this.collisions.leftBox) {
                newX = this.entity.x()-this.speed;
                //console.log(newX);
                this.entity.x( newX );
                //engine.cameraMoveX(-this.speed);
            }
        } else {
            if (!this.collisions.rightBox) {
                newX = this.entity.x()+this.speed;
                //console.log(newX);
                this.entity.x( newX )
            }
        }
    }

    moveY(speed, direction) {
        var newY;
        if (direction === 'top') {
            if (!this.collisions.topBox) {
                //engine.cameraMoveY(-this.speed);
                newY = this.entity.y()-this.speed;
                this.entity.y( newY )
            }
        } else {
            if (!this.collisions.downBox) {
                //engine.cameraMoveY(this.speed);
                newY = this.entity.y()+this.speed;
                this.entity.y( newY )
            }
        }
    }
}