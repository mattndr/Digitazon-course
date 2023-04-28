
// let mp = (function () {
//     var count = 0;
//     return function countUp() {
//         return { id: ++count };
//     };
// })();

// const ppl = [mp(), mp(), mp()];

// ppl.forEach(function (p) { console.log(p) });


/*
Ex 1

creare una funzione getStr che prende in ingresso un array di stringhe e restituisce il valore della stringa alla posizione 2

chiamare la funzione getStr con un array di 5 stringhe a piacere e stampare il valore prodotto.
Per chi riesce: stampare il valore prodotto in upper case
*/

// function getStr(arr) {
//     if (!Array.isArray(arr)) return;
//     return arr[2].toUpperCase();
// }

// console.log(getStr(['alfa', 'beta', 'gamma', 'delta', 'epsilon']));


/*
Ex 2

Creare una funzione makeObj che prende in ingresso due parametri:
una stringa e un numero.
La funzione crea e RESTITUISCE un oggetto con due proprietà: label, che avrà come valore il valore passato come primo parametro, e rate, che avrà come valore il valore passato come secondo parametro.
Chiamare la funzione makeObj due volte con valori a piacere per creare e stampare in output due oggetti con i valori indicati.
*/

// function makeObj(str, num) {
//     return { label: str, rate: num };
// }
// console.log(makeObj('alfa', 1));
// console.log(makeObj('beta', 2));


// creare una funzione getMaxMinAsArray che prende in ingresso un array di 6 numeri e restiuisce un array di 2 numeri: il primo, che rappresenta il numero più piccolo del primo array, e il secondo che rappresenta il numero più grande del primo array.
// Richiamare la funzione getMaxMinAsArray con un array di 6 numeri a piacere, salvare l'array restituito dalla funzione e stampare il numero più grande e più piccolo con un apposito messaggio

// function getMaxMinAsArray(arr) {
//     const minmax = [arr[0], arr[0]];
//     arr.forEach(function (el) {
//         if (el < minmax[0]) { minmax[0] = el; }
//         if (el > minmax[1]) { minmax[1] = el; }
//     })
//     return minmax;
// }

// const result = getMaxMinAsArray([1, 3, 9, 2, 8, 3]);
// console.log(`Il numero più piccolo è: ${result[0]}\nIl numero più grande è: ${result[1]}`);



function largestSwap(n) {
    const num = +((n + "")[1] + (n + "")[0])
    console.log(typeof num);
}

console.log(largestSwap(27));

let person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    ssn: '123-456-2356'
};


let job = {
    jobTitle: 'JavaScript Developer',
    location: 'USA'
};

let employee = {
    ...person,
    ...job
};

console.log(employee);








function maxPalindrome(s) {
    let s = '';

    function expandFromMiddle(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return s.slice(left + 1, right);
    }

    for (let i = 0; i < s.length; i++) {
        const odd = expandFromMiddle(i, i);
        const even = expandFromMiddle(i, i + 1);
        const currentl = odd.length > even.length ? odd : even;
        if (currentl.length > l.length) {
            l = currentl;
        }
    }

    return l;
}










