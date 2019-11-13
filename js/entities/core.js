//Скрипт подключения элементов
function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

//Блоки
include('js/entities/blocks/BoxCore.js'); //Ядро блоков
include('js/entities/blocks/PlatformSmall.js'); //Малая платформа
include('js/entities/blocks/PlatformMedium.js'); //Средняя платформа
include('js/entities/blocks/PlatformBig.js'); //Большая платформа
include('js/entities/blocks/BoxMysterious.js'); //Малая платформа сюрприз

//Предметы
include('js/entities/items/ItemCore.js'); //Ядро блоков
include('js/entities/items/Heart.js'); //Хилка

//NPC
include('js/entities/npc/NpcCore.js'); //Ядро блоков
include('js/entities/npc/Snake.js'); //Ползающая хрень