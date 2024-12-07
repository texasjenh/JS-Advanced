// ----VARIABLE SCOPE - LEXICAL ENVIRONMENT----

// let globalVariableCat = 'cat';
// function myFunction() {
//     let localVariableDog = 'dog';
//     return 'globalfunction with local scope variable '+localVariableDog;
// }
// console.log(localVariableDog) // ReferenceError: localVariableDog is not defined

// globalEnvironment = {
//     environmentRecord: {
//         globalVariableCat: 'cat', // has no access to localVariableDog
//         myFunction: <reference to function object,
//     }
//     outer: null // there is no parent environment here
// }

// localMyFunctionEnvironment = {
//     environmentRecord: {
//         localVariableDog: 'dog'
//     },
//     outer: globalEnvironment // can still access everything in global
// }


// ----VARIABLE SCOPE - CLOSURES----

// function makeAdder(x) { // function factory: bundles value of x into the scope of adder
//     return function adder(y) {
//         return x +y;
//     };
// }

// const add5 = makeAdder(5); // sets x to 5 even when adder function is returned and called
// console.log( add5(10)) // x is still 5 and y is 10, result is 15

// function makeHeading(hTag) { // every call to makeHeading could have different values for hTag
//     return function(title) { // unnamed closure function, can access value of hTag when created
//         return `<${hTag}>${title}</${hTag}>`
//     }
// }

// const getH1 = makeHeading('h1') // sets hTag to h1, creates new instance of closure in getH1
// const getH2 = makeHeading('h2') // sets hTag to h2, creates separate instance of closure in getH2

// console.log( getH1('Heading 1')) // sets title to Heading 1 inside <h1>: <h1>Heading 1</h1>
// console.log( getH2('Heading 2')) // sets title to Heading 2 inside <h2>: <h2>Heading 2</h2>


// ----FUNCTION OBJECT - name PROPERTY----
// 
// function sayHiDefn() { console.log('Hi (function definition)');} // named function
// const sayHiExpn = function() { console.log('Hi (function expression)');} // named variable
// const sayHiArrow = () => console.log('Hi (arrow function)'); // named variable

// // .name property exists as a built-in default property for all functions
// console.log(sayHiDefn.name) // sayHiDefn - uses explicit function name
// console.log(sayHiExpn.name) // sayHiExpn - figures out name from context
// console.log(sayHiArrow.name) // sayHiArrow - figures out name from context

// ----FUNCTION OBJECT - length PROPERTY----

// function oneParam(a) {
//     console.log('This function has a single parameter: ' + a)
// }
// function twoParams(a, b) {
//     console.log(`This function has two parameters: ${a} and ${b}`)
// }
// function manyParams(a, b, ...extras) {
//     console.log(`This function has unlimited parameters: ${a} and ${b} and ${extras}`)
// }
// console.log(oneParam.length) // 1
// console.log(twoParams.length) // 2
// console.log(manyParams.length) // 2, because extras is 'the rest' and can't be counted


// ----FUNCTION OBJECT - CUSTOM PROPERTIES----

// function sayHi() {
//     console.log('Hi');
//     sayHi.counter++; // increment the custom counter property every time the function is called
// }
// sayHi.counter = 0 // initialize the counter to 0 before calling it

// sayHi() // Hi - calles the function and increments the counter
// sayHi() // Hi - calls the function and increments the counter again
// console.log(`Called ${sayHi.name} ${sayHi.counter} times`) // Called sayHi 2 times


// ----SCHEDULING - setTimout----

// function printMessage(msg) {
//     console.log(`Message: ${msg}`)
// }
// // function to be executed, then milliseconds to delay, then arguments for function
// let timerId = setTimeout(printMessage, 1000, 'prints after 1 sec') // Message: prints after 1 sec

// let cancelledTimerId = setTimeout(printMessage, 1000, 'timeout cancelled so never prints')
// clearTimeout(cancelledTimerId); // printMessage function is cancelled before delay of 1 second

// setTimeout( () => console.log("log statement inside arrow function"), 500)
// prints 'log statement inside arrow function' after 0.5 seconds

