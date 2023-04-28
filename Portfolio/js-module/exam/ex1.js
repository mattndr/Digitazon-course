// Pseudo codice
// Creo una funzione che prende in input una stringa
// Creo un array a partire dalla stringa ricevuta in input
// Eseguo un'iterazione sugli elementi dell'array per costuirmi una Map i cui elementi sono coppie NomeReparto -> SpesaTotaleReparto
// Eseguo un'iterazione sugli elementi della mappa per ricavarmi il reparto che spende di più e quello che spende di meno, aggiungendo i due reparti e le loro relative spese, in formato letterale oggetto, all'array che verrà sostituito dalla funzione

const expenses = `
Cancelleria
500
40
60

Servizi igienici
1000
1
200

Vendite
0
`

function getDepartmens(expenses) {
    expenses = expenses.split("\n")
    const departmentsExpenses = new Map()
    let currentDepartment = ""
    for (let i = 0; i < expenses.length; i++) {
        if (isNaN(expenses[i])) {
            departmentsExpenses.set(expenses[i], 0)
            currentDepartment = expenses[i]
            continue
        }
        if (expenses[i] != "") {
            departmentsExpenses.set(currentDepartment, departmentsExpenses.get(currentDepartment) + parseInt(expenses[i]))
        }
    }
    const result = []
    let max = 0, min = -1
    departmentsExpenses.forEach(function (value, key) {
        if (value > max) {
            max = value
            result[0] = { "reparto": key, "spesa": value }
            return
        }
        if (value <= min || min == -1) {
            min = value
            result[1] = { "reparto": key, "spesa": value }
        }

    })
    return result
}

console.log(getDepartmens(expenses))
