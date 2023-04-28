// scrivere una funzione chiamata findLongestSubstring
// che prende in ingresso una stringa
// la funzione deve ritornare la stringa piu' lunga che non ha 
// ripetizioni

// ad esempio per "abcabcbb" deve ritornare "abc"
// ad esempio per "bbbbb" deve ritornare "b"
// ad esempio per "pwwkew" deve ritornare "wke"


function findLongestSubstring(str) {
    let maxWord = ""
    const set = new Set()
    for (let i = 0; i < str.length; i++) {
        if (!set.has(str[i])) {
            set.add(str[i])
        } else {
            set.clear()
            set.add(str[i])
        }
        if (set.size > maxWord.length) {
            maxWord = ""
            set.forEach(char => { maxWord += char })
        }
    }
    return maxWord
}

function findLongestSubstring2(str) {
    let maxWord = "", currentWord = ""
    for (let i = 0; i < str.length; i++) {
        if (!currentWord.includes(str[i])) {
            currentWord += str[i]
        } else {
            currentWord = str.substring(str.indexOf(str[i]) + 1, i) + str[i]
        }
        if (currentWord.length > maxWord.length) {
            maxWord = currentWord
        }
    }
    return maxWord
}

function findLongestSubstring(s) {
    let parola = ''
    let res = ''
    for (let i = 0; i < s.length; i++) {
        const lettera = s[i];
        if (parola.includes(lettera)) {
            if (parola.length > res.length) {
                res = parola
            }
            parola = parola.substring(parola.indexOf(lettera) + 1, i) + s[i]
        } else {
            parola += lettera
        }
    }
    if (parola.length > res.length) {
        res = parola
    }
    return res
}

console.log(findLongestSubstring2("abcabcbb"));
console.log(findLongestSubstring2("abcdecfghil"));

console.log(findLongestSubstring("abcabcbb"));
console.log(findLongestSubstring("abcdecfghil"));

console.log('--------');


// scrivere una funzione chiamata firstSum
// che prende in ingresso un array e un numero,
// la funzione deve ritornare la prima coppia di numeri la cui 
// somma e' pari al numero passato come argomento


function firstSum(arr, num) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] + arr[i] == num) {
                return [arr[i], arr[j]]
            }
        }
    }
    return []
}

console.log(firstSum([1, 2, 3, 4, 5], 5))


// scrivere una funzione chiamata isPalindrome che 
// data una parola 
// ritorni true se e' palindroma, false altrimenti

// ad esempio con "ciao" ritorna false
// ad esempio con "abba" ritorna true
// ad esempio con "ada" ritorna true
// ad esempio con "1234321" ritorna true
// ad esempio con "123321" ritorna true
// ad esempio con "123421" ritorna false

function isPalindrome(str) {
    if (str == str.split("").reverse().join("")) return true
    return false
}


console.log(isPalindrome('abba'));



// scrivere una funzione chiamata mapString
// che prende in ingresso una funzione e una stringa
// la funzione mapString deve ritornare una nuova stringa
// le cui lettere sono il risultato dell'applicazione
// della funzione all'i-esima lettera

// ad esempio per l => l + "a" e "bbb" deve 
// ritornare "bababa"
// ad esempio per l => l e "bbb" deve 
// ritornare "bbb"
// ad esempio per l => "-" + l + "-" e "abc" deve 
// ritornare "-a--b--c-"

function mapString(f, str) {
    // Every time, the return value of callbackFn is passed into callbackFn again on next invocation as accumulator
    return str.split("").reduce((accumulator, current) => accumulator + f(current), "")
}

console.log(mapString(l => "-" + l + "-", "abc"));


// scrivere una funzione chiamata occurrencies
// che prende in ingresso una stringa,
// la funzione deve ritornare le occorrenze di tutte le lettere 
// nella stringa, ordinate in modo crescente

