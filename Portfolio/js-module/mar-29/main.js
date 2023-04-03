// Ex 1:
// creare una variabile che contenga il seguente array
// [ 40, 50, 60, 70 ]
// crea l'algoritmo necessario per stampare in output:
// 70
// 60
// 50
// 40

const arr1 = [40, 50, 60, 70];

for (let i = arr1.length - 1; i >= 0; i--) {
    console.log(arr1[i]);
}



// Ex 2:
// creare una variabile che contenga il seguente array
// [ 'mario', 'luigi', 'peach', 'daisy' ]
// stampare in output tutti i valori dell'array che NON terminano con la lettera 'o'

const arr2 = ['mario', 'luigi', 'peach', 'daisy'];

for (let i = 0; i < arr2.length; i++) {
    const el = arr2[i];
    if (el.charAt(el.length - 1) != 'o') {
        console.log(el);
    }
}


// Ex 3:
// creare una variabile che contenga il seguente array
// [ 'mario', 'luigi', 'peach', 'daisy' ]
// stampare in output:
// DY
// PH
// LI
// MO
// (la prima e l'ultima lettera di ogni valore dell'array in senso invertito)

const arr3 = ['mario', 'luigi', 'peach', 'daisy'];

for (let i = arr3.length - 1; i >= 0; i--) {
    const el = arr3[i];
    console.log(
        (el.charAt(0) + el.charAt(el.length - 1)).toUpperCase()
    );
}



// Ex 4:
// creare una variabile che contenga il seguente array
// [ 'mario', 'stefania', 'luca', lee' ]
// stampare in output SOLO il nome più lungo tra quelli presenti nell'array (se i valori dell'array cambiano, anche il risultato cambia senza alterare l'algoritmo)

const labels = ['mario', 'stefania', 'luca', 'riccardo', 'stefania'];
let maxLabels = [labels[0]];

for (let i = 1; i < labels.length; i++) {
    if (labels[i].length >= maxLabels[0].length) {
        if (labels[i].length > maxLabels[0].length) maxLabels = [];
        maxLabels.push(labels[i]);
    }
}
console.log(maxLabels);



// Ex 5:
// creare una variabile che contenga il seguente array
// [17, 5, 87, 14]
// stampa in output la somma totale di tutti i numeri contenuti nell'array nella modalità più modulare.

const arr5 = [17, 5, 87, 14];
let sum = 0;

for (let i = 0; i < arr5.length; i++) sum += arr5[i];

console.log(sum);