// setTimeout( () => console.log("first message"), 5000); // asynchronous code with 5s delay
// setTimeout( () => console.log("second message"), 3000); // asynchronous code with 3s delay
// setTimeout( () => console.log("third message"), 1000); // asynchronous code with 1s delay
// setTimeout( () => console.log("fourth message"), 0) // asynchronous code with no delay
// console.log("fifth message") // standard synchronous code
// order of messages when running code:
// fifth message - no delay
// fourth message - second but still no delay
// third message - prints after 1s
// second message - prints after 3s
// first message - prints after 5s. Timers do not stack, so total of 5s delay between first and fifth


// ----SCHEDULING - setInterval----

// let tickId = setInterval( () => console.log('tick'), 1000) // 'tick' every 2s
// setTimeout( () =>  clearInterval(tickId), 10*1000) // after 10s ticking stops

// function repeatInterval(delay, limit) {
//     let counter = 1; // part of the outer environment record for repeatInterval
//     // intervalTimer is a reference to interval, to allow it to be cancelled
//     let intervalTimer = setInterval(function repeatThis() {
//         console.log('repeatInterval: repeated '+counter+' of '+limit+' times');
//         if (counter == limit) clearInterval(intervalTimer); // cancel interval after execution limit
//         counter++; // keep track of how many times the interval has executed, in outer environment
//     }, delay); // delay is milliseconds between intervals
// }
// repeatInterval(2000, 10) // make the interval repeat every 2 seconds for a max of 10 times


// ----SCHEDULING - setTimeout----

// ----Nested setTimeout----
// function repeatTimeout(delay, limit) {
//     let counter = 1;
//     // setTimeout only happens once so we don't need the reference to cancel it
//     setTimeout(function repeatThis(current) { // named function so we can refer to it recursively
//         console.log('repeatTimeout: repeated ' + current + ' of ' + limit + ' times');
//         // we do need to call setTimeout recursively so that it repeats executing the function
//         if (current < limit) setTimeout(repeatThis, delay, current+1) // repeat if limit not reached
//     }, delay, counter);
// }
// repeatTimeout(2000, 10); // make the timeout repeat every 2 seconds for a max of 10 times


// ----DECORATORS AND FORWARDING----USE CASE l: ADDING LOGGING/TIMING INFORMATION----

// function printGreeting(name) { // simple undecorated function
//     console.log('Hello, ' + name);
// }
// printGreeting('Undecorated');

// function loggingTimingDecorator(originalFunction) { // decorator takes a function as parameter
//     return function (name) { // and returns that function with extra bits - timing/logging
//         console.time('Function timer'); // start a timer
//         console.log(`\nExecuting function ...`) // log a message
//         const result = originalFunction(name); // execute the original function
//         console.timeEnd('Function timer'); // stop the timer
//         return result; // return the result of running the original function
//     }
// }

// // returns the original function WITH the timing/logging features included
// const decoratedPrintGreeting = loggingTimingDecorator(printGreeting);
// decoratedPrintGreeting('Decorated') // we can still call the decorated version in the same way


// ----DECORATORS AND FORWARDING - CACHING----

// function slow(x) {
//     // there can be a time-consuming job here, like adding up to a large number
//     let random = 0, goal = Math.floor(Math.random() * x * 1_000_000); // random large number
//     console.log(`slow(${x}): randomly generated goal for ${x * 1_000_000} is ${goal}`);
//     for (let i = 0; i < goal; i++) random++;
//     return random; // return large number after counting to it
// }
// function cachingDecorator(origFunction) { // decrator takes a function as parameter
//     const cache = new Map(); // can also include outer environment variables via a closure    

//     return function(x) { // decorator returns same function with extra bits - caching
//         if (cache.has(x)) { // if the key exists in the cache
//             console.log('returned cached value for ' + x); return cache.get(x); // read and return the result from it
//         }
//         let result = origFunction(x) // otherwise, call the original function and store the result
//         cache.set(x, result);
//         return result;
//     };
// }
// const fast = cachingDecorator(slow) // we can decorate the original slow function to use caching and make it fast
// const fastTimed = loggingTimingDecorator(fast) // we can decorate the fast version to include timing for testing
// fastTimed(8) // first time will still be slow because it's uncached
// fastTimed(8) // but every time after this will be much faster because result is cached


// ----DECORATORS AND FORWARDING----CALL/APPLY----


