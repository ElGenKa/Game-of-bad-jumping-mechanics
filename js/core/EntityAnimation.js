class EntityAnimation {
    constructor(entity) {
        this.entity = entity;
        this.frame = 0;
        this.countFrame = 0;
        this.asset = null;
        this.timer = setInterval(this.player, 50, this);
        this.stoped = true;
    }

    player(animator) {
        //console.log(animator.frame);
        if(!animator.stoped) {
            animator.frame += 1;
            if (animator.frame == animator.countFrame) {
                animator.frame = 0;
            }
            animator.entity.image(animator.asset.image[animator.frame]);
        }
    }

    start(asset,speed = 50) {
        //console.log(speed);
        if(this.asset !== asset) {
            //console.log(asset);
            this.stoped = false;
            this.frame = 0;
            this.countFrame = asset.count;
            this.asset = asset;
            //this.timer = ;
        }else{
            this.stoped = false;
        }
        //console.log(this);
    }

    stop(){
        this.stoped = true;
        //console.log('stop');
    }
}