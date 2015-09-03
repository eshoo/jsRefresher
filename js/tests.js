QUnit.module("Array Testing");
QUnit.test("Sort Alphabetically", function (assert) {
    assert.deepEqual(["Oranges", "Apples", "Pears", "Cherries", "Grapes"].sort(), ["Apples", "Cherries", "Grapes", "Oranges", "Pears"], "Alphabetic Sort Pass!");
    //assert.ok(["Oranges", "Apples", "Pears", "Cherries", "Grapes"].sort() == ["Apples", "Cherries", "Grapes", "Oranges", "Pears"], "Passed!");
});
QUnit.test("Sort Numerics", function (assert) {
    assert.deepEqual([3, 2, 5, 1, 15].sort(function (a, b) { return a - b; }), [1, 2, 3, 5, 15], "Numeric Sort Pass!");
});
QUnit.test("Reverse Array Elements", function (assert) {
    assert.deepEqual(["Oranges", "Apples", "Pears", "Peaches", "Cherries", "Grapes"].reverse(), ['Grapes', 'Cherries', 'Peaches', 'Pears', 'Apples', 'Oranges'], "Reverse Array Pass!");
});
QUnit.test("Shift Array", function (assert) {
    assert.ok(["Oranges", "Apples", "Pears", "Peaches", "Cherries", "Grapes"].shift() === "Oranges", "Shift Passes!");
});
QUnit.test("Unshift Array", function (assert) {
    assert.ok(["Oranges", "Apples", "Pears", "Peaches", "Cherries", "Grapes"].unshift("Mango", "Pineapple") === 8, "Unshift Passes!");
});
QUnit.test("Slice", function (assert) {
    assert.deepEqual(["Oranges", "Apples", "Pears", "Peaches", "Cherries", "Grapes"].slice(1, 3), ["Apples", "Pears"], "Slice Passes!");
});
// ["Oranges", "Apples","Pears","Peaches","Cherries","Grapes"].splice(2,0,"Lemon","Kiwi")===["Oranges", "Apples","Lemon","Kiwi","Pears","Peaches","Cherries","Grapes"] 
QUnit.test("Splice", function (assert) {
    var myArray = ["Oranges", "Apples", "Pears", "Peaches", "Cherries", "Grapes"];
    //no good
    //myArray.splice(2,0,["Lemon","Kiwi");
    myArray.splice(2, 0, "Lemon", "Kiwi");
    assert.ok(myArray.length === ["Oranges", "Apples", "Lemon", "Kiwi", "Pears", "Peaches", "Cherries", "Grapes"].length,"Splice Passes!");
});
QUnit.test("Concat", function (assert) {
    assert.ok(["Oranges", "Apples"].concat(["Cherries", "Grapes"]).length === 4,"Concat Passes!");
});

QUnit.module("Function Invocation goodness - [Function].call() part I");
function doSomething() { return this.name; }

var myObj = { name: "TestObject", id: 1 };
var mySecondObj = { name: "TestObject2", id: 2 };


QUnit.test("tests - global function alone", function (assert) {
    assert.ok(doSomething() == "", "global function passes!");
});
QUnit.test("tests - global function invoked with .call scoped to TestObject1", function (assert) {
    assert.ok(doSomething.call(myObj) === "TestObject");
});
QUnit.test("tests - global function invoked with .call scoped to TestObject2", function (assert) {
    assert.ok(doSomething.call(mySecondObj) === "TestObject2");
});

QUnit.module("Function Invocation goodness - [Function].call() part II (supplying arguments)");
function payday(hrs, rate) {
    this.cashonHand += (hrs * rate)
    return this.name + " now has " + this.cashonHand + " dollars on hand.";
}
var p1 = { name: "Fred", cashonHand: 39, job: { description: "Dishwasher", hourlyRate: 8 }, id: 1 };
var p2 = { name: "Jane", cashonHand: 57, job: { description: "Oracle DBA", hourlyRate: 76 }, id: 2 };
//  value of x cannot be right, since the global 'this'.cashonHand property is undefined - as best the value of x may end up something like this: " now has NaN dollars on hand." //at best.
//  now it should be the case that the global 'this' has a cashonHand value of !==undefined, this is not what we wanted at all. 
// intead we want our working people, Fred and Jane to receive their pay, increasing their cashonHand values.  This is where call comes into play:
//var msg1 = payday.call(p1, 40, p1.hourlyRate);
//var msg2 = payday.call(p2, 40, p2.hourlyRate);
// What are the expected values of msg1 and msg2 now?  What about p2.cashonHand? p1.cashonHand?