// ad esempio per "abbaca" deve ritornare [1,2,3]
// ad esempio per "caccia" deve ritornare [1,2,3]
// ad esempio per "bisaccia" deve ritornare [1,1,2,2,2]

function occurrencies(str) {
    const map = new Map()
    const result = []
    for (let i = 0; i < str.length; i++) {
        if (!map.has(str[i])) {
            map.set(str[i], 1)
        } else {
            map.set(str[i], map.get(str[i]) + 1)
        }
    }
    map.forEach((v) => { result.push(v) })
    return result.sort((a, b) => a - b)

}

console.log(occurrencies("abbaca"));
console.log(occurrencies("caccia"));
console.log(occurrencies("bisaccia"));


// scrivere una funzione chiamata noConditionals
// che prende in ingresso un numero che puo' essere 0 o 1
// ritorna 1 se il numero e' 0
// ritorna 0 se il numero e' 1

// non e' possibile usare
// if else
// operatori ternary 
// negazioni
// operazioni su bit

function noConditionals(num) {
    return Math.abs(num - 1)
}

console.log(noConditionals(0));
console.log(noConditionals(1));

// scrivere una funzione chiamata mergeSortedArrays che 
// dati due array ordinati in ingresso
// ritorni un unico array ordinato

// non si puo' usare il metodo sort

// ad esempio per [1,2,3] e [4,5] ritorna [1,2,3,4,5]
// ad esempio per [5,9] e [1,6,7] ritorna [1,8,5,6,7,9]

function mergeSortedArrays(arr1, arr2) {
    const merged = [...arr1, ...arr2], result = []
    while (merged.length > 0) {
        const min = Math.min(...merged);
        merged.splice(merged.indexOf(min), 1)
        result.push(min);
    }
    return result;
}


console.log(mergeSortedArrays([1, 2, 3], [4, 5]));
console.log(mergeSortedArrays([5, 9], [1, 6, 7]));

// scrivere una funzione chiamata anagrams che 
// data una parola e una lista di parole 
// ritorni un array formato dalle parole che sono anagrammi
// della parola data

// ad esempio con "ciao" e ["caio", "cio", "oiac", "bye"] ritorna 
// ["caio", "oiac"]

function anagrams(word, wordList) {
    const result = []
    wordList.forEach(currWord => {
        if (word.length == currWord.length) {
            if (isAnagram(word, currWord)) { result.push(currWord) }
        }
    })
    return result
}

function isAnagram(str1, str2) {
    if (str1 == str2) { return true }
    if (str1.includes(str2[0])) {
        return isAnagram(str1.replace(str2[0], ''), str2.substring(1))
    }
    return false
}


console.log(anagrams("ciao", ["caio", "cio", "oiac", "bye"]));


// scrivere una funzione chiamata andGate che 
// riceve in ingresso due booleani
// sfruttando la funzione nand che trovate sotto
// ritorni true solo se vengono passati true e true
// false altrimenti

// non si possono usare if, or, and, e not dentro la funzione andGate
// non si puo' cambiare la funzione nand

// ad esempio con true e true ritorna true
// ad esempio con true e false ritorna false
// ad esempio con false e true ritorna false
// ad esempio con false e false ritorna true

function nand(b1, b2) {
    return !(b1 && b2)
}

function andGate(b1, b2) {
    return nand(nand(b1, b2), nand(b1, b2))
}

function orGate(b1, b2) {
    return nand(nand(b1, b1), nand(b2, b2))
}

console.log(orGate(true, false))


// scrivere una funzione chiamata functionsReturningNumbers che 
// date due funzioni in ingresso f e g
// dove entrambe le funzioni ritornano un certo numero
// ritorna "f" se il numero ritornato da f e' maggiore del 
// numero ritornato da g
// ritorna "g" se il numero ritornato da g e' maggiore del 
// numero ritornato da f
// ritorna "nessuna" se sono uguali

function functionsReturningNumbers(f, g) {
    if (f() > g()) { return "f" }
    return (g() > f()) ? "g" : "nessuna"
}



