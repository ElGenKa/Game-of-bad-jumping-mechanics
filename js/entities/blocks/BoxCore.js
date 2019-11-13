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
        var entity =  new Konva.Image({
            image: this.image,
            x: this.x,
            y: this.y,
            draggable: drag,
            width: this.w,
            height: this.h,
            t: this.name,
            name: 'box',
            stroke: 'red',
            strokeWidth: 3
        });
        entity.strokeEnabled(false);
        return entity;
    }
}