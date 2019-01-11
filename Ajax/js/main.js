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