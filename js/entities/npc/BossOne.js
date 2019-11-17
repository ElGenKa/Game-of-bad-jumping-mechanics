class BossOne extends NpcCore {
    constructor(x, y) {
        var textures = {
            'front': engine.images['madHeadFront'],
            'left': engine.images['madHeadAnimateLeft'],
            'right': engine.images['madHeadAnimateRight'],
            'top': engine.images['madHeadAnimateTop'],
            'down': engine.images['madHeadAnimateDown'],
        };

        var weapon = {
            rate: 300,
            reloadRate: 3000,
            bulletSpeed: 8,
            w: 9,
            h: 9,
            damage: 10
        };

        var boss = super(x, y, textures, 80, 80, 100, 750, true, 500, 'BossOne', weapon, 1);

        weapon = {
            rate: 10,
            reloadRate: 10,
            bulletSpeed: 13,
            w: 12,
            h: 12,
            bullets: 1000,
            damage: 5
        };


        boss.attrs.controller.lvl = engine.selectMap;
        boss.attrs.controller.weaponAlt = new Weapon(weapon);
        boss.attrs.controller.weaponAltAngle = 0;
        boss.attrs.controller.timer = setInterval(function (npc) {
            if(engine.selectMap !== npc.attrs.controller.lvl){
                clearInterval(npc.attrs.controller.timer);
            }
            if(npc.attrs.controller.hp>=0) {
                var npcD = npc.getClientRect();
                var playerDirect = {x: npcD.x + Math.floor(Math.random() * Math.floor(10)) + (npcD.x * Math.cos(npc.attrs.controller.weaponAltAngle * 3.14 / 180)), y: npcD.y + Math.floor(Math.random() * Math.floor(10)) + (npcD.y * Math.sin( npc.attrs.controller.weaponAltAngle * 3.14 / 180))};
                npc.attrs.controller.weaponAlt.fire(npc.getClientRect(), playerDirect, false);
                npc.attrs.controller.weaponAltAngle += 5;
            }else{
                clearInterval(npc.attrs.controller.timer);
                var contr = npc.attrs.controller;
                var score = new ItemScore(contr.entity.x()+15,contr.entity.y()+15,contr.addScore);
                score = new ItemScore(contr.entity.x()+25,contr.entity.y()+25,contr.addScore);
                score = new ItemScore(contr.entity.x()-10,contr.entity.y()-15,contr.addScore);
                score = new ItemScore(contr.entity.x()-18,contr.entity.y()-18,contr.addScore);
                score = new ItemScore(contr.entity.x()-30,contr.entity.y()-30,contr.addScore);
                score = new ItemScore(contr.entity.x()-10,contr.entity.y()-30,contr.addScore);
                score = new ItemScore(contr.entity.x()+10,contr.entity.y()-30,contr.addScore);
                var heart = new ItemHeart(contr.entity.x()+19,contr.entity.y()-20,10);
            }
        }, 25, boss);

        return boss;
    }
}