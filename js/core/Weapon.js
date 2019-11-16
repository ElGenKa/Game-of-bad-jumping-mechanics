class Weapon {
    constructor(params = {}) {
        this.reloadTimer = null;
        this.inFire = false;
        this.inReload = false;

        if (params.w)
            this.w = params.w;
        else
            this.w = 5;

        if (params.h)
            this.h = params.h;
        else
            this.h = 5;

        if (params.damage)
            this.damage = params.damage;
        else
            this.damage = 25;

        if (params.rate)
            this.rate = params.rate;
        else
            this.rate = 300;

        if (params.reflection)
            this.reflection = params.reflection;
        else
            this.reflection = false;

        if (params.incendiary)
            this.incendiary = params.incendiary;
        else
            this.incendiary = false;

        if (params.vampirism)
            this.vampirism = params.vampirism;
        else
            this.vampirism = false;

        if (params.bullets)
            this.bullets = params.bullets;
        else
            this.bullets = 10;

        if (params.maxBullets)
            this.maxBullets = params.maxBullets;
        else
            this.maxBullets = 10;

        if (params.reloadRate)
            this.reloadRate = params.reloadRate;
        else
            this.reloadRate = 1000;

        if (params.bulletSpeed)
            this.bulletSpeed = params.bulletSpeed;
        else
            this.bulletSpeed = 10;
    }

    addModifer(modifer, param = null) {
        switch (modifer) {
            case 'damage':
                if (param != null)
                    this.damage += 10;
                else
                    this.damage += param;
                break;
            case 'rate':
                if (param != null)
                    this.rate -= 75;
                else
                    this.rate -= param;
                break;
            case 'reloadRate':
                if (param != null)
                    this.reloadRate -= 100;
                else
                    this.reloadRate -= param;
                break;
            case 'reflection':
                if (param != null)
                    this.reflection = true;
                else
                    this.reflection = param;
                break;
            case 'incendiary':
                if (param != null)
                    this.incendiary = true;
                else
                    this.incendiary = param;
                break;
            case 'vampirism':
                if (param != null)
                    this.vampirism = true;
                else
                    this.vampirism = param;
                break;
        }
    }

    fire(starter = false, endler = false, player = false) {
        if (!this.inReload) {
            if (this.bullets > 0) {
                if (!this.inFire) {
                    this.bullets -= 1;
                    //var bullet = new Bullet(starter.x + (starter.width / 2), starter.y + (starter.height / 2), endler.x, endler.y, this, player);
                    //console.log(bulletClassProto);
                    var bullet = Object.assign({}, bulletClassProto);
                    bullet.setData(starter.x + (starter.width / 2), starter.y + (starter.height / 2), endler.x, endler.y, this, player);
                    //var bullet = new Bullet(starter.x + (starter.width / 2), starter.y + (starter.height / 2), endler.x, endler.y, this, player);
                    //var bullet = bulletProto.clone().setData(starter.x + (starter.width / 2), starter.y + (starter.height / 2), endler.x, endler.y, this, player);
                    engine.bullets.push(bullet);
                    this.inFire = true;
                    setTimeout(function (weapon) {
                        weapon.inFire = false;
                    }, this.rate, this);
                }
            } else {
                this.reload();
            }
        }
    }

    reload() {
        if (!this.inReload) {
            this.inReload = true;
            this.bullets = 0;
            setTimeout(function (weapon) {
                weapon.inReload = false;
                weapon.bullets = weapon.maxBullets;
                weapon.inReload = false;
            }, this.reloadRate + 10, this);

            this.reloadTimer = setInterval(function (weapon) {
                weapon.bullets += 1;
                if (weapon.bullets === weapon.maxBullets)
                    clearInterval(weapon.reloadTimer);
            }, this.reloadRate / this.maxBullets, this);
        }
    }
}