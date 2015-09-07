QUnit.module("Array Testing");
QUnit.test("Sort", function (assert) {
    assert.deepEqual(["Oranges", "Apples", "Pears", "Cherries", "Grapes"].sort(), ["Apples", "Cherries", "Grapes", "Oranges", "Pears"], "Alphabetic Sort Pass!");
    assert.deepEqual([3, 2, 5, 1, 15].sort(function (a, b) { return a - b; }), [1, 2, 3, 5, 15], "Numeric Sort Pass!");
});

QUnit.test("Reverse Array Elements", function (assert) {
    assert.deepEqual(["Oranges", "Apples", "Pears", "Peaches", "Cherries", "Grapes"].reverse(), ['Grapes', 'Cherries', 'Peaches', 'Pears', 'Apples', 'Oranges'], "Reverse Array Pass!");
});
QUnit.test("Shift and unshift Array", function (assert) {
    assert.ok(["Oranges", "Apples", "Pears", "Peaches", "Cherries", "Grapes"].shift() === "Oranges", "Array.shift Passes!");
    assert.ok(["Oranges", "Apples", "Pears", "Peaches", "Cherries", "Grapes"].unshift("Mango", "Pineapple") === 8, "Array.unshift Passes!");

});
QUnit.test("Slice, Splice and Concat Array", function (assert) {
    assert.deepEqual(["Oranges", "Apples", "Pears", "Peaches", "Cherries", "Grapes"].slice(1, 3), ["Apples", "Pears"], "Array.slice Passes!");
    var myArray = ["Oranges", "Apples", "Pears", "Peaches", "Cherries", "Grapes"];
    //no good
    //myArray.splice(2,0,["Lemon","Kiwi");
    myArray.splice(2, 0, "Lemon", "Kiwi");
    assert.ok(myArray.length === ["Oranges", "Apples", "Lemon", "Kiwi", "Pears", "Peaches", "Cherries", "Grapes"].length, "Array.splice Passes!");
    assert.ok(["Oranges", "Apples"].concat(["Cherries", "Grapes"]).length === 4, "Array.concat Passes!");

});
QUnit.module("More Array Fun");
QUnit.test("Array.map", function (assert) {
    var obj={};
    var objArr=[{key: "name", value: "Josh A."}, {key: "PostalCode", value: "33760"}, {key: "Email", value: "blah@blarg.net"}];
    assert.ok(["1", "2", "3", "4"].map(Number), "Simple array.map succeeds!!! ['1','2','3','4'].map(Number);");
    assert.ok(objArr.map(function (o) { var newItem = {}; newItem[o.key] = o.value; return newItem; }), '[{key: "name", value: "Josh A."}, {key: "postalcode", value: "33760"}, {key: "email", value: "blah@blarg.net"}] mapped to  [{name: "Josh A"}, {postalcode: "33760"}, {email:"blah@blarg.net"}] Success!!! ***Extra credit reduce this to {name: "Josh A", postalcode: "33760", email:"blah@blarg.net"}');

});
QUnit.test("Array.reduce and Array.reduceRight", function (assert) {

    assert.ok([0, 1, 2, 3].reduce(function (a, b) { return a - b; }) === -6, "Array.reduce succeeds!");
    assert.ok([0, 1, 2, 3].reduceRight(function (a, b) { return a - b; }) === 0, "Array.reduceRight Succeeds!");

});
QUnit.test("Array.filter", function (assert) {
    assert.deepEqual([1, 6, 2, 5, 7, 22, 11, 96, 23].filter(function (n) { return (n % 2) == 0; }).sort(function (a, b) { return a - b }), [2, 6, 22, 96], "[1,6,2,5,7,22,11,96,23].filter(function(n) { return (n % 2)==0;}).sort(function(a,b) { return a-b }) results in [2,6,22,96] as expected therefore Array.filter test Succeeds!");
});



