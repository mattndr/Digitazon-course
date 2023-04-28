// const map = new Map([['a', 1]]);
// map.forEach(element => console.log(element));


// const obj = {
//     name: 'Mario',
//     lastname: 'Rossi',
//     "demo-name": "mario"
// };

// console.log(obj["demo-name"]);




// // usando la notazione oggetto[proprietà] si ottiene maggiore modularità, perchè posso inserire tra le quadre un’espressione qualsiasi:


// const x = 'name';
// function doit() { return 'name' };

// obj[doit()];
// obj[x];

// // Map è direttamente iterabile, un oggetto no
// for (const prop in obj) console.log(prop + ': ' + obj[prop]);


// ex 1
// Realizzare l'apposita strategia per stampare la stringa 'Riccardo' invertita in output.

// const str = 'Riccardo';
// let inverted = '';
// for (let i = str.length - 1; i >= 0; i--) inverted += str[i];
// console.log(inverted);
// inverted = '';
// for (let i = 0; i < str.length; i++) inverted = str[i] + inverted;
// console.log(inverted);

// ex 2
// data la stringa 'Riccardo'
// realizzare l'apposita strategia per stampare in output l'ultimo carattere maiuscolo concatenato a un underscore e al primo carattere minuscolo:

// const str = 'Riccardo';
// const result = str.charAt(str.length - 1).toUpperCase() + '_' + str.charAt(0).toLowerCase();
// console.log(result);

// ex 3
// creare l'apposita strategia per rappresentare, tramite oggetto, uno studente. Lo studente avrà:
// idMatricola: 14
// nomeCompleto: Luigi Verdi
// voti: 6, 7, 7

// Stampare in output la stringa tramite apposito algoritmo:

// il terzo voto dello studente con id 14 (Luigi Verdi) è 7

// const student = {
//     idMatricola: 14,
//     nomeCompleto: 'Luigi Verdi',
//     voti: [6, 7, 7]
// };

// console.log(`Il terzo voto dello studente con id ${student.idMatricola} (${student.nomeCompleto}) è ${student.voti[2]}`);


// ex 1
// scrivere una funzione chiamata chessboard
// che prende in ingresso un numero l,
// la funzione deve stampare una scacchiera di lato l
// contenente '#' e ' ', opportunamente alternati

// creo due cicli for
// controllo gli indici pari e dispari per sapere quando inserire il carattere o lo spazio

function chessboard(l) {
    let res = ""
    for (let i = 0; i < l; i++) {
        let row = "";
        for (let j = 0; j < l; j++) {
            if ((i + j) % 2 == 0) row += "#";
            else row += " ";
        }
        res += row + "\n";
    }
    console.log(res);
}
chessboard(5);