// function loggingTimingDecorator(originalFunction) { // same decorator function as before
//     return function () { // BUT now the returned function doesn't name its argument here
//         console.time('Function Timer');
//         console.log(`\nExecuting Function ...`)
//         // const result = originalFunction(name); // WON't work as name is now undefined
//         // const result = originalFunction.call(this, ...arguments) // WILL work, no matter how many args
//         const result = originalFunction.apply(this, arguments) // and so does this, try both
//         console.log(arguments); // [Arguments] {'0' : 8 }
//         console.timeEnd('Function Timer'); // stop the timer
//         return result; // return the result of running the original function  
//     }
// }

// let worker = {
//     getMultiplier() {
//         return Math.floor(Math.random() * 1_000_000); // larger random number
//     },

//     slow(x) {
//         let random = 0, goal = x * this.getMultiplier(); // needs context to work
//         for(let i = 0; i < goal; i++) random++;
//         console.log(`worker.slow(${x}): randomly generated goal is ${goal}`);
//         return random; // return large number
//     }
// };
// worker.slow(5) // works, context comes from before the dot, ie. worker
// worker.fast = cachingDecorator(worker.slow) // without call/apply, context is lost
// worker.fast(3) // TypeError: Cannot read properties of undefined (reading 'getMultiplier")


// ----DECORATORS AND FORWARDING----USE CASE: BORROWING A METHOD----

// function isOdd(number) {return number % 2;} // returns true if number is odd, false otherwise

// function getOddNumbers() {
//     // argument is not an array, but it borrows the filer function from Array by using call
//     return[].filter.call(arguments, isOdd); // arguments is context, isIdd is parameter for filter
// }

// let results = getOddNumbers(10, 1, 3, 4, 8, 9);
// console.log(results) // [1, 3, 9] (array of all odd arguments)


// ----DECORATORS AND FORWARDING----USE CASE: INHERITING FROM A CONSTRUCTOR FUNCTION----

// function Product(name, price) {
//     this.name = name;
//     this.price = price;
//     this.salePrice = price * .9; // 10% off
// }

// function Food(name, price) {
//     Product.call(this, name, price); // inherits from Product with custom context
//     this.category = 'food';
// }

// const cheese = new Food('cheese', 5);
// console.log(`${cheese.name} is a ${cheese.category} and costs $${cheese.price} ($${cheese.salePrice} on sale)`);


// ----FUNCTION BINDING----

// ----ISSUE OF LOSING this----

// const user = {
//     name: 'John',
//     sayHi() {
//         console.log(`Hi, ${this.name}`)
//     }
// }
// user.sayHi() // called directly, works! Hi, John
// setTimeout(user.sayHi, 1000) // passed as reference, fails! Hi, undefined

// ----SOLUTION 1 FOR MISSING this----

// const user = {
//     name: 'John',
//     sayHi() {
//         console.log(`Hi, ${this.name}`)
//     }
// }
// setTimeout( function() {user.sayHi(); }, 1000 ) // works! Hi, John
// setTimeout( () => user.sayHi(), 1000 ) // same as above, arrow function, more common

// ----SOLUTION 2 FOR MISSING this----
// ---- THE FIX WITH bind----

// const user = {
//     name: 'John',
//     sayHi() {
//         console.log(`Hi, ${this.name}`)
//     }
// }
// const boundSayHi = user.sayHi.bind(user) // new function reference with user context explicitly bound
// setTimeout( boundSayHi, 1000 ) // works! Hi, John


// ----PROTOTYPES----

// let animal = { eats: true, sleeps: true, legs: 4, mammal: true }; // inherits from Object prototype
// let animalPrototype = Object.getPrototypeOf(animal); // recommended way to get prototype
// console.log(animalPrototype) // BUT printing it via console.log is incomplete.
// console.log(Object.getOwnPropertyNames(animalPrototype))


// ----PROTOTYPAL INHERITANCE----

// let rabbit1 = { jumps: true };
// Object.setPrototypeOf(rabbit1, animal); // NEW recommended way, uses default property descriptor settings

