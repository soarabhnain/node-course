var request = require('request');

var userDetails;


function initialize(){
    var options = {
        url:'http://api.github.com/users/soarabhnain',
        headers:{
            'User-Agent':'request'
        }
    };

    return new Promise(function(resolve, reject){
        request.get(options, function(err, resp, body){
            if(err){
                reject(err);
            } else{
                resolve(JSON.parse(body));
            }
        });
    });

}

function main(){
    var initializePromise = initialize();
    initializePromise.then(function(result){
        userDetails = result;
        console.log("User details Initialized");
        console.log(userDetails);
    }).catch(function(err){
        console.log(err);
    })
}