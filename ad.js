// ----ADVANCED LABS----

// ----1. makeCounter below is a decorator function which creates and returns a function that 
// increments a counter.

// a) Create a second counter counter2 using the makeCounter function and test to see if it remains independent to counter1.
// b) Modify makeCounter so that it takes an argument startFrom specifying where the counter starts from (instead of always starting from 0).
// / c) Modify makeCounter to take another argument incrementBy, which specifies how much each call to counter() should increase the counter value by.

// function makeCounter() {
//     let currentCount = 0

//     return function() {
//         currentCount ++
//         console.log(currentCount)
//         return currentCount
//     }
// }

// let counter1 = makeCounter()
// let counter2 = makeCounter()

// counter1()
// counter1()

// function makeCounter2(startFrom) {
//     let currentCount = startFrom

//     return function() {
//         currentCount ++
//         console.log(currentCount)
//         return currentCount
//     }
// }

// let counter3 = makeCounter2(30)

// counter3()
// counter3()

// function makeCounter3(startFrom, incrementBy) {
//     let currentCount = startFrom

//     return function () {
//         currentCount += incrementBy
//         console.log(currentCount)
//     }
// }

// let counter4 = makeCounter3(45, 5)

// counter4()
// counter4()


// ----2. The following delayMsg function is intended to be used to delay printing a message until 
// some time has passed. 

// a) What order will the four tests below print in? Why?
// Message #4 will show first, then #3, #2, and last #1. This is because of the delay times set.

// b) Rewrite delayMsg as an arrow function.
// c) Add a fifth test which uses a large delay time (greater than 10 seconds).
// d) Use clearTimeout to prevent the fifth test from printing at all.

// function delayMsg(msg) {
//     console.log(`This message will be printed after a delay: ${msg}`)
// }

// setTimeout(delayMsg, 100, '#1: Delayed by 100ms')
// setTimeout(delayMsg, 20, '#2: Delayed by 20ms')
// setTimeout(delayMsg, 0, '#3: Delayed by 0ms')
// delayMsg('#4: Not delayed at all')

// const delayMsg = (msg) => console.log(`This message will be printed after a delay: ${msg}`)

// setTimeout(delayMsg, 3000, '#1: Delayed by 3s')
// setTimeout(delayMsg, 2000, '#2: Delayed by 2s')
// setTimeout(delayMsg, 1000, '#3: Delayed by 1s')
// delayMsg('#4: Not delayed at all')

// let fifthTimer = setTimeout(delayMsg, 10000, '#5: Delayed by 10 seconds')

// clearTimeout(fifthTimer)


// ----3. 'Debouncing' is a concept that refers to 'putting off' the execution of multiple, fast-timed, similar requests until there's a brief pause, then only executing the most recent of those requests. 
// See https://www.techtarget.com/whatis/definition/debouncing.

// It's often used to handle fast-firing scrolling events in a browser, or to prevent multiple server requests being initiated if a user clicks repeatedly on a button.
// a) Create a debounce(func) decorator, which is a wrapper that takes a function func and suspends calls to func until there's 1000 milliseconds of inactivity. After this 1 second pause, the most recent call to func should be executed and any others ignored.
// b) Extend the debounce decorator function to take a second argument ms, which defines the length of the period of inactivity instead of hardcoding to 1000ms.
// c) Extend debounce to allow the original debounced function printMe to take an argument msg which is included in the console.log statement.

// function debounce(func) {
//     let timeout;
//     return function () {

//         clearTimeout(timeout);

//         timeout = setTimeout(func, 1000)
//     };
// }

// function printMe() {
//     console.log('printing debounced message');
// }
// printMe = debounce(printMe);

// setTimeout(printMe, 100);
// setTimeout(printMe, 200);
// setTimeout(printMe, 300);

// function debounce2(func, ms) {
//     let timeout;
//     return function() {

//         clearTimeout(timeout);

//         timeout = setTimeout(func, ms)
//     };
// }

// function debounce3(func, ms) {
//     let timeout;
//     return function(msg) {

//         clearTimeout(timeout);

//         timeout = setTimeout(func, ms, msg);
//     };
// }

// function printMe2(msg) {
//     console.log(`printing out debounced message for c: ${msg}`);
// }

// printMe2 = debounce2(printMe2, 1500);

// setTimeout(printMe2, 100, '1st message');
// setTimeout(printMe2, 200, '2nd message');
// setTimeout(printMe2, 300, '3rd message');


// 4. The Fibonacci sequence of numbers is a famous pattern where the next number in the sequence is the sum of the previous 2. e.g. 1, 1, 2, 3, 5, 8, 13, 21, 34, etc.
// a) Write a function printFibonacci() using setInterval that outputs a number in the Fibonacci sequence every second.
// b) Write a new version printFibonacciTimeouts() that uses nested setTimeout calls to do the same thing.
// c) Extend one of the above functions to accept a limit argument, which tells it how many numbers to print before stopping.

// function printFibonacci() {
//     let first = 1
//     let second = 1

//     console.log(first)
//     console.log(second)

//     setInterval(function printNext() {
//         let next = first + second
//         console.log(next)

