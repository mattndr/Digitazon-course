// Ex 1
// creare una funzione compareMap che accetta in ingresso due mappe.
// La funzione restituisce true SE le due mappe sono mappe, SE hanno lo stesso numero di elementi e per le stesse chiavi, gli stessi valori. 
// Testare il funzionamento di compareMap passando due mappe diverse nella prima chiamata, e due mappe uguali nella seconda chiamata

function compareMap(map1, map2) {
    if ((map1 instanceof Map) && (map2 instanceof Map)) {
        console.log(map1);
        console.log(map2);

        let result = true;
        if (map1.size == map2.size) {
            map1.forEach(function (value, key) {
                if (result && map2.has(key) && (value != map2.get(key)))
                    result = false;
            })
            return result;
        } else return false;
    } else return false;
}



console.log(compareMap(new Map([['a', 1], ['b', 2]]), new Map([['a', 1], ['b', 2]])));
console.log(compareMap(new Map([['a', 1], ['b', 2]]), new Map([['a', 1], ['b', 20]])));

console.log("-----------------------");




// Ex 2
// creare una funzione compareSet che accetta in ingresso due set.
// La funzione restituisce true SE i due set sono set, SE hanno lo stesso numero di elementi e  gli stessi valori. 
// Testare il funzionamento di compareSet passando due set diversi nella prima chiamata, e due set uguali nella seconda chiamata


function compareSet(set1, set2) {
    if ((set1 instanceof Set) && (set2 instanceof Set)) {
        console.log(set1);
        console.log(set2);
        if (set1.size == set2.size) {
            let result = true;
            set1.forEach(function (value) {
                if (result && !set2.has(value))
                    result = false;
            })
            return result;
        } else return false;
    } else return false;
}

console.log(compareSet(new Set(["a", "b"]), new Set(["a", "b"])));
console.log(compareSet(new Set(["a", "b"]), new Set(["a", "c"])));

console.log("-----------------------");




// Ex 3
// realizzare la funzione uniqueArray che prende in ingresso un array e rimuove tutti gli elementi duplicati, restituendo un nuovo array privo quindi di valori duplicati.
// Chiamare la funzione con il valore [10, 'ciao', 20, 'ciao', 'javascript', 10] e stampare in output il nuovo valore

function uniqueArray(arr) {
    if (Array.isArray(arr)) {
        let result = [];
        new Set(arr).forEach(function (value) { result.push(value) });
        return result;
    } else return 'L\'argomento passato alla funzione non è un array';
}

console.log(uniqueArray([10, 'ciao', 20, 'ciao', 'javascript', 10]));

console.log("-----------------------");




// -----------------------------------------------------------
// Ex 4
// realizzare due istanze di Map che rappresentano due studenti che abbiano la seguente struttura:
// - name, lastname, rates 
// dove name e lastname sono stringhe e rates è un array di 5 numeri
// assegnare valori a piacere per ogni chiave, es mario rossi 4, 5, 6, 4, 3 e luigi verdi 8, 7, 4, 9, 9
// creare la funzione bestStudent, che prende in ingresso due mappe che rappresentano uno studente, e restituisce il nome e il cognome dello studente che ha la media voto migliore tra i due.
// Richiamare questa funzione passando le due mappe create precedentemente


const map1 = new Map([['name', 'Mario'], ['lastname', 'Rossi'], ['rates', [4, 5, 6, 4, 3]]]);
const map2 = new Map([['name', 'Luigi'], ['lastname', 'Verdi'], ['rates', [8, 7, 4, 9, 9]]]);

function bestStudent(map1, map2) {
    let media1 = 0;
    let media2 = 0;

    const map1Rates = map1.get("rates");
    const map2Rates = map2.get("rates");

    const length = map1Rates.length;
    for (let i = 0; i < length; i++) {
        media1 += map1Rates[i];
        media2 += map2Rates[i];
    }
    media1 /= length;
    media2 /= length;

    console.log('Media di ' + map1.get('name') + ' ' + map1.get('lastname') + ': ' + media1);
    console.log('Media di ' + map2.get('name') + ' ' + map2.get('lastname') + ': ' + media2);

    if (media1 > media2) return map1.get('name') + ' ' + map1.get('lastname');
    else if (media1 < media2) return map2.get('name') + ' ' + map2.get('lastname');
    else return 'Gli studenti hanno la stessa media';
}

console.log('Media più alta: ' + bestStudent(map1, map2));