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
QUnit.module("Function Invocation goodness - [Function].call()");
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

QUnit.module("Function Invocation goodness part II - [Function].apply()")
function doSomethingWithSomethingElse(somethingElse) { return this.name + " says that somethingElse is:" + somethingElse; }

var myObj = { name: "TestObject", id: 1 };
var mySecondObj = { name: "TestObject2", id: 2 };

QUnit.test("tests - global function invoked with .apply scoped to TestObject1 and provided myObj.name(TestObject) and mySecondObject.name (TestObject2) as the array of parameters.", function (assert) {
    assert.ok(doSomethingWithSomethingElse.apply(myObj, [myObj.name, mySecondObj.name]) === myObj.name, ".apply Succeeds!");
});
QUnit.test("tests - global function invoked with .apply scoped to TestObject2 and provided myObj.name (TestObject) and mySecondObject.name (TestObject2) as the array of parameters.", function (assert) {
    assert.ok(doSomethingWithSomethingElse.apply(myObj, [myObj.name, mySecondObh.name]), ".apply succeeds");
});

/*
QUnit.module("Asynchrony Tests");
QUnit.test("Callback Test", function (assert) {
    var done = assert.async();
    
    setTimeout(function () {
        done();
    },100);
});
*/