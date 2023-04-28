/*
Ex 1

creare un array in cui occorre includere 5 dati di tipi diversi:
- un letterale oggetto con proprietà x: 10 e y: 5
- un numero (100)
- una stringa ("javascript")
- una mappa ("label" -> "sono una mappa")
- un array [40, 50, 60]

Iterare sull'array esterno con un foreach e...
se l'elemento corrente è...

un letterale oggetto, stampa la somma delle sue proprietà x e y

un numero, controlla se è > 100 scrivi red, altrimenti blue

una stringa, stampa il suo primo carattere

una mappa, stampa il valore della sua proprietà "label", se ce l'ha

un array, stampa i numeri in ordine inverso
*/

const obj = {
    x: 10,
    y: 5
};
const map = new Map([['label', 'sono una mappa']]);

const array = [obj, 100, 'javascript', map, [40, 50, 60]];

array.forEach(function (current) {
    if (current instanceof Map) {
        if (current.has('label')) console.log(current.get('label'));
    }
    else if (Array.isArray(current)) {
        let inverted = [];
        for (let i = current.length - 1; i >= 0; i--) { inverted.push(current[i]) }
        console.log(inverted);
    }
    else if (typeof current == 'object') {
        console.log(`${current.x + current.y}`);
    }
    else if (typeof current == 'number') {
        if (current > 100) console.log('red');
        else console.log('blue');
    }
    else if (typeof current == 'string') {
        console.log(current[0]);
    }
});


