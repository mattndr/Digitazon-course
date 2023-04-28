// // scrivere una funzione che prende in ingresso una stringa e ritorna il numero di occorrenze di ogni singolo carattere della stringa

// function charsOccurs(str) {
//     if (typeof str == 'string') {
//         console.log(str);
//         const map = new Map();
//         for (let s of str) {
//             if (map.has(s)) map.set(s, map.get(s) + 1);
//             else map.set(s, 1);
//         }
//         map.forEach(function (v, k) { console.log(k + ": " + v); });
//     } else console.log('Argument passed is not a string');
// }

// charsOccurs('abaco');





// // scrivere una funzione che prende in ingresso due stringhe e stampa la stringa che contiene più consonanti

// function maxOccurs(str1, str2) {
//     console.log(`Arguments received: '${str1}' and '${str2}'`);
//     const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
//     let counterStr1 = 0, counterStr2 = 0;
//     for (let s of str1) {
//         if (!vowels.has(s)) counterStr1++;
//     }
//     for (let s of str2) {
//         if (!vowels.has(s)) counterStr2++;
//     }
//     if (counterStr1 > counterStr2) console.log(`'${str1}' (${counterStr1}  occurrences)`);
//     else console.log(`'${str2}' (${counterStr2} occurrences)`);
// }

// maxOccurs('aeiouf', 'aeiouuff');




// // scrivere una funzione che, date due date sottoforma di stringa, stampa la data più recente

// function dateComp(d1, d2) {
//     const date1 = new Date(d1).getTime();
//     const date2 = new Date(d2).getTime();
//     if (date2 > date1) console.log(d2);
//     else console.log(d1);
// }

// dateComp('2023-03-21', '2023-03-24');



// // scrivere una funzione che, data in ingresso una stringa, rimuove tutti i caratteri duplicati

function removeDupl(str) {
    let result = "";
    for (const s of str) {
        if (result.indexOf(s) == -1) result += s;
    }
    console.log(result);
}

function removeDupl2(str) {
    console.log([...new Set(str)].toString().replace(/,/g, ''));
}

removeDupl2('abbabassa');

console.log(3 + 4 + "7");