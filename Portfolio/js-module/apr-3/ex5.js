// Creare una funzione makeMatrix, che prende in ingresso un array di 10 numeri a piacere compresi tra 1 e 10, e restituisce una matrice composta da due array, uno in cui ci sono tutti i numeri pari o superiori a 6, uno in cui ci sono tutti i numeri inferiori a 6.
// Con la matrice restituita, stampare la media dei numeri pari o superiori a 6 del primo array e la media dei numeri inferiori a 6 del secondo array.

function makeMatrix(array) {
    if (array.length == 10) {
        let matrix = [[], []];
        for (let i = 0; i < array.length; i++) {
            if ((array[i] % 2 == 0) || (array[i] >= 6)) matrix[0].push(array[i]);
            if (array[i] < 6) matrix[1].push(array[i]);
        }
        console.log(matrix);
        return matrix;
    } else console.log('I valori inseriti sono errati');
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const matrix = makeMatrix(array);
if (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            sum += matrix[i][j];
        }
        console.log("Media: " + sum / matrix[i].length);

    }

}