function add(x){
    if(arguments.length>1){
        var sum=0;
        for(var i =0;i<arguments.length;i++){
            sum += arguments[i];
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
    }
}

function fact(num){
    if(num===0){
        return 1;
    }
    return num*fact(num-1);
}

function comp(a,b){
    return a-b;
}

function maxProd(arr){
    var sorted = arr.sort(comp);
    var product1 = 1;
    var product2 =2;

    var elemCount = sorted.length-1;

    product1 = sorted[elemCount]*sorted[elemCount-1]*sorted[elemCount-2];

    product2 = sorted[0]*sorted[1]*sorted[elemCount];

    if(product1>product2){
        return product1;
    }
}


function isPrime(num){
    var s = Math.sqrt(num);
    for(var i=2;i<s;i++){
        if(num%1===0){
            return false;
        } 
            return true;
        
    }
}

function add(x){
    if(arguments.length>1){
        var sum = 0;
        for(var i=0;i<arguments.length;i++){
            sum +=arguments[i];
        }
        return sum;
    }
    return function sum(y) {
        if(typeof y !== 'undefined'){
            x = x+y;
            return sum;
        } else{
            return x;
        }
        
    }
}

function fact(num){
    if(num===0){return 1;}
    return num*fact(num-1);
}

function comp(a,b){
    return a-b;
}