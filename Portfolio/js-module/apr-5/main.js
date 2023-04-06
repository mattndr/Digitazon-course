// Ex 1
// creare la funzione diffArray che prende in ingresso due array.
// Gli array dovranno contenere da 3 a 8 numeri.
// All'interno della funzione trovare il numero più grande del primo array e il numero più piccolo del secondo array.
// La funzione restituisce la differenza tra il primo numero e il secondo. 
// Stampare il risultato in output.

function diffArray(arr1, arr2) {
    if (Array.isArray(arr1) && Array.isArray(arr2) && arr1.length >= 3 && arr1.length <= 8 && arr2.length >= 3 && arr2.length <= 8) {
        let arr1max = arr1[0];
        for (let i = 1; i < arr1.length; i++) {
            if (arr1[i] > arr1max) arr1max = arr1[i];
        }
        console.log('Il numero più grande di [' + arr1 + ']' + ' è ' + arr1max);

        let arr2min = arr2[0];
        for (let i = 1; i < arr2.length; i++) {
            if (arr2[i] < arr2min) arr2min = arr2[i];
        }
        console.log('Il numero più piccolo di [' + arr2 + ']' + ' è ' + arr2min);
        return 'Risultato: ' + (arr1max - arr2min);
    } else return 'Gli argomenti passati alla fuzione non sono corretti';
}

console.log(diffArray([1, 2, 3, 4, 2, 8, 1], [1, 2, 3, 4, 5, 1]));

console.log('--------------------------------');

// ---------------------------------------------------------------
// Ex 2
// creare la funzione countVowels che prende in ingresso una stringa, e restituisce una mappa che avrà per chiavi tutte le vocali alfabetiche e per rispettivi valori il numero di occorrenze di ogni vocale nella stringa
// es 'ciao a tutti'   produce  { a => 2, e => 0, i => 2, o => 1, u => 1 }


function countVowels(str) {
    if (typeof str == 'string') {
        let map = new Map([['a', 0], ['e', 0], ['i', 0], ['o', 0], ['u', 0]]);
        for (let i = 0; i < str.length; i++) {
            if (map.has(str[i])) map.set(str[i], map.get(str[i]) + 1);
        }
        return map;
    } else return 'L\'argomento passato alla fuzione non è corretto';
}

console.log(countVowels('ciao a tutti'));

console.log('--------------------------------');


// ---------------------------------------------------------------
// Ex 3
// creare la funzione invertCase che prende in ingresso una stringa.
// Se la stringa è in lower case, restituisce la stringa in upper case.
// Se la stringa è in uppe rcase restituisce la stringa in lower case.
// Assumere che sia in una forma o l'altra.

function invertCase(str) {
    if (typeof str == 'string') {
        console.log('input: ' + str);
        if (str.toLowerCase() == str) return str.toUpperCase();
        else return str.toLowerCase();
    } else return 'L\'argomento passato alla fuzione non è corretto';
}

console.log(invertCase('digitazon'));
console.log(invertCase('DIGITAZON'));

console.log('--------------------------------');


// ---------------------------------------------------------------
// Ex 4
// creare una mappa che rappresenta 5 stili CSS a piacere e stamparla in output.
// Creare la funzione showCSS che prende in ingresso la precedente mappa e stampa tutti i suoi elementi.

function showCSS(map) {
    if (map instanceof Map) {
        map.forEach(function (value, key) {
            console.log(key + ': ' + value);
        })
    } else return 'L\'argomento passato alla fuzione non è corretto';
}


const map = new Map([['display', 'flex'], ['padding', '1rem'], ['margin', '2rem'], ['color', 'red'], ['background-color', 'green']]);
console.log(map);
showCSS(map);

console.log('--------------------------------');


// ---------------------------------------------------------------
// Ex 5
// creare una funzione cmpArr che prende in ingresso 2 array e restituisce:
// 1 se il primo ha dimensioni maggiori del secondo
// -1 se il secondo ha dimensioni maggiori del primo
// 0 se hanno dimensioni uguali
// Testare in output il comportamento di tutte e 3 le casistiche.

function cmpArr(arr1, arr2) {
    if (Array.isArray(arr1) && Array.isArray(arr2)) {
        console.log('Confronto tra: [' + arr1 + '] e [' + arr2 + ']');
        if (arr1.length > arr2.length) return 1;
        else if (arr1.length < arr2.length) return -1;
        return 0;
    } else return 'Gli argomenti passati alla fuzione non sono corretti';
}

const arr1 = [1, 2];
const arr2 = [1, 2, 3];

console.log(cmpArr(arr1, arr2));
console.log(cmpArr(arr2, arr1));
console.log(cmpArr(arr2, arr2));