QUnit.test("function with args invoked directly instead of with .call using global 'this'", function (assert) {
    assert.notOk(payday(p1.hoursWorked, p1.job.hourlyRate)==="","This should probably fail");
});
QUnit.test("function with args invoked with .call using person1 object as 'this'", function (assert) {
    assert.ok(payday.call(p1,40, p1.job.hourlyRate)==="Fred now has 359 dollars on hand.","Call using person1 Passes!");
});
QUnit.test("function with args invoked with .call using person2 object as 'this'", function (assert) {
    assert.ok(payday.call(p2, 35, p2.job.hourlyRate)==="Jane now has 2717 dollars on hand.","Call using person2 Passes!");
});


QUnit.module("Function Invocation goodness - [Function].apply()");
function payday2(hrs, rate) {
    this.cashonHand += (hrs * rate)
    this.hoursWorked = this.hoursWorked - hrs;
    return this.name + " now has " + this.cashonHand + " dollars on hand and has a total of " + this.hoursWorked + " unpaid hours banked this period.";
}

var pFred = { name: "Fred", cashonHand: 39, job: { description: "Dish washer", hourlyRate: 8 }, id: 1, hoursWorked: 43 };
var pJane = { name: "Jane", cashonHand: 57, job: { description: "Oracle DBA", hourlyRate: 76 }, id: 2, hoursWorked: 59 };

// var argsFred = [pFred.hoursWorked, pFred.job.hourlyRate];
// var argsJane = [40, pJane.job.hourlyRate];
// var x = payday(40, pFred.job.hourlyRate);
// var msg1 = payday.call(p1, argsFred);
// var msg2 = payday.call(p2, argsJane);
//What are the expected values for x, msg1 and msg2 now?



QUnit.test("tests - functions invoked with .apply()", function (assert) {
    assert.ok(payday2.apply(pFred, [pFred.hoursWorked, pFred.job.hourlyRate]) === "Fred now has 383 dollars on hand and has a total of 0 unpaid hours banked this period.", "[Function].apply() succeeds scoped to object pFred and provided [43, 8] to the args parameters array!!!");
    assert.ok(payday2.apply(pJane, [40, pJane.job.hourlyRate]) === "Jane now has 3097 dollars on hand and has a total of 19 unpaid hours banked this period.", "[Function].apply() succeeds scoped to object pJane and provided [40, 76] to the args parameters array!!!");
});


QUnit.module("Function Invocation goodness - [Function].bind(thisArg,[...])")
this.someVal=4; // creates a global someVal variable with a value of 4.
var bunkerObj= {
    someVal: 25
    , showVal: function() { return this.someVal; }
}                             
var f=bunkerObj.showVal;
bunkerObj.showVal(); //result is 25
f(); //result is 4 (unbound f has no context for 'this' so the global 'this' is used.)
var fbound=f.bind(bunkerObj);
fbound()===25; //f is now bound to be called always as if invoked in the context of bunkerObj

QUnit.test("Bound functions", function (assert) {

    assert.notOk(f()===25, "Unbound function returns globaly defined value not the intended value!");
    assert.ok(bunkerObj.showVal()===25,"Function invoked as a method of the object that hosts it will use that object's scope as the 'this' obj.");
    assert.ok(fbound()===bunkerObj.showVal(),"Bound function to an object's method will perform identical work as performed when invoked directly on the object it is defined in - Success!");
    

});
QUnit.test("Partial functions", function(assert) {
    assert.ok(false, "Partial functions *TODO*");
})

QUnit.module("Asynchrony - Closures, callbacks, promises...")
QUnit.test("Closure fun", function (assert) {
    assert.ok(false, "Closure tests *TODO*");
});
QUnit.test("Callback fun", function (assert) {
    assert.ok(false, "Callback tests *TODO*");
});
QUnit.test("Promises fun", function (assert) {
    assert.ok(false, "Promise tests *TODO*");
});

QUnit.module("More Array Fun");
QUnit.test("Array.map", function (assert) {
    assert.ok(false, "Array.map tests *TODO*");
});
QUnit.test("Array.reduce and Array.reduceRight", function (assert) {
    assert.ok(false, "Array.reduce tests *TODO*");
    assert.ok(false, "Array.reduceRight tests *TODO*");

});
QUnit.test("Array.filter", function (assert) {
    assert.ok(false, "Array.filter tests *TODO*");
});

QUnit.test("Array.entries", function (assert) {
    assert.ok(false, "Array.entries tests *TODO*");
});
QUnit.test("Array.every", function (assert) {
    assert.ok(false, "Array.every tests *TODO*");
});

QUnit.test("Array.some", function (assert) {
    assert.ok(false, "Array.some tests *TODO*");
});

QUnit.test("Array.keys", function (assert) {
    assert.ok(false, "Array.keys tests *TODO*");
});

QUnit.module("Prototypal Inheritance");
QUnit.test("Prototypal Inheritance demonstration", function (assert) {
    assert.ok(false, "Prototypal Inheritance Tests *TODO*");
});
    