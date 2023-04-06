const myMap = new Map();
myMap.set("demo", true);
myMap.set("skills", ['a', 'b', 'c']);

console.log("" + myMap.has('skills'));


console.log(['a', 'b', 'c']);

const mySet = new Set(['a', 'b', 'c']);
console.log(mySet.has('a'));

mySet.forEach(function value(value) { console.log(value); })

console.log(myMap instanceof Map);

let num = new Number(1)
console.log(num instanceof Number);


let set = new Set([2]);
set.add(1);
console.log(set);

set = new Set([3]);