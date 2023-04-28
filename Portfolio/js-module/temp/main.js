// // operatori aritmetici  binari + - * / %  e unari ++ -- -
// // operatori logici && || !
// // operatori relazionali: < <= > >= == === != !==

// // regole di conversione 
// // opertore polimorfo +
// // - se almeno uno dei due operandi è di tipo stringa, allora viene eseguita una concatenazione tra stringhe, altrimenti viene eseguita una somma tra due numeri


// // da tipo di dato a numero+
// // "" -> 0, "numero" -> numero, "nonunNumero" -> NaN
// // true -> 1, false ->0
// // undefined -> NaN
// // null -> 0

// // da tipo di dato a booleano
// // "" false , !"" true
// // 0 false, 1- -> 1+ e NaN true
// // undefined e null 0

// // da tipo di dato a stringa
// // numero -> "numero", NaN -> "NaN"


// // regole di conversione per operatori relazionali >, >= , <, <=
// // se almeno uno dei due oprandi è un numero allora viene eseguito un confronto tra numeri, altrimenti si esegue un confornto tra stirnghe

// // == !=
// // se entrambi gli operandi sono stringhe si esegue un confronto tra stringhe, altrimenti tran umeri. Unica eccezione null == undeifned è vera per definizione


// // let x = new Map()

// // console.log(x);

// // x = null;  // x viene eliminato dal garbage collector


// // funzione che dato un array somma tutti i numeri dell'array
// function sum(array) {
//     let sum = 0;
//     for (let i = 0; i < array.length; i++) {
//         sum += array[i];
//     }
//     return sum;
// }

// function diff(array) {
//     let diff = 0;
//     for (let i = 0; i < array.length; i++) {
//         diff -= array[i];
//     }
//     return diff
// }

// console.log(sum([1, 2, 3, 4, 5]));


// // funzione REDUCE -> funzione che dato un array ritorna un solo valore

// function reduce(arr, op) {
//     let tot = 0;
//     for (let i = 0; i < arr.length; i++) {
//         tot = op(arr[i], tot);
//     }
//     return tot;
// }

// console.log(reduce([1, 2, 3], function (a, tot) { return tot + a }));
// console.log(reduce([1, 2, 3], function (a, tot) { return tot - a }));
// console.log(reduce([1, 2, 3], (a, tot) => tot - a));







let arr = [1, 2, 3];
const x = "demooppuretest";
let done = true;

arr.forEach((value) => console.log(value));
for (let value of arr) console.log(value);
for (let i = 0; i < arr.length; i++) console.log(arr[i]);
arr.push(4);

console.log(arr.indexOf(arr.find((value) => value > 3)));


function counter(str) {
    let map = new Map();
    for (let x of str) {
        if (map.has(x)) map.set(x, map.get(x) + 1);
        else map.set(x, 1);
    }
    console.log(map);
}

counter(x);

let user = {
    name: 'Matteo',
    lastName: 'Andreoni',
    age: 27,
    residence: {
        country: 'Italy',
        city: 'Verona'
    },
    printFullName: function () { console.log(`${this.name} ${this.lastName}`); }
}

user.name = 'Mario';
user.printFullName();

user.printFullName.call({ name: 'A', lastName: 'B' })

// closure
function sum(n) {
    return function () { return ++n }
}

let res = sum(0);
console.log(res());
console.log(res());
console.log(res());



function globalOp(arr, op) {
    if (Array.isArray(arr)) {
        let res = 0;
        for (let a of arr) res = op(a, res);
        console.log(res);
    } else console.log('Arguments data is not correct');
}

globalOp(arr, (el, tot) => tot + el);
globalOp(arr, (el, tot) => tot - el);

console.log('-----');
const current = arr[2];
switch (current) {
    case 0:
        console.log(0);
        break;
    case 1:
        console.log(1);
        break;
    default:
        console.log(current);
};


try {
    console.log('Trying to connect to db...');
    throw new Error('Can\'t connect to the db');
}
catch (err) {
    console.log(`${err.name}: ${err.message}`);
    // throw err
}
finally {
    console.log('Conn to db closed');
}

let myRegExpr = /[o+].p/i;
console.log(x.search(myRegExpr));

const readonly = 1;



// cosa stampa?
for (let i = 0; ; i++) {
    console.log(i)
    if (i > 10) break
}
// 


// cosa stampa?
let n = 0
if ((n && true) || false) {
    console.log('Say. My. Name.')
} else {
    console.log("... you're Heisenberg...")
}

// cosa stampa?
let i
for (i = 0; i < 1; i++) {
    console.log(i)
}
console.log(i)

// gotta love Functional Programming
// su questo sono uscito un po' dal tracciato per dare possibilita' anche a quelli che gia' 
// programmavano, o che vogliono una sfida leggermente piu' avanzata, per cimentarsi
function T() { return true }
function F() { return false }
function and(sx, dx) {
    return function () { return sx() && dx() }
}
function or(sx, dx) {
    return function () { return sx() || dx() }
}
console.log(and(or(F, T), T)())


function demo() {

}






const tt = () => true;
const ff = () => false;

function or2(v1, v2) {
    return () => v1() || v2();
}

function and2(v1, v2) {
    return () => v1() && v2();
}

console.log(or2(or2(ff, tt), ff)())

var persone = [{ nome: "Mario", cognome: "Rossi", professione: "impiegato" },
{ nome: "Giuseppe", cognome: "Verdi", professione: "operaio" },
{ nome: "Marco", cognome: "Neri", professione: "insegnante" },];
persone.sort(function (a, b) {
    if (a.cognome < b.cognome) return -1;
    if (a.cognome > b.cognome) return 1;
    return 0;
})
console.log(persone);


var persona = {
    nome: "Mario",
    cognome: "Rossi",
    nomeCognome: function () {
        return this.nome + " " + this.cognome;
    }
};

function saluta(nomePersona) {
    console.log("Buongiorno " + this.persona);
}

saluta(persona.nomeCognome);



const set = new Set([1, 2, 3])

console.log('---');
console.log(set[0]);