// let rabbit2 = Object.create(animal, { // creates a new object from prototype, with custom properties
//     jumps: { // name of custom 'own' property for rabbit object
//         value: true, // property descriptor to set the property value
//         enumerable: true // property descriptor to make this enumerable - otherwise jumps won't be in for...in
//     }
// });
// console.log(rabbit1, rabbit2); // { jumps: true } - only prints 'own' properties, not inherited ones
// console.log(rabbit1.legs, rabbit2.legs); // 4 - inherited properties do exist
// for (let prop in rabbit1) console.log(`${prop} is ${rabbit1[prop]}`) // own properties, then inherited ones
// for (let prop in rabbit2) console.log(`${prop} is ${rabbit2[prop]}`) // own properties, then inherited ones


// ----CONSTRUCTOR FUNCTION PROTOTYPES----

// function Rabbit(name) { // constructor function, first letter capitalized by convention
//     this.jumps = true;
//     this.name = name;
// }
// Rabbit.prototype = animal; // sets the prototype to inherit from (same animal object as previous)


// let whiteRabbit = new Rabbit ('White Rabbit');
// console.log(whiteRabbit); // { jumps: true, name: 'White Rabbit' } - own properties
// for (let prop in whiteRabbit) console.log(`${prop} is ${whiteRabbit[prop]}`) // all properties


// ----NATIVE PROTOTYPES----

// const obj = {} // simple empty object
// console.log( Object.getPrototypeOf(obj) === Object.prototype ) // true: its prototype is Object prototype
// console.log( Object.getOwnPropertyNames(Object.getPrototypeOf(obj)) ) // inherited properties from Object prototype

// const arr = [] // simple empty array
// console.log( Object.getPrototypeOf(arr) === Array.prototype ) // true: its prototype is Array prototype
// console.log( Object.getOwnPropertyNames(Object.getPrototypeOf(arr)) ) // inherited properties from prototype


// ----CHANGING NATIVE PROTOTYPES----

// String.prototype.show = function() { // creates new 'show' function on built-in String prototype
//     console.log(this);
// };
// "BOOM!".show(); // BOOM! - we can now call .show() on any string, since they all inherit from the prototype

// polyfilling for String.prototype
// if (!String.prototype.repeat) { // if there's no such function in the prototype already
//     String.prototype.repeat = function(n) { // define a repeat function to repeat the string n times
//         return new Array(n).join(this); // uses the string ('this') as glue to join n empty array items
//     };
// }
// console.log( "La".repeat(3) ) // LaLaLa


// ----BOWRROWING FROM PROTOTYPES----
// define our own join() function for objects
// const obj = {
//     0: "Hello",
//     1: "world",
//     length: 2, // needed for join to work
// };

// obj.join = Array.prototype.join; // adds a join function to THIS object that uses Array.join()
// Object.prototype.join = Array.prototype.join; // adds a join function to ALL objects

// console.log(obj.join(',')); // Hello, world


// ----CLASSES----

// a class is like a template or blueprint
// class ExampleClass {

//     // each instance of the class will have any properties
//     prop1 = 'value1';
//     prop2 = 'value2';

//     constructor() {
//         // constructor function creates a new instance of this class
//     }

//     method1() {
//         // methods are functions of the class
//     }
// }


// ----CLASSES: INHERITANCE----

// class Animal {
//     constructor(name) {
//         this.speed = 0; this.name = name;
//     }
//     run(speed) {
//         this.speed = speed;
//         console.log(`${this.name} runs with speed ${this.speed} mph`);
//     }
//     stop() {
//         this.speed = 0;
//         console.log(`${this.name} stands still.`);
//     }
// }
// // class Rabbit extends Animal {
//     hide() { // custom function, also inherits from Animal
//         console.log(`${this.name} hides!`);
//     }
// }
// let bunny = new Rabbit('bunny'); // bunny contains properties and methods from Animal and Rabbit
// bunny.run(9); // bunny runs with speed 9 mph
// bunny.hide(); // bunny hides!

// ----super KEYWORD----
// class Rabbit extends Animal {

//     stop() { // overrides stop method in parent class
//         super.stop(); // call parent stop
//         this.hide(); // and then hide
//     }

//     hide() { // custom function, also inherits this.name from Animal
//         console.log(`${this.name} hides!`);
//     }
// }

