console.log('---------- Ex 1 -----------');

// Ex 1
// creare una funzione 'ope' che prende in ingresso una stringa e due numeri.
// controlla il valore della stringa.
// Se è '+' restituisci la somma dei due numeri
// Se è '-' restituisci la differenza dei due numeri
// Se è '*' o 'x' restituisci la moltiplicazione dei due numeri
// Se è '/' restituisci la divisione dei due numeri
// altrimenti restituisci 0

// Chiama la funzione ope 4 volte variando ogni volta i valori utilizzati e stampa in console i risultati

function ope(a, b, c) {
    if (typeof a == 'string' && typeof b == 'number' && typeof c == 'number') {
        if (a == '+') return b + ' + ' + c + ' = ' + (b + c);
        else if (a == '-') return b - c;
        else if (a == '*' || a == 'x') return b * c;
        else if (a == '/') return b / c;
        else return 0;
    }
    else return 'I dati inseriti sono errati';
}


console.log(ope('+', 5, 5));
console.log('10 - 5 = ' + ope('-', 10, 5));
console.log('20 * 2 = ' + ope('*', 20, 2));
console.log('20 x 2 = ' + ope('x', 20, 2));
console.log('100 / 10 = ' + ope('/', 100, 10));
console.log(ope('aaa', 100, 10));
console.log(ope('+', 'n', 10));




console.log('---------- Ex 2 -----------');
// Ex 2
// creare una funzione 'invertString' che prende in ingresso una stringa e la restituisce invertita.
// Chiamare la funzione con i seguenti valori e stampare i risulati in console:
// - javascript
// - consoleconsole.log('a')
// - anna
// - 100
// Nota: se il valore non è una stringa, ma un numero, stampa il numero moltiplicato per 10.
// Se il valore non è una stringa ne un numero, stampa 'errore'

function invertString(s) {
    if (typeof s == 'string') {
        let result = '';
        for (let i = s.length - 1; i >= 0; i--) result += s[i];
        return result;
    }
    else if (typeof s == 'number') return s * 10;
    else return 'I dati inseriti sono errati';

}

console.log(invertString('javascript'));
console.log(invertString('consoleconsole.log(\'a\')'));
console.log(invertString('anna'));
console.log(invertString(100));




console.log('---------- Ex 3 -----------');
// Ex 3
// crea una funzione 'xRayArray' che prende in ingresso un array e mi stampa:
// - la lunghezza dell'array
// - se l'array contiene SOLO numeri o meno
// - se l'array è vuoto
// - se è un array oppure un altro tipo di dato
// La funzione NON restituisce nessun valore.
// Chiamare la funzione con i seguenti valori:
// - [10, 20, 30]
// - []
// - ['ciao', 100]
// - 'ciao'


function xRayArray(arr) {
    if (typeof arr != 'string' && arr.length >= 0) {
        console.log('Lunghezza dell\'array: ' + arr.length);

        if (arr.length > 0) {
            let onlyNum = true;
            for (let i = 0; i < arr.length; i++) {
                if (typeof arr[i] != 'number') onlyNum = false;
            }
            if (onlyNum) console.log('L\'array contiene solo numeri');
            else console.log('L\'array non contiene solo numeri');
        }
        else console.log('L\'array è vuoto');
    }
    else console.log('L\'argomento ricevuto non è un array, è di tipo ' + typeof arr);
}

xRayArray([10, 20, 30]);
xRayArray([]);
xRayArray(['ciao', 100]);
xRayArray('ciao');




console.log('---------- Ex 4 -----------');
// Ex 4
// crea una funzione 'isPalindrome' che prende una stringa in ingresso e mi dice se è palindroma.
// Chiamare la funzione con i seguenti valori:
// - anna
// - itopinonavevanonipoti
// - ugo
// NON copiare algoritmi dal web (me ne accorgo 😉 )

function isPalindrome(s) {
    if (typeof s == 'string') {
        for (let i = 0, j = s.length - 1; i < j; i++, j--) {
            if (s[i] != s[j]) return false;
        }
        return true;
    } else return false;
}

console.log(isPalindrome('anna'));
console.log(isPalindrome('itopinonavevanonipoti'));
console.log(isPalindrome('ugo'));




console.log('---------- Ex 5 -----------');
// Ex 5
// creare una funzione 'evenInMatrix' che mi restituisce un contatore che tiene traccia di tutti i numeri pari presenti in una matrice passata in ingresso (controllare tutti gli array di un array).
// Chiamare la funzione con i seguenti valori:
// - 
// [
//   [1, 3, 3],
//   [2, 3, 3],
//   [4, 9, 8]
// ]
// - 
// [
//   [2, 1, 6],
//   [3, 4, -10],
//   [9, 9, 240]
// ]

function evenInMatrix(matrix) {
    let counter = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] % 2 == 0) counter++;
        }
    }
    return counter;
}

console.log(evenInMatrix([[1, 3, 3], [2, 3, 3], [4, 9, 8]]));
console.log(evenInMatrix([[2, 1, 6], [3, 4, -10], [9, 9, 240]]));