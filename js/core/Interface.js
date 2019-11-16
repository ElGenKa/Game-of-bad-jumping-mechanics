class Interface {
    constructor() {

    }

    upd() {
        //player
        var hpBar = player.hpBar;
        var hpBarDown = hpBar.down;
        var hpBarUp = hpBar.up;
        var playerHP = player.hp;
        var playerHPMax = player.hpMax;
        var barColor;
        var procentHp = (playerHP / playerHPMax) * 100;
        if (procentHp === 100) {
            barColor = 'green';
        } else if (procentHp < 100 && procentHp > 25) {
            barColor = 'yellow';
        } else {
            barColor = 'red';
        }
        //console.log(procentHp);
        hpBarUp.fill(barColor);
        hpBarUp.width((98 / 100) * procentHp);

        var i = 0;
        layerInterface.children.each(function (item) {
            if(item.attrs.name === 'bullet'){
                if(i < player.weapon.bullets){
                    item.image(engine.images['playerBullet']);
                    i++;
                }else{
                    item.image(engine.images['playerBulletEmpty']);
                }
            }
        });


        /*var bullet;

        for (i = 0; i < player.weapon.maxBullets; i++) {
            bullet = new Konva.Image({
                x: 10,
                y: 10 + i*15,
                image: engine.images['playerBulletEmpty']
            });
            layerInterface.add(bullet);
        }
        */

        //
        /*var i;

        var pw = player.weapon;*/

        /*layerInterface.children.each(function (item) {
            //if(item.attrs.name === 'bullet')
            //    item.destroy();
        });
        var bullet;
        for (i = 0; i < pw.maxBullets; i++) {
            bullet = new Konva.Image({
                x: 10,
                y: 10 + i*15,
                image: engine.images['playerBulletEmpty']
            });
            layerInterface.add(bullet);
        }
        for (i = 0; i < pw.bullets; i++) {
            bullet = new Konva.Image({
                x: 10,
                y: 10 + i*15,
                image: engine.images['playerBullet']
            });
            layerInterface.add(bullet);
        }*/

        /*hpBarDown.x( player.entity.x() - player.entity.width / 2 );
        hpBarDown.x( player.entity.y() - player.entity.height  - 10 );

        hpBarUp.x( hpBarDown.x() + 1 );
        hpBarUp.y( hpBarDown.y() + 1 );*/

        //enemies
        engine.npcs.forEach(function (npc) {
            //code
        });
    }
}