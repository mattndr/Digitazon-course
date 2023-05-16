const map = new Map([
    [1, 'I'],
    [5, 'V'],
    [10, 'X'],
    [50, 'L'],
    [100, 'C'],
    [500, 'D'],
    [1000, 'M']
])

function numToRomanNumber(num) {
    let result = "", numToString = num.toString()
    for (let i = 0; i < numToString.length; i++) {
        if (numToString.length - i > 3) {
            for (let j = 0; j < Math.pow(10, numToString.length - 4 - i) * numToString[i]; j++) { result = result + 'M' }
        }
        else if (numToString[i] == 4) {
            result = result + map.get(1 * Math.pow(10, numToString.length - i - 1)) + map.get(5 * Math.pow(10, numToString.length - i - 1))
        }
        else if (numToString[i] == 9) {
            result = result + map.get(1 * Math.pow(10, numToString.length - i - 1)) + map.get(10 * Math.pow(10, numToString.length - i - 1))
        }
        else if (numToString[i] > 5 && numToString[i] < 9) {
            result = result + map.get(5 * Math.pow(10, numToString.length - i - 1))
            for (let j = 0; j < numToString[i] - 5; j++) {
                result = result + map.get(1 * Math.pow(10, numToString.length - i - 1))
            }
        }
        else {
            for (let j = 0; j < numToString[i]; j++) {
                result = result + map.get(1 * Math.pow(10, numToString.length - i - 1))
            }
        }
    }
    return result
}


console.log(numToRomanNumber(10903))
console.log(numToRomanNumber(190))
console.log(numToRomanNumber(2240))
