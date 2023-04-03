// Ex 2
// creare una funzione checkArray che prende in ingresso un array di N numeri e stampa:
// - quanti sono pari
// - quanti sono dispari
// - se contiene il numero 10
// - se è un array o meno
// chiamare con:
// checkArray([90, 78, 45, 34])
// checkArray([0, 0, 0])
// checkArray([10])
// checkArray(10)



function checkArray(param) {
    console.log(param);
    let containsNum = false;

    if (Array.isArray(param)) {
        console.log('E\' un array');
        let evenCounter = 0;
        let oddCounter = 0;
        for (let i = 0; i < param.length; i++) {
            if (param[i] % 2 == 0) evenCounter++;
            else oddCounter++;
            if (!containsNum && (param[i] == 10)) containsNum = true;
        }
        console.log('Contiene ' + evenCounter + ' numeri pari');
        console.log('Contiene ' + oddCounter + ' numeri dispari');
    } else {
        console.log('Non è un array');
        if (param == 10) containsNum = true;
    }
    if (containsNum) console.log('Contiene il numero 10');
}

checkArray([90, 78, 45, 34]);
checkArray([0, 0, 0]);
checkArray([10]);
checkArray(10);

console.log('------------------------------------------------------');