QUnit.test("Array.forEach, Array.every and Array.some", function (assert) {
    var anArray = ["zero", "one", "two", "three"];
    var retStr = "";
    anArray.forEach(function(el,idx,arr) {
        retStr += el;
        if (idx + 1 !== arr.length) {
            retStr += ",";
        }
    });
    assert.ok(retStr === "zero,one,two,three", "['zero', 'one', 'two', 'three'].forEach(listEachElement) results in: " + retStr + " Success!");

    assert.ok(anArray.join(",") === retStr, "Array.forEach part 2 - anArray.join(',')===['zero', 'one', 'two', 'three'].forEach(listEachElement) - Success!!!\nNote: Array.forEach() will always return a value of 'undefined', for this reason it is not the output of the forEach call being evaluated, rather the accumulated results of the forEach operation is being compared.");
    // every performs a comparison operation on each element of the array until an element returns a falsy value in which case it shall return false, if all elements evaluate to truthy values, every returns true.
    var anotherArr = [0, 1, 2, 3, 4];
    assert.notOk(anotherArr.every(function(el,idx,anotherArr) {
        return el < 3;
    }), "[0, 1, 2, 3, 4].every(isGreaterThanThree)===false; all elements are not >3 therefore every returns a falsy as expected - Success!");
    assert.ok(anotherArr.every(function (el, idx, anotherArr) { return Number.isInteger(el); }), "[0, 1, 2, 3, 4].every(isNumber)===true; because every array element is indeed a number - Success!");
    var someArr = [0, 'a', 1, 'b', 2, 'c', 3, 'd', 4, 'e'];
    assert.ok(someArr.some(function (el, idx, someArr) { return Number.isInteger(el); }), "[0, 'a',1, 'b',2,'c', 3,'d', 4,'e'].some(isNumber)===true; because at least one element is a number - Success!");
    assert.notOk(anotherArr.some(function (el, idx, anotherArr) { return !Number.isInteger(el); }), "[0, 1, 2, 3, 4].some(isNotNumeric)===false; because no element in the array is not a number.");
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
    // avoid accidently creating a global cashonHand 
    if (this.cashonHand) {
        this.cashonHand += (hrs * rate)
    }
   
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
    assert.notOk(payday(p1.hoursWorked, p1.job.hourlyRate) === "", "This should probably fail");
});
QUnit.test("function with args invoked with .call using person1 object as 'this'", function (assert) {
    assert.ok(payday.call(p1, 40, p1.job.hourlyRate) === "Fred now has 359 dollars on hand.", "Call using person1 Passes!");
});
QUnit.test("function with args invoked with .call using person2 object as 'this'", function (assert) {
    assert.ok(payday.call(p2, 35, p2.job.hourlyRate) === "Jane now has 2717 dollars on hand.", "Call using person2 Passes!");
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
this.someVal = 4; // creates a global someVal variable with a value of 4.
var bunkerObj = {
    someVal: 25
    , showVal: function () { return this.someVal; }
}
var f = bunkerObj.showVal;
bunkerObj.showVal(); //result is 25
f(); //result is 4 (unbound f has no context for 'this' so the global 'this' is used.)
var fbound = f.bind(bunkerObj);
fbound() === 25; //f is now bound to be called always as if invoked in the context of bunkerObj

QUnit.test("Bound functions", function (assert) {

    assert.notOk(f() === 25, "Unbound function returns globaly defined value not the intended value!");
    assert.ok(bunkerObj.showVal() === 25, "Function invoked as a method of the object that hosts it will use that object's scope as the 'this' obj.");
    assert.ok(fbound() === bunkerObj.showVal(), "Bound function to an object's method will perform identical work as performed when invoked directly on the object it is defined in - Success!");


});
QUnit.test("Partial functions with bind.", function (assert) {

    function list() {
        return Array.prototype.slice.call(arguments); //changes Array.slice behavior to expect an arguments array.
    }

    var list1 = list(1, 2, 3); // [1, 2, 3] // calling the list function which returns the result of the modified slice operation returns an array whose elements are the values of the arguments it was invoked with.

    // Create a function with a preset leading argument
    var leadingZeroList = list.bind(undefined, 0); //function binding an argument value of 0 to the list function. 

    var list2 = leadingZeroList(); // calling the new function results in [0], since the 'this' object specified is 'undefined' the result is in essence [].push(0). 
    var list3 = leadingZeroList(1, 2, 3); // creating a new list using the leadingZero list bound function results in [0, 1, 2, 3], this demonstrates that our modified list function's argument conversion still holds true because it is leadingZeroList derives from our list function and has been bound to prefix 0 to the arguments it is invoked with.
    assert.deepEqual(function () { return Array.prototype.slice.call(arguments); }(1, 2, 3), [1, 2, 3], "function () { return Array.prototype.slice.call(arguments);}(1,2,3) results in [1,2,3] which is as expected - Success!");
    assert.deepEqual(function () { return Array.prototype.slice.call(arguments); }.bind(undefined, 0)(), [0], "function () { return Array.prototype.slice.call(arguments); }.bind(undefined,0)() results in [0] as expected - Success");
    assert.deepEqual(function () { return Array.prototype.slice.call(arguments); }.bind(undefined, 0)(1, 2, 3), [0, 1, 2, 3], "function () { return Array.prototype.slice.call(arguments); }.bind(undefined,0)(1,2,3) results in [0,1,2,3] which is as expected - Success!!!");

});



QUnit.module("Asynchrony - Closures, callbacks, promises...")
QUnit.test("Closure fun (also doubles as IIFE example) - extra credit - what is IIFE again?", function (assert) {
    function countdown() {
        var i;
        for (i = 5; i > 0; i--) {
            (function (current_i) {
                setTimeout(function () {
                    assert.ok(!isNaN(parseFloat(current_i)) && isFinite(current_i),
                        "current_i is a number and its value is:" + current_i + ", timestamp:" + Date.now())
                }, (5 - current_i) * 1000);
            })(i);
        }
        return true;
    }
    assert.ok(countdown(), "countdown with closure has begun! timestamp:" + Date.now());
});
QUnit.test("Callback fun note callbacks are closures, as such this this test should behave similarly to the closure examples.  It has been restructured slightly to create a more helpful example.", function (assert) {
    function countdown2(callback) {
        var i;
        for (i = 5; i > 0; i--) {
            callback(i);
        }
        return true;
    }
    function myCb(current_i) {
        setTimeout(function () {
            assert.ok(!isNaN(parseFloat(current_i)) && isFinite(current_i),
                "current_i is a number and its value is:" + current_i + ", timestamp:" + Date.now())
        }, (5 - current_i) * 1000);
    }
    assert.ok(countdown2(myCb), "countdown with callback function has begun! timestamp:" + Date.now());
 
});


QUnit.module("Prototypal Inheritance, Constructors and the New Operator");
function ShoppingCart() {
    this.store = "Publix";
    this.items = [];
    this.total = function () {
        return this.items.reduce(function (a, item) { return a += item.price; }, 0);
    }
}

QUnit.test("Extending object instances.", function (assert) {
    var myCart = new ShoppingCart();
    //establish that no addItem method exists on myCart object
    assert.ok(typeof myCart.addItem != "function", "Success, there is not yet an addItem function belonging to this myCart object");
    // mechanism to add an addItem method to my instance at my discretion rather than having it hoisted onto the object immediately upon entering scope (the only reason for the wrapper is to evaluate the before and after state of addItem's existence.

    function extendObj(theCart) {
        theCart.addItem = function (item) {
            this.items.push(item);
            return this.items.length;
        };
        return theCart;
    }
    // now, create myCart's addItem method 
    myCart = extendObj(myCart);
    // establish that addItem now exists.
    assert.ok(typeof myCart.addItem == "function", "Success, there is now an addItem function belonging to this myCart object");
    // establish that myCart is still derived from ShoppingCart.
    assert.ok(myCart instanceof ShoppingCart, "myCart is an instance of ShoppingCart - success!");
    // establish that all is right with the world according to myCart behaving as one would expect.
    assert.ok(myCart.addItem({ name: "Eggs", price: 4.65 }) === 1, "myCart.addItem({ name: 'Eggs', price: 4.65 })===1 should be true because myCart.addItem's return value is the new number of items in the shopping cart after adding a new one - Success!");
    assert.ok(myCart.addItem({ name: 'Milk', price: 5.67 })===2,"myCart.addItem({ name: 'Milk', price: 5.67 })===2 should now be true because another item has been added. Success!");
    assert.ok(myCart.total() > 0, "myCart.total()>0 should be true, specifically it's value is going to be:" + myCart.total());

});

QUnit.test("Prototypal Inheritance - extending functionality via object prototype.", function (assert) {
    // this time, instead of adding the addItem method to an instance, we are going to create the method for all objects derived from ShoppingCart:
    //...but first, try to create an instance of the pre-enhanced ShoppingCart class.
    var myCart = new ShoppingCart();
    //establish that myCart does not have a tax property (could also check the existence of subtotal and addItem function but only one will do to prove or disprove the point).
    assert.ok(typeof myCart.tax =="undefined", "myCart pre enhancement to the ShoppingCart class has no tax property.");
    
    ShoppingCart.prototype = {
        addItem: function (item) {
            this.items.push(item);
            return this.items.length;
        },
        subtotal: 0,
        tax: 0
    }
    //establish that now, addItem will exist for all new ShoppingCarts (and possibly all existing instances derived from ShoppingCart - need to review the details regarding that
    assert.ok(typeof new ShoppingCart().addItem == "function", "typeof new ShoppingCart().addItem=='function'; demonstrates that unlike previous examples which extended an object instance, this time we are extending functionality for all instances derived from ShoppingCart()");
    //now create an instance of ShoppingCart
    var cart = new ShoppingCart();
    // establish that cart is still derived from ShoppingCart.
    assert.ok(cart instanceof ShoppingCart, "cart is an instance of ShoppingCart - success!");
    // establish that all is right with the world according to cart behaving as one would expect.
    assert.ok(cart.addItem({ name: "Eggs", price: 4.65 }) === 1, "cart.addItem({ name: 'Eggs', price: 4.65 })===1 should be true because cart.addItem's return value is the new number of items in the shopping cart after adding a new one - Success!");
    assert.ok(cart.addItem({ name: 'Milk', price: 5.67 }) === 2, "cart.addItem({ name: 'Milk', price: 5.67 })===2 should now be true because another item has been added. Success!");
    assert.ok(cart.total() > 0, "cart.total()>0 should be true, specifically it's value is going to be:" + cart.total());
    //finally verify that myCart didn't magically receive an addItem method or tax and subtotal properies (only one will do)
    assert.notOk(typeof myCart.tax == typeof cart.tax, "myCart was created before it's superclass was enhanced with tax, subtotal and addItem, therefore it should still not have those properties and the addItem method - Success!");
    

});



QUnit.module("Asynchrony part II - Promises ")
var promise = new Promise(function (resolve, reject) {
    var someNum = 0;

    try {
        someNum++;
        resolve("SomeNum is:" + someNum);
    } catch (ex) {
        reject(ex);
    }

});


promise.then(function (res) {
    QUnit.test("Promises fun", function (assert) {
        assert.ok(res === "SomeNum is:1", "Promise test success!");
    }), function (err) {
        QUnit.test("Promises fun", function (assert) {
            assert.notOk(res === "SomeNum is:1", err);
        });
    }
});



