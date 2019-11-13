class BoxCore {
    constructor(x,y,w,h,image,name){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
        this.name = name;
        return this.draw();
    }

    draw(){
        var drag = false;
        if (engine.editor === 1)
            drag = true;
        var group = new Konva.Group({
            x: this.x,
            y: this.y,
            draggable: drag,
            t: this.name
        });
        var entity;
        if(this.image.count === 1) {
            entity = new Konva.Image({
                image: this.image.image,
                x: 0,
                y: 0,
                width: this.w,
                height: this.h,
                parent: group
            });
            group.add(entity);
        }else{
            for(var i = 0; i<this.image.count; i++){
                entity = new Konva.Image({
                    image: this.image.image[i],
                    x: 70*i,
                    y: 0,
                    width: this.w / this.image.count,
                    height: this.h,
                    parent: group
                });
                group.add(entity);
            }
        }
        //group.strokeEnabled(false);
        return group;
    }
}