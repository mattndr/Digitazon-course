// ----------------
// Ex 3
// creare una funzione makeElement, che prende in ingresso una stringa che identifica il tipo di elemento HTML da generare, una stringa che identifica il suo id, una stringa che identifica il suo contenuto, e un booleano che indica se chiudere o meno il tag (false indica un tag a chiusura implicita, true a chiusura esplicita)
// La funzione restituisce la stringa formattata correttamente che rappresenta un elemento HTML. In fase di chiamata, stamparla in console.
// Usare i seguenti valori:

// makeElement('input', 'myInput', '', false)  ->  <input id="myInput">
// makeElement('div', 'box', 'javascript', true)  -> <div id="box">javascript</div>
// [12:42 PM]
// ----------------


function makeElement(strType, strId, strContent, closeTag) {
    if (typeof strType == 'string' && typeof strId == 'string' && typeof strContent == 'string' && typeof closeTag == 'boolean') {
        let output = "<" + strType + " id=\"" + strId + "\">" + strContent;
        if (closeTag) output += "</" + strType + ">"
        console.log(output);
    }
    else console.log('I valori inseriti sono errati');
}


makeElement('input', 'myInput', '', false)
makeElement('div', 'box', 'javascript', true)

console.log('------------------------------------------------------');