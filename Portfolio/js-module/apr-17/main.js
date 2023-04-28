/*
  Ex 1

  dato l'array chiamato 'a1' con valori [10, 'ciao', true, 20, 'js', 4] usare un foreach per calcolare la somma degli elementi numerici e stamparla in output
*/

// const a1 = [10, 'ciao', true, 20, 'js', 4];
// let sum = 0;
// a1.forEach(function (el) {
//     if (typeof el == 'number') sum += el;
// })
// console.log(sum);


/*
  Ex 2

  creare una mappa chiamata m1, che rappresenta un'automobile, con la seguente struttura: 
  model -> 'Panda', maxSpeed: 250, price: 1000

  creare una mappa chiamata m2, che rappresenta un'automobile, con la seguente struttura: 
  model -> 'Audi', maxSpeed: 200, price: 5000

  tramite due foreach, stampare le singole caratteristiche delle due automobile.
  DOPO, stampare in output il modello della macchina con la velocità massima più elevata

*/

// const m1 = new Map([['model', 'Panda'], ['maxSpeed', 250], ['price', 1000]]);
// const m2 = new Map([['model', 'Audi'], ['maxSpeed', 200], ['price', 5000]]);

// m1.forEach(function (v, k) {
//     console.log(`${k}: ${v}`);
// });
// m2.forEach(function (v, k) {
//     console.log(`${k}: ${v}`);
// });

// if (m1.get('maxSpeed') > m2.get('maxSpeed')) console.log(m1.get('model'));
// else if (m1.get('maxSpeed') < m2.get('maxSpeed')) console.log(m2.get('model'));
// else console.log('Le due auto hanno la stessa velocità');



// Ex 1

// scrivere una funzione chiamata between che 
// dati due numeri a e b in ingresso
// ritorni un array che contiene tutti i numeri compresi tra a e b, estremi esclusi

function between(a, b) {
    let arr = [];
    for (let i = (a + 1); i < b; i++) arr.push(i);
    return arr;
}

console.log(between(4, 8));


// Ex 1 
// Data una stringa, ad esempio PAYPALISHIRING, scrivere una funzione che la ritorna a "ZigZag": 
// La funzione accetta in ingresso la stringa e un numero di righe, in questo caso e' stata invocata cosi: converti("PAYPALISHIRING", 3)

console.log(converti("PAYPALISHIRING", 5));


function converti(str, num) {
    let array = [];
    let diagCounter = 0, currentIndex = 0;
    for (let i = 0; i < num; i++) { array[i] = []; }
    for (let i = 0; i < num || currentIndex < str.length; i++) {
        if (diagCounter == 0) {
            for (let j = 0; j < num && currentIndex < str.length; j++, currentIndex++) { array[j].push(str[currentIndex]); }
            diagCounter = num - 2;
        } else {
            for (let j = diagCounter; j > 0; j--, diagCounter--) {
                for (let k = 0; k < num && currentIndex < str.length; k++) {
                    if (k == diagCounter) { array[k].push(str[currentIndex++]); }
                    else { array[k].push(' '); }
                }
            }
        }
    }
    let result = "";
    for (let i = 0; i < num; i++) { result += array[i].join('') + '\n'; }
    return result;
}

// Ex 2
// Data una stringa che contiene solo parentesi tonde aperte e parentesi tonde chiuse, scrvere una funzione che ritorna true se tutte le parentesi sono bilanciate, false altrimenti
// ((()))()  ok
// ()(())) not ok
// ()()() ok

function isValid(str) {
    if ((str[0] == ')') || (str[str.length - 1] == '(')) {
        return false;
    }
    let beginCount = 0;
    for (let i = 0; i < str.length; i++) {
        if ((beginCount == 0) && (str[i] == ')')) { return false; }
        if (str[i] == '(') { beginCount++; }
        else { beginCount--; }
    }
    if (beginCount != 0) { return false; }
    return true;
}

console.log(isValid("((()))"))
console.log(isValid("((())))")) // false
console.log(isValid("((()))(())"))
console.log(isValid("((()))()"))
console.log(isValid("(()(()))"))
console.log(isValid("(()")) // false