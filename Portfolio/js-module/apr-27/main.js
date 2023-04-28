// Dato un array ordinato di interi tutti diversi, e un numero target, ritornare l'indice al quale il target e' trovato. Se non viene trovato ritornare l'indice al quale andrebbe inserito per mantenere l'ordine


// Nel caso in cui il target è maggiore dell'ultimo elemento dell'array, ritorna la lunghezza dell'array, altrimenti ritorna l'indice dell'elemento che verrà restituito dalla funzione ricorsiva

function findIndex(arr, target) {
    return (target > arr[arr.length - 1]) ? arr.length : arr.indexOf(findIndexRec(arr, target))
}


// aso base: il primo elemento dell'array è maggiore o uguale al target, oppure l'array ha raggiunto una lunghezza pari a 1. Ritorna il primo elemento dell'array (o l'unico elemento rimasto, nel secondo caso)
// Passo ricorsivo: controllo se il target è maggiore dell'elemento che si trova all'indice metà-1 dell'array; in quel caso passo alla chiamata successiva la seconda metà dell'array, altrimenti passo la prima metà dell'array

// function findIndexRec(arr, target) {
//     if (arr[0] >= target || arr.length == 1) { return arr[0] }
//     const half = Math.ceil(arr.length / 2)
//     return (target > arr[half - 1]) ? findIndexRec(arr.slice(half), target) : findIndexRec(arr.slice(0, half), target)
// }

// console.log(findIndex([1, 3, 5, 6], 5));
// console.log(findIndex([1, 3, 5, 7], 6));





// scrivere una funzione chiamata recursiveMap che 
// dato un array e una funzione
// chiama la funzione su ogni elemento dell'array, ritornando un
// nuovo array con i risultati

// non potete usare cicli for o cicli while

// non potete modificare la firma della funzione, ma potete usare
// funzioni ausiliarie, anzi, e' consigliato

// ad esempio con [1,2,3] e n => n * 2 ritorna [2,4,6]

// tenete presente che non potete sapere cosa faccia la funzione
// passata come parametro, dovete solo applicarla all'i-esimo
// elemento e tenere traccia del risultato

// function recursiveMap(arr, f) {
//     return rec(arr, f, [])
// }

// function rec(arr, f, accumulator) {
//     if (arr.length == 0) { return accumulator }
//     accumulator.push(f(arr[0]))
//     arr.shift()
//     return rec(arr, f, accumulator)
// }

// console.log(recursiveMap([1, 2, 3], n => n * 2));




// scrivere una funzione chiamata slice che 
// dato un array di interi e un intero
// ritorni un array formato da gruppi di sottoarray

// ad esempio con [1,2,3,4,5] e 2 ritorna [[1,2],[3,4],[5]] 


// dati due array ordinati, creare una funzione chiamata merge, che prende in ingresso i due array e ne ritorna uno solo, ordinato


// Creo un nuovo array concatenando i due array ricevuti in input
// Per array.length volte:
//   trovo il valore minimo contenuto nell'array;
//   lo aggiungo all'array risultato che verrà restituito;
//   per non ritrovarlo all'iterazione successiva, lo tolgo dall'array

// function merge2(arr1, arr2) {
//     const mergedArr = arr1.concat(arr2), result = []
//     while (mergedArr.length > 0) {
//         const currentMin = Math.min(...mergedArr)
//         result.push(currentMin)
//         mergedArr.splice(mergedArr.indexOf(currentMin), 1)
//     }
//     return result
// }


// function merge(arr1, arr2) {
//     const result = []
//     const limit = (arr1.length > arr2.length) ? arr2.length : arr1.length
//     let i = 0, j = 0
//     while (i < limit) {
//         if (arr1[i] > arr2[i]) {
//             result.push(arr1[i++])
//         } else {
//             result.push(arr2[j++])
//         }
//     }
//     return result
// }

