

// Ex 1
// --------------------------------------------------------------------
// creare una funzione formatDate che, presi in ingresso un numero, una stringa e un numero, stampi una data formattata.
// Il primo numero rappresenta l'anno, la stringa il nome del mese e il secondo numero il giorno.
// es: formatDate(2023, 'maggio', 17)   stampa "17-05-2023"


function formatDate(year, month, day) {
    const date = new Date(year, stringToMonth.get(month) - 1, day);
    let monthPrefix = "";
    if (stringToMonth.get(month) < 10) monthPrefix = '0';
    console.log(`${date.getDate()}-${monthPrefix}${date.getMonth() + 1}-${date.getFullYear()}`);
}

const stringToMonth = new Map([
    ['gennaio', 1],
    ['febbraio', 2],
    ['marzo', 3],
    ['aprile', 4],
    ['maggio', 5],
    ['giugno', 6],
    ['luglio', 7],
    ['agosto', 8],
    ['settembre', 9],
    ['ottobre', 10],
    ['novembre', 11],
    ['dicembre', 12],
]);

formatDate(2023, 'maggio', 17);
formatDate(1997, 'dicembre', 24);

console.log('--------------------------------------');



// Ex 2
// --------------------------------------------------------------------
// creare una funzione cmpDate che prende in ingresso 2 stringhe che rappresentano 2 date formattate nel formato americano (yyyy-mm-dd) visto a lezione.
// La funzione estrapola l'anno da entrambe le date e restituisce 1 se il primo anno è maggiore del secondo, -1 viceversa e 0 se sono pari.
// Chiamare la funzione 3 volte con valori a piacere.


function cmpDate(date1, date2) {
    const yearFromDate1 = new Date(date1).getFullYear();
    const yearFromDate2 = new Date(date2).getFullYear();

    if (yearFromDate1 > yearFromDate2) return 1;
    else if (yearFromDate2 > yearFromDate1) return -1;
    else return 0;
}

console.log(cmpDate('2023-10-25', '2020-08-05'));
console.log(cmpDate('2013-10-25', '2020-08-05'));
console.log(cmpDate('2020-10-25', '2020-08-05'));

console.log('--------------------------------------');






// Ex 3
// --------------------------------------------------------------------
// creare una funzione getDateDay che prende in ingresso una data formattata nel formato americano visto a lezione e restituisce il giorno della settimana relativo, in parola.
// Chiamare la funzione con 3 date a piacere.
// es: getDateDay('2023-05-17')  -> 'mercoledì'


function getDateDay(inputDate) {
    const day = new Map([
        [0, 'domenica'],
        [1, 'lunedi'],
        [2, 'martedi'],
        [3, 'mercoledi'],
        [4, 'giovedi'],
        [5, 'venerdi'],
        [6, 'sabato']
    ]);

    const date = new Date(inputDate);
    const result = day.get(date.getDay());
    return result;
}

console.log(getDateDay('2023-05-15'));
console.log(getDateDay('2023-05-20'));
console.log(getDateDay('2023-05-21'));

console.log('--------------------------------------');



// [12:26 PM]
// Ex 4
// --------------------------------------------------------------------
// dato il seguente JSON:

const json =
    `
[
    {
        "name": "mario",
        "active": true,
        "feat": {
            "role": "protagonist"
        }
    },
    {
        "name": "luigi",
        "active": true,
        "feat": {
            "role": "protagonist"
        }
    },
    {
        "name": "wario",
        "active": false,
        "feat": {
            "role": "antagonist"
        }
    },
    {
        "name": "yoshi",
        "active": false,
        "feat": {
            "role": "protagonist"
        }
    }
]
`
// creare una funzione getInfo che, preso in ingresso l'array di oggetti ottenuto dal JSON, mi dice:
// - quanti protagonisti ci sono nell'array
// - quanti protagonisti attivi ci sono nell'array
// - quanti antagonisti ci sono nell'array
// [12:26 PM]

const obj = JSON.parse(json);

function getInfo(array) {
    let protagonists = 0;
    let activeProtagonists = 0;

    array.forEach(function (element) {
        if (element.feat.role == 'protagonist') {
            if (element.active) activeProtagonists++;
            protagonists++;
        }
    });

    console.log(`Protagonists: ${protagonists}`);
    console.log(`Active protagonists: ${activeProtagonists}`);
    console.log(`Antagonist: ${array.length - protagonists}`);
}

getInfo(obj);

console.log('--------------------------------------');



// Ex 5
// --------------------------------------------------------------------
// creare uno script a piacere in cui si dimostra l'uso di:
// - array di array
// - array di oggetti
// - mappe
// - set
// - funzione che accetta una funzione
// - this



// somma tutti i numeri pari di ogni sotto-array contenuto nella matrice e stampa quello con la somma maggiore

