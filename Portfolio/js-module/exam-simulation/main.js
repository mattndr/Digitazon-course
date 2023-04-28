// Pulizia del codice, pseudocodice, modularita’, nomi delle funzioni e delle variabili e tutto cio’
// che ci siamo detti in classe in queste settimane saranno oggetto di valutazione.


// 1 - Find and replace
// Scrivere una funzione che riceva in ingresso tre stringhe:
// ● la prima sara’ un testo
// ● la seconda sara’ una parola che andra’ cercata nel testo
// ● la terza sara’ la parola da sostituire al posto della seconda
// La funzione deve quindi produrrei lo stesso effetto che si ottiene quando si fa find and
// replace di una parola in un testo.
// Si assuma che:
// ● la seconda e la terza stringa siano sempre e solo una parola, mai una frase, quindi
// non ci saranno spazi
// ● sulle stringhe non esistano i metodi indexOf, replace, e similari, dovete scrivere voi
// l’algoritmo
// ● la seconda e la terza parola non necessariamente devono avere lo stesso numero di
// caratteri
// Ricordate che le stringhe in JavaScript sono trattate in modo simile agli array.
// La funzione deve ritornare la nuova stringa aggiornata.


// Creo un array vuoto che conterrà il risultato da restituire
// Creo un ciclo for che itera sul testo ricevuto in input, e ad ogni iterazione:
//    Se trovo una corrispondenza tra l'i-esimo carattere del testo e il primo carattere della parola da sostituire, proseguo confrontando i caratteri successivi delle due variabili, andando poi ad aggiornare il contatore del ciclo for in base a quanti caratteri uguali ho trovato, per non doverli confrontare nuovamente alla prossima iterazione. Se trovo esattamente nuova-parola.length caratteri uguali, aggiungo all'array la nuova parola, altrimenti aggiungo all'array la stringa contenente i caratteri del testo comparati in questa iterazione.
//    Se non c'è corrispondenza tra i due caratteri, aggiungo all'array il carattere i-esimo.
// Ritorno l'array convertito in stringa

function findAndReplace(text, wordToReplace, newWord) {
    const updatedText = [];
    for (let i = 0; i < text.length;) {
        if (text[i] == wordToReplace[0]) {
            let subString = wordToReplace[0], count = 1;
            while (count < wordToReplace.length) {
                if (text[i + count] == wordToReplace[count]) {
                    subString += wordToReplace[count++];
                } else { break }
            }
            updatedText.push((count == wordToReplace.length) ? newWord : subString);
            i += count;
        }
        else { updatedText.push(text[i++]) }
    }
    return updatedText.join('');
}

console.log(findAndReplace('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tristique finibus. Pellentesque purus dolor, finibus eget augue ac, tincidunt ullamcorper dui.', 'dolor', 'test'));





// Find and update
// Scrivere una funzione che, dato in ingresso un array di oggetti così strutturato:
// sia in grado di attribuire un valore di default dove sia presente un null, seguendo queste
// regole:
// ● se il type e’ “boolean” deve aggiornare usando false
// ● se il type e’ “string” deve aggiornare usando stringa vuota
// ● se il type e’ “number” deve aggiornare usando 0
// ● se il type e’ “array” deve aggiornare usando array vuoto
// ● se il type e’ “object” deve aggiornare usando oggetto vuoto
// Come vedete ogni singolo oggetto ha sempre due attributi, uno la cui chiave non e’ dato a
// sapere a priori, un altro la cui chiave e’ sempre “type” e il valore e’ nella lista qui sopra.
// La funzione deve ritornare lo stesso oggetto ricevuto in input, con i valori aggiornati.