// console.log(merge([1, 2], [3, 4]))
// console.log(merge([1, 3, 5], [2, 4, 6, 7, 8]))




// https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif

function currentRow(currentDepth, result) {
    const row = []
    for (let i = 0; i < currentDepth + 1; i++) {
        if (i == 0 || i == currentDepth) { row.push(1) }
        else { row.push(result[currentDepth - 1][i - 1] + result[currentDepth - 1][i]) }
    }
    return row
}

function rec(depth, currentDepth, result) {
    if (currentDepth == depth) {
        result.forEach((el, i) => { result[i] = result[i].join(" ") })
        return result.join("\n")
    }
    result.push(currentRow(currentDepth, result))
    return rec(depth, currentDepth + 1, result)
}


console.log(rec(6, 0, []))




// scrivere una funzione chiamata mergeSortedArrays che 
// dati due array ordinati in ingresso
// ritorni un unico array ordinato

// non si puo' usare il metodo sort

// ad esempio per [1,2,3] e [4,5] ritorna [1,2,3,4,5]
// ad esempio per [5,9] e [1,6,7] ritorna [1,8,5,6,7,9]


function mergeSortedArrays(arr1, arr2) {
    const result = []
    let i = 0, j = 0
    while (i + j < arr1.length + arr2.length) {
        if (i == arr1.length) { result.push(arr2[j++]); continue }
        if (j == arr2.length) { result.push(arr1[i++]); continue }
        (arr1[i] < arr2[j]) ?
            result.push(arr1[i++]) : result.push(arr2[j++])
    }
    return result
}

console.log(mergeSortedArrays([50, 60, 110], [12, 16, 18, 20]))

// scrivere una funzione chiamata recursiveMap che 
// dato un array e una funzione
// chiama la funzione su ogni elemento dell'array, ritornando un
// nuovo array con i risultati

// non potete usare cicli for o cicli while

// non potete modificare la firma della funzione, ma potete usare
// funzioni ausiliarie, anzi, e' consigliato

// ad esempio con [1,2,3] e n => n * 2 ritorna [2,4,6]

// tenete presente che non potete sapere cosa faccia la funzione
// passata come parametro, dovete solo applicarla all'i-esimo
// elemento e tenere traccia del risultato

function recursiveMap(arr, func) {
    return execute(arr, func, [])
}

function execute(arr, func, result) {
    if (result.length == arr.length) { return result }
    result.push(func(arr[result.length]))
    return execute(arr, func, result)
}

console.log(recursiveMap([1, 2, 3], n => n * 2))


// scrivere una funzione chiamata slice che 
// dato un array di interi e un intero
// ritorni un array formato da gruppi di sottoarray

// ad esempio con [1,2,3,4,5] e 2 ritorna [[1,2],[3,4],[5]] 

function slice(arr, size) {
    const res = []
    for (let j = 0; j < arr.length; j += size) {
        res.push(arr.slice(j, j + size))
    }
    return res
}

console.log(slice([1, 2, 3, 4, 5, 6, 7], 3));




// scrivere una funzione chiamata recursiveTreeSum che 
// data in ingresso:
// * una funzione in grado di produrre un risultato a partire da uno stato
//   ed il valore del nodo corrente
// * uno stato iniziale
// * un albero binario
// ritorna il risultato dell'applicazione della funzione a tutti i 
// nodi dell'albero

// questa e' chiamata una funzione di fold (o piu' imprecisamente di
// reduce)
// non potete usare cicli for o cicli while

function recursiveTreeSum(func, state, tree) {
    state = func(state, tree.value)
    if (tree.left) { state = recursiveTreeSum(func, state, tree.left) }
    if (tree.right) { state = recursiveTreeSum(func, state, tree.right) }
    return state
}



const tree = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 3
        },
        right: {
            value: 6
        }
    },
    right: {
        value: 4,
        right: {
            value: 5
        }
    }
}

console.log(recursiveTreeSum((state, value) => state + value, 0, tree));