// let bunny = new Rabbit('bunny'); // bunny contains props and methods from Animal and Rabbit
// bunny.run(9); // bunny runs with speed 9 mph
// bunny.stop(); // bunny stands still. bunny hides!


// ----CLASSES: INHERITANCE - CONSTRUCTORS----

// class Rabbit extends Animal {

//     constructor(name, earLength) {
//         super(name); // call the constructor function of the parent, inherited Animal class
//         this.earLength = earLength; // adds custom properties only for instances of Rabbit
//     }
//     stop() { // function overridden from parent class
//         super.stop(); // call parent stop
//         this.hide(); // and then hide
//     }
//     hide() { // custom child class function
//         console.log(`${this.name} hides!`);
//     }
// }

// let bunny = new Rabbit('bunny', 8); // bunny contains properties and methods from Animal and Rabbit
// console.log( bunny.earLength ) // 8


// ----CLASSES: INHERITANCE - CHILD CLASSES----

// class Animal {
//     type = 'animal';
//     constructor(name) {
//         this.speed = 0;
//         this.name = name;
//     }
//     describe() {
//         console.log(`${this.name} is a ${this.type}`)
//     }
//     // ... previous Animal methods go here
// }
// class Rabbit extends Animal {
//     type = 'rabbit';
//     //... previous Rabbit methods go here
// }

// new Rabbit('bunny').describe() // bunny is a rabbit
// new Animal('fuzzy wuzzy').describe() // fuzzy wuzzy is an animal


// ----CLASSES: STATIC METHODS & PROPERTIES----

// class Person {
//     static latin = 'persona'; // static (class) property, belongs to class not any instance
//     constructor(name) {
//         this.name = name; // standard property, is unique to each instance of the class
//     }
//     getName() { // standard method, belongs to each instance of the class
//         return this.name;
//     }
//     static createAnonymous() { // static (class) method, belongs to class not any instance
//         return new Person("Unnamed Person");
//     }
// }
// let jonas = new Person('Jonas')
// console.log( jonas.getName() )// Jonas - name and getName() belong to an instance of Person
// console.log( jonas.latin ) // undefined - latin property doesn't belong to jonas
// console.log( Person.latin ) // persona - latin property belongs to Person class
// let anon = Person.createAnonymous() // use static (factory) method to create generic Person instance


// ----CLASSES: PROTECTED METHODS & PROPERTIES----

// class Laptop {
//     _hardDiskType = 'HDD'; // protected property, meant to be internal

//     constructor(brand) {
//         this.brand = brand; // public property, can be used externally by instances
//     }
//         getHDiskType() { return this._hardDiskType; } // public method to access protected property
// }
// const macbook = new Laptop('Macbook Pro');
// console.log(macbook.brand)
// console.log(macbook._hardDiskType)
// console.log(macbook.getHDiskType())


// ----CLASSES: PROTECTED METHODS & PROPERTIES - PRIVATE METHODS----
// class Laptop {
//     _hardDiskType = 'HDD'; // PROTECTED property (using underscore), SHOULD only be used by inheriting classes
//     #numCPUFans = 1; // PRIVATE property, CAN only be used internally by class methods

//     constructor(brand) { // constructors are ALWAYS PUBLIC
//         this.brand = brand; // PUBLIC property
//     }
//     isGaming() {return false;} // PUBLIC method
//     getHDiskType() {return this._hardDiskType;} // PUBLIC method to access protected property
//     _increaseCPUFans() { // PROTECTED method (using underscore)
//         if (this.isGaming()) this.#numCPUFans++ // can access private properties internally
//     }
// }
// const macbook = new Laptop('Macbook Pro');
// console.log(macbook.#numCPUFans) // SyntaxError: Private field '#numCPUFans' must be declared in an enclosing class

// class GamingLaptop extends Laptop {

//     constructor(brand) {
//         super(brand); // PUBLIC property, externally available to instances
//         this._hardDiskType = 'SSD'; // PROTECTED props should be accessed by child classes, not instances
//         this.#numCPUFans = 2; // error: PRIVATE prop not accessible
//         this._increaseCPUFans(); // use PROTECTED method to change #numCPUFans as it's internal
//     }
//     isGaming() {return true;} // PUBLIC method
// }
// const alienware = new GamingLaptop('Alienware');
// console.log(alienware.#numCPUFans) // error: PRIVATE property, not accessible
// console.log(alienware._hardDiskType)
// console.log(alienware.getHDiskType())


