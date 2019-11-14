//Скрипт подключения элементов
class Core {
    constructor() {
        //Игрок
        this.include('js/core/animation.js');
        this.include('js/entities/player.js');
        //Игрок
        this.include('js/entities/Npc.js');

        //Декорации
        this.include('js/entities/decoration/DecorationCore.js');
        this.include('js/entities/decoration/DecBush.js');
        this.include('js/entities/decoration/DecRock.js');

        //Блоки
        this.include('js/entities/blocks/BoxCore.js'); //Ядро блоков
        this.include('js/entities/blocks/PlatformSmall.js'); //Малая платформа
        this.include('js/entities/blocks/PlatformMedium.js'); //Средняя платформа
        this.include('js/entities/blocks/PlatformBig.js'); //Большая платформа
        this.include('js/entities/blocks/PlatformExtraBig.js'); //Экстра большая платформа
        this.include('js/entities/blocks/PlatformSandSmall.js'); //Экстра большая платформа
        this.include('js/entities/blocks/BoxMysterious.js'); //Малая платформа сюрприз

        //Предметы
        this.include('js/entities/items/ItemCore.js'); //Ядро блоков
        this.include('js/entities/items/Heart.js'); //Хилка

        //NPC
        this.include('js/entities/npc/NpcCore.js'); //Ядро блоков
        this.include('js/entities/npc/Snake.js'); //Ползающая хрень
    }

    include(url) {
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}

core = new Core();

