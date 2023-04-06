// Ex 1
// Dato il seguente JSON:
// [
//     {
//         "fullname": "Yoshi", "rate": [4, 5, 4, 6]
//     },
//     {
//         "fullname": "Wario", "rate": [4, 9, 6, 7]
//     },
//     {
//         "fullname": "Toad", "rate": [8, 9, 9, 8]
//     }
// ]
// salvarlo in un template string, parsarlo con l'apposita strategia e stabilire algoritmicamente chi è lo studente migliore e chi è il peggiore.


const json = `
[
    {
        "fullname": "Yoshi", "rate": [4, 5, 4, 6]
    },
    {
        "fullname": "Wario", "rate": [4, 9, 6, 7]
    },
    {
        "fullname": "Toad", "rate": [8, 9, 9, 8]
    }
]
`;


// v1
const obj = JSON.parse(json);

function bestStudent(obj) {
    let bestStud = '';
    let bestAvg = 0;
    let worstStud = '';
    let worstAvg = 0;
    for (let i = 0; i < obj.length; i++) {
        const currentName = obj[i].fullname;
        let sum = 0;
        for (let j = 0; j < obj[i].rate.length; j++) {
            sum += obj[i].rate[j];
        }
        const currentAvg = sum / obj[i].rate.length;
        if (i == 0) {
            worstStud = currentName;
            worstAvg = currentAvg;
        } else {
            if (currentAvg > bestAvg) {
                bestAvg = currentAvg;
                bestStud = currentName;
            }
            else if (currentAvg < worstAvg) {
                worstAvg = currentAvg;
                worstStud = currentName;
            }
        }
    }

    return `Il miglior studente è ${bestStud} con media ${bestAvg}
Il peggior studente è ${worstStud} con media ${worstAvg}`;

}

console.log(bestStudent(obj));


// v2
function avg(rates) {
    let sum = 0;
    for (let i = 0; i < rates.length; i++) {
        sum += rates[i];
    }
    const avg = sum / rates.length;
    return avg;
}

const object = JSON.parse(json);
let map = new Map();

for (let i = 0; i < object.length; i++) {
    map.set(object[i].fullname, avg(object[i].rate));
}

let higherAvg = map.get(object[0].fullname);
let higherAvgStud = object[0].fullname;
let lowerAvg = map.get(object[0].fullname);
let lowerAvgStud = object[0].fullname;

map.forEach(function (value, key) {
    if (value > higherAvg) {
        higherAvg = value;
        higherAvgStud = key;
    }
    else if (value < lowerAvg) {
        lowerAvg = value;
        lowerAvgStud = key;
    }
});

console.log(`Lo studente migliore è ${higherAvgStud} con media ${higherAvg}
Lo studente peggiore è ${lowerAvgStud} con media ${lowerAvg}`);

console.log('--------------------------------------');



// ----------------------------------------------------------------------
// Ex 2
// Creare una funzione parseShape che prende in ingresso un oggetto che abbia questo template:
// { x: number, y: number, name: string }
// e produca un ouput relativo ad area e perimetro, in base al valore della proprietà name che stabilisce il tipo di figura geometrica in uso.
// Richiamare la funzione due volte con:

// const quadrato = {x: 4, y:4, shape: 'square'}
// const rettangolo = {x: 5, y:4, shape: 'rectangle'}
// per stampare area e perimetro di quadrato e rettangolo.


function parseShape(obj) {
    if (obj.shape == 'square') {
        console.log(`L'area del quadrato è: ${obj.x * 2}
Il perimetro del quadrato è: ${obj.x * 4}`);
    }
    else {
        console.log(`L'area del rettangolo è: ${obj.x * obj.y}
Il perimetro del rettangolo è: ${2 * obj.x + 2 * obj.y}`);
    }
}

const quadrato = { x: 4, y: 4, shape: 'square' };
const rettangolo = { x: 5, y: 4, shape: 'rectangle' };

parseShape(quadrato);
parseShape(rettangolo);

console.log('--------------------------------------');



// ----------------------------------------------------------------------
// Ex 3
// creare, a piacere, due letterali oggetto, che descriveranno rispettivamente:
// - uno studente (avrà nome, cognome, età, voti, un metodo per calcolare e stampare la sua media voti, un metodo per stabilire se è maggiorenne o meno)
// - un'automobile (avrà modello, marca, prezzo e tipoMotore. tipoMotore a sua volta avrà cilindrata, tipo (benzina, diesel o elettrico) e cv. L'automobile avrà un metodo printInfo che stampa in modo correttamente formattato e leggibile le sue feature
// richiamare i metodi dei due oggetti per stampare in output i risultati

const studente1 = {
    nome: 'Mario',
    cognome: 'Rossi',
    eta: 20,
    rate: [6, 7, 8, 9, 10],
    avg: function () {
        let sum = 0;
        for (let i = 0; i < this.rate.length; i++) {
            sum += this.rate[i];
        }
        console.log(`La media è: ${sum / this.rate.length}`);
    },
    isAdult: function () {
        if (this.eta > 18) console.log(`${this.nome} è maggiorenne`);
        else console.log(`${this.nome} è minorenne`);
    }
}

studente1.avg();
studente1.isAdult();
console.log('-----------');

const automobile = {
    model: '500',
    brand: 'Fiat',
    price: 10000,
    engineType: {
        cc: 1200,
        type: 'Electric',
        cv: 80
    },
    printInfo: function () {
        console.log(`Model: ${this.model}
Brand: ${this.brand}
Price: ${this.price}
Engine info:
  cc: ${this.engineType.cc}
  type: ${this.engineType.type}
  cv: ${this.engineType.cv}`);
    }
}

automobile.printInfo();

console.log('--------------------------------------');



// ----------------------------------------------------------------------
// Ex 4
// creare un array di oggetti, che rappresentano le dimensioni dei lati di un rettangolo, e avranno proprietà base e altezza.
// Nell'array inserire 5 oggetti con questo template e valori a piacere.
// Creare una funzione parseRectangles che prende in ingresso un array di oggetti con la struttura descritta e restituisca l'indice del rettangolo con l'area maggiore.

const arr = [
    { base: 1, altezza: 5 },
    { base: 5, altezza: 5 },
    { base: 10, altezza: 5 },
    { base: 1, altezza: 50 },
    { base: 10, altezza: 50 }
];

function parseRectangles(arr) {
    let maxArea = 0;
    let maxAreaIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        const currentArea = arr[i].base * arr[i].altezza;
        if (currentArea > maxArea) {
            maxAreaIndex = i;
            maxArea = currentArea;
        }
    }
    return `L'elemento con indice ${maxAreaIndex} ed area ${maxArea}`;
}

console.log(parseRectangles(arr));

console.log('--------------------------------------');



// ----------------------------------------------------------------------
// Ex 5
// creare un array di oggetti, che rappresentano il contenuto di un parola, e avranno proprietà text. 
// Es { text: 'ciao' }, { text: 'javascript' }
// Nell'array inserire 5 oggetti con questo template e valori a piacere.
// Creare una funzione parseStrings che prende in ingresso un array di oggetti con la struttura descritta e restituisca quante stringhe contengono la lettera 'x'.


const array = [
    { text: 'ciao' },
    { text: 'javascriptx' },
    { text: 'digitazon' },
    { text: 'webx' },
    { text: 'developer' }
];

function parseStrings(arr) {
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        const currentText = arr[i].text;
        let xFounded = false;
        for (let j = 0; j < currentText.length; j++) {
            if (!xFounded && currentText[j] == 'x') {
                xFounded = true;
                counter++;
            }
        }
    }
    console.log(counter);
}

parseStrings(array);