const matrix = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [4, 5, 6, 7, 8]];

function maxSum(matrix) {
    console.log(matrix);
    let maxSum = 0;
    let maxArray = [];
    for (const array of matrix) {
        let currentSum = 0;
        for (const element of array) if (element % 2 == 0) currentSum += element;
        if (currentSum > maxSum) {
            maxSum = currentSum;
            maxArray = array;
        }
    }
    console.log(`Il sotto-array con somma dei numeri pari più alta è [${maxArray}] con ${maxSum}`);
}

maxSum(matrix);
console.log('----------');


// per ogni destinazione trovare il numero di hotel che hanno rating >= 9.0

const destinations = [
    {
        place: 'Ibiza',
        country: 'SP',
        hotels: [
            {
                name: 'Hostal Rosell Boutique',
                rating: 9.6,
                pricePerNight: 57.85
            },
            {
                name: 'Lux Isla',
                rating: 8.8,
                pricePerNight: 75.55
            },
            {
                name: 'Hotel Gran Sol',
                rating: 9.5,
                pricePerNight: 64
            }
        ]
    },
    {
        place: 'Capri',
        country: 'IT',
        hotels: [
            {
                name: 'Hotel La Tosca',
                rating: 9.7,
                pricePerNight: 105
            },
            {
                name: 'Relais 2 Pini',
                rating: 9.2,
                pricePerNight: 220
            }
        ]
    }
];

function highRatingHotels(destination) {
    let counter = 0;
    for (let i = 0; i < destination.hotels.length; i++) {
        if (destination.hotels[i].rating >= 9.5) counter++;
    }
    console.log(`${destination.place} (${destination.country}) ha ${counter} hotel con rating maggiore o uguale a 9.5`);

}

destinations.forEach(highRatingHotels);
console.log('----------');



// creare una funzione che prende in input un array di oggetti che rappresentano colori, aggiunge alla mappa quelli che non sono già presenti ed infine stampa la mappa

let colors = new Map(
    [
        ["red", "#ff0000"],
        ["green", "#008000"],
        ["blue", "#0000ff"],
        ["yellow", "#ffff00"],
        ["black", "#000000"],
    ]
);

const colorsFromInput = [
    { name: 'white', value: '#ffffff' },
    { name: 'pink', value: '#ffc0cb' },
    { name: 'red', value: '#ff0000' },
];


function addColors(obj) {
    for (const color of obj) {
        if (!colors.has(color.name)) {
            colors.set(color.name, color.value);
        }
    }
    colors.forEach(function (v, k) { console.log(`${k}: ${v}`); });
}

addColors(colorsFromInput);
console.log('----------');




// rimuovere dal Set tutti gli elementi dell'array che sono già presenti nel Set, ed aggiungere gli elementi dell'array se non sono già presenti nel Set

let set = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);


let numbers = [1, 4, 7, 10, 11];

for (let i = 0; i < numbers.length; i++) {
    if (set.has(numbers[i])) set.delete(numbers[i]);
    else set.add(numbers[i]);
}
console.log(set);
console.log('----------');



// creare una funzione che riceve in ingresso una funzione che esegue un'operazione su due numeri
// richiamare la funzione ricevuta in ingresso e stampare il risultato

function runOperation(func) {
    const a = 20, b = 5;
    const op = func(a, b);
    console.log(`${a} ${op.name} ${b} = ${op.result}`);
}

function sum(a, b) {
    return { name: '+', result: a + b };
}
function diff(a, b) {
    return { name: '-', result: a - b };
}
function mult(a, b) {
    return { name: '*', result: a * b };
}
function div(a, b) {
    return { name: '/', result: a / b };
}

runOperation(sum);
runOperation(diff);
runOperation(mult);
runOperation(div);
console.log('----------');


// creare due array di oggetti che rappresentano le varie versioni di JavaScript e CSS rilasciate finora, ed un metodo che stampa tali informazioni


function printInfo() {
    console.log(`${this.name} has been released in ${this.year}`);
}

const jsReleases = [
    { name: 'ES1', year: 1997, printFullInfo: printInfo },
    { name: 'ES2', year: 1998, printFullInfo: printInfo },
    { name: 'ES3', year: 1999, printFullInfo: printInfo },
    { name: 'ES5', year: 2009, printFullInfo: printInfo },
    { name: 'ES6', year: 2015, printFullInfo: printInfo },
]

const cssReleases = [
    { name: 'CSS1', year: 1996, printFullInfo: printInfo },
    { name: 'CSS2', year: 1998, printFullInfo: printInfo },
    { name: 'CSS3', year: 1999, printFullInfo: printInfo }
]

jsReleases.forEach(function (el) { el.printFullInfo() });
cssReleases.forEach(function (el) { el.printFullInfo() });