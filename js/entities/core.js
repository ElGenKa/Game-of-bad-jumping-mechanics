//Скрипт подключения элементов
function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include('js/entities/blocks/BoxCore.js');
include('js/entities/blocks/PlatformSmall.js');
include('js/entities/blocks/PlatformMedium.js');
include('js/entities/blocks/PlatformBig.js');
include('js/entities/blocks/BoxMysterious.js');