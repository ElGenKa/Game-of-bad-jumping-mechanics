class Interface {
    constructor() {

    }
    upd() {
        //player
        var hpBar = player.hpBar;
        var hpBarDown = hpBar.down;
        var hpBarUp = hpBar.up;
        var playerHP = parseInt(player.hp);
        var playerHPMax = parseInt(player.hpMax);
        var barColor;
        var procentHp = (playerHP / playerHPMax) * 100;
        if (procentHp === 100) {
            barColor = 'green';
        } else if (procentHp < 100 && procentHp > 25) {
            barColor = 'yellow';
        } else {
            barColor = 'red';
        }
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
        //enemies
        engine.npcs.forEach(function (npc) {
            if(npc.live){
                //console.log(npc.hpBar);
                var procentHp = (npc.hp / npc.maxHp) * 100;
                if (procentHp === 100) {
                    barColor = 'green';
                } else if (procentHp < 100 && procentHp > 25) {
                    barColor = 'yellow';
                } else {
                    barColor = 'red';
                }
                npc.hpBar.fill(barColor);
                npc.hpBar.width((50 / 100) * procentHp);
                npc.hpBar.x(npc.entity.x());
                npc.hpBar.y(npc.entity.y() - 5);
            }
        });
    }
}