// ----ERROR HANDLING - try...catch----
// try {
//     const error = "mismatched quotes'
// } catch (err) {
//     console.log('will not catch above error')
// }
// SyntaxError: Invalid or unexpected token

// ----ERROR HANDLING: NON-SYNTACTICAL ERRORS----
// try {
//     noSuchVariable;
// } catch (error) { // error is just a variable name. 'error', 'err' or 'e' are all commonly used
//     console.log('caught an error: '+error.message) // all errors have a message property
// }
// console.log('even though an error occurred above, it was caught so code continues');
// caught an error: noSuchVariable is not defined
// even though an error occurred above, it was caught so code continues

// ----ERROR HANDLING: SYNCHRONOUS/ASYNCHRONOUS ERRORS----

// try {
//     setTimeout( () => noSuchVariable, 1000);
// } catch (e) {
//     console.log('only synchronous errors! '+ error.message)
// }
// console.log('prints synchronous code then throws uncaught asynchronous error after 1 second');
// TRY...CATCH ONLY WORKS FOR SYNCHORONOUS CODE

// ----ERROR HANDLING: throw OPERATOR----

// function checkJson(json) { // checks json argument for validity and ensuring name property
//     try {
//         const user = JSON.parse(json); // parse string into object
//         if (!user.name) {
//             throw new SyntaxError("Incomplete data: no name"); // we can throw our own custom errors
//         }
//         return true; // returns true (valid json) if no error was thrown above
//     } catch (e) {
//         if (e instanceof SyntaxError) { // once caught, we can do specific things based on error type
//             console.log( "JSON Error: " + e.message );
//         } else {
//             throw e; // rethrow other non-syntax errors; invalid json will still cause a crash
//         }
//     }
//     return false; // returns false if any error occurred
// }

// ----ERROR HANDLING: finally CLAUSE----

// function checkJson(json) {
//     try {
//         const user = JSON.parse(json); // parse string into object
//         if (!user.name) {
//             throw new SyntaxError("Incomplete data: no name"); // we can throw our own custom errors
//         }
//         return true; // returns true (valid json) if no error was thrown above
//     } catch (e) {
//         if (e instanceof SyntaxError) { // once caught, we can do specific things based on error type
//             console.log("JSON Error: " + e.message);
//         } else {
//             throw e; // rethrow other non-syntax errors; invalid json will still cause a crash
//         }
//     }
//     finally {
//         console.log('at the end'); // always prints even if returning true or throwing an error
//         // used to complete operations and perform cleanup regardless if we hit errors or not. i.e. closing db connections, removing interval timers, cancelling event listeners, etc.
//     }
//     return false;
// }
// const validJson = '{"name": "BOB"}'
// const invalidJson = '{"fname": "Jason"}'
// console.log(checkJson(validJson)) // returns true
// console.log(checkJson(invalidJson)) // returns false


// ----PROMISES: then, catch and finally----

// then- function that executes when promise RESOLVES (success)
// promise.then( (result) => console.log(result), // prints if/when promise resolves successfully
//     (error) => console.error(error) ) // optional, prints if/when promises completes with error
// // catch - function that executes when promise REJECTS (failure)
// promise.then( (result) => console.log(result) ) // prints if/when promise resolves successfully
//     .catch( (error) => console.error(error) ) // prints if/when promises completes with error
// // finally- function that executes when promise SETTLES (either success or failure)
// promise
//     .finally( () => console.log('promise is settled') ) // prints when promise settles
//     .then( (result) => console.log(result) ) // prints if/when promise resolves successfully
//     .catch( (error) => console.error(error) ) // prints if/when promises completes with error

// ----PROMISES: ARROW FUNCTIONS----
// const promise = new Promise((resolve, reject) => {
//     if (Math.random() > 0.5) setTimeout( () => resolve('Random number ok'), 250) // sucfess
//     else setTimeout( () => reject('Random number too low'), 250) // failure
// })

// promise
//     .finally( () => console.log('Wait is over, promised has settled.'))
//     .then( (result) => console.log('Success! ' + result ) ) // prints resolve msg
//     .catch( (error) => console.log('Error! ' + error ) ) // prints reject msg

