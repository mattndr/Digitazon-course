/*
Ex 1

Utilizzando un apposita strategia e utilizzando il ciclo WHILE, stampare i numeri da 20 a 15 (scalando) omettendo il numero 19
*/

// let i = 20;
// while (i >= 15) {
//     if (i != 19) console.log(i);
//     i--;
// }


/*
Ex 2

Creare un array di 5 parole.
Iterare su questo array in 2 modi.
PRIMA con un while, per stampare tutte le singole parole nell'array MAIUSCOLE. In questo caso, vogliamo ciclare l'array in senso invertito.

DOPO con un foreach, per stampare tutte le parole dell'array in ordine
*/

// const arr = ['alfa', 'beta', 'gamma', 'delta', 'epsilon'];

// let i = arr.length - 1;
// while (i >= 0) {
//     console.log(arr[i].toUpperCase());
//     i--;
// }

// arr.forEach(word => console.log(word));


// console.log(this.nalme);

// function fn(obj) {
//     console.log(obj.name);
// }

// let obj = { name: 'Me' }

// fn(obj)


/*
Ex 2

creare un oggetto chiamato "language" che rappresenta un linguaggio di programmazione, e che abbia le seguenti caratteristiche:

- proprietà label, indica il nome del linguaggio
- proprietà tags; un array di 3 stringhe che indica le caratteristiche dell'oggetto
- un metodo printTags che itera sui tag dell'oggetto e li stampa con un WHILE

chiamare il metodo printTags per mostrare i dati in console
*/

const language = {
    label: 'Javascript',
    tags: ['Front-end', 'Web Development', 'Programming'],
    printTags: function () {
        let i = 0;
        console.log('Tags:');
        while (i < this.tags.length) {
            console.log(this.tags[i]);
            i++;
        }
    }
}

language.printTags();