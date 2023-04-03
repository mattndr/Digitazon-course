// Ex 1:
// Date 3 stringhe con valori a piacere, stampare in output quante delle tre stringhe realizzate iniziano con la lettera 'a'

const strings = ['alfa', 'beta', 'gamma'];
let counter = 0;

for (let i = 0; i < strings.length; i++) {
    if (strings[i].charAt(0) == 'a') counter++;
}

console.log(counter);


// Ex 1: 
// dato un array di 4 stringhe a piacere, stampare ogni valore stringa invertito (es 'ciao' diventa 'oaic', ...)

// 1) Dichiaro l'array e lo inizializzo
// 2) Creo un ciclo for che itera sugli elementi dell'array
// 3) Dentro al primo for, creo una variabile che mi salverà la stringa invertita
// 4) Sempre dentro al primo for, creo un altro for che itera sulla stringa e concatena i suoi caratteri invertiti alla variabile dichiarata al punto 3)
// 5) Dopo il ciclo for interno, stampo il valore invertito dell'i-esimo elemento dell'array

const arr1 = ['alfa', 'beta', 'gamma', 'delta'];

for (let i = 0; i < arr1.length; i++) {
    let currentInvertedString = "";
    for (let j = arr1[i].length - 1; j >= 0; j--) {
        currentInvertedString += arr1[i][j];
    }
    console.log(currentInvertedString);
}



// Ex 2:
// dato un array di 10 numeri a piacere, stampare quanti sono i numeri positivi, quelli negativi, quelli dispari e quelli pari (per trovare il resto di una divisione utilizzare l'operatore %)

// 1) Dichiaro l'array, i contatori e li inizializzo
// 2) Creo un ciclo for che itera sugli elementi dell'array e incrementa di 1 il contatore in base alla condizione del numero (positivo, negativo , pari o dispari)
// 3) Dopo il ciclo for, stampo il valore dei contatori

const arr2 = [-1, 2, 3, 4, 5, 6, 7, 8, 9, -10];
let counterPos = 0;
let counterNeg = 0;
let counterEven = 0;
let counterOdd = 0;

for (let i = 0; i < arr2.length; i++) {
    if (arr2[i] >= 0) counterPos++;
    else counterNeg++;
    if ((arr2[i] % 2) == 0) counterEven++;
    else counterOdd++;
}

console.log('counterPos: ' + counterPos + '\ncounterNeg: ' + counterNeg + '\ncounterEven: ' + counterEven + '\ncounterOdd: ' + counterOdd);



// Ex 3:
// dato un array di 3 stringhe a piacere, stampare quante di queste stringhe iniziano con il valore 'a' e terminano con il valore '_'

// 1) Dichiaro l'array e il contatore, e li inizializzo
// 2) Creo un ciclo for che itera sugli elementi dell'array e incrementa di 1 il contatore se l'elemento (cioè la stringa) inizia con 'a' e termina con '_'
// 3) Dopo il ciclo for, stampo il valore del contatore

const arr3 = ['alfa_', 'beta', 'gamma'];
let counter3 = 0;

for (let i = 0; i < arr3.length; i++) {
    if ((arr3[i].charAt(0) == 'a') && (arr3[i].charAt(arr3[i].length - 1) == '_')) counter3++;
}

console.log(counter3);



// Ex 4:
// data una stringa a piacere, 
// SE questa contiene una vocale, un underscore, un dollaro e un numero, stampare 'password OK', altrimenti, stampare 'password NOT OK'

// 1) Dichiaro e inizializzo la stringa e le variabili che rappresentano le condizioni da rispettare affinchè la password sia 'valida'
// Creo un ciclo for che itera sugli elementi della stringa e imposta la variabile booleana a true se la corrispondente condizione di 'validità' è rispettata
// 3) Dopo il ciclo for, controllo se tutte le condizioni di validità della stringa sono state rispettate, e in quel caso stampo 'password OK', altrimenti stampo 'password NOT OK'

const str = 'digitazon$_1';
let passwVowel = false;
let passw_ = false;
let passw$ = false;
let passwNumber = false;

for (let i = 0; i < str.length; i++) {
    let el = str[i];
    if (el == 'a' || el == 'e' || el == 'i' || el == 'o' || el == 'u') passwVowel = true;
    else if (el == '_') passw_ = true;
    else if (el == '$') passw$ = true;
    else if (el >= 0) passwNumber = true;
}

if (passwVowel && passw_ && passw$ && passwNumber)
    console.log('password OK');
else console.log('password NOT OK');



// Ex 5:
// dato un array di 5 valori ETEROGENEI a piacere, stabilire:
// - quante stringhe ci sono
// - quanti numeri ci sono
// - quanti booleani ci sono
// - qual è il tipo di dato maggiormente presente nell'array

// 1) Dichiaro e inizializzo l'array e le variabili che rappresentano i contatori delle occrrennze di tipi di dato che compongono l'array
// Creo un ciclo for che itera sugli elementi dell'array, controlla il tipo di dato di ciascun elemento e incrementa il rispettivo contatore
// 3) Dopo il ciclo for, stampo i singoli contatori, poi controllo e stampo il contatore che ha valore maggiore

const arr5 = [1, 1, 1, true, 'true', 'b', 'c'];
let counterStr = 0;
let counterNum = 0;
let counterBool = 0;

for (let i = 0; i < arr5.length; i++) {
    if (typeof arr5[i] == 'string') counterStr++;
    else if (typeof arr5[i] == 'number') counterNum++;
    else if (typeof arr5[i] == 'boolean') counterBool++;
}

console.log('# of strings: ' + counterStr);
console.log('# of numbers: ' + counterNum);
console.log('# of booleans: ' + counterBool);

if (counterStr >= counterNum) {
    if (counterStr > counterNum) {
        if (counterStr > counterBool) console.log('string with ' + counterStr + ' occurrences');
        else if (counterStr == counterBool) console.log('string, boolean with ' + counterStr + ' occurrences');
        else console.log('boolean with ' + counterBool + ' occurrences');
    }
    else {
        if (counterNum > counterBool) console.log('string, number with ' + counterStr + ' occurrences');
        else if (counterNum == counterBool) console.log('string, number, boolean with ' + counterStr + ' occurrences');
        else console.log('boolean with ' + counterBool + ' occurrences');
    }
}
else {
    if (counterNum > counterBool) console.log('number with ' + counterNum + ' occurrences');
    else if (counterNum == counterBool) console.log('number, boolean with ' + counterNum + ' occurrences');
    else console.log('boolean with ' + counterBool + ' occurrences');
}

// let maxOccurr = counterStr;
// if (counterNum > maxOccurr) maxOccurr = counterNum;
// if (counterBool > maxOccurr) maxOccurr = counterBool;

// console.log('most recurrent type(s): ');
// if (counterStr == maxOccurr) console.log('string');
// if (counterNum == maxOccurr) console.log('number');
// if (counterBool == maxOccurr) console.log('boolean');
// console.log('with ' + maxOccurr + ' occurrences');