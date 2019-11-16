class Weapon {
    constructor() {
        this.damage = 25;
        this.rate = 1000;
        this.reflection = false;
        this.incendiary = false;
        this.vampirism = false;
        this.inFire = false;
        this.inReload = false;
        this.bullets = 10;
        this.maxBullets = 10;
        this.reloadRate = 2500;
        this.reloadTimer = null;
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
                    console.log(this);
                    this.bullets -= 1;
                    //var bullet = new Bullet(starter.x(), starter.y(), endler.x(), endler.y(), player);
                    //engine.bullets.push(bullet);
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
                if(weapon.bullets === weapon.maxBullets)
                    clearInterval(weapon.reloadTimer);
            }, this.reloadRate / this.maxBullets, this);
        }
    }
}