//         first = second
//         second = next
//     }, 1000)
// }

// function printFibonacciTimeouts() {
//     let [first, second] = [1, 1]
//     console.log(first)
//     console.log(second)

//     setTimeout(function printNext(first, second) {
//         let next = first + second
//         console.log(next)

//         setTimeout(printNext, 3000, second, next)
//     }, 3000, first, second)
// }

// function printFibonacciLimit(limit) {
//     let first = 1
//     let second = 1

//     console.log(first)
//     console.log(second)

//     let counter = 2

//     let intervalRef = setInterval(function printNext() {
//     let next = first + second
//     console.log(next)

//     first = second
//     second = next
//     counter++

//     if (counter == limit) clearInterval(intervalRef)
//     }, 1000)
// }

// printFibonacci()
// printFibonacciTimeouts()
// printFibonacciLimit(4)

// ----5. The following car object has several properties and a method which uses them to print a description. When calling the function normally this works as expected, but using it from within setTimeout fails. Why?
// a) Fix the setTimeout call by wrapping the call to car.description() inside a function.
// b) Change the year for the car by creating a clone of the original and overriding it.
// c) Does the delayed description() call use the original values or the new values from. b)? Why?
// d) Use bind to fix the description method so that it can be called from within setTimeout without a wrapper function.
// e) Change another property of the car by creating a clone and overriding it, and test that setTimeout still uses the bound value from d).

// let car = {
//     make: "Porsche",
//     model: '911',
//     year: 1964,

//     description() {
//         console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
//     }
// };

// car.description();

// setTimeout(() => car.description(), 2000);

// car = {...car, year: 1973}

// let describeCar = car.description.bind(car)

// setTimeout(describeCar, 4000)


// ----6. Use the Function prototype to add a new delay(ms) function to all functions, which can be used to delay the call to that function by ms milliseconds.
// a) Use the example multiply function below to test it with, as above, and assume that all delayed functions will take two parameters.
// b) Use apply to improve your solution so that delayed functions can take any number of parameters.
// c) Modify multiply to take 4 parameters and multiply all of them, and test that your delay prototype function still works.

// function multiply(a, b) {
//     console.log(a * b);
// }

// Function.prototype.delay = function(ms) {
//     let originalFunction = this
//     return function(arg1, arg2) {
//         setTimeout(originalFunction, ms, arg1, arg2)
//     }
// }

// multiply.delay(2000)(5, 5)

// Function.prototype.delay2 = function(ms) {
//     let originalFunction = this
//     return function() {
//         setTimeout(() => originalFunction.apply(this, arguments), ms)
//     }
// }

// function multiply4(a, b, c, d) {
//     console.log(a * b * c * d)
// }

// multiply4.delay2(4000)(5, 5, 5, 5)


// ----7. The following DigitalClock class uses an interval to print the time every second once 
// started, until stopped.

// a) Create a new class PrecisionClock that inherits from DigitalClock and adds the 
// parameter precision – the number of ms between 'ticks'. This precision parameter 
// should default to 1 second if not supplied.

// b) Create a new class AlarmClock that inherits from DigitalClock and adds the 
// parameter wakeupTime in the format hh:mm. When the clock reaches this time, it 
// should print a 'Wake Up' message and stop ticking. This wakeupTime parameter should 
// default to 07:00 if not supplied.

// class DigitalClock {
//     constructor(prefix) {
//         this.prefix = prefix;
//         this.timer = null;
//     }

//     display() {
//         let date = new Date();

//         let [hours, mins, secs] = [date.getHours(), date.getMinutes(), date.getSeconds()];
//         if (hours < 10) hours = '0' + hours;
//         if (mins < 10) mins = '0' + mins;
//         if (secs < 10) secs = '0' + secs;
//         console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
//     }

//     stop() {
//         clearInterval(this.timer);
//     }

//     start() {
//         this.display();
//         this.timer = setInterval(() => this.display(), 1000);
//     }
// }

// class PrecisionClock extends DigitalClock {
//     constructor(prefix, precision = 1000) {
//         super(prefix);
//         this.precision = precision;
//     }

//     start() {
//         this.display();
//         this.timer = setInterval(() => this.display(), this.precision);
//     }
// }

// class AlarmClock extends DigitalClock {
//     constructor(prefix, wakeupTime = '07:00') {
//         super(prefix);
//         this.wakeupTime = wakeupTime;
//     }

//     checkDisplay() {
//         let now = new Date();
//         let [currentHours, currentMinutes] = [now.getHours(), now.getMinutes()];
//         let [wakeupHours, wakeupMinutes] = this.wakeupTime.split(':').map(Number);

//         if (currentHours === wakeupHours && currentMinutes === wakeupMinutes) {
//             console.log('Wake Up!');
//             this.stop();
//         } else {
//             this.display();
//         }
//     }

//     start() {
//         this.timer = setInterval(() => {
//             this.checkDisplay();
//         }, 1000);
//     }
// }

// const myAlarmClock = new AlarmClock('my alarm clock:', '19:30');
// myAlarmClock.start();


