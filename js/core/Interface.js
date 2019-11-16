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
        if(procentHp === 100){
            barColor = 'green';
        }else if (procentHp < 100 && procentHp > 25) {
            barColor = 'yellow';
        } else {
            barColor = 'red';
        }
        //console.log(procentHp);
        hpBarUp.fill(barColor);
        hpBarUp.width((98 / 100) * procentHp);
        //

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