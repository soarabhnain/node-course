$(function(){
    var $orders = $('#orders');
    $.ajax({
        type:'GET',
        url:'https://learnwebcode.github.io/json-example/animals-1.json',
        success:function(data){
            $.each(data, function(i, animal){
                $orders.append('<li>Name: '+ animal.name+ ', species: '+animal.species+ '</li>');
            })
        }
    });
});


function isPlaindrome(s){
    var rev = s.split('').reverse().join('');
    return s == rev;
}

function isPrime(num){
    s = Math.sqrt(num);
    for(var i=2;i<s;i++){
        if(num%i===0){
            return false;
        }
        return true;
    }
}

var maxPal;
function solution(s){
    var maxLength = 0,
    maxPal='';
    for(var i=0;i<s.length;i++){
        var subString = s.substr(i, s.length);
        if(subString.length <= maxLength) break;
        for(var j=subString.length;j>=0;j--){
            var subString_sub = subString.substr(0,j);
            if(subString_sub.length <= maxLength) break;
            if(isPlaindrome(subString_sub)){
                maxLength = subString_sub.length;
                maxPal = subString_sub;
            }
        }
    }
    if(isPrime(maxPal.length)){
        return maxPal.length;
    };
}