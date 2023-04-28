/*
Ex 1

Creare un array che è composto da 3 oggetti, che rappresentano dei rettangoli, e avranno le proprietà base e altezza (numeri).
Crea quindi 3 oggetti che rappresentano 3 rettangoli con le caratteristiche indicate, mettili in un array.
Cicla questo array SIA con un foreach PRIMA che con un for DOPO, per stampare l'area di ogni rettangolo (ad ogni iterazione)
*/

// const r1 = { base: 5, height: 10 };
// const r2 = { base: 10, height: 50 };
// const r3 = { base: 50, height: 5 };

// const arr = [r1, r2, r3];

// console.log('ForEach:');
// arr.forEach(function (r, i) { 
//     console.log(`Area rettangolo ${i + 1}: ${r.base * r.height}`); 
// });

// console.log('For:');
// for (let i = 0; i < arr.length; i++) {
//     console.log(`Area rettangolo ${i + 1}: ${arr[i].base * arr[i].height}`);
// }











// Ex 1
// Scrivere una funzione che dato in ingresso un numero, ritorni il fattoriale di quel numero


// Creo una funzione ricorsiva che ha come parametro un numero.
// Nel caso base (num <= 1), la funzione ritorna 1.
// Ad ogni passo ricorsivo, la funzione ritorna la moltiplicazione tra il parametro num e il risultato della chiamata alla funzione stessa, a cui passa come argomento il parametro num decrementato di una unità.

function fact(num) {
    if (num > 1) { return num * fact(num - 1) }
    return 1;
}


function fact(num) {
    return (num > 1) ? num * fact(num - 1) : 1;
}

console.log(fact(7));


// creo una funzione che prende in input un numero
// creo un ciclo for che cicla 2n-1 volte
// ad ogni iterazione:
//  stampo i volte 'x' fintanto che i <= n
//  stampo i-n volte 'x' quando i > n



function f(a) {
    a = 1;
}


let b = [1, 2, 3];
f(b);
console.log(b);


















































// Creo una funzione con due parametri, il primo corrisponde al numero da fattorizzare, il secondo corrisponde alla fattorizzazione ottenuta finora. 
// Nel caso base (num <= 1), la funzione ritorna la fattorizzazione ottenuta finora.
// In ogni passo ricorsivo, la funzione ritorna una chiamata a sè stessa, a cui passa come argomenti:
//  - num decrementato di una unità
//  - la fattorizzazione aggiornata

// function fact2(num, result) {
//     if (num > 1) { return fact2(num - 1, num * result) }
//     return result;
// }

// Passo il valore 1 come secondo argomento per:
// - fare in modo che la funzione fact2 ritorni 1, se come primo argomento passo 0 o 1
// - inizializzare corettamente la fattorizzazione per eventuali passi ricorsivi
// console.log(fact2(7, 1));



















































// let x = {}, y = 5, z = 6
// x[y] = { name: "Vivek" };
// x[z] = { name: "Akki" };
// console.log(x);

































// let obj = { a: null, b: undefined }


// // sol 1
// let keys = Object.keys(obj);
// let count = 0;
// for (let i = 0; i < keys.length; i++) {
//     if (obj[keys[i]] == undefined) { count++ }
// }
// console.log('sol1 undefined keys: ' + count);

// // sol 2
// count = 0;
// Object.keys(obj).forEach(function (key) { if (obj[key] == undefined) { count++ } })
// console.log('sol2 undefined keys: ' + count);

// // sol 3
// console.log('sol3 undefined keys: ' + Object.keys(obj).reduce((sum, key) => (obj[key] == undefined) ? sum + 1 : sum, 0));
