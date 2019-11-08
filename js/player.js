var player;

player = {
    x: 0,
    y: 0,
    keys: {
        a: false,
        d: false,
        l: false,
        r: false,
        s: false
    },
    status: 'idle',
    entity: null,
    jumpPower: 0,
    gravityPower: 0
};