// Creo la funzione updateArray, che itera sugli elementi dell'array, passando ciascun oggetto alla funzione che aggiorna l'oggetto corrente; quest'ultima itera sulle chiavi dell'oggetto ricevuto in input (ipotizzo che la chiave key non sia sempre la seconda chiave dell'oggetto cioè possa anche essere la prima) e controlla il valore della chiave non 'type'; se il suo valore è null, controlla qual è il valore della chiave 'type' e aggiorna il suo valore di default in base alle specifiche.
// Passando un array come argomento ad una funzione, si sta passando il riferimento all'array (l'indirizzo di memoria), con il risultato che eventuali modifiche all'array sono applicate direttamente alla variabile dichiarata fuori dalla funzione.

function updateArray(array) {
    array.forEach((obj) => updateCurrentObj(obj));
    return array;
}

function updateCurrentObj(currentObj) {
    Object.keys(currentObj).forEach(function (key) {
        if (key != 'type') {
            if (currentObj[key] === null) {
                switch (currentObj.type) {
                    case 'boolean':
                        currentObj[key] = false;
                        break;
                    case 'string':
                        currentObj[key] = '';
                        break;
                    case 'number':
                        currentObj[key] = 0;
                        break;
                    case 'array':
                        currentObj[key] = [];
                        break;
                    case 'object':
                        currentObj[key] = {};
                        break;
                    default:
                        break;
                }
            }
        }
    })
}

const array = [
    {
        "maggiorenne": null,
        "type": "boolean"
    },
    {
        "nome": null,
        "type": "string"
    },
    {
        "cognome": "Rossi",
        "type": "string"
    }
];

console.log(updateArray(array));





// Dato questa struttura ad albero:
// navigarla visitando i nodi alla ricerca del valore “Nimloth the Fair”, se trovato ritornare a che
// distanza si trova dalla radice dell’albero, se non trovato ritornare -1.
// Non e’ detto che l’albero con cui valutero’ il vostro esercizio avra’ questa struttura.
// Non abbiamo mai visto questo tipo di strutture dati a lezione, per questo motivo l’esercizio e’
// interamente opzionale.

const obj = {
    "value": "Arwen",
    "left": {
        "value": "Earendil",
        "left": {
            "left": null,
            "right": null
        },
        "right": {
            "value": "Galadriel",
            "left": {
                "value": "Eowyn",
                "test": {
                    "values": "Nimloth the Fair",
                },
                "left": null,
                "right": null
            },
            "right": null
        }
    },
    "right": {
        "value": "Shelob",
        "left": null,
        "right": null,
    }
};

function findValue(obj) {
    const str = JSON.stringify(obj), index = str.indexOf("Nimloth the Fair"), subStr = str.substring(0, index);
    return (index == -1) ? -1 : subStr.split('{').length - subStr.split('}').length;
}

console.log(findValue(obj));



// working solution 2

// let resultDepth = -1;
// console.log(examinateObj(obj, 1));

// function examinateObj(obj, depth) {
//     const objKeys = Object.keys(obj);
//     for (let i = 0; i < objKeys.length; i++) {
//         if (typeof obj[objKeys[i]] == 'object' && obj[objKeys[i]] != null) { resultDepth = examinateObj(obj[objKeys[i]], depth + 1) }
//         else {
//             examinteNotObj(obj[objKeys[i]], depth);
//             if (resultDepth >= 0) return resultDepth;
//         }
//     }
//     return resultDepth;
// }

// function examinteNotObj(prop, depth) {
//     if (prop == "Nimloth the Fair") {
//         resultDepth = depth;
//     }
// }



// working solution 3
// pusho ogni elemento della mappa come coppia depth,value


// function findValue(obj, map, depth, targetValue) {
//     const objKeys = Object.keys(obj);
//     for (let i = 0; i < objKeys.length; i++) {
//         if (obj[objKeys[i]] instanceof Object) { findValue(obj[objKeys[i]], map, depth + 1, targetValue) }
//         else { map.set(obj[objKeys[i]], depth) }
//     }
//     return (map.has(targetValue)) ? map.get(targetValue) : -1;
// }

// console.log(findValue(obj, new Map(), 1, "Galadriel"));