// Creare una funzione che prende in input un numero indefinito di booleani e ritorna il risultato che si otterrebbe eseguendo l'AND tra gli elementi 

// function and(...params) {
//     for (let i = 0; i < params.length; i++) {
//         if (params[i] == false) { return false }
//     }
//     return true
// }

// console.log(and(true, false));
// console.log(and(true));
// console.log(and(false));
// console.log(and(false, true, true, true, false));
// console.log(and(false, true, true, true, false));
// console.log(and(true, true, true, true, true));





// Scrivere una funzione che prende in ingresso un oggetto, si devono stampare solo i valori delle seguenti chiavi:
//  * "chiave1"
//  * "chiave2"
// a prescindere da quante ce ne siano nell'oggetto.
// Non si possono utilizzare if, non si puo' utilizzare l'operatore punto (.) cercate di utilizzare l'obj destruct

// dichiaro due variabili che mi aspetto di ricevere in ingresso da un oggetto
function printValues2({ chiave1, chiave2 }) {
    console.log(chiave1, chiave2);
}


function printValues(obj) {
    const { chiave1, chiave2 } = obj
    console.log(chiave1, chiave2);
}

printValues({ chiave1: 1, chiave2: 2, chiave3: 3, chiave4: 4 })