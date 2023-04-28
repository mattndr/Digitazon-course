// Pseudo codice
// Creo una funzione che prende in input una stringa
// Verifico subito se la stringa contiene almeno una delle due stringhe per le quali non può mai essere 'pazza'
// (punto 1) Creo un set che contiene i soggetti, eseguo un'iterazione sul set per controllare se la stringa contiene il soggetto
// (punto 2) Verifico se gli ultimi tre caratteri della stringa ricevuta in input sono uguali a quelli specificati nella consegna
// (punto 3) Controllo se la stringa ricevutia in input contiene quella stringa
// (punto 4) Creo un array a partire dalla stringa ricevuta in input per verificare se gli ultimi tre caratteri della prima e dell'ultima parola coincidono con quelli specificati nella consegna
// (punto 5) Creo un set che contiene i caratteri di punteggiatura specificati nella consegna, e verifico se la stringa ricevuta in input inizia con uno di questi caratteri
// Ritorno false se, in nessuno dei punti precedenti, le condizioni che rendono la stringa 'pazza' si sono verificate

function isCrazy(string) {
    if (string.includes("Church") || string.includes('mare')) { return false }

    // punto 1
    const subjects = new Set(['lui', 'lei', 'egli, ella'])
    let hasSubject = false
    subjects.forEach((subject) => {
        if (string.toLowerCase().includes(subject)) {
            hasSubject = true
            return
        }
    })
    if (!hasSubject) {
        return true
    }

    // punto 2
    let endsWithPattern = ((string.length > 2) && (string.substring(string.length - 3, string.length) == '?!?')) ? true : false
    if (endsWithPattern) { return true }

    // punto 3
    let includesWord = (string.includes("Cthulhu")) ? true : false
    if (includesWord) { return true }

    // punto 4
    const arrFromString = string.split(" ")
    const lastChars = ['are', 'ere', 'ire']
    let wordEndsWithChars = false;
    for (let i = 0; i < lastChars.length; i++) {
        const firsWord = arrFromString[0], lastWord = arrFromString[arrFromString.length - 1]
        if (firsWord.substring(firsWord.length - 3, firsWord.length) == lastChars[i] || lastWord.substring(lastWord.length - 3, lastWord.length) == lastChars[i]) {
            wordEndsWithChars = true
            break
        }
    }
    if (wordEndsWithChars) { return true }

    // punto 5
    let startWithSpecialChars = false;
    const specialChars = new Set([',', '.', '!', '?', ':', ';', '-', '~'])
    specialChars.forEach((char) => {
        if (string[0] == char) {
            startWithSpecialChars = true
            return
        }
    })
    if (startWithSpecialChars) { return true }
    return false
}

console.log(isCrazy('Andare a rimirare'));