// ----PROMISES: fetch- see fetch.html----

// PROMISES: CHAINING----
// let start = 10;
// new Promise((resolve, reject) => {
//     resolve(start); // resolve promise successful w/ value of 10
// }).then((result) => {
//     console.log(result); return result + start;
// }).then((result) => {
//     console.log(result); return result + start;
// }).then((result) => {
//     console.log(result); return result + start;
// });
// prints 10, 20, 30

// PROMISES: RETURNING PROMISES----
// let start = 10;
// new Promise( resolve => setTimeout(() => resolve(start), start * 10)
// ).then(result => {
//     console.log(result); let next = result + start;
//     return new Promise( resolve => setTimeout(() => resolve(next), next * 10));
// }).then(result => {
//     console.log(result); let next = result + start;
//     return new Promise(resolve => setTimeout(() => resolve(next), next * 10));
// }).then(result => {
//     console.log(result); let next = result + start;
//     return new Promise(resolve => setTimeout(() => resolve(next), next * 10));
// });
// prints 10, 20, 30, but with 100, 200 and 300ms delays in between

// PROMISES: async/await----

// const promise = new Promise((resolve) => {
//     setTimeout( () => resolve('Simple successful promise'), 2000 )
//    });
//    // using .then to process asynchronously:
//    promise.then(msg => console.log(msg));
//    // using await to process synchronously (if using await in a function it needs to be async):
   
//    (async () => {

//    let msg = await promise;
//    console.log(msg);
   
// }) ()

// ----PROMISES: asynch FUNCTION----
// async function asyncFunctionDeclaration() { ... } // function declaration syntax
// const asyncFunctionExpression = async function() { ... } // function expression syntax
// const asyncFunctionArrow = async () => { ... } // arrow function syntax

// ----PROMISES: await KEYWORD----
// async function waitForPromise() { // async function allows synchronous promise handling internally
//     // since we have synchronous code and no .catch(), we use try ... catch for errors
//     try {
//     let promiseResult = await promise; // waits here as long as promise needs to resolve
//     console.log(`Success: ${promiseResult}`) // then continues executing other code
//     return true;
//     } catch(error) {
//     console.error(`Failure: ${error.message}`)
//  }
//  //only gets here if return true above did NOT happen, ie. there was an error
//  return false;
// }

//----CLASS ACTIVITY----

function orderStarted() {
    console.log('Started preparing your pizza...')
}
orderStarted()

function makeBase() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('We made your base.')
            resolve()
        }, 2000)
    })
}
makeBase()

function addSauce() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Added the sauce and cheese.')
            resolve()      
        }, 4000)
    })
}
addSauce()

function addToppings() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Added your chosen toppings.')
        }, 6000)
    })
}
addToppings()

function cookPizza () {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Your pizza is in the oven!')
        }, 8000)
    })
}
cookPizza()

function makePizza() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Pizza is ready!!')
            resolve()
        }, 10000)
    })
}
makePizza()



// ----REVISION----
// 1. How does the concept of 'scope' affect variables in JS?


// 2. What is a closure? When would it be useful?
// A closure is a combination of a function bundled together w/ references to its lexical environment 
// & gives access to an outer funtion scope from an inner function, 
// even after the outer function has finished executing.

// They are useful when we need to associate current data from the lexical environment with a function that uses that data.

// 3. What are some built-in function properties? Can we add custom ones?
// Some built-in function properties are .name and .length.
// Yes, we can add custom properties.


// 4. What is the difference between setTimeout and setInterval? What do they do?


// 5. What is a decorator function? When would it be useful?
// The decorator function is a wrapper that alters an object's behavior with additional functionality, without altering its original code.
// It is useful for adding logging, timing, validating, and caching features.


// 6. How can we pass an unknown number of arguments to a generic function?


// 7. How can an object inherit properties and methods?


// 8. What is a class? When would it be useful?
// A class is a template for creating objects. They condense data with methods to work on that data. Built on prototypes but do have some syntax and semantics unique to them.

// 9. How can we handle errors and prevent them from crashing our code?


// 10. What is a promise? How can we use it?
// A promise represents the completion- success or failure- of an asynchronous operation. 