// Ex 4
// creare una funzione treeStr che prende in ingresso una stringa che deve avere una lunghezza superiore pari e superiore a 4 e stampa la seguente formattazione in output:

// treeStr('javascript') 
//             s
//            s c
//         a s c r
//      v a s c r i
//   a v a s c r i p
// j a v a s c r i p t


function treeStr(str) {
    if (typeof str == 'string' && str.length >= 4) {
        let length = str.length;
        if (str.length % 2 != 0) length = str.length + 1;
        for (let i = 0; i <= length; i += 2) {
            const from = (length / 2) - (i / 2) - (i == 0);
            const to = (length / 2) + (i / 2);
            let result = "";
            for (let k = 0; k < from; k++) result += "  ";
            for (let j = from; j < to; j++) {
                if (i == 0) result += " " + str[j];
                else if (str[j]) result += str[j] + " ";
            }
            console.log(result);
        }
    } else console.log('I valori inseriti sono errati');
}

treeStr('javascript')

console.log('------------------------------------------------------');