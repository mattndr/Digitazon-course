// JavaScript has a prototype-based object model instead of the more common class-based object model.
// Inheritance is through the prototype mechanism, and properties and methods can be added to any object dynamically.
// Cannot automatically write to hard disk.	

// Client-side JavaScript extends the core language by supplying objects to control a browser and its Document Object Model (DOM).
// Server-side JavaScript extends the core language by supplying objects relevant to running JavaScript on a server.

// statement
// identifier

console.log(parseInt("101", 10)); // 5


// Trailing commas help keep git diffs clean when you have a multi-line array, because appending an item to the end only adds one line, but does not modify the previous line.


const num = 10;
let tot = 0;

function sum(n) {
    tot += n;
    if (n > 1) return sum(n - 1);
}

sum(3)
console.log(tot);