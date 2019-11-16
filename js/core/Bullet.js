class Bullet {
    constructor(x,y,vx,vy,bullet,player = true){
        this.moveAngle = Math.atan2(y - vy, x - vx) / Math.PI * 180;
        this.angle = this.moveAngle * Math.PI / 180;
        this.vector = [ Math.cos(this.angle) , Math.sin(this.angle)];
        this.bullet = bullet;
        this.player = player;
        this.entity = new Konva.Rect({
            width: 5,
            height: 5,
            x: x,
            y: y,
            fill: 'red'
        });
        layerHits.add(this.entity);

        //console.log(this.vector);
    }

    upd(){
        var newX = this.entity.x() - this.bullet.bulletSpeed * this.vector[0];
        var newY = this.entity.y() - this.bullet.bulletSpeed * this.vector[1];
        //console.log(this.entity.x() + " " + newX);
        this.entity.x(newX);
        this.entity.y(newY);
    }

    modul(a, b){
        if(a < 0)
            a = a * -1;
        if(b < 0)
            b = b * -1;
        return a / b;
    }
}