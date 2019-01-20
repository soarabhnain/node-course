
// 1. Pipefy

String.prototype.pipefy = function(){
    return this.split('').join('|');
}

// 2. Currying Function
function add(x){
    if(arguments.length>1){
        let sum=0;
        for(var i=0;i<arguments.length;i++){
            sum +=arguments[i];
        }
        return sum;
    }
    return function sum(y){
        if(typeof y !== 'undefined'){
            x=x+y;
            return sum;
        } else{
            return x;
        }
    };
}





// 3. Factorial

function fact(n){
    if(n===0){ return 1 }
    return n*fact(n-1);
}


// 4. Sorting
function comp(a,b){
    return a-b;
}

var arr = [10,4,3,-3,-66,4,3,2,8,-9];

arr.sort(comp)// [-66, -9, -3, 2, 3, 3, 4, 4, 8, 10]


// 5. Unique elements from an array


var newArray = new Set(arr);

var uniqueArray = Array.from(newArray);


//6. Array.map

var array = [1,2,3,4];
var result = array.map(function(element){
return element * 2;
});
//The result will be newly created array having 2,4,6,8


// =============================================================

const songs = [
    {id:1, name:"Jo jeeta wohi sikander"},
    {id:2, name:"Chhamakchhallo"},
    {id:3, name:"Jatt di clip"},
    {id:4, name:"Purje"},
];

var songNames = songs.map(function(item){
    return item.name;
});


//7. Array.filter

const arr = [1,2,3,4]
undefined
arr.filter(function(elem){
    return (elem>1 && elem<4);
})

// [2,3] Filter receives the same arguments as map, and works very similarly. The only difference is that the callback needs to return either true or false.


//8. Closures

for(var i=0;i<10;i++){
    function timer(j){
        setTimeout(function(){
            console.log(j)},j*1000)
    }
    timer(i);
}


// A closure does not merely pass the value of a variable or even a reference to the variable. A closure captures the variable itself!

//9. Private counter using Closure

function counter(){
    var count = 0;
    return function(){
        return ++count;
    }
}

//10. duplicate Array

function duplicate(arr){
    return arr.concat(arr);
}


//11. fizzbuzz for loop

for(var i=1;i<=100;i++){
    var out = '';
    if(i%3===0){out+="fizz";}
    if(i%5===0){out+="buzz";}
    console.log(out || i);
}


//12. Max product of the array

var unsortedArray = [-10, 7, 29, 30, 5, -10, -70];

function sortIntegers(a,b){
    return a-b;
}

function maxProduct(unsorted){
    var sorted = unsorted.sort(sortIntegers);

    var product1 = 1;
    var product2 = 1;
    
    var elementCount = sorted.length-1;

    product1=sorted[elementCount]*sorted[elementCount-1]*sorted[elementCount-2];

    product2 = sorted[0]*sorted[1]*sorted[elementCount];

    if(product1>product2){
        return product1;
    } else {
        return product2;
    }
}


//13. is Prime

function isPrime(num) {
    for(var i = 2; i < num; i++){
      if(num % i === 0) return false;
    }
    return num!==1 && num!==0;
  }

// 14. 

function getPosts(){
    return new Promise(function(resolve, reject){
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:'GET',
            success: function(posts) {
                resolve(posts);
                console.log(posts);
            },
            error: function() {
                reject("Error Occurred");
            }
        });
    });
}
