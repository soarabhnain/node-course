String.prototype.pipefy = function(){
   return this.split("").join("|");
}

function add(x){
    if(arguments.length>1){
        var sum = 0;
        for(var i=0; i<arguments.length;i++){
            sum +=arguments[i];
        }
        return sum;
    }
    return function(y){
        if(typeof y !=='undefined'){
            x=x+y;
            return arguments.callee;
        } else{
            return x;
        }
    }
}

function fact(num){
    if(num===0){ return 1;}
    return num*fact(num-1);
}

function comp(a, b){
    return a-b;
}

for(var i=1;i<=100;i++){
    var out ="";
    if(i%3===0){out+="fizz"}
    if(i%5===0){out+="buzz"}
    console.log(out || i);
}

function mul(x){
    if(arguments.length>1){
        var product = 1;
        for(var i=0;i<arguments.length;i++){
            product *=arguments[i];
        }
        return product;
    }
    return function product(y) {
        if(typeof y !='undefined'){
            x *= y;
            return product;
        } else{
            return x;
        }
    }
}