// ----8. In JavaScript, the toString method is used to convert an object to a string representation. 
// By default, when an object is converted to a String, it returns a string that looks something like [object Object]. However, we can define our own toString methods for custom objects to provide a more meaningful string representation.
// a) Define a custom toString method for the Person object that will format and print their details.
// b) Test your method by creating 2 different people using the below constructor function and printing them.
// c) Create a new constructor function Student that uses call to inherit from Person and add an extra property cohort.
// d) Add a custom toString for Student objects that formats and prints their details. Test with 2 students.

// function orderItems(...itemNames) {
//     return `Order placed for: ${itemNames.join(',')}`;
// }

// function validateStringArg(fn) {
//     return function (arg) {
//         if (typeof arg !=="string") {
//             throw new Error("Argument must be a string");
//         }

//         return fn(arg);
//     };
// }

// function validateStringArgs(fn) {
//     return function (...args) {
//         for (let arg of args) {
//             if (typeof arg !=="string") {
//                 throw new Error(`Argument ${arg} must be a string`);
//             }
//         }

//         return fn(...args);
//     };
// }

// const validatedOrderItem = validateStringArg(orderItems);
// const validatedOrderItems = validateStringArgs(orderItems);

// try{
//     console.log(validatedOrderItem("Apple Watch"))
//     console.log(validatedOrderItem(123));

//     console.log(validatedOrderItems("Apple Watch", "Airpods"));
//     console.log(validatedOrderItems("abc", 123));
// } catch (err) {
//     console.log(err.message);
// }


// ----9. We can delay execution of a function using setTimeout, where we need to provide both the callback function and the delay after which it should execute.
// a) Create a promise-based alternative randomDelay() that delays execution for a random amount of time (between 1 and 20 seconds) and returns a promise we can use via .then(), as in the starter code below.
// b) If the random delay is even, consider this a successful delay and resolve the promise, and if the random number is odd, consider this a failure and reject it.
// c) Update the testing code to catch rejected promises and print a different message.
// d) Try to update the then and catch messages to include the random delay value.

// let delay = Math.ceil(Math.random() * 20);
//     return new Promise((resolve, reject) => {

//     setTimeout(() => {
//         if (delay % 2 === 0) {
//             resolve(delay)
//         } else {
//             reject(delay)
//         }
//         }, delay * 1000)
//     });


// randomDelay()
//     .then((delay) => console.log(`Successful delay of ${delay} seconds`))
//     .catch((delay) => console.log(`Failed delay of ${delay} seconds`));


// ----10. Fetch is a browser-based function to send a request and receive a response from a server which uses promises to handle the asynchronous response.
// The below fetchURLData uses fetch to check the response for a successful status code and returns a promise containing the JSON sent by the remote server if successful or if it failed.
// a) Write a new bersion of this function using async/await.
// b) Test both functions with valid and invalid URLs.
// c) (extension) Extend your new function to accept an array of URLs and fetch all of them using Promise.all to combine results.

// import fetch from 'node-fetch';
// globalThis.fetch = fetch;

// function fetchURLData(url) {
//     let fetchPromise = fetch(url)
//     .then((response) => {
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             throw new Error(`Request failed with status ${response.status}`);
//         }
//     });
//     return fetchPromise;
// }

// async function asyncFetchURLData(url) {
//     let fetchResponse = await fetch(url);
//     if (fetchResponse.status === 200) {
//         let responseJson = await fetchResponse.json();
//         return responseJson;
//     } else {
//         throw new Error(`Request failed with status ${fetchResponse.status}`);
//     }
// }

// async function asyncFetchMultipleURLData(urls) {
//     return Promise.all(
//         urls.map(async (url) => {
//             let response = await fetch(url);
//             if (response.status === 200) {
//                 return response.json();
//             } else {
//                 throw new Error(`Request failed with status ${response.status} for URL: ${url}`);
//             }
//         })
//     );
// }

// (async () => {
//     try {
//         fetchURLData('https://jsonplaceholder.typicode.com/todos/1')
//             .then((data) => console.log("Promise-based fetch (valid):", data))
//             .catch((error) => console.error("Promise-based fetch (error):", error.message));

//         fetchURLData('https://jsonplaceholder.typicode.com/fake')
//           .then((data) => console.log(data))
//           .catch((error) => console.error("Promise-based fetch (invalid):", error.message));

//         let responseData1 = await asyncFetchURLData('https://jsonplaceholder.typicode.com/todos/1');
//             console.log("Async fetch (valid):", responseData1);

//     try {
//         let responseData2 = await asyncFetchURLData('https://jsonplaceholder.typicode.com/fake');
//             console.log("Async fetch (invalid):", responseData2);
//         } catch (error) {
//             console.error("Async fetch (error):", error.message);
//         }

//         let responseData3 = await asyncFetchMultipleURLData([
//             'https://jsonplaceholder.typicode.com/todos/1',
//             'https://jsonplaceholder.typicode.com/todos/2',
//             'https://jsonplaceholder.typicode.com/fake'
//         ]);
//             console.log("Multiple URLs fetch:", responseData3);
//         } catch (error) {
//             console.error("General error:", error.message);
//         }
//         })();