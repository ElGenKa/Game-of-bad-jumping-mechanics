class Bullet {
    constructor() {
        this.moveAngle = 0;
        this.angle = 0;
        this.vector = [];
        this.bullet = null;
        this.player = null;
        this.entity = null;
        this.live = false;
        this.framesLive = 0;
        this.setData = function (x, y, vx, vy, bullet, player = true) {
            this.moveAngle = Math.atan2(y - vy, x - vx) / Math.PI * 180;
            this.angle = this.moveAngle * Math.PI / 180;
            this.vector = [Math.cos(this.angle), Math.sin(this.angle)];
            this.bullet = bullet;
            this.player = player;
            this.entity = bulletProto.clone()
                .width(bullet.w)
                .height(bullet.h)
                .x(x)
                .y(y);
            this.entity.attrs.classId = this;
            layerHits.add(this.entity);
            this.live = true;
            this.framesLive = 150;

        };
        this.upd = function () {
            if (this.live) {
                this.framesLive -= 1;
                if (this.framesLive <= 0) {
                    this.live = false;
                }
                this.entity.move({
                    x: -this.bullet.bulletSpeed * this.vector[0],
                    y: -this.bullet.bulletSpeed * this.vector[1]
                });
                /*var bullet = {
                    x: this.entity.x(),
                    y: this.entity.y(),
                    width: this.entity.width(),
                    height: this.entity.height(),
                    ths: this
                };
                var layerPos = {
                    x: layerHits.x(),
                    y: layerHits.y()
                };
                var targetName;*/
                /*if (bullet.x > 0 && bullet.x < 1200 && bullet.y > 0 && bullet.y < 600)
                    mapChildrens.each(function (item) {
                        targetName = item.name();
                        if (targetName === 'box') {
                            if (!engine.Intersection(item.getClientRect(), bullet)) {
                                bullet.ths.live = false;
                                return false;
                            }
                        }
                    });*/
                /*layerHits.children.each(function (item) {
                        var targetName = item.attrs.name;
                        if(targetName !== 'bullet') {
                            if (targetName === 'player') {
                                if (item.attrs.subName === 'bulletBox') {
                                    if (!engine.Intersection(item.getClientRect(), bullet)) {
                                        if (!bullet.ths.player) {
                                            bullet.ths.live = false;
                                            player.hp -= bullet.ths.bullet.damage;
                                            return false;
                                        }
                                    }
                                }
                            } else if (targetName === 'npcEnemy') {
                                if (!engine.Intersection(item.getClientRect(), bullet)) {
                                    if (bullet.ths.player) {
                                        bullet.ths.live = false;
                                        item.attrs.controller.hp -= bullet.ths.bullet.damage;
                                        player.inventory.addScore(item.attrs.controller.addScore);
                                        return false;
                                    }
                                }
                            } else if (targetName === 'box') {
                                if (!engine.Intersection(item.getClientRect(), bullet)) {
                                    bullet.ths.live = false;
                                    return false;
                                }
                            }
                        }
                    }
                );*/
            }
            if (!this.live) {
                this.entity.destroy();
            }
        }
    }

    setData(x, y, vx, vy, bullet, player = true) {

    }

    upd() {

    }

    modul(a, b) {
        if (a < 0)
            a = a * -1;
        if (b < 0)
            b = b * -1;
        return